import React from 'react';
import { Plus, BookOpen, TrendingUp, Clock, Shield, Target, Users, MessageSquare, GitBranch, AlertTriangle, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { Logo } from './Logo';

interface DashboardProps {
  onStartNewReflection: () => void;
  onViewHistory: () => void;
  reflectionCount: number;
}

export function Dashboard({ onStartNewReflection, onViewHistory, reflectionCount }: DashboardProps) {
  const commonChallenges = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      text: "Giving difficult feedback without damaging relationships"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Resolving conflicts between team members"
    },
    {
      icon: <Target className="w-5 h-5" />,
      text: "Making complex decisions with multiple stakeholders"
    },
    {
      icon: <GitBranch className="w-5 h-5" />,
      text: "Managing expectations and aligning with leadership"
    }
  ];

  const solutionBenefits = [
    "Get clarity on complex situations in 5-10 minutes",
    "Use proven frameworks trusted by professional coaches",
    "Build confidence through structured thinking",
    "Track patterns and grow as a leader over time"
  ];

  return (
    <div className="space-y-12">
      {/* Problem & Solution */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Problem */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg">
              <HelpCircle className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900">The Challenge</h2>
          </div>
          <p className="text-amber-800 text-lg mb-4">
            Complex leadership situations can feel overwhelming.
          </p>
          <ul className="space-y-2 text-amber-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              Tough conversations feel daunting
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              Team tensions need careful handling
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              Important decisions require clarity
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              You want to handle situations better
            </li>
          </ul>
        </div>

        {/* Solution */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-blue-900">Reflect & Act</h2>
          </div>
          <p className="text-blue-800 text-lg mb-4">
            Transform challenges into clarity with proven frameworks.
          </p>
          <ul className="space-y-2 text-blue-700 mb-6">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              Get clarity in 5-10 minutes
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              Use professional coaching methods
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              Build confidence through structure
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              Track patterns and grow over time
            </li>
          </ul>
          
          <button
            onClick={onStartNewReflection}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Start Your First Reflection
          </button>
          <p className="text-blue-600 text-sm mt-3 text-center">
            5-10 minutes • Completely private • No signup required
          </p>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-amber-100 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              Leadership challenges shouldn't leave you stuck
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              As an engineering leader, you face complex interpersonal and strategic situations daily. 
              Without a structured approach, it's easy to:
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {commonChallenges.map((challenge, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="text-amber-600 mt-0.5">
                {challenge.icon}
              </div>
              <span className="text-slate-700">{challenge.text}</span>
            </div>
          ))}
        </div>

        <p className="text-slate-600 text-center">
          <strong>The result?</strong> Delayed decisions, awkward conversations, and missed opportunities for growth.
        </p>
      </div>

      {/* Solution */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-white bg-opacity-20 rounded-lg">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">
              Transform challenges into clarity with proven frameworks
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Professional coaches use structured frameworks to help leaders navigate complex situations. 
              Now you can access these same tools for private, focused reflection.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {solutionBenefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-300 mt-0.5 flex-shrink-0" />
              <span className="text-blue-100">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onStartNewReflection}
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg font-semibold shadow-lg hover:shadow-xl"
          >
            <Plus className="w-6 h-6" />
            Start Your First Reflection
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-200 text-sm mt-3">
            Takes 5-10 minutes • Completely private • No signup required
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2 text-center">
          From challenge to action in 3 simple steps
        </h2>
        <p className="text-slate-600 mb-8 text-center">
          Most reflections take 5-10 minutes and provide immediate clarity
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Identify Your Challenge</h3>
            <p className="text-slate-600 text-sm mb-3">
              Answer 2-3 quick questions to get the right framework for your specific situation
            </p>
            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full inline-block">
              ~30 seconds
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Reflect with Structure</h3>
            <p className="text-slate-600 text-sm mb-3">
              Work through proven questions with helpful tips and real examples
            </p>
            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full inline-block">
              5-10 minutes
            </div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Act with Confidence</h3>
            <p className="text-slate-600 text-sm mb-3">
              Get clear next steps and actionable insights you can apply immediately
            </p>
            <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1 rounded-full inline-block">
              Immediate results
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div 
          onClick={onViewHistory}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-teal-100 rounded-lg group-hover:bg-teal-200 transition-colors">
              <BookOpen className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">View Past Reflections</h3>
          </div>
          <p className="text-slate-600 mb-4">
            Review your leadership journey and identify patterns in your growth.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-teal-600">{reflectionCount}</span>
            <span className="text-sm text-slate-500">
              {reflectionCount === 0 ? 'No reflections yet' : 
               reflectionCount === 1 ? 'reflection completed' : 
               'reflections completed'}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Your Privacy Protected</h3>
          </div>
          <p className="text-slate-600 mb-4">
            All reflections stay on your device. No accounts, no tracking, no data sharing.
          </p>
          <div className="text-sm text-green-600 font-medium">
            ✓ 100% Local Storage ✓ Works Offline ✓ Export Anytime
          </div>
        </div>
      </div>
    </div>
  );
}