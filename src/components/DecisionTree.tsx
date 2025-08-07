import React, { useState } from 'react';
import { 
  Target, Users, MessageSquare, GitBranch, Zap, ArrowLeft, ArrowRight, 
  CheckCircle, User, UserCheck, Building2, ThumbsUp, AlertTriangle, BarChart3, 
  TrendingUp, FileText, Shield, UserPlus, Heart, Compass, MessageCircle, UserX, 
  Handshake, ClipboardCheck, Megaphone, Settings 
} from './icons';
import { decisionTree, decisionTreeNodes } from '../data/frameworks';
import { DecisionTreeNode, FrameworkType, SituationCategory } from '../types';
import content from '../data/content.json';

interface DecisionTreeProps {
  onFrameworkSelected: (framework: FrameworkType, category: SituationCategory, subcategory: string) => void;
  onNavigationChange?: (category?: string) => void;
  preselectedCategory?: string;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'feedback': return <MessageCircle className="w-6 h-6" />;
    case 'conflict': return <UserX className="w-6 h-6" />;
    case 'decision': return <ClipboardCheck className="w-6 h-6" />;
    case 'stakeholder': return <Megaphone className="w-6 h-6" />;
    case 'team-dynamics': return <Handshake className="w-6 h-6" />;
    case 'other': return <Settings className="w-6 h-6" />;
    default: return <ClipboardCheck className="w-6 h-6" />;
  }
};

const getSpecificIcon = (framework: string, subcategory: string) => {
  // Conflict situations
  if (subcategory === 'with-team-member') return <User className="w-6 h-6" />;
  if (subcategory === 'between-team-members') return <Users className="w-6 h-6" />;
  if (subcategory === 'cross-team-conflict') return <Building2 className="w-6 h-6" />;
  
  // Feedback situations
  if (subcategory === 'positive') return <ThumbsUp className="w-6 h-6" />;
  if (subcategory === 'developmental') return <TrendingUp className="w-6 h-6" />;
  if (subcategory === 'peer-to-peer-feedback-facilitation') return <MessageCircle className="w-6 h-6" />;
  
  // Decision situations
  if (subcategory === 'operational') return <Settings className="w-6 h-6" />;
  if (subcategory === 'strategic') return <Target className="w-6 h-6" />;
  if (subcategory === 'ownership-accountability-gaps') return <UserCheck className="w-6 h-6" />;
  
  // Stakeholder situations
  if (subcategory === 'expectation-management') return <Shield className="w-6 h-6" />;
  if (subcategory === 'alignment-with-leadership') return <Compass className="w-6 h-6" />;
  
  // Team dynamics situations
  if (subcategory === 'ownership-clarity') return <UserCheck className="w-6 h-6" />;
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
    case 'mediation': return 'Resolve interpersonal tensions and misunderstandings';
    case 'decision-matrix': return 'Compare options with clear criteria';
    case 'interest-based-negotiation': return 'Navigate conflicts involving multiple teams';
    case 'feedforward-coaching': return 'Future-focused feedback approach';
    case 'responsibility-mapping': return 'Clarify who does what (RACI)';
    case 'alignment-canvas': return 'Leadership alignment framework';
    case 'delegation-empowerment': return 'Effective delegation approach';
    case 'five-dysfunctions': return 'Team health assessment';
    case 'pros-cons': return 'Weigh advantages vs disadvantages';
    case 'raci': return 'Stakeholder expectation framework';
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

export function DecisionTree({ onFrameworkSelected, onNavigationChange, preselectedCategory }: DecisionTreeProps) {
  const [currentNode, setCurrentNode] = useState<DecisionTreeNode>(decisionTree);
  const [path, setPath] = useState<string[]>([]);
  const [showQuickQuiz, setShowQuickQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if user is first-time visitor
  React.useEffect(() => {
    const isFirstTime = !localStorage.getItem('has_visited_decision_tree');
    if (isFirstTime && !preselectedCategory) {
      setShowOnboarding(true);
      localStorage.setItem('has_visited_decision_tree', 'true');
    }
  }, [preselectedCategory]);

  // Handle preselected category changes
  React.useEffect(() => {
    if (preselectedCategory && decisionTreeNodes[preselectedCategory]) {
      // Navigate to specific category
      setCurrentNode(decisionTreeNodes[preselectedCategory]);
      setPath([decisionTree.question]);
    } else if (!preselectedCategory) {
      // Reset to main decision tree when no category is preselected
      setCurrentNode(decisionTree);
      setPath([]);
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
        
        // Update URL to reflect navigation to category-specific page
        if (onNavigationChange && option.next) {
          onNavigationChange(option.next);
        }
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
        // Back to main decision tree, clear category from URL
        if (onNavigationChange) {
          onNavigationChange();
        }
      } else {
        setCurrentNode(decisionTree);
      }
    }
  };

  const isFirstLevel = path.length === 0;

  // Quick quiz logic
  const quickQuizQuestions = [
    {
      question: "What's the main challenge you're facing?",
      options: [
        { text: "Someone's behavior needs to change", value: "behavior" },
        { text: "People aren't getting along", value: "interpersonal" },
        { text: "I need to make a choice", value: "choice" },
        { text: "Communication isn't working", value: "communication" }
      ]
    },
    {
      question: "Who is primarily involved?",
      options: [
        { text: "Just me and one person", value: "one-on-one" },
        { text: "Multiple team members", value: "team" },
        { text: "Different teams or departments", value: "cross-team" },
        { text: "Leadership or stakeholders", value: "stakeholders" }
      ]
    }
  ];

  const getRecommendedCategory = (answers: string[]) => {
    const [challenge, who] = answers;
    
    if (challenge === "behavior" && who === "one-on-one") return "feedback";
    if (challenge === "interpersonal") return "conflict";
    if (challenge === "choice") return "decision";
    if (challenge === "communication" && who === "stakeholders") return "stakeholder";
    if (who === "team" || who === "cross-team") return "team-dynamics";
    
    // Default fallback
    return "feedback";
  };

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    
    if (quizStep === quickQuizQuestions.length - 1) {
      // Quiz complete, recommend category
      const recommendedCategory = getRecommendedCategory(newAnswers);
      const nextNode = decisionTreeNodes[recommendedCategory];
      if (nextNode) {
        setCurrentNode(nextNode);
        setPath([currentNode.question]);
        setShowQuickQuiz(false);
        setQuizStep(0);
        setQuizAnswers([]);
      }
    } else {
      setQuizStep(quizStep + 1);
    }
  };

  const resetQuiz = () => {
    setShowQuickQuiz(false);
    setQuizStep(0);
    setQuizAnswers([]);
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6">
      {/* First-time user onboarding modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white mb-4">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 font-sora">Welcome to Leadership Reflection</h2>
              <p className="text-gray-600 leading-relaxed">
                This tool helps you tackle tough leadership challenges in just 5-10 minutes using proven frameworks.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Pick your challenge type</h4>
                    <p className="text-sm text-blue-800">Choose from feedback, conflicts, decisions, and more</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-1">Answer guided questions</h4>
                    <p className="text-sm text-emerald-800">Follow a proven framework with helpful examples</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-1">Get actionable insights</h4>
                    <p className="text-sm text-purple-800">Receive specific next steps and save as PDF</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowOnboarding(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Get Started
              </button>
              <button
                onClick={() => {
                  setShowOnboarding(false);
                  setShowQuickQuiz(true);
                }}
                className="w-full text-blue-600 px-6 py-2 rounded-xl font-medium hover:bg-blue-50 transition-all duration-200"
              >
                Take Quick Quiz Instead
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>100% private - stored locally on your device</span>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Quick Quiz Modal */}
      {showQuickQuiz && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 font-sora">Quick Quiz</h3>
              <button
                onClick={resetQuiz}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                style={{ width: `${((quizStep + 1) / quickQuizQuestions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Question {quizStep + 1} of {quickQuizQuestions.length}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 font-sora">
              {quickQuizQuestions[quizStep].question}
            </h4>
            <div className="space-y-3">
              {quickQuizQuestions[quizStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(option.value)}
                  className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-blue-600"></div>
                    <span className="font-medium text-gray-900">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="text-gray-600 hover:text-gray-800 font-medium text-sm"
            >
              I'll choose manually instead
            </button>
          </div>
        </div>
      )}

      {/* Question */}
      {!showQuickQuiz && (
        <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight font-sora">
            {currentNode.question}
          </h2>
        </div>

        <div className={`${isFirstLevel ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'}`}>
          {currentNode.options.map((option, index) => (
            <div key={index} className={isFirstLevel ? '' : ''}>
              <button
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left rounded-xl hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-200 group border-2 ${
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
                        if (parts.length >= 2) {
                          return <span>{parts[0]}</span>;
                        }
                        return <span>{option.text}</span>;
                      })()}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3 flex-1">
                      {(() => {
                        const parts = option.text.split(' - ');
                        if (parts.length >= 2) {
                          return parts.slice(1).join(' - ');
                        }
                        return option.framework ? getFrameworkDescription(option.framework) : '';
                      })()}
                    </p>
                    
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
        
        {/* Back to categories button - Below options grid */}
        {!isFirstLevel && path.length > 0 && (
          <div className="flex justify-center pt-6">
            <button
              onClick={goBack}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm hover:bg-blue-50 px-4 py-2 rounded-lg transition-all border border-blue-200 hover:border-blue-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to categories
            </button>
          </div>
        )}
      </div>
      )}

      {/* Smart Quiz Option - Only show on first level */}
      {isFirstLevel && !showQuickQuiz && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl text-white mb-3">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-blue-900 mb-2 font-sora">Not sure which category fits?</h3>
              <p className="text-blue-700 text-sm mb-4">Answer 2 quick questions and we'll recommend the best approach</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <button
                onClick={() => setShowQuickQuiz(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Take 30-Second Quiz
              </button>
              <button
                onClick={() => setShowOnboarding(true)}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm underline hover:no-underline transition-colors"
              >
                or see how this works
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Category-specific help section for second level */}
      {!isFirstLevel && (
        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-gray-200">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-2.5 bg-gray-500 rounded-lg flex-shrink-0">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              {(() => {
                const categoryHelp = content.decisionTree.help.secondLevel[currentNode.id as keyof typeof content.decisionTree.help.secondLevel];
                return categoryHelp ? (
                  <>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{categoryHelp.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 whitespace-pre-line">
                      {categoryHelp.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                      {categoryHelp.benefits.map((benefit, index) => {
                        const getHelpIcon = (categoryId: string, index: number) => {
                          switch(categoryId) {
                            case 'conflict':
                              switch(index) {
                                case 0: return <User className="w-5 h-5 text-gray-500" />;
                                case 1: return <Users className="w-5 h-5 text-gray-500" />;
                                case 2: return <Building2 className="w-5 h-5 text-gray-500" />;
                                default: return null;
                              }
                            case 'feedback':
                              switch(index) {
                                case 0: return <ThumbsUp className="w-5 h-5 text-gray-500" />;
                                case 1: return <TrendingUp className="w-5 h-5 text-gray-500" />;
                                case 2: return <MessageCircle className="w-5 h-5 text-gray-500" />;
                                default: return null;
                              }
                            case 'decision':
                              switch(index) {
                                case 0: return <Settings className="w-5 h-5 text-gray-500" />;
                                case 1: return <Target className="w-5 h-5 text-gray-500" />;
                                case 2: return <UserCheck className="w-5 h-5 text-gray-500" />;
                                default: return null;
                              }
                            case 'stakeholder':
                              switch(index) {
                                case 0: return <Shield className="w-5 h-5 text-gray-500" />;
                                case 1: return <Compass className="w-5 h-5 text-gray-500" />;
                                default: return null;
                              }
                            case 'team-dynamics':
                              switch(index) {
                                case 0: return <UserCheck className="w-5 h-5 text-gray-500" />;
                                case 1: return <Heart className="w-5 h-5 text-gray-500" />;
                                default: return null;
                              }
                            default: return null;
                          }
                        };
                        
                        return (
                          <div key={index} className="bg-white bg-opacity-60 p-2 sm:p-3 rounded-lg">
                            <div className="flex items-start gap-2">
                              <div className="flex-shrink-0 mt-0.5">
                                {getHelpIcon(currentNode.id, index)}
                              </div>
                              <div>
                                <strong className="text-gray-800">{benefit.title}:</strong> <span className="text-gray-600">{benefit.description}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}