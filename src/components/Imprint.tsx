import React from 'react';
import { Mail, Building, User } from 'lucide-react';

export function Imprint() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Imprint Content */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="space-y-8">
          {/* Service Provider */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Provider</h3>
              <p className="text-lg font-medium text-gray-800">Reflect & Act</p>
            </div>
          </div>

          {/* Representative */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Represented by</h3>
              <p className="text-lg text-gray-800">Daniel Schmeiß</p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">E-Mail:</span>
                  <a 
                    href="mailto:zoomen.zweimal.7f@icloud.com" 
                    className="text-blue-600 hover:text-blue-700 underline hover:no-underline transition-all"
                  >
                    zoomen.zweimal.7f@icloud.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">About This Service</h4>
            <p className="text-blue-800 text-sm">
              Reflect & Act is a privacy-focused leadership reflection tool designed to help engineering leaders 
              navigate situational challenges through structured frameworks. All data is stored locally on your 
              device and no personal information is collected or transmitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}