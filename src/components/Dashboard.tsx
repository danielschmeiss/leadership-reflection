import React from 'react';
import { Play, BookOpen, TrendingUp, Target, Users, MessageSquare, GitBranch, BarChart3, ArrowRight, CheckCircle, Award, HelpCircle, Zap, Lightbulb } from 'lucide-react';
import { Logo } from './Logo';
import content from '../data/content.json';

interface DashboardProps {
  onStartNewReflection: () => void;
  onStartCategoryReflection: (category: string) => void;
  onViewHistory: () => void;
  onViewFrameworksGuide: () => void;
  reflectionCount: number;
}

export function Dashboard({ onStartNewReflection, onStartCategoryReflection, onViewHistory, onViewFrameworksGuide, reflectionCount }: DashboardProps) {
  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'feedback': return <MessageSquare className="w-6 h-6" />;
      case 'conflict': return <Users className="w-6 h-6" />;
      case 'decision': return <Target className="w-6 h-6" />;
      case 'stakeholder': return <GitBranch className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  const getProgressLevel = (count: number) => {
    if (count >= 20) return { level: content.dashboard.progress.levels.expert, color: 'from-purple-500 to-indigo-600', progress: 100 };
    if (count >= 10) return { level: content.dashboard.progress.levels.advanced, color: 'from-blue-500 to-purple-600', progress: (count / 20) * 100 };
    if (count >= 5) return { level: content.dashboard.progress.levels.intermediate, color: 'from-emerald-500 to-blue-600', progress: (count / 10) * 100 };
    if (count >= 1) return { level: content.dashboard.progress.levels.developing, color: 'from-amber-500 to-emerald-600', progress: (count / 5) * 100 };
    return { level: content.dashboard.progress.levels.gettingStarted, color: 'from-gray-400 to-gray-500', progress: 0 };
  };

  const progressInfo = getProgressLevel(reflectionCount);

  const getNextLevel = (count: number) => {
    if (count >= 10) return content.dashboard.progress.levels.expert;
    if (count >= 5) return content.dashboard.progress.levels.advanced; 
    if (count >= 1) return content.dashboard.progress.levels.intermediate;
    return content.dashboard.progress.levels.developing;
  };

  return (
    <div className="w-full space-y-8">
      {/* Welcome Hero */}
      <div className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="relative z-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">{content.dashboard.hero.title}</h1>
            <p className="text-xl text-blue-100">
              {content.dashboard.hero.subtitle}
            </p>
          </div>
          
          <button
            onClick={onStartNewReflection}
            className="group flex items-center gap-4 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div className="p-2 bg-blue-600 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
              <Play className="w-6 h-6" />
            </div>
            {content.dashboard.hero.ctaText}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-4">
            <p className="text-sm text-blue-200">
              {content.dashboard.hero.privacyText}
            </p>
          </div>
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-white bg-opacity-5 rounded-full"></div>
        <div className="absolute bottom-8 right-16 w-16 h-16 bg-white bg-opacity-5 rounded-full"></div>
      </div>

      {/* Why Pause to Reflect */}
      <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why pause to reflect?</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Leaders often move fast, but quick decisions under pressure can amplify bias or strain relationships. 
            Reflection is a way to slow down just enough to think clearly and act intentionally.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Research in leadership and cognitive science shows that reflection helps you:</h3>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-red-500 rounded-lg text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-red-900">Regulate emotion</h4>
              </div>
              <p className="text-sm text-red-800 mb-3">
                Pausing reduces stress-driven or reactive decisions
              </p>
              <p className="text-xs text-red-600 italic">
                (Neuroscience of Emotional Regulation, Ochsner & Gross, 2005)
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-amber-500 rounded-lg text-white">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-amber-900">Reduce bias</h4>
              </div>
              <p className="text-sm text-amber-800 mb-3">
                Reflective thinking counteracts snap judgments
              </p>
              <p className="text-xs text-amber-600 italic">
                (Kahneman's "System 2" thinking)
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-emerald-500 rounded-lg text-white">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-emerald-900">Improve judgment</h4>
              </div>
              <p className="text-sm text-emerald-800 mb-3">
                Leaders who regularly reflect are rated as more effective and make sounder decisions
              </p>
              <p className="text-xs text-emerald-600 italic">
                (Center for Creative Leadership, 2019)
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-500 rounded-lg text-white">
                <Lightbulb className="w-6 h-6" />
              </div>
            </div>
            <p className="text-blue-900 font-medium mb-2">
              Even brief guided reflection—5–10 minutes—has been linked to better self-awareness and decision-making quality.
            </p>
            <p className="text-blue-800">
              This tool is designed to make that pause practical: <strong>short, private, and focused on helping you take your next step.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Frameworks Guide Section */}
      <div 
        onClick={onViewFrameworksGuide}
        className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white group-hover:from-indigo-600 group-hover:to-purple-700 transition-all">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{content.dashboard.frameworksGuide.title}</h3>
              <p className="text-gray-600">
                {content.dashboard.frameworksGuide.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700">
            <span className="font-medium">{content.dashboard.frameworksGuide.ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
      {/* Progress & Analytics - Consolidated */}
      <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 bg-gradient-to-r ${progressInfo.color} rounded-lg text-white`}>
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">{content.dashboard.progress.title}</h3>
            <p className="text-gray-600">{content.dashboard.progress.description}</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Current Level */}
          <div className="relative group text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="absolute top-3 right-3">
              <HelpCircle className="w-4 h-4 text-blue-400 cursor-help" />
              {/* Tooltip */}
              <div className="absolute right-0 top-6 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <h5 className="font-semibold text-gray-900 mb-2">{content.dashboard.progress.tooltips.level.title}</h5>
                <p className="text-sm text-gray-700 mb-2">
                  {content.dashboard.progress.tooltips.level.description}
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {content.dashboard.progress.tooltips.level.stages.map((stage, index) => (
                    <li key={index}>• {stage}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Award className="w-6 h-6 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{progressInfo.level}</span>
            </div>
            <p className="text-gray-700 font-medium mb-2">{content.dashboard.progress.labels.currentLevel}</p>
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${progressInfo.color} h-2 rounded-full transition-all duration-700`}
                style={{ width: `${progressInfo.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {progressInfo.progress === 100 
                ? content.dashboard.progress.labels.maxLevel
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
                <h5 className="font-semibold text-gray-900 mb-2">{content.dashboard.progress.tooltips.total.title}</h5>
                <p className="text-sm text-gray-700">
                  {content.dashboard.progress.tooltips.total.description}
                </p>
                <ul className="text-xs text-gray-600 space-y-1 mt-2">
                  {content.dashboard.progress.tooltips.total.benefits.map((benefit, index) => (
                    <li key={index}>• {benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
              <span className="text-2xl font-bold text-emerald-600">{reflectionCount}</span>
            </div>
            <p className="text-gray-700 font-medium">{content.dashboard.progress.labels.totalReflections}</p>
            <p className="text-sm text-gray-600 mt-2">{content.dashboard.progress.labels.keepBuilding}</p>
          </div>
          
          {/* Progress Indicator */}
          <div className="relative group text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="absolute top-3 right-3">
              <HelpCircle className="w-4 h-4 text-purple-400 cursor-help" />
              {/* Tooltip */}
              <div className="absolute right-0 top-6 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <h5 className="font-semibold text-gray-900 mb-2">{content.dashboard.progress.tooltips.momentum.title}</h5>
                <p className="text-sm text-gray-700 mb-2">
                  {content.dashboard.progress.tooltips.momentum.description}
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {content.dashboard.progress.tooltips.momentum.levels.map((level, index) => (
                    <li key={index}>• <strong>{level.split(':')[0]}:</strong> {level.split(':')[1]}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-600 mt-2">
                  {content.dashboard.progress.tooltips.momentum.note}
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
              {reflectionCount >= 5 ? content.dashboard.progress.labels.consistentPractice : reflectionCount >= 1 ? content.dashboard.progress.labels.developingRoutine : content.dashboard.progress.labels.firstSteps}
            </p>
          </div>
        </div>
        
        {/* Motivational Message */}
        {reflectionCount > 0 ? (
          <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800">
                <strong>Great momentum!</strong> {content.dashboard.progress.motivationalMessages.hasReflections}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-800">
                <strong>Ready to start?</strong> {content.dashboard.progress.motivationalMessages.noReflections}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* History Section */}
      <div 
        onClick={onViewHistory}
        className="w-full bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-slate-500 to-gray-600 rounded-lg text-white group-hover:from-slate-600 group-hover:to-gray-700 transition-all">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{content.dashboard.history.title}</h3>
              <p className="text-gray-600">
                {reflectionCount === 0 
                  ? content.dashboard.history.descriptions.empty
                  : content.dashboard.history.descriptions.withCount
                      .replace('{count}', reflectionCount.toString())
                      .replace('{plural}', reflectionCount === 1 ? '' : 's')
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-blue-600 group-hover:text-blue-700">
            <span className="font-medium">{content.dashboard.history.ctaText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
}