import React, { useState } from 'react';
import { ChevronRight, Target, Users, MessageSquare, GitBranch, Zap, ArrowLeft, CheckCircle, Lightbulb } from 'lucide-react';
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
      <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
              {path.length + 1}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Step {path.length + 1} of 2</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                {isFirstLevel ? "Identify your challenge category" : "Select your specific situation"}
              </p>
            </div>
          </div>
          
          {path.length > 0 && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-all text-xs sm:text-sm self-start sm:self-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-500"
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
          <p className="text-sm sm:text-base text-gray-600">
            {isFirstLevel 
              ? "Choose the category that best describes your leadership challenge"
              : "Select the specific situation you need to address"
            }
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {currentNode.options.map((option, index) => (
            <div key={index}>
              <button
                onClick={() => handleOptionSelect(option)}
                className="w-full p-3 sm:p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    {(option.category || option.next) && (
                      <div className={`p-2 sm:p-2.5 bg-gradient-to-r ${getCategoryColor(option.category || option.next || '')} rounded-lg text-white shadow-sm flex-shrink-0`}>
                        <div className="w-4 h-4 sm:w-5 sm:h-5">
                          {getCategoryIcon(option.category || option.next || '')}
                        </div>
                      </div>
                    )}
                    <div className="text-left min-w-0 flex-1">
                      <span className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-900 block leading-tight">
                        {option.text}
                      </span>
                      {option.framework && (
                        <span className="text-xs text-gray-600 group-hover:text-blue-700 mt-0.5 sm:mt-1 block">
                          {getFrameworkDescription(option.framework)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {option.framework && (
                      <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium hidden sm:block">
                        Start Reflection
                      </div>
                    )}
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Help section for first level */}
      {isFirstLevel && (
        <div className="bg-amber-50 rounded-lg sm:rounded-xl p-4 sm:p-5 border border-amber-200">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2 sm:p-2.5 bg-amber-500 rounded-lg flex-shrink-0">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base">Need help choosing?</h4>
              <p className="text-xs sm:text-sm text-amber-800 mb-3 sm:mb-4">
                Consider the primary challenge you're facing. Here are some examples:
              </p>
              <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="bg-white bg-opacity-60 p-2 sm:p-3 rounded-lg">
                  <strong className="text-blue-700">Feedback:</strong> Performance conversations, recognition, or developmental discussions
                </div>
                <div className="bg-white bg-opacity-60 p-2 sm:p-3 rounded-lg">
                  <strong className="text-amber-700">Conflict:</strong> Team disagreements, interpersonal tensions, or disputes
                </div>
                <div className="bg-white bg-opacity-60 p-2 sm:p-3 rounded-lg">
                  <strong className="text-purple-700">Decision:</strong> Strategic choices, resource allocation, or process decisions
                </div>
                <div className="bg-white bg-opacity-60 p-2 sm:p-3 rounded-lg">
                  <strong className="text-emerald-700">Stakeholder:</strong> Managing expectations, alignment, or communication
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}