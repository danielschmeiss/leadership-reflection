import React from 'react';
import { useEffect } from 'react';
import { Shield, Info, Bot, Settings } from './icons';
import { useLocalLLM } from '../hooks/useLocalLLM';
import { LocalLLMConfig } from './LocalLLMConfig';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
  helpText?: string;
  onNavigateToImprint?: () => void;
  onNavigateToDashboard?: () => void;
  showFrameworkInfo?: boolean;
  frameworkRationale?: {
    title: string;
    description: string;
    whenToUse: string;
    keyBenefits: string[];
  };
}

export function Layout({ 
  children, 
  title, 
  actions, 
  helpText,
  onNavigateToImprint,
  onNavigateToDashboard,
  showFrameworkInfo = false,
  frameworkRationale
}: LayoutProps) {
  const [showInfo, setShowInfo] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showLLMConfig, setShowLLMConfig] = React.useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);
  
  // Create a fresh instance of the hook state every time we need to check
  const [buttonState, setButtonState] = React.useState(() => {
    const config = localStorage.getItem('local_llm_config');
    return {
      isConfigured: !!config,
      isConnected: false,
      isLoading: false
    };
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#imprint' && onNavigateToImprint) {
        onNavigateToImprint();
        window.location.hash = '';
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [onNavigateToImprint]);

  // Function to manually refresh button state from localStorage
  const refreshButtonState = React.useCallback(async () => {
    const configStr = localStorage.getItem('local_llm_config');
    if (!configStr) {
      setButtonState({ isConfigured: false, isConnected: false, isLoading: false });
      return;
    }

    try {
      const config = JSON.parse(configStr);
      setButtonState(prev => ({ ...prev, isConfigured: true, isLoading: true }));
      
      // Test the connection directly
      const LocalLLMService = (await import('../services/localLLM')).default;
      const service = new LocalLLMService(config);
      const result = await service.testConnection();
      
      setButtonState({
        isConfigured: true,
        isConnected: result.success,
        isLoading: false
      });
    } catch (error) {
      setButtonState({
        isConfigured: true,
        isConnected: false,
        isLoading: false
      });
    }
  }, []);

  // Check connection status on initial mount
  useEffect(() => {
    const configStr = localStorage.getItem('local_llm_config');
    if (configStr) {
      // There's a saved config, check if it's actually connected
      refreshButtonState();
    }
  }, [refreshButtonState]);

  // Only update when modal closes
  useEffect(() => {
    if (!showLLMConfig && refreshKey > 0) {
      // Modal just closed, refresh the button state manually
      refreshButtonState();
    }
  }, [showLLMConfig, refreshKey, refreshButtonState]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-5xl">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-4 sm:gap-0 mb-4 sm:mb-6">
            {/* Main header content */}
            <div className="flex sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <button
                    onClick={onNavigateToDashboard}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-all duration-200 flex-shrink-0"
                    aria-label="Go to dashboard"
                    title="Go to dashboard"
                  >
                    <img 
                      src="/logo.png" 
                      alt="Reflect & Act Logo" 
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                  </button>
                  <div className="min-w-0">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{title}</h1>
                    {helpText && (
                      <div>
                        {showFrameworkInfo && frameworkRationale && (
                        <div className="relative mt-2 sm:mt-3">
                          <button
                            onClick={() => setShowInfo(!showInfo)}
                            className={`inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm rounded-lg transition-all ${showInfo ? 'bg-blue-100 text-blue-700' : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'}`}
                            title="Learn why this framework was chosen"
                          >
                            <span className="font-medium">{helpText}</span>
                            <Info className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          </button>
                          
                          {/* Framework Info Panel */}
                          {showInfo && (
                            <div className="absolute top-full mt-2 left-0 right-0 sm:right-auto sm:w-[28rem] bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 z-50 max-w-sm sm:max-w-none animate-in slide-in-from-top-2 duration-200">
                              <div className="flex items-start gap-4">
                                <div className="p-2 sm:p-3 bg-indigo-600 rounded-lg text-white flex-shrink-0">
                                  <Shield className="w-4 h-4 sm:w-6 sm:h-6" />
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-semibold text-indigo-900 mb-2 sm:mb-3 text-sm sm:text-base">Why {frameworkRationale.title}?</h5>
                                  <p className="text-indigo-800 mb-3 sm:mb-4 text-xs sm:text-sm">
                                    {frameworkRationale.description}
                                  </p>
                                  <div className="mb-3 sm:mb-4">
                                    <h6 className="font-medium text-indigo-900 mb-1 sm:mb-2 text-xs sm:text-sm">When to use:</h6>
                                    <p className="text-indigo-700 text-xs sm:text-sm">
                                      {frameworkRationale.whenToUse}
                                    </p>
                                  </div>
                                  <div>
                                    <h6 className="font-medium text-indigo-900 mb-1 sm:mb-2 text-xs sm:text-sm">Key benefits:</h6>
                                    <ul className="text-indigo-700 text-xs sm:text-sm space-y-1">
                                      {frameworkRationale.keyBenefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                          <span>{benefit}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        )}
                      </div>
                    )}
                    {!helpText && !showFrameworkInfo && (
                      <p className="text-sm sm:text-base text-gray-600 mt-1">Pause, reflect, and move forward with purpose.</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Privacy and AI badges - aligned to the right */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowPrivacy(!showPrivacy)}
                      className="flex items-center gap-1 sm:gap-2 text-xs text-emerald-700 bg-emerald-50 p-2 sm:px-4 sm:py-2 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-all cursor-pointer"
                    >
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="font-medium text-xs hidden sm:inline">Private</span>
                    </button>
                  
                  {/* Privacy panel */}
                  {showPrivacy && (
                    <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 z-50 animate-in slide-in-from-top-2 duration-200 max-w-[calc(100vw-2rem)] -mr-4">
                      <div className="flex items-start gap-4">
                        <div className="p-2 sm:p-3 bg-emerald-100 rounded-lg flex-shrink-0">
                          <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Your Privacy is Protected</h4>
                          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>100% Local Storage:</strong> All reflections stay on your device</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>No Personal Data Collection:</strong> We don't track, store, or analyze your reflection content</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Anonymous Analytics:</strong> Vercel Analytics tracks page views and usage patterns (no personal data)</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>Offline Capable:</strong> Works without internet connection</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span><strong>You Control Your Data:</strong> Export or delete anytime</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {actions}
              </div>
              
              {/* AI Assistant Setup Badge */}
              <div className="relative">
                <button
                  key={`llm-button-${buttonState.isConfigured}-${buttonState.isConnected}-${buttonState.isLoading}-${refreshKey}`}
                  onClick={() => setShowLLMConfig(true)}
                  className={`flex items-center gap-1 sm:gap-2 text-xs p-2 sm:px-4 sm:py-2 rounded-full border transition-all cursor-pointer ${
                    buttonState.isConfigured && buttonState.isConnected && !buttonState.isLoading
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                      : buttonState.isConfigured && buttonState.isLoading
                      ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
                      : 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                  title={
                    buttonState.isConfigured && buttonState.isConnected && !buttonState.isLoading
                      ? 'Local AI Connected'
                      : buttonState.isConfigured && buttonState.isLoading
                      ? 'Testing AI Connection...'
                      : 'Setup Local AI Assistant'
                  }
                >
                  {buttonState.isConfigured && buttonState.isConnected && !buttonState.isLoading ? (
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : buttonState.isConfigured && buttonState.isLoading ? (
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  ) : (
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="font-medium text-xs hidden sm:inline">
                    {(() => {
                      const buttonText = buttonState.isConfigured && buttonState.isConnected && !buttonState.isLoading
                        ? 'AI Ready'
                        : buttonState.isConfigured && buttonState.isLoading
                        ? 'Testing...'
                        : buttonState.isConfigured && !buttonState.isConnected && !buttonState.isLoading
                        ? 'Setup AI'
                        : 'Setup AI';
                      return buttonText;
                    })()}
                  </span>
                </button>
              </div>
            </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6 sm:space-y-8">
          {children}
        </main>
        
        {/* Local LLM Configuration Modal */}
        <LocalLLMConfig 
          isOpen={showLLMConfig} 
          onClose={() => {
            setShowLLMConfig(false);
            // Trigger refresh after modal closes
            setRefreshKey(prev => prev + 1);
          }} 
        />

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center">
          <div className="text-sm text-gray-500">
            <button
              onClick={() => window.location.hash = 'imprint'}
              className="text-gray-500 hover:text-gray-700 underline hover:no-underline transition-all cursor-pointer"
            >
              Imprint
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}