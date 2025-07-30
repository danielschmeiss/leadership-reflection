import React from 'react';
import { Plus, BookOpen, TrendingUp, Clock, Shield, Target, Users, MessageSquare, GitBranch, HelpCircle } from 'lucide-react';

interface DashboardProps {
  onStartNewReflection: () => void;
  onViewHistory: () => void;
  reflectionCount: number;
}

export function Dashboard({ onStartNewReflection, onViewHistory, reflectionCount }: DashboardProps) {
  const frameworks = [
    {
      name: 'SBI Framework',
      icon: <MessageSquare className="w-6 h-6" />,
      description: 'Situation-Behavior-Impact for effective feedback',
      useCase: 'Perfect for giving constructive or positive feedback',
      color: 'blue'
    },
    {
      name: 'GROW Model',
      icon: <Target className="w-6 h-6" />,
      description: 'Goal-Reality-Options-Way forward coaching',
      useCase: 'Ideal for coaching conversations and problem-solving',
      color: 'green'
    },
    {
      name: 'Conflict Mediation',
      icon: <Users className="w-6 h-6" />,
      description: 'Structured approach to resolve conflicts',
      useCase: 'Best for resolving team or stakeholder conflicts',
      color: 'orange'
    },
    {
      name: 'Decision Matrix',
      icon: <GitBranch className="w-6 h-6" />,
      description: 'Systematic evaluation of multiple options',
      useCase: 'Great for complex decisions with multiple factors',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-200' },
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200' }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Leadership Reflection Tool
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Navigate leadership challenges with structured frameworks and private reflection. 
          Start your reflection in under 30 seconds.
        </p>
        
        <button
          onClick={onStartNewReflection}
          className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          <Plus className="w-6 h-6" />
          Start New Reflection
        </button>
      </div>

      {/* Available Frameworks */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-semibold text-slate-900 mb-6">Available Frameworks</h2>
        <p className="text-slate-600 mb-6">
          Our decision tree will guide you to the right framework, but here's what's available:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {frameworks.map((framework, index) => {
            const colors = getColorClasses(framework.color);
            return (
              <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`p-2 ${colors.bg} rounded-lg ${colors.hover} transition-colors`}>
                    <div className={colors.text}>
                      {framework.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">{framework.name}</h3>
                    <p className="text-slate-600 text-sm mb-2">{framework.description}</p>
                    <p className="text-slate-500 text-xs">{framework.useCase}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <div 
          onClick={onViewHistory}
          className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Reflection History</h2>
          </div>
          <p className="text-slate-600 mb-4">
            Review and learn from your past reflections. Build on your leadership journey.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-teal-600">{reflectionCount}</span>
            <span className="text-sm text-slate-500">Total reflections</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">Growth Insights</h2>
          </div>
          <p className="text-slate-600 mb-4">
            Track patterns in your leadership challenges and see your development over time.
          </p>
          <span className="text-sm text-slate-500">Coming soon</span>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-xl border border-blue-200">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">How it works</h2>
        <p className="text-slate-600 mb-6">
          Get from challenge to clarity in three simple steps. Most reflections take 5-10 minutes.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Identify Your Challenge</h3>
            <p className="text-slate-600 text-sm mb-3">
              Answer 2-3 quick questions to classify your situation and get the right framework
            </p>
            <p className="text-slate-500 text-xs">
              Takes ~30 seconds
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Reflect with Framework</h3>
            <p className="text-slate-600 text-sm mb-3">
              Work through structured questions with helpful tips and examples
            </p>
            <p className="text-slate-500 text-xs">
              Takes 5-10 minutes
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Learn & Apply</h3>
            <p className="text-slate-600 text-sm mb-3">
              Review your insights, export for reference, and apply learnings
            </p>
            <p className="text-slate-500 text-xs">
              Immediate actionable results
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-white bg-opacity-60 rounded-lg">
          <h4 className="font-medium text-slate-900 mb-2">Why use structured frameworks?</h4>
          <p className="text-slate-700 text-sm">
            Research shows that structured reflection leads to better outcomes than unguided thinking. 
            These frameworks are used by professional coaches and are proven to help leaders navigate 
            complex situations more effectively.
          </p>
        </div>
      </div>

      {/* Privacy Assurance */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
        <div className="p-3 bg-green-100 rounded-lg">
          <Shield className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-900 mb-1">Your Privacy is Protected</h3>
          <p className="text-slate-600 text-sm">
            All reflections are stored locally on your device. Optional AI assistance uses anonymized data only.
          </p>
        </div>
      </div>
    </div>
  );
}