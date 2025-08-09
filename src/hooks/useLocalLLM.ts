import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { flushSync } from 'react-dom';
import LocalLLMService, { LocalLLMConfig, LocalLLMRequest, LocalLLMResponse, DEFAULT_CONFIGS } from '../services/localLLM';

interface UseLocalLLMState {
  isConfigured: boolean;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  config: LocalLLMConfig | null;
  service: LocalLLMService | null;
  hasAttemptedAutoTest: boolean;
  stateId: number; // Add unique ID to track state updates
}

interface UseLocalLLMActions {
  configure: (config: LocalLLMConfig) => void;
  testConnection: () => Promise<void>;
  generateResponse: (request: LocalLLMRequest) => Promise<LocalLLMResponse>;
  clearConfig: () => void;
  getQuickSetupConfig: (provider: keyof typeof DEFAULT_CONFIGS, model: string) => LocalLLMConfig;
}

const LOCAL_LLM_CONFIG_KEY = 'local_llm_config';

// Create context for shared state
const LocalLLMContext = createContext<(UseLocalLLMState & UseLocalLLMActions) | null>(null);

// Helper function to provide detailed error messages
function getDetailedErrorMessage(error: string, config: LocalLLMConfig | null): string {
  const baseUrl = config?.baseUrl || 'localhost';
  const model = config?.model || 'your model';
  
  // Check for common error patterns
  if (error.includes('fetch') && error.includes('ECONNREFUSED')) {
    return `Cannot connect to ${baseUrl}. Make sure your local LLM is running.\n\nFor Ollama: Run 'ollama serve' then 'ollama run ${model}'\nFor LM Studio: Start the server in the 'Local Server' tab\nFor other setups: Check that your model is running on ${baseUrl}`;
  }
  
  if (error.includes('404') || error.includes('Not Found')) {
    return `API endpoint not found at ${baseUrl}. Check your base URL and make sure the service is running with the correct API format.`;
  }
  
  if (error.includes('timeout') || error.includes('AbortError')) {
    return `Connection timed out to ${baseUrl}. Your local LLM might be starting up or the model is too large. Try again in a moment.`;
  }
  
  if (error.includes('model') && error.includes('not found')) {
    return `Model '${model}' not found. Make sure you have pulled/loaded this model in your local LLM.\n\nFor Ollama: Run 'ollama pull ${model}'\nFor LM Studio: Download and load the model first`;
  }
  
  if (error.includes('CORS') || error.includes('Access-Control-Allow-Origin')) {
    if (baseUrl.includes('1234')) {
      return `CORS error: LM Studio is blocking browser requests.\n\nTo fix this:\n1. In LM Studio, go to "Local Server" tab\n2. Click the settings/configure button\n3. Enable "CORS" or "Cross-Origin Requests"\n4. Add "localhost:5173" to allowed origins\n5. Restart the LM Studio server\n\nThis is required for browser security.`;
    } else {
      return `CORS error when connecting to ${baseUrl}. Make sure your local LLM allows browser connections.\n\nFor most local LLMs, you need to enable CORS or add localhost:5173 to allowed origins.`;
    }
  }
  
  // Generic error with helpful context
  return `Connection failed: ${error}\n\nTroubleshooting:\n• Check that your local LLM is running at ${baseUrl}\n• Verify the model '${model}' is available\n• Try restarting your local LLM service`;
}

// Provider component that manages the shared state
export function LocalLLMProvider({ children }: { children: React.ReactNode }) {
  const value = useLocalLLMInternal();
  
  return React.createElement(
    LocalLLMContext.Provider,
    { value },
    children
  );
}

// Internal hook that actually manages the state
function useLocalLLMInternal(): UseLocalLLMState & UseLocalLLMActions {
  const [state, setState] = useState<UseLocalLLMState>({
    isConfigured: false,
    isConnected: false,
    isLoading: false,
    error: null,
    config: null,
    service: null,
    hasAttemptedAutoTest: false,
    stateId: 0
  });

  // Debug: Log hook instances and when they're called
  React.useEffect(() => {
    console.log('useLocalLLM hook instance - current state:', { 
      isConfigured: state.isConfigured, 
      isConnected: state.isConnected, 
      isLoading: state.isLoading, 
      stateId: state.stateId 
    });
  }, [state.isConfigured, state.isConnected, state.isLoading, state.stateId]);

  // Load saved configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem(LOCAL_LLM_CONFIG_KEY);
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig) as LocalLLMConfig;
        const service = new LocalLLMService(config);
        setState(prev => ({
          ...prev,
          isConfigured: true,
          config,
          service,
          hasAttemptedAutoTest: false,
          stateId: prev.stateId + 1
        }));
      } catch (error) {
        console.error('Failed to load LLM config:', error);
        localStorage.removeItem(LOCAL_LLM_CONFIG_KEY);
      }
    }
  }, []);

  const configure = useCallback((config: LocalLLMConfig, forceConnectedState?: boolean) => {
    const service = new LocalLLMService(config);
    
    // Save to localStorage first
    localStorage.setItem(LOCAL_LLM_CONFIG_KEY, JSON.stringify(config));
    
    // Set the connection state directly based on the parameter
    const isConnected = forceConnectedState ?? false;
    const willAutoTest = !forceConnectedState; // Will auto-test if not forced
    
    console.log('Configure called:', { 
      baseUrl: config.baseUrl, 
      model: config.model, 
      forceConnectedState, 
      willAutoTest, 
      isConnected 
    });
    
    // Then use flushSync to force synchronous state update
    flushSync(() => {
      setState(prev => ({
        ...prev,
        isConfigured: true,
        config,
        service,
        error: null,
        isConnected, // Use the forced state or default to false
        hasAttemptedAutoTest: forceConnectedState ? true : false, // Skip auto-test if forced
        isLoading: willAutoTest, // Set loading if we expect auto-test to run
        stateId: prev.stateId + 1
      }));
    });
    console.log('After configure setState - should have isConnected:', isConnected, 'isLoading:', willAutoTest);
  }, []);

  const testConnection = useCallback(async () => {
    if (!state.service) return;

    console.log('Starting connection test...', { config: state.config });
    setState(prev => ({ ...prev, isLoading: true, error: null, stateId: prev.stateId + 1 }));

    try {
      const result = await state.service.testConnection();
      const errorMessage = result.error ? getDetailedErrorMessage(result.error, state.config) : null;
      
      console.log('Connection test result:', { success: result.success, error: errorMessage, willSetConnected: result.success });
      flushSync(() => {
        setState(prev => ({
          ...prev,
          isLoading: false,
          isConnected: result.success,
          error: errorMessage,
          hasAttemptedAutoTest: true,
          stateId: prev.stateId + 1
        }));
      });
      console.log('After setState - isConnected should be:', result.success);
    } catch (error) {
      const errorMessage = getDetailedErrorMessage(
        error instanceof Error ? error.message : 'Connection test failed',
        state.config
      );
      
      console.log('Connection test failed with exception:', error, 'Setting isConnected to false');
      flushSync(() => {
        setState(prev => ({
          ...prev,
          isLoading: false,
          isConnected: false,
          error: errorMessage,
          hasAttemptedAutoTest: true,
          stateId: prev.stateId + 1
        }));
      });
      console.log('After exception setState - isConnected should be: false');
    }
  }, [state.service, state.config]);

  const generateResponse = useCallback(async (request: LocalLLMRequest): Promise<LocalLLMResponse> => {
    if (!state.service) {
      return {
        text: '',
        error: 'Local LLM not configured. Please set up your local model first.'
      };
    }

    setState(prev => ({ ...prev, isLoading: true, error: null, stateId: prev.stateId + 1 }));

    try {
      const response = await state.service.generateResponse(request);
      setState(prev => ({
        ...prev,
        isLoading: false,
        isConnected: !response.error,
        error: response.error || null,
        stateId: prev.stateId + 1
      }));
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Request failed';
      setState(prev => ({
        ...prev,
        isLoading: false,
        isConnected: false,
        error: errorMessage,
        stateId: prev.stateId + 1
      }));
      return {
        text: '',
        error: errorMessage
      };
    }
  }, [state.service]);

  const clearConfig = useCallback(() => {
    // Use flushSync to ensure immediate state update
    flushSync(() => {
      setState(prev => ({
        isConfigured: false,
        isConnected: false,
        isLoading: false,
        error: null,
        config: null,
        service: null,
        hasAttemptedAutoTest: false,
        stateId: prev.stateId + 1
      }));
    });
    localStorage.removeItem(LOCAL_LLM_CONFIG_KEY);
  }, []);

  const getQuickSetupConfig = useCallback((provider: keyof typeof DEFAULT_CONFIGS, model: string): LocalLLMConfig => {
    const baseConfig = DEFAULT_CONFIGS[provider];
    return {
      ...baseConfig,
      model
    };
  }, []);

  // Auto-test connection when service is configured or reconfigured
  useEffect(() => {
    if (state.service && state.isConfigured && !state.hasAttemptedAutoTest) {
      // Add a small delay to ensure flushSync has completed
      setTimeout(() => {
        testConnection();
      }, 10);
    }
  }, [state.service, state.isConfigured, state.hasAttemptedAutoTest, testConnection]);

  return {
    ...state,
    configure,
    testConnection,
    generateResponse,
    clearConfig,
    getQuickSetupConfig
  };
}

// Public hook that components use to access the shared state
export function useLocalLLM(): UseLocalLLMState & UseLocalLLMActions {
  const context = useContext(LocalLLMContext);
  
  if (!context) {
    throw new Error('useLocalLLM must be used within a LocalLLMProvider');
  }
  
  return context;
}