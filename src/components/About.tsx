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
            <p className="text-blue-100 leading-relaxed mb-6">
              Created with ❤️ to give back to the engineering leadership community and 
              demonstrate the power of privacy-first AI integration.
            </p>
            
            <a
              href="https://www.linkedin.com/in/danielschmeiss/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm border border-white/20"
            >
              <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Connect on LinkedIn
            </a>
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

      {/* Technical Architecture */}
      <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-600 rounded-lg text-white">
            <Bot className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-sora">Technical Implementation</h2>
        </div>
        
        <div className="space-y-6 text-gray-700">
          <p>
            Reflacto uses modern web technologies to deliver a smooth user experience while ensuring 
            data privacy by processing everything locally, with optional AI integration.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                Component Architecture
              </h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li><strong>React + TypeScript:</strong> Type-safe component architecture</li>
                <li><strong>Context API:</strong> Global state for LLM configuration and connection status</li>
                <li><strong>Framework System:</strong> Dynamic question generation based on situation context</li>
                <li><strong>Responsive Design:</strong> Tailwind CSS with mobile-first approach</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Data Flow & Privacy
              </h4>
              <ul className="text-sm space-y-2 text-gray-700">
                <li><strong>Local Storage:</strong> All reflection data stored in browser localStorage</li>
                <li><strong>No Backend:</strong> Pure client-side application with no data transmission</li>
                <li><strong>Export Capability:</strong> PDF generation using jsPDF and html2canvas</li>
                <li><strong>Offline Ready:</strong> Progressive Web App architecture</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-4">Local LLM Integration Flow</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">1</div>
                <div>
                  <strong>Configuration & Connection Testing:</strong>
                  <p className="text-gray-600 mt-1">
                    User configures LM Studio endpoint (typically localhost:1234). The app tests connectivity 
                    with a simple API call to verify the local server is running and accessible.
                  </p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 block">
                    POST http://localhost:1234/v1/chat/completions
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">2</div>
                <div>
                  <strong>Context Building:</strong>
                  <p className="text-gray-600 mt-1">
                    When user requests AI assistance, the app builds comprehensive context including 
                    current question, previous responses, framework background, and specific guidance needs.
                  </p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 block">
                    const context = buildPromptContext(framework, responses, currentQuestion)
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">3</div>
                <div>
                  <strong>API Call with OpenAI Compatibility:</strong>
                  <p className="text-gray-600 mt-1">
                    Request sent to local LLM using OpenAI-compatible format. LM Studio translates 
                    this to the underlying model (Llama, Mistral, etc.) and returns structured response.
                  </p>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 block">
                    {`{ "model": "local-model", "messages": [...], "temperature": 0.7 }`}
                  </code>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">4</div>
                <div>
                  <strong>Response Integration:</strong>
                  <p className="text-gray-600 mt-1">
                    AI suggestions integrated into the reflection interface without interrupting the user's 
                    workflow. All processing happens locally with no data leaving the device.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">Technical Considerations</h4>
            <ul className="text-sm space-y-1 text-amber-800">
              <li>• <strong>CORS Policy:</strong> Chrome allows localhost API calls from HTTPS origins</li>
              <li>• <strong>Error Handling:</strong> Graceful degradation when LLM is unavailable</li>
              <li>• <strong>Performance:</strong> Async operations prevent UI blocking during API calls</li>
              <li>• <strong>Security:</strong> No API keys required, all communication stays local</li>
              <li>• <strong>Flexibility:</strong> Copy prompt feature works with any AI service as fallback</li>
            </ul>
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
          Made with React, Claude Code, and a passion for helping engineering leaders grow.
        </p>
      </div>
    </div>
  );
}