import React from 'react';
import { ArrowLeft, Shield, Download, HelpCircle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  helpText?: string;
}

export function Layout({ children, title, showBack = false, onBack, actions, helpText }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {showBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>
              )}
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {actions}
              <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg shadow-sm">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Data stays local</span>
              </div>
            </div>
          </div>
          
          {helpText && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">{helpText}</p>
              </div>
            </div>
          )}
          
          <div className="h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-orange-400 rounded-full"></div>
        </header>

        {/* Main Content */}
        <main className="space-y-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-500">
          <p>Leadership Reflection Tool • Privacy-focused • Data stored locally</p>
        </footer>
      </div>
    </div>
  );
}