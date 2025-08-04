import { useState, useEffect, useCallback } from 'react';
import LocalLLMService, { LocalLLMConfig, LocalLLMRequest, LocalLLMResponse, DEFAULT_CONFIGS } from '../services/localLLM';

interface UseLocalLLMState {
  isConfigured: boolean;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  config: LocalLLMConfig | null;
  service: LocalLLMService | null;
  hasAttemptedAutoTest: boolean;
}

interface UseLocalLLMActions {
  configure: (config: LocalLLMConfig) => void;
  testConnection: () => Promise<void>;
  generateResponse: (request: LocalLLMRequest) => Promise<LocalLLMResponse>;
  clearConfig: () => void;
  getQuickSetupConfig: (provider: keyof typeof DEFAULT_CONFIGS, model: string) => LocalLLMConfig;
}

const LOCAL_LLM_CONFIG_KEY = 'local_llm_config';

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

export function useLocalLLM(): UseLocalLLMState & UseLocalLLMActions {
  const [state, setState] = useState<UseLocalLLMState>({
    isConfigured: false,
    isConnected: false,
    isLoading: false,
    error: null,
    config: null,
    service: null,
    hasAttemptedAutoTest: false
  });

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
          hasAttemptedAutoTest: false
        }));
      } catch (error) {
        console.error('Failed to load LLM config:', error);
        localStorage.removeItem(LOCAL_LLM_CONFIG_KEY);
      }
    }
  }, []);

  const configure = useCallback((config: LocalLLMConfig) => {
    const service = new LocalLLMService(config);
    setState(prev => ({
      ...prev,
      isConfigured: true,
      config,
      service,
      error: null,
      isConnected: false,
      hasAttemptedAutoTest: false
    }));
    
    // Save to localStorage
    localStorage.setItem(LOCAL_LLM_CONFIG_KEY, JSON.stringify(config));
  }, []);

  const testConnection = useCallback(async () => {
    if (!state.service) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await state.service.testConnection();
      const errorMessage = result.error ? getDetailedErrorMessage(result.error, state.config) : null;
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isConnected: result.success,
        error: errorMessage,
        hasAttemptedAutoTest: true
      }));
    } catch (error) {
      const errorMessage = getDetailedErrorMessage(
        error instanceof Error ? error.message : 'Connection test failed',
        state.config
      );
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isConnected: false,
        error: errorMessage,
        hasAttemptedAutoTest: true
      }));
    }
  }, [state.service, state.config]);

  const generateResponse = useCallback(async (request: LocalLLMRequest): Promise<LocalLLMResponse> => {
    if (!state.service) {
      return {
        text: '',
        error: 'Local LLM not configured. Please set up your local model first.'
      };
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await state.service.generateResponse(request);
      setState(prev => ({
        ...prev,
        isLoading: false,
        isConnected: !response.error,
        error: response.error || null
      }));
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Request failed';
      setState(prev => ({
        ...prev,
        isLoading: false,
        isConnected: false,
        error: errorMessage
      }));
      return {
        text: '',
        error: errorMessage
      };
    }
  }, [state.service]);

  const clearConfig = useCallback(() => {
    setState({
      isConfigured: false,
      isConnected: false,
      isLoading: false,
      error: null,
      config: null,
      service: null,
      hasAttemptedAutoTest: false
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

  // Auto-test connection when service is first configured (only once)
  useEffect(() => {
    if (state.service && state.isConfigured && !state.hasAttemptedAutoTest && !state.isLoading) {
      testConnection();
    }
  }, [state.service, state.isConfigured, state.hasAttemptedAutoTest, state.isLoading, testConnection]);

  return {
    ...state,
    configure,
    testConnection,
    generateResponse,
    clearConfig,
    getQuickSetupConfig
  };
}