import React from 'react';
import { Play, BookOpen, TrendingUp, Target, Users, MessageSquare, GitBranch, BarChart3, ArrowRight, CheckCircle, Award } from 'lucide-react';
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

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
              <Logo size="lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-3">Enhance Your Leadership Impact</h1>
              <p className="text-xl text-blue-100">
                Use proven frameworks to navigate complex leadership challenges
              </p>
            </div>
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

      {/* Progress & Analytics */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Progress Tracking */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 bg-gradient-to-r ${progressInfo.color} rounded-lg text-white`}>
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Development Progress</h3>
              <p className="text-gray-600 text-sm">Track your leadership growth</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">Current Level</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">{progressInfo.level}</span>
                <Award className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${progressInfo.color} h-full rounded-full transition-all duration-700`}
                style={{ width: `${progressInfo.progress}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{reflectionCount} reflections completed</span>
              <span>{Math.round(progressInfo.progress)}% to next level</span>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Your Insights</h3>
              <p className="text-gray-600 text-sm">Reflection analytics</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Total Reflections</span>
              <span className="text-2xl font-bold text-emerald-600">{reflectionCount}</span>
            </div>
            
            {reflectionCount > 0 ? (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm">
                  <strong>Keep it up!</strong> Regular reflection builds stronger leadership skills and better decision-making capabilities.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800 text-sm">
                  <strong>Ready to start?</strong> Your first reflection will help establish a baseline for your leadership development journey.
                </p>
              </div>
            )}
          </div>
        </div>
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