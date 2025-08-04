import React, { useState } from 'react';
import { Settings, Zap, CheckCircle, AlertCircle, X, Bot, Wifi, WifiOff, Loader } from 'lucide-react';
import { useLocalLLM } from '../hooks/useLocalLLM';
import { LocalLLMConfig as LLMConfig, DEFAULT_CONFIGS } from '../services/localLLM';

interface LocalLLMConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocalLLMConfig({ isOpen, onClose }: LocalLLMConfigProps) {
  const { 
    isConfigured, 
    isConnected, 
    isLoading, 
    error, 
    config,
    configure, 
    testConnection, 
    clearConfig,
    getQuickSetupConfig 
  } = useLocalLLM();

  const [formData, setFormData] = useState<LLMConfig>({
    baseUrl: config?.baseUrl || 'http://localhost:11434',
    model: config?.model || '',
    apiKey: config?.apiKey || '',
    timeout: config?.timeout || 30000
  });

  const [selectedProvider, setSelectedProvider] = useState<keyof typeof DEFAULT_CONFIGS>('ollama');

  if (!isOpen) return null;

  const handleProviderSelect = (provider: keyof typeof DEFAULT_CONFIGS) => {
    setSelectedProvider(provider);
    const defaultConfig = DEFAULT_CONFIGS[provider];
    setFormData(prev => ({
      ...prev,
      baseUrl: defaultConfig.baseUrl,
      apiKey: defaultConfig.apiKey || ''
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    configure(formData);
  };

  const handleQuickSetup = (provider: keyof typeof DEFAULT_CONFIGS, model: string) => {
    const quickConfig = getQuickSetupConfig(provider, model);
    setFormData(quickConfig);
    configure(quickConfig);
  };

  const connectionStatus = () => {
    if (isLoading) return <Loader className="w-4 h-4 animate-spin text-blue-600" />;
    if (isConnected) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (error) return <AlertCircle className="w-4 h-4 text-red-600" />;
    return <WifiOff className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Local AI Assistant</h2>
                <p className="text-gray-600">Connect to your locally deployed LLM</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Connection Status */}
          {isConfigured && (
            <div className={`p-4 rounded-xl border-2 ${
              isConnected 
                ? 'bg-green-50 border-green-200' 
                : error 
                ? 'bg-red-50 border-red-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                {connectionStatus()}
                <div>
                  <div className="font-medium text-gray-900">
                    {isLoading ? 'Testing connection...' : 
                     isConnected ? 'Connected to local AI' : 
                     error ? 'Connection failed' : 'Not connected'}
                  </div>
                  {error && <div className="text-sm text-red-600">{error}</div>}
                  {isConnected && config && (
                    <div className="text-sm text-green-600">
                      Model: {config.model} • {config.baseUrl}
                    </div>
                  )}
                </div>
              </div>
              {isConfigured && !isLoading && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={testConnection}
                    className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Test Connection
                  </button>
                  <button
                    onClick={clearConfig}
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Clear Config
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Setup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Setup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickSetup('ollama', 'llama3.2')}
                className="p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <div className="font-medium text-gray-900">Ollama (Recommended)</div>
                <div className="text-sm text-gray-600">localhost:11434 • llama3.2</div>
              </button>
              <button
                onClick={() => handleQuickSetup('lmstudio', 'local-model')}
                className="p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all"
              >
                <div className="font-medium text-gray-900">LM Studio</div>
                <div className="text-sm text-gray-600">localhost:1234 • OpenAI Compatible</div>
                <div className="text-xs text-blue-600 mt-1">✓ Currently Running</div>
              </button>
            </div>
          </div>

          {/* Manual Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Manual Configuration</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.keys(DEFAULT_CONFIGS).map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => handleProviderSelect(provider as keyof typeof DEFAULT_CONFIGS)}
                      className={`p-2 text-sm border rounded-lg transition-colors ${
                        selectedProvider === provider
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base URL
                </label>
                <input
                  type="url"
                  value={formData.baseUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, baseUrl: e.target.value }))}
                  placeholder="http://localhost:11434"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model Name
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                  placeholder={selectedProvider === 'lmstudio' ? 'local-model (or any name)' : 'llama3.2, codellama, mistral, etc.'}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {selectedProvider === 'lmstudio' 
                    ? 'For LM Studio: any name works (e.g., "local-model", "my-model")' 
                    : 'For Ollama: use model names like "llama3.2" or "codellama"'
                  }
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key (Optional)
                </label>
                <input
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="Leave empty for local deployments"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeout (ms)
                </label>
                <input
                  type="number"
                  value={formData.timeout}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeout: Number(e.target.value) }))}
                  min="5000"
                  max="120000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                  Save Configuration
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900 mb-2">Getting Started</h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <p><strong>Ollama:</strong> Install from ollama.ai, then run <code className="bg-white px-1 rounded">ollama run llama3.2</code></p>
                  <p><strong>LM Studio:</strong> Load a model, go to "Local Server" tab, click "Start Server". Use any model name.</p>
                  <p><strong>Privacy:</strong> All communication stays between your browser and local model</p>
                  {formData.baseUrl.includes('1234') && (
                    <div className="bg-amber-100 p-3 rounded text-amber-900 border border-amber-300">
                      <p className="font-semibold mb-2">🔧 LM Studio CORS Setup Required:</p>
                      <ol className="text-xs space-y-1 list-decimal list-inside">
                        <li>In LM Studio, go to "Local Server" tab</li>
                        <li>Click "Configure" or settings icon</li>
                        <li>Enable "CORS" or "Cross-Origin Requests"</li>
                        <li>Or add <code className="bg-white px-1 rounded">localhost:5173</code> to allowed origins</li>
                        <li>Restart the server</li>
                      </ol>
                      <p className="text-xs mt-2 font-medium">Without CORS enabled, browser will block requests for security.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}