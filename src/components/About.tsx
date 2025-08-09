import React from 'react';
import { Heart, Shield, Users, Lightbulb, ExternalLink, Bot, Target } from './icons';

export function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section with Profile */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <img 
              src="https://media.licdn.com/dms/image/v2/C4D03AQHHCBLK7iw7QA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1594647229137?e=2147483647&v=beta&t=zHEQ_A_husPCc1L_jP57z0-AKiiLpQt3LlUx-n_Tykg" 
              alt="Daniel Schmeiß" 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 font-sora">
              About <span className="font-quicksand text-white">
                Refl<span className="font-normal">act</span>o
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Leadership reflection tools for the engineering community
            </p>
            <p className="text-blue-100 leading-relaxed">
              Created with ❤️ to give back to the engineering leadership community and 
              demonstrate the power of privacy-first AI integration.
            </p>
          </div>
        </div>
      </div>

      {/* Why I Built This */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-600 rounded-lg text-white">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-sora">Why I Built This</h2>
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            As an engineering leader, I've experienced firsthand how challenging it can be to navigate 
            complex people situations, team conflicts, and strategic decisions. The transition from 
            an individual contributor to a leadership role often feels like navigating uncharted waters, 
            where the challenges can seem overwhelming and the path forward unclear.
          </p>
          
          <p>
            I wanted to create something that would help other engineering leaders pause, reflect, 
            and act with intention rather than just reacting to situations. This tool combines 
            research-backed leadership frameworks with modern technology to provide structured 
            guidance when you need it most.
          </p>

          <p>
            But more than that, I believe in giving back to the community that has given me so much. 
            The engineering community thrives on open source, knowledge sharing, and helping each other grow. 
            Reflacto is my contribution to that spirit.
          </p>
        </div>
      </div>

      {/* Privacy-First AI Vision */}
      <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-sora">Privacy-First AI Integration</h2>
        </div>
        
        <div className="space-y-4 text-gray-700">
          <p>
            One of the most exciting aspects of this project is demonstrating how AI can enhance 
            our work while respecting privacy. Traditional AI services require sending your data 
            to external companies, but local LLMs change everything.
          </p>
          
          <p>
            With Reflacto, your sensitive leadership reflections never leave your device. You get 
            AI-powered insights for your challenges while maintaining complete control over your data. 
            This isn't just about privacy – it's about showing what's possible when we combine 
            powerful AI with thoughtful engineering.
          </p>

          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Technical Innovation</h4>
            <ul className="text-sm space-y-1 text-blue-800">
              <li>• Local LLM integration with OpenAI-compatible APIs</li>
              <li>• 100% client-side data processing and storage</li>
              <li>• Progressive web app architecture for offline capability</li>
              <li>• Modern React with TypeScript for maintainability</li>
            </ul>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">Current Limitations & Workarounds</h4>
            <div className="text-sm space-y-2 text-amber-800">
              <p className="font-medium">Browser Compatibility:</p>
              <ul className="space-y-1 ml-2">
                <li>• Local LLM integration currently only works in <strong>Google Chrome</strong></li>
                <li>• Other browsers block localhost API calls from HTTPS sites for security</li>
                <li>• This is a browser security feature, not a limitation of our app</li>
              </ul>
              <p className="font-medium mt-3">Universal Workaround:</p>
              <ul className="space-y-1 ml-2">
                <li>• Use the "Copy for AI Help" button to copy your reflection progress</li>
                <li>• Paste into any AI service (ChatGPT, Claude, local AI tools) for guidance</li>
                <li>• Works in any browser while maintaining workflow flexibility</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-600 rounded-lg text-white">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-sora">Core Values</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Privacy First</h4>
                <p className="text-sm text-gray-600">
                  Your leadership challenges and reflections are deeply personal. They belong to you, not to some external service.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Community Driven</h4>
                <p className="text-sm text-gray-600">
                  Built for the engineering community, by someone who understands the unique challenges we face.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Evidence-Based</h4>
                <p className="text-sm text-gray-600">
                  Every framework is grounded in research and proven effective in real leadership situations.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Bot className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">AI-Enhanced</h4>
                <p className="text-sm text-gray-600">
                  Demonstrating how local AI can augment human decision-making without compromising privacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-sora">Connect With Me</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I'd love to hear how Reflacto helps your leadership journey, discuss the technical implementation, 
            or explore opportunities to collaborate on privacy-first AI tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.linkedin.com/in/danielschmeiss/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Connect on LinkedIn
            </a>
            
            <div className="text-sm text-gray-500">
              Daniel Schmeiß • Engineering Leader • AI Enthusiast
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center py-6">
        <p className="text-gray-600 text-sm">
          Made with React, TypeScript, and a passion for helping engineering leaders grow.
        </p>
      </div>
    </div>
  );
}