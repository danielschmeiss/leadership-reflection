import React from 'react';
import { Shield, Database, Eye, Lock, ExternalLink, ArrowLeft, Bot } from './icons';

interface PrivacyProps {
  onBack?: () => void;
}

export function Privacy({ onBack }: PrivacyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Privacy-First Promise */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 mb-8 border border-emerald-200">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-emerald-600 rounded-lg text-white flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-emerald-900 mb-3">Privacy-First Promise</h2>
              <p className="text-emerald-800 text-lg leading-relaxed">
                Reflacto is built with privacy at its core. Your personal reflections and leadership insights remain 
                completely private and under your control at all times.
              </p>
            </div>
          </div>
        </div>

        {/* Data Storage */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your Reflection Data</h2>
              <p className="text-gray-600">How we handle your personal reflections and responses</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>100% Local Storage:</strong> All your personal reflections, framework responses, and insights 
                are stored exclusively on your device using browser localStorage. This means your data never leaves your computer.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>No Server Transmission:</strong> We do not upload, sync, or transmit any of your reflection 
                content to our servers or any third-party services.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>You Control Your Data:</strong> You can export your reflections as PDF files at any time, 
                delete specific reflections individually from your history page, or clear all data by clearing your browser's localStorage.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Offline Capable:</strong> The entire application works without an internet connection, 
                further ensuring your data stays private.
              </div>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-2 bg-amber-600 rounded-lg text-white">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Anonymous Usage Analytics</h2>
              <p className="text-gray-600">What anonymous data we collect to improve the service</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-700 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Anonymous Only:</strong> We use Vercel Analytics and SpeedInsights to understand how users 
                interact with the tool (page views, navigation patterns, performance metrics).
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>No Personal Identifiers:</strong> These services collect only anonymous usage data to help 
                us improve the user experience. No personal identifiers or reflection content is included.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <strong>Performance Insights:</strong> We monitor page load times and user experience metrics to 
                ensure the application performs well for all users.
              </div>
            </div>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-800 text-sm">
              For detailed information about how Vercel handles analytics data, please review{' '}
              <a 
                href="https://vercel.com/legal/privacy-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-amber-700 hover:text-amber-800 underline hover:no-underline transition-all inline-flex items-center gap-1"
              >
                Vercel's Privacy Policy
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-blue-50 rounded-2xl p-8 mb-8 border border-blue-200">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Your Data Rights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Access & Export</h3>
              <p className="text-blue-700 text-sm">
                You can export all your reflections as comprehensive PDF reports at any time using the export functionality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Data Deletion</h3>
              <p className="text-blue-700 text-sm">
                Delete individual reflections from your history page, or clear all data instantly using your browser's "Clear browsing data" feature and selecting localStorage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">No Tracking</h3>
              <p className="text-blue-700 text-sm">
                We do not use cookies for tracking, personalization, or advertising. Only essential functionality cookies are used.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Transparent Code</h3>
              <p className="text-blue-700 text-sm">
                Our commitment to privacy is built into the application architecture and can be verified through the code.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Privacy with Local LLMs */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-8 border border-purple-200">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-purple-600 rounded-lg text-white flex-shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-purple-900 mb-4">Maximum Privacy with Local AI</h2>
              <p className="text-purple-800 mb-4">
                For ultimate privacy when using AI assistance with your reflections, consider using local Large Language Models (LLMs) 
                that run entirely on your device. This ensures your personal leadership insights never leave your computer.
              </p>
              <p className="text-purple-700 text-sm mb-4 italic">
                Note: Local LLM integration is currently available on desktop computers only. Mobile device support is not yet available 
                due to hardware and software limitations.
              </p>
              <button
                onClick={() => window.location.pathname = '/local-llm-guide'}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Bot className="w-4 h-4" />
                Learn About Local LLM Integration
              </button>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about our privacy practices or how your data is handled, please don't hesitate to reach out.
          </p>
          <a
            href="mailto:reflacto-contact@proton.me"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium underline hover:no-underline transition-colors"
          >
            Contact us at reflacto-contact@proton.me
          </a>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8 text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>
    </div>
  );
}