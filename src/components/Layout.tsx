import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  helpText?: string;
}

export function Layout({ 
  children, 
  title, 
  showBack = false, 
  onBack, 
  actions, 
  helpText
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-6 py-6 max-w-5xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {showBack && (
                <button
                  onClick={onBack}
                  className="p-3 bg-white hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div className="flex items-center gap-4">
                <Logo size="md" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
                  <p className="text-gray-600 mt-1">Pause, reflect, and move forward with purpose.</p>
                  {helpText && (
                    <p className="text-sm text-gray-500 mt-2">{helpText}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Privacy badge */}
              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Private & Secure</span>
              </div>
              
              {actions}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="text-sm text-gray-500">
            <span>Professional Leadership Development Tool</span>
          </div>
        </footer>
      </div>
    </div>
  );
}