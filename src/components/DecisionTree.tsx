import React, { useState } from 'react';
import { ChevronRight, Target, Users, MessageSquare, GitBranch, Zap, ArrowLeft, CheckCircle, Lightbulb, User, UserCheck, Building2, ThumbsUp, AlertTriangle, BarChart3, TrendingUp, FileText, Shield, UserPlus, Heart, Compass } from 'lucide-react';
import { decisionTree, decisionTreeNodes } from '../data/frameworks';
import { DecisionTreeNode, FrameworkType, SituationCategory } from '../types';

interface DecisionTreeProps {
  onFrameworkSelected: (framework: FrameworkType, category: SituationCategory, subcategory: string) => void;
  preselectedCategory?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'feedback': return <MessageSquare className="w-6 h-6" />;
    case 'conflict': return <Users className="w-6 h-6" />;
    case 'decision': return <Target className="w-6 h-6" />;
    case 'stakeholder': return <GitBranch className="w-6 h-6" />;
    case 'team-dynamics': return <Users className="w-6 h-6" />;
    case 'other': return <Zap className="w-6 h-6" />;
    default: return <Target className="w-6 h-6" />;
  }
};

const getSpecificIcon = (framework: string, subcategory: string) => {
  // Conflict situations
  if (subcategory === 'with-team-member') return <User className="w-6 h-6" />;
  if (subcategory === 'between-team-members') return <Users className="w-6 h-6" />;
  if (subcategory === 'cross-team-conflict') return <Building2 className="w-6 h-6" />;
  
  // Feedback situations
  if (subcategory === 'positive') return <ThumbsUp className="w-6 h-6" />;
  if (subcategory === 'developmental') return <AlertTriangle className="w-6 h-6" />;
  if (subcategory === 'peer-to-peer-feedback-facilitation') return <UserCheck className="w-6 h-6" />;
  
  // Decision situations
  if (subcategory === 'operational') return <BarChart3 className="w-6 h-6" />;
  if (subcategory === 'strategic') return <TrendingUp className="w-6 h-6" />;
  if (subcategory === 'ownership-accountability-gaps') return <FileText className="w-6 h-6" />;
  
  // Stakeholder situations
  if (subcategory === 'expectation-management') return <Shield className="w-6 h-6" />;
  if (subcategory === 'alignment-with-leadership') return <Target className="w-6 h-6" />;
  
  // Team dynamics situations
  if (subcategory === 'ownership-clarity') return <UserPlus className="w-6 h-6" />;
  if (subcategory === 'team-health-check') return <Heart className="w-6 h-6" />;
  
  // Other situations
  if (subcategory === 'free-reflection') return <Compass className="w-6 h-6" />;
  
  // Fallback to category icon
  return getCategoryIcon('other');
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'feedback': return 'from-blue-500 to-blue-600';
    case 'conflict': return 'from-amber-500 to-orange-600';
    case 'decision': return 'from-purple-500 to-purple-600';
    case 'stakeholder': return 'from-emerald-500 to-emerald-600';
    case 'team-dynamics': return 'from-rose-500 to-pink-600';
    case 'other': return 'from-slate-500 to-gray-600';
    default: return 'from-blue-500 to-blue-600';
  }
};

const getFrameworkDescription = (framework: FrameworkType) => {
  switch (framework) {
    case 'sbi': return 'Structured feedback framework';
    case 'grow': return 'Goal-oriented coaching approach';
    case 'mediation': return 'Step-by-step conflict resolution';
    case 'decision-matrix': return 'Compare options with clear criteria';
    case 'interest-based-negotiation': return 'Find win-win solutions for teams';
    case 'feedforward-coaching': return 'Future-focused feedback approach';
    case 'responsibility-mapping': return 'Clarify who does what (RACI)';
    case 'alignment-canvas': return 'Leadership alignment framework';
    case 'delegation-empowerment': return 'Effective delegation approach';
    case 'five-dysfunctions': return 'Team health assessment';
    case 'pros-cons': return 'Weigh advantages vs disadvantages';
  }
};

const getCategoryBackgroundClass = (category: string) => {
  switch (category) {
    case 'feedback': return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150';
    case 'conflict': return 'bg-gradient-to-br from-amber-50 to-orange-100 border-amber-200 hover:from-amber-100 hover:to-orange-150';
    case 'decision': return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-150';
    case 'stakeholder': return 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:from-emerald-100 hover:to-emerald-150';
    case 'team-dynamics': return 'bg-gradient-to-br from-rose-50 to-pink-100 border-rose-200 hover:from-rose-100 hover:to-pink-150';
    case 'other': return 'bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200 hover:from-slate-100 hover:to-gray-150';
    default: return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150';
  }
};

export function DecisionTree({ onFrameworkSelected, preselectedCategory }: DecisionTreeProps) {
  const [currentNode, setCurrentNode] = useState<DecisionTreeNode>(decisionTree);
  const [path, setPath] = useState<string[]>([]);

  // If a category is preselected, navigate directly to it
  React.useEffect(() => {
    if (preselectedCategory && decisionTreeNodes[preselectedCategory]) {
      setCurrentNode(decisionTreeNodes[preselectedCategory]);
      setPath([decisionTree.question]);
    }
  }, [preselectedCategory]);

  const handleOptionSelect = (option: DecisionTreeNode['options'][0]) => {
    if (option.framework && option.category && option.subcategory) {
      onFrameworkSelected(option.framework, option.category, option.subcategory);
    } else if (option.next) {
      const nextNode = decisionTreeNodes[option.next];
      if (nextNode) {
        setCurrentNode(nextNode);
        setPath(prev => [...prev, currentNode.question]);
      }
    }
  };

  const goBack = () => {
    if (path.length > 0) {
      const newPath = [...path];
      newPath.pop();
      setPath(newPath);
      
      if (newPath.length === 0) {
        setCurrentNode(decisionTree);
      } else {
        setCurrentNode(decisionTree);
      }
    }
  };

  const isFirstLevel = path.length === 0;

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {/* Progress indicator */}
      <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-600">{path.length + 1}/2</div>
            <div className="text-xs text-gray-500">Steps</div>
            {path.length > 0 && (
              <button
                onClick={goBack}
                className="ml-4 flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-xs"
              >
                <ArrowLeft className="w-3 h-3" />
                Back
              </button>
            )}
          </div>
          <div className="text-xs text-gray-500">{Math.round(((path.length + 1) / 2) * 100)}% complete</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
          <div 
            className="bg-blue-400 rounded-full h-1.5 transition-all duration-500"
            style={{ width: `${((path.length + 1) / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
            {currentNode.question}
          </h2>
        </div>

        <div className={`${isFirstLevel ? 'grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6' : 'grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6'}`}>
          {currentNode.options.map((option, index) => (
            <div key={index} className={isFirstLevel ? '' : ''}>
              <button
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left rounded-xl hover:shadow-lg transition-all duration-200 group border-2 ${
                  isFirstLevel 
                    ? 'p-4 h-full flex flex-col hover:scale-105 transform' 
                    : 'p-4 h-full flex flex-col hover:scale-105 transform'
                } ${getCategoryBackgroundClass(option.category || option.next || '')}`}
              >
                <div className="flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-center mb-2">
                    {(option.category || option.next) && (
                      <div className="bg-white rounded-xl text-gray-700 shadow-sm flex-shrink-0 p-3">
                        <div className="w-6 h-6">
                          {isFirstLevel 
                            ? getCategoryIcon(option.category || option.next || '')
                            : getSpecificIcon(option.framework || '', option.subcategory || '')
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {(() => {
                        const parts = option.text.split(' - ');
                        if (parts.length === 2) {
                          return (
                            <>
                              <span>{parts[0]}</span>
                            </>
                          );
                        }
                        return <span>{option.text}</span>;
                      })()}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3 flex-1">
                      {(() => {
                        const parts = option.text.split(' - ');
                        if (parts.length === 2) {
                          return parts[1];
                        }
                        return option.framework ? getFrameworkDescription(option.framework) : '';
                      })()}
                    </p>
                    
                    {option.framework && (
                      <div className="mt-auto">
                        <div className="px-3 py-1.5 bg-white bg-opacity-80 text-gray-800 rounded-full text-xs font-medium inline-block shadow-sm">
                          Start Reflection
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced help section for first level */}
      {isFirstLevel && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-amber-900 mb-3 text-lg">Need help choosing?</h4>
              <p className="text-amber-800 mb-4">
                Consider the primary challenge you're facing right now. Here are some quick examples to guide you:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-70 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <strong className="text-blue-700">Feedback</strong>
                  </div>
                  <p className="text-sm text-amber-800">Performance conversations, recognition, or developmental discussions</p>
                </div>
                <div className="bg-white bg-opacity-70 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
                      <Users className="w-4 h-4" />
                    </div>
                    <strong className="text-amber-700">Conflict</strong>
                  </div>
                  <p className="text-sm text-amber-800">Team disagreements, interpersonal tensions, or disputes</p>
                </div>
                <div className="bg-white bg-opacity-70 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Target className="w-4 h-4" />
                    </div>
                    <strong className="text-purple-700">Decision</strong>
                  </div>
                  <p className="text-sm text-amber-800">Strategic choices, resource allocation, or process decisions</p>
                </div>
                <div className="bg-white bg-opacity-70 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white">
                      <GitBranch className="w-4 h-4" />
                    </div>
                    <strong className="text-emerald-700">Stakeholder</strong>
                  </div>
                  <p className="text-sm text-amber-800">Managing expectations, alignment, or communication</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 bg-opacity-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  💡 <strong>Pro tip:</strong> Choose the category that represents your biggest pain point right now. You can always come back for other challenges later!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simple help section for second level */}
      {!isFirstLevel && (
        <div className="bg-amber-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-amber-200">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-2.5 bg-amber-500 rounded-lg flex-shrink-0">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base">Choose your specific situation</h4>
              <p className="text-xs sm:text-sm text-amber-800 mb-3 sm:mb-4">
                Select the option that most closely matches your current challenge. Each will guide you through a proven framework.
              </p>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="bg-white bg-opacity-60 p-2 sm:p-3 rounded-lg">
                  <strong className="text-blue-700">Structured approach:</strong> Each option uses research-backed frameworks
                </div>
                <div className="bg-white bg-opacity-60 p-2 sm:p-3 rounded-lg">
                  <strong className="text-emerald-700">Quick results:</strong> Get actionable insights in 5-10 minutes
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}