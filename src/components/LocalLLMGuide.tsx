import React from 'react';
import { Bot, Shield, Zap, AlertTriangle, CheckCircle, ExternalLink, HelpCircle, ArrowRight, Activity } from './icons';

export function LocalLLMGuide() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white bg-opacity-20 rounded-xl">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold ">What Are Local LLMs?</h1>
            <p className="text-xl text-blue-100 mt-2">
              AI assistance that runs on your own computer, not in the cloud
            </p>
            <div className="mt-4 p-3 bg-amber-500 bg-opacity-20 rounded-lg border border-amber-400 border-opacity-30">
              <p className="text-amber-100 text-sm">
                <strong>Desktop Only:</strong> Local LLMs currently work on desktop computers only. Mobile device support is not yet available due to hardware and software limitations.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-6 bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-semibold mb-3 text-lg text-gray-900">Think of it like this:</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Instead of sending your leadership challenges to ChatGPT or Claude (which means your data goes to their servers), 
            a <strong>local LLM</strong> is like having your own private AI assistant that lives on your computer. 
          </p>
          <p className="text-gray-700 leading-relaxed">
            It's the same type of AI that powers ChatGPT, but it runs entirely on your machine. Your sensitive workplace 
            situations, team conflicts, and leadership decisions never leave your computer.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Shield className="w-6 h-6 mb-2 text-green-600" />
            <h3 className="font-semibold mb-1 text-gray-900">Completely Private</h3>
            <p className="text-sm text-gray-600">Your workplace situations stay on your computer</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Zap className="w-6 h-6 mb-2 text-amber-600" />
            <h3 className="font-semibold mb-1 text-gray-900">No Internet Required</h3>
            <p className="text-sm text-gray-600">Works even when you're offline</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <CheckCircle className="w-6 h-6 mb-2 text-blue-600" />
            <h3 className="font-semibold mb-1 text-gray-900">No Usage Limits</h3>
            <p className="text-sm text-gray-600">Ask as many questions as you want</p>
          </div>
        </div>
      </div>

      {/* Why Local LLMs */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 ">Why Use Local LLMs?</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 ">Privacy & Security</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Your leadership reflections remain completely private</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>No data sent to external AI services or cloud providers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Perfect for sensitive workplace situations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Complies with strict corporate data policies</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 ">Performance & Control</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Instant responses with no network delays</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>No usage limits or API costs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Works completely offline</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Full control over AI model and parameters</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Chrome Requirement */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-amber-500 rounded-lg text-white flex-shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-amber-900 mb-3 ">Google Chrome Required</h2>
            <p className="text-amber-800 mb-4">
              Local LLM integration currently only works in <strong>Google Chrome</strong> due to browser security policies 
              regarding localhost API calls from web applications.
            </p>
            
            <div className="bg-white rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Technical Explanation:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Chrome allows HTTP requests to localhost from HTTPS sites</li>
                <li>• Other browsers block mixed content (HTTPS → HTTP localhost)</li>
                <li>• Chrome's policy enables local development and AI integration</li>
                <li>• This is a browser security feature, not a limitation of our app</li>
              </ul>
            </div>
            
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">
                <strong>Firefox, Safari, and Edge</strong> will block localhost connections for security reasons
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-600 rounded-lg text-white">
            <Activity className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 ">How It Works</h2>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Run LM Studio</h3>
              <p className="text-gray-700 mb-2">
                Install and run <strong>LM Studio</strong> on your machine. It provides an easy-to-use interface 
                with OpenAI-compatible API endpoints.
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <code className="text-sm text-gray-800">
                  # LM Studio runs a local server at:<br/>
                  # Default endpoint: http://localhost:1234<br/>
                  # Enable CORS in server settings for web access
                </code>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Configure Connection</h3>
              <p className="text-gray-700">
                Use the AI assistant button in Reflacto to configure your local LLM endpoint. 
                The app will test the connection and verify it's working properly.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Enhanced Reflections</h3>
              <p className="text-gray-700">
                Get AI-powered suggestions and insights during your leadership reflections, 
                all processed locally on your machine with complete privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Support: LM Studio */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-600 rounded-lg text-white">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Supported Local LLM Tool</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* LM Studio - Supported */}
          <div className="border-2 border-green-300 bg-green-50 rounded-lg p-6 hover:shadow-md transition-shadow relative">
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-200 rounded-full">
                ✅ Fully Supported
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">LM Studio</h3>
            <p className="text-gray-700 text-sm mb-4">
              User-friendly GUI for running local LLMs with built-in model browser. 
              Fully integrated and tested with Reflacto.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty:</span>
                <span className="text-green-600 font-medium">Easy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Default Port:</span>
                <span className="font-mono">1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Ready to Use</span>
              </div>
            </div>
            <a 
              href="https://lmstudio.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span className="text-sm font-medium">Download LM Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          {/* Ollama - Coming Soon */}
          <div className="border border-gray-200 rounded-lg p-6 opacity-60 relative">
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                🚧 Coming Soon
              </span>
            </div>
            <h3 className="font-semibold text-gray-500 mb-2">Ollama</h3>
            <p className="text-gray-500 text-sm mb-4">
              Easy-to-use local LLM runner with simple setup. Integration coming soon.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Difficulty:</span>
                <span className="text-gray-400 font-medium">Easy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Default Port:</span>
                <span className="font-mono text-gray-400">11434</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-amber-600 font-medium">In Development</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded">
              <p className="text-xs text-gray-600">
                <strong>Coming Soon:</strong> Ollama integration is being tested and will be available in a future update.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-600 rounded-lg text-white">
            <ArrowRight className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 ">Ready to Get Started?</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-green-800">
            Follow these steps to set up LM Studio with Reflacto for private AI assistance:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">1. Install Chrome</h4>
              <p className="text-sm text-green-800">
                Make sure you're using Google Chrome browser for localhost compatibility.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">2. Download LM Studio</h4>
              <p className="text-sm text-green-800">
                Get LM Studio from lmstudio.ai and install it on your computer.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">3. Setup LM Studio Server</h4>
              <p className="text-sm text-green-800">
                Download a model, go to "Local Server" tab, start server, and enable CORS.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">4. Connect in Reflacto</h4>
              <p className="text-sm text-green-800">
                Click the AI button and use "Connect to LM Studio" for instant setup.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center py-6">
        <p className="text-gray-600 text-sm">
          Questions about local LLM setup? The configuration dialog in Reflacto provides step-by-step guidance 
          and connection testing to help you get started.
        </p>
      </div>
    </div>
  );
}