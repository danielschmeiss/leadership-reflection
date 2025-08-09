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
}

export function Layout({ 
  children, 
  title, 
  actions, 
  helpText,
  onNavigateToImprint,
  onNavigateToDashboard
}: LayoutProps) {
  const [showInfo, setShowInfo] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);
  const [showLLMConfig, setShowLLMConfig] = React.useState(false);
  
  const { isConfigured, isConnected, isLoading } = useLocalLLM();

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
                      alt="Reflacto Logo" 
                      className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 object-contain"
                    />
                  </button>
                  <div className="min-w-0">
                    <div style={{textAlign: 'left'}}>
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-quicksand" style={{color: '#17494D', margin: 0, padding: 0}}>
                        Refl<span className="font-normal">act</span>o
                      </h1>
                      <p className="text-sm sm:text-base text-gray-600 font-quicksand font-light" style={{letterSpacing: '0.5px', margin: '4px 0 0 0', padding: 0}}>Pause, reflect and act with purpose.</p>
                    </div>
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
                  onClick={() => setShowLLMConfig(true)}
                  className={`flex items-center gap-1 sm:gap-2 text-xs p-2 sm:px-4 sm:py-2 rounded-full border transition-all cursor-pointer ${
                    isConfigured && isConnected && !isLoading
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                      : isConfigured && isLoading
                      ? 'text-yellow-700 bg-yellow-50 border-yellow-200'
                      : 'text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100'
                  }`}
                  title={
                    isConfigured && isConnected && !isLoading
                      ? 'Local AI Connected'
                      : isConfigured && isLoading
                      ? 'Testing AI Connection...'
                      : 'Setup Local AI Assistant'
                  }
                >
                  {isConfigured && isConnected && !isLoading ? (
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : isConfigured && isLoading ? (
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                  ) : (
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="font-medium text-xs hidden sm:inline">
                    {isConfigured && isConnected && !isLoading
                      ? 'AI Ready'
                      : isConfigured && isLoading
                      ? 'Testing...'
                      : isConfigured && !isConnected && !isLoading
                      ? 'Setup AI'
                      : 'Setup AI'
                    }
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
          onClose={() => setShowLLMConfig(false)} 
        />

        {/* Footer */}
        <footer className="mt-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/logo.png" alt="Reflacto Logo" className="w-8 h-8" />
                  <h3 className="text-xl font-bold font-quicksand" style={{color: '#17494D'}}>
                    Refl<span className="font-normal">act</span>o
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-md">
                  A privacy-focused leadership reflection tool for engineering leaders. Navigate situational challenges through proven frameworks with complete data privacy.
                </p>
                <div className="text-sm text-gray-500">
                  © {new Date().getFullYear()} Reflacto. All rights reserved.
                </div>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <button
                      onClick={() => window.location.pathname = '/local-llm-guide'}
                      className="text-gray-600 hover:text-gray-900 underline hover:no-underline transition-colors cursor-pointer"
                    >
                      Local LLM Integration
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => window.location.pathname = '/frameworks'}
                      className="text-gray-600 hover:text-gray-900 underline hover:no-underline transition-colors cursor-pointer"
                    >
                      Leadership Frameworks
                    </button>
                  </li>
                </ul>
              </div>

              {/* Contact & Legal */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="mailto:reflacto-contact@proton.me"
                      className="text-gray-600 hover:text-gray-900 underline hover:no-underline transition-colors"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => window.location.pathname = '/privacy'}
                      className="text-gray-600 hover:text-gray-900 underline hover:no-underline transition-colors cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => window.location.hash = 'imprint'}
                      className="text-gray-600 hover:text-gray-900 underline hover:no-underline transition-colors cursor-pointer"
                    >
                      Imprint
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}