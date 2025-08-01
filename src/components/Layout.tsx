import React from 'react';
import { useEffect } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  helpText?: string;
  onNavigateToImprint?: () => void;
}

export function Layout({ 
  children, 
  title, 
  showBack = false, 
  onBack, 
  actions, 
  helpText,
  onNavigateToImprint
}: LayoutProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 max-w-5xl">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
            <div className="flex items-center gap-3 sm:gap-4">
              {showBack && (
                <button
                  onClick={onBack}
                  className="p-2 sm:p-3 bg-white hover:bg-gray-50 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 flex-shrink-0"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              )}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <img 
                  src="/logo.png" 
                  alt="Reflect & Act Logo" 
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain flex-shrink-0"
                />
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{title}</h1>
                  {helpText && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 leading-relaxed">{helpText}</p>
                  )}
                  {!helpText && (
                    <p className="text-sm sm:text-base text-gray-600 mt-1 hidden sm:block">Pause, reflect, and move forward with purpose.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {/* Privacy badge */}
              <div className="relative group">
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-emerald-700 bg-emerald-50 px-2 sm:px-4 py-1 sm:py-2 rounded-full border border-emerald-200 cursor-help">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium hidden sm:inline">Private & Secure</span>
                  <span className="font-medium sm:hidden">Private</span>
                </div>
                
                {/* Hover panel */}
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg">
                      <Shield className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Your Privacy is Protected</h4>
                      <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>100% Local Storage:</strong> All reflections stay on your device</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>No Data Collection:</strong> We don't track, store, or analyze your content</span>
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
              </div>
              
              {actions}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-6 sm:space-y-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center">
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              <span>Professional Leadership Development Tool</span>
            </div>
            
            {/* Footer Links */}
            <div className="text-sm text-gray-500">
              <button
                onClick={() => window.location.hash = 'imprint'}
                className="text-blue-600 hover:text-blue-700 underline hover:no-underline transition-all"
              >
                Legal Information / Imprint
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}