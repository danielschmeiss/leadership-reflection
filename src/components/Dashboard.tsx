import React from 'react';
import { Play, BookOpen, TrendingUp, Target, Users, MessageSquare, GitBranch, BarChart3, ArrowRight, CheckCircle, Award, HelpCircle } from 'lucide-react';
import { Logo } from './Logo';

interface DashboardProps {
  onStartNewReflection: () => void;
  onViewHistory: () => void;
  reflectionCount: number;
}

export function Dashboard({ onStartNewReflection, onViewHistory, reflectionCount }: DashboardProps) {
  const challengeTypes = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Feedback Conversations",
      description: "Structure effective feedback discussions",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Conflicts",
      description: "Navigate and resolve team tensions",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
      borderColor: "border-amber-200"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Strategic Decisions",
      description: "Make informed leadership choices",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200"
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Stakeholder Alignment",
      description: "Manage expectations and communication",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200"
    }
  ];

  const getProgressLevel = (count: number) => {
    if (count >= 20) return { level: 'Expert', color: 'from-purple-500 to-indigo-600', progress: 100 };
    if (count >= 10) return { level: 'Advanced', color: 'from-blue-500 to-purple-600', progress: (count / 20) * 100 };
    if (count >= 5) return { level: 'Intermediate', color: 'from-emerald-500 to-blue-600', progress: (count / 10) * 100 };
    if (count >= 1) return { level: 'Developing', color: 'from-amber-500 to-emerald-600', progress: (count / 5) * 100 };
    return { level: 'Getting Started', color: 'from-gray-400 to-gray-500', progress: 0 };
  };

  const progressInfo = getProgressLevel(reflectionCount);

  const getNextLevel = (count: number) => {
    if (count >= 10) return 'Expert';
    if (count >= 5) return 'Advanced'; 
    if (count >= 1) return 'Intermediate';
    return 'Developing';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">Enhance Your Leadership Impact</h1>
            <p className="text-xl text-blue-100">
              Use proven frameworks to navigate complex leadership challenges
            </p>
          </div>
          
          <button
            onClick={onStartNewReflection}
            className="group flex items-center gap-4 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
              <Play className="w-6 h-6" />
            </div>
            Start New Reflection
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-sm text-blue-200 mt-4">
            5-10 minutes • Completely private • Evidence-based frameworks
          </p>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute bottom-8 right-16 w-16 h-16 bg-white bg-opacity-5 rounded-full"></div>
      </div>

      {/* Challenge Types */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">What challenge are you facing?</h2>
          <p className="text-gray-600">Select the area where you need structured guidance</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {challengeTypes.map((challenge, index) => (
            <div
              key={index}
              className={`${challenge.bgColor} p-6 rounded-xl border ${challenge.borderColor} hover:shadow-md transition-all duration-200 cursor-pointer group`}
              onClick={onStartNewReflection}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-gradient-to-r ${challenge.color} rounded-lg text-white shadow-sm`}>
                  {challenge.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${challenge.textColor} mb-2 group-hover:text-gray-900 transition-colors`}>
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {challenge.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress & Analytics - Consolidated */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 bg-gradient-to-r ${progressInfo.color} rounded-lg text-white`}>
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">Your Leadership Journey</h3>
            <p className="text-gray-600">Track your progress and insights</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current Level */}
          <div className="relative group text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="absolute top-3 right-3">
              <HelpCircle className="w-4 h-4 text-blue-400 cursor-help" />
              {/* Tooltip */}
              <div className="absolute right-0 top-6 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <h5 className="font-semibold text-gray-900 mb-2">Leadership Level</h5>
                <p className="text-sm text-gray-700 mb-2">
                  Your current leadership development stage based on reflection count:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Getting Started: 0 reflections</li>
                  <li>• Developing: 1-4 reflections</li>
                  <li>• Intermediate: 5-9 reflections</li>
                  <li>• Advanced: 10-19 reflections</li>
                  <li>• Expert: 20+ reflections</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Award className="w-6 h-6 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{progressInfo.level}</span>
            </div>
            <p className="text-gray-700 font-medium mb-2">Leadership Level</p>
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${progressInfo.color} h-2 rounded-full transition-all duration-700`}
                style={{ width: `${progressInfo.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {progressInfo.progress === 100 
                ? 'Maximum level reached!' 
                : `${Math.round(progressInfo.progress)}% progress to ${getNextLevel(reflectionCount)}`
              }
            </p>
          </div>
          
          {/* Total Reflections */}
          <div className="relative group text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <div className="absolute top-3 right-3">
              <HelpCircle className="w-4 h-4 text-emerald-400 cursor-help" />
              {/* Tooltip */}
              <div className="absolute right-0 top-6 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <h5 className="font-semibold text-gray-900 mb-2">Total Reflections</h5>
                <p className="text-sm text-gray-700">
                  The number of leadership reflections you've completed. Each reflection helps you:
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mt-2">
                  <li>• Process challenging situations</li>
                  <li>• Identify patterns in your leadership</li>
                  <li>• Build decision-making skills</li>
                  <li>• Track your growth over time</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">{reflectionCount}</span>
            </div>
            <p className="text-gray-700 font-medium">Total Reflections</p>
            <p className="text-sm text-gray-600 mt-2">Keep building momentum</p>
          </div>
          
          {/* Progress Indicator */}
          <div className="relative group text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="absolute top-3 right-3">
              <HelpCircle className="w-4 h-4 text-purple-400 cursor-help" />
              {/* Tooltip */}
              <div className="absolute right-0 top-6 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <h5 className="font-semibold text-gray-900 mb-2">Growth Momentum</h5>
                <p className="text-sm text-gray-700 mb-2">
                  Your current reflection momentum and habit development:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• <strong>Ready to Begin:</strong> Starting your journey</li>
                  <li>• <strong>Building Habits:</strong> Developing routine</li>
                  <li>• <strong>Strong Momentum:</strong> Consistent practice</li>
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  Regular reflection accelerates leadership growth.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Target className="w-6 h-6 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">
                {reflectionCount >= 5 ? '🚀' : reflectionCount >= 1 ? '📈' : '🎯'}
              </span>
            </div>
            <p className="text-gray-700 font-medium">
              {reflectionCount >= 5 ? 'Strong Momentum' : reflectionCount >= 1 ? 'Building Habits' : 'Ready to Begin'}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {reflectionCount >= 5 ? 'Consistent practice' : reflectionCount >= 1 ? 'Developing routine' : 'First steps'}
            </p>
          </div>
        </div>
        
        {/* Motivational Message */}
        {reflectionCount > 0 ? (
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800">
                <strong>Excellent progress!</strong> Regular reflection builds stronger leadership skills and better decision-making capabilities. You're developing a valuable habit that will serve you throughout your career.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800">
                <strong>Ready to begin?</strong> Your first reflection will help establish a baseline for your leadership development journey. Each reflection builds on the last, creating a powerful foundation for growth.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* History Section */}
      <div 
        onClick={onViewHistory}
        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-slate-500 to-gray-600 rounded-lg text-white group-hover:from-slate-600 group-hover:to-gray-700 transition-all">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Reflection History</h3>
              <p className="text-gray-600">
                {reflectionCount === 0 
                  ? "No reflections yet - start your leadership journey above" 
                  : `Review your ${reflectionCount} completed reflection${reflectionCount === 1 ? '' : 's'}`
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700">
            <span className="font-medium">View All</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}