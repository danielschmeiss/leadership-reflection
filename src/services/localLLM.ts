// Service for communicating with locally deployed LLM models
// Supports common local LLM deployment patterns like Ollama, LM Studio, etc.

export interface LocalLLMConfig {
  baseUrl: string;
  model: string;
  apiKey?: string;
  timeout?: number;
}

export interface LocalLLMRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
}

export interface LocalLLMResponse {
  text: string;
  error?: string;
}

class LocalLLMService {
  private config: LocalLLMConfig;

  constructor(config: LocalLLMConfig) {
    this.config = {
      timeout: 30000, // 30 second default timeout
      ...config
    };
  }

  // Try multiple common local LLM API formats with smarter detection
  async generateResponse(request: LocalLLMRequest): Promise<LocalLLMResponse> {
    const { prompt, maxTokens = 500, temperature = 0.7, systemPrompt } = request;

    // For LM Studio (port 1234), try OpenAI format first
    if (this.config.baseUrl.includes('1234')) {
      try {
        return await this.tryOpenAIFormat(prompt, systemPrompt, maxTokens, temperature);
      } catch (error) {
      }
    } else {
      // For Ollama and others, try Ollama format first
      try {
        return await this.tryOllamaFormat(prompt, systemPrompt, maxTokens, temperature);
      } catch (error) {
      }

      // Then try OpenAI-compatible format (LM Studio, etc.)
      try {
        return await this.tryOpenAIFormat(prompt, systemPrompt, maxTokens, temperature);
      } catch (error) {
      }
    }

    // Try basic chat completion format as last resort
    try {
      return await this.tryBasicChatFormat(prompt, systemPrompt, maxTokens, temperature);
    } catch (error) {
    }

    return {
      text: '',
      error: 'Could not connect to local LLM. Please check that your local model is running and accessible.'
    };
  }

  private async tryOllamaFormat(prompt: string, systemPrompt?: string, maxTokens?: number, temperature?: number): Promise<LocalLLMResponse> {
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const response = await fetch(`${this.config.baseUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        options: {
          num_predict: maxTokens,
          temperature
        },
        stream: false
      }),
      signal: AbortSignal.timeout(this.config.timeout!)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      text: data.message?.content || data.response || ''
    };
  }

  private async tryOpenAIFormat(prompt: string, systemPrompt?: string, maxTokens?: number, temperature?: number): Promise<LocalLLMResponse> {
    // Ensure we have valid content for messages
    const userPrompt = prompt?.trim() || 'Hello';
    
    const messages: Array<{role: string, content: string}> = [];
    if (systemPrompt && systemPrompt.trim()) {
      messages.push({ role: 'system', content: systemPrompt.trim() });
    }
    messages.push({ role: 'user', content: userPrompt });

    // Ensure we have a valid model name - LM Studio requires this
    const modelName = this.config.model?.trim() || 'local-model';

    const requestBody = {
      model: modelName,
      messages: messages,
      max_tokens: maxTokens || 100,
      temperature: temperature || 0.7,
      stream: false
    };

    // Validate the request body before sending
    if (!requestBody.messages || requestBody.messages.length === 0) {
      throw new Error('Messages array is empty');
    }

    if (!requestBody.model) {
      throw new Error('Model name is required');
    }


    const response = await fetch(`${this.config.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      mode: 'cors', // Explicitly set CORS mode
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
      },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(this.config.timeout!)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LM Studio error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
    const responseText = data.choices?.[0]?.message?.content || data.choices?.[0]?.text || '';
    
    if (!responseText) {
    }
    
    return {
      text: responseText
    };
  }

  private async tryBasicChatFormat(prompt: string, systemPrompt?: string, maxTokens?: number, temperature?: number): Promise<LocalLLMResponse> {
    const fullPrompt = systemPrompt ? `${systemPrompt}\n\nUser: ${prompt}\nAssistant:` : prompt;

    const response = await fetch(`${this.config.baseUrl}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
      },
      body: JSON.stringify({
        model: this.config.model,
        prompt: fullPrompt,
        max_tokens: maxTokens,
        temperature,
        stream: false
      }),
      signal: AbortSignal.timeout(this.config.timeout!)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      text: data.text || data.response || data.generated_text || ''
    };
  }

  // Test connection to local LLM using same format detection as generateResponse
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      // Use the same format detection logic as generateResponse
      let result: LocalLLMResponse;
      
      // For LM Studio (port 1234), try OpenAI format first
      if (this.config.baseUrl.includes('1234')) {
        try {
          result = await this.tryOpenAIFormat(
            'Hi', // Simple test prompt
            'You are a helpful assistant.', // Simple system prompt
            10, // Small max tokens
            0.1 // Low temperature for consistent response
          );
        } catch (error) {
          // If OpenAI format fails, try Ollama format as fallback
          try {
            result = await this.tryOllamaFormat('Hi', 'You are a helpful assistant.', 10, 0.1);
          } catch (fallbackError) {
            // Both formats failed, throw the last error
            throw fallbackError;
          }
        }
      } else {
        // For Ollama and others, try Ollama format first
        try {
          result = await this.tryOllamaFormat('Hi', 'You are a helpful assistant.', 10, 0.1);
        } catch (error) {
          // If Ollama format fails, try OpenAI format as fallback
          try {
            result = await this.tryOpenAIFormat('Hi', 'You are a helpful assistant.', 10, 0.1);
          } catch (fallbackError) {
            // Both formats failed, throw the last error
            throw fallbackError;
          }
        }
      }

      if (result.text && result.text.trim() && !result.error) {
        return { success: true };
      } else {
        return { success: false, error: result.error || 'No response from local LLM' };
      }
    } catch (error) {
      console.error('Connection test error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection test failed'
      };
    }
  }
}

// Default configurations for common local LLM setups
export const DEFAULT_CONFIGS: Record<string, Omit<LocalLLMConfig, 'model'>> = {
  ollama: {
    baseUrl: 'http://localhost:11434'
  },
  lmstudio: {
    baseUrl: 'http://localhost:1234'
  },
  textgen: {
    baseUrl: 'http://localhost:5000'
  },
  koboldai: {
    baseUrl: 'http://localhost:5001'
  }
};

export default LocalLLMService;