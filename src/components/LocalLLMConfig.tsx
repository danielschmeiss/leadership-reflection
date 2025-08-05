import React, { useState } from 'react';
import { Settings, Zap, CheckCircle, AlertCircle, X, Bot, Wifi, WifiOff, Loader, ChevronDown, ChevronRight, Shield, Link } from 'lucide-react';
import { useLocalLLM } from '../hooks/useLocalLLM';
import { LocalLLMConfig as LLMConfig, DEFAULT_CONFIGS } from '../services/localLLM';

interface LocalLLMConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocalLLMConfig({ isOpen, onClose }: LocalLLMConfigProps) {
  const llmState = useLocalLLM();
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
  } = llmState;


  const [formData, setFormData] = useState<LLMConfig>({
    baseUrl: config?.baseUrl || 'http://localhost:11434',
    model: config?.model || '',
    apiKey: config?.apiKey || '',
    timeout: config?.timeout || 30000
  });

  const [selectedProvider, setSelectedProvider] = useState<keyof typeof DEFAULT_CONFIGS>('ollama');
  const [showManualConfig, setShowManualConfig] = useState(false);
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  const [showGettingStarted, setShowGettingStarted] = useState(false);

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
          {/* Privacy Explanation - Expandable */}
          <div className="bg-green-50 rounded-xl border border-green-200">
            <button
              onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
              className="w-full p-6 text-left hover:bg-green-100 hover:bg-opacity-50 rounded-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900">Keep Your Leadership Insights Private</h3>
                    <p className="text-sm text-green-700 mt-1">Why local AI matters for sensitive workplace conversations</p>
                  </div>
                </div>
                {showPrivacyDetails ? (
                  <ChevronDown className="w-5 h-5 text-green-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-green-600" />
                )}
              </div>
            </button>
            
            {showPrivacyDetails && (
              <div className="px-6 pb-6">
                <div className="space-y-3 text-sm text-green-800">
                  <p className="leading-relaxed">
                    <strong>Your leadership challenges contain sensitive information</strong> about team dynamics, performance issues, and strategic decisions. 
                    Using cloud AI services means sending this confidential data to external companies where it may be stored, analyzed, or used for training.
                  </p>
                  <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2">Local AI Benefits:</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• <strong>Complete Privacy:</strong> Your reflections never leave your device</li>
                      <li>• <strong>No Internet Required:</strong> Works offline once configured</li>
                      <li>• <strong>Company Compliance:</strong> No risk of violating data policies</li>
                      <li>• <strong>Unlimited Usage:</strong> No API costs or rate limits</li>
                      <li>• <strong>Full Control:</strong> You own your data and the AI responses</li>
                    </ul>
                  </div>
                  <p className="text-xs text-green-700 italic">
                    This setup takes 5 minutes but ensures your leadership insights remain completely confidential.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Getting Started Section - Expandable */}
          <div className="bg-blue-50 rounded-xl border border-blue-200">
            <button
              onClick={() => setShowGettingStarted(!showGettingStarted)}
              className="w-full p-6 text-left hover:bg-blue-100 hover:bg-opacity-50 rounded-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">Quick Setup Guide</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      <span className="font-medium">→ First:</span> Install Ollama or LM Studio 
                      <span className="font-medium">→ Then:</span> Click connection buttons below
                    </p>
                  </div>
                </div>
                {showGettingStarted ? (
                  <ChevronDown className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                )}
              </div>
            </button>
            
            {showGettingStarted && (
              <div className="px-6 pb-6">
                <div className="mb-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">👇 Choose one option below, install it, then use the connection buttons in the next section</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">📦 Ollama (Recommended)</h4>
                    <ol className="space-y-1 list-decimal list-inside text-xs">
                      <li>
                        Download from{' '}
                        <a 
                          href="https://ollama.ai" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          ollama.ai
                        </a>
                      </li>
                      <li>Install and run any model (e.g. <code className="bg-white px-1 rounded">ollama run llama3.2</code>)</li>
                      <li><strong>Then click "Connect to Ollama" below</strong></li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-900">🖥️ LM Studio</h4>
                    <ol className="space-y-1 list-decimal list-inside text-xs">
                      <li>
                        Download from{' '}
                        <a 
                          href="https://lmstudio.ai" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          lmstudio.ai
                        </a>
                      </li>
                      <li>Download any model in LM Studio</li>
                      <li>Go to "Local Server" tab → "Start Server"</li>
                      <li>Enable CORS in server settings</li>
                      <li><strong>Then click "Connect to LM Studio" below</strong></li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>


          {/* Quick Setup - Highlighted connections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Connect to Your Local AI</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ollama Provider */}
              <div className={`border-2 rounded-xl transition-all ${
                config?.baseUrl?.includes('11434') && isConnected
                  ? 'border-green-300 bg-green-50 ring-2 ring-green-200'
                  : config?.baseUrl?.includes('11434') && error
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200'
              }`}>
                <button
                  onClick={() => handleQuickSetup('ollama', 'llama3.2')}
                  className="w-full p-5 text-left hover:bg-blue-50 hover:bg-opacity-50 rounded-xl transition-all"
                  disabled={isLoading && config?.baseUrl?.includes('11434')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Link className="w-5 h-5 text-blue-600" />
                      <div className="font-semibold text-gray-900">
                        {config?.baseUrl?.includes('11434') && isConnected 
                          ? 'Connected to Ollama' 
                          : 'Connect to Ollama'}
                      </div>
                    </div>
                    {config?.baseUrl?.includes('11434') && isLoading && (
                      <Loader className="w-5 h-5 animate-spin text-blue-600" />
                    )}
                    {config?.baseUrl?.includes('11434') && isConnected && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {config?.baseUrl?.includes('11434') && error && !isLoading && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">localhost:11434 • Any Ollama model</div>
                </button>
                
                {/* Ollama-specific error and actions */}
                {config?.baseUrl?.includes('11434') && error && !isLoading && (
                  <div className="px-5 pb-4">
                    <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-red-900 text-sm">Ollama Connection Failed</p>
                          <p className="text-xs text-red-700 mt-1">{error}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={testConnection}
                          className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          Retry Connection
                        </button>
                        <button
                          onClick={clearConfig}
                          className="px-3 py-1.5 text-xs text-red-700 hover:bg-red-100 rounded transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                        <p className="text-blue-800">
                          <strong>Troubleshooting:</strong> Make sure Ollama is running with <code className="bg-white px-1 rounded">ollama run [model-name]</code>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* LM Studio Provider */}
              <div className={`border-2 rounded-xl transition-all ${
                config?.baseUrl?.includes('1234') && isConnected
                  ? 'border-green-300 bg-green-50 ring-2 ring-green-200'
                  : config?.baseUrl?.includes('1234') && error
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-200'
              }`}>
                <button
                  onClick={() => handleQuickSetup('lmstudio', 'local-model')}
                  className="w-full p-5 text-left hover:bg-blue-50 hover:bg-opacity-50 rounded-xl transition-all"
                  disabled={isLoading && config?.baseUrl?.includes('1234')}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Link className="w-5 h-5 text-blue-600" />
                      <div className="font-semibold text-gray-900">
                        {config?.baseUrl?.includes('1234') && isConnected 
                          ? 'Connected to LM Studio' 
                          : 'Connect to LM Studio'}
                      </div>
                    </div>
                    {config?.baseUrl?.includes('1234') && isLoading && (
                      <Loader className="w-5 h-5 animate-spin text-blue-600" />
                    )}
                    {config?.baseUrl?.includes('1234') && isConnected && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {config?.baseUrl?.includes('1234') && error && !isLoading && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">localhost:1234 • OpenAI Compatible</div>
                </button>
                
                {/* LM Studio-specific error and actions */}
                {config?.baseUrl?.includes('1234') && error && !isLoading && (
                  <div className="px-5 pb-4">
                    <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-red-900 text-sm">LM Studio Connection Failed</p>
                          <p className="text-xs text-red-700 mt-1">{error}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={testConnection}
                          className="px-3 py-1.5 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                          Retry Connection
                        </button>
                        <button
                          onClick={clearConfig}
                          className="px-3 py-1.5 text-xs text-red-700 hover:bg-red-100 rounded transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                      <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-xs">
                        <p className="text-amber-800">
                          <strong>Common Issues:</strong> 
                          <br />• Make sure server is running in LM Studio
                          <br />• Enable CORS in server settings
                          <br />• Check if port 1234 is available
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* LM Studio CORS warning for non-error cases */}
                {config?.baseUrl?.includes('1234') && !isConnected && !error && !isLoading && (
                  <div className="px-5 pb-4">
                    <div className="p-2 bg-amber-100 border border-amber-200 rounded text-xs text-amber-800">
                      <p className="font-medium">⚠️ CORS Setup Required:</p>
                      <p>Enable CORS in LM Studio's server settings</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manual Configuration - Collapsible */}
          <div className="space-y-4">
            <button
              onClick={() => setShowManualConfig(!showManualConfig)}
              className="flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {showManualConfig ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              Advanced Configuration
            </button>
            
            {showManualConfig && (
              <div className="pl-6 border-l-2 border-gray-200">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}