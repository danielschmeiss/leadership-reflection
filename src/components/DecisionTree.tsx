import React, { useState } from 'react';
import { ChevronRight, Target, Users, MessageSquare, GitBranch, HelpCircle, Info, Lightbulb, Zap } from 'lucide-react';
import { decisionTree, decisionTreeNodes } from '../data/frameworks';
import { DecisionTreeNode, FrameworkType, SituationCategory } from '../types';

interface DecisionTreeProps {
  onFrameworkSelected: (framework: FrameworkType, category: SituationCategory, subcategory: string) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'feedback': return <MessageSquare className="w-5 h-5" />;
    case 'conflict': return <Users className="w-5 h-5" />;
    case 'decision': return <Target className="w-5 h-5" />;
    case 'stakeholder': return <GitBranch className="w-5 h-5" />;
    case 'team-dynamics': return <Users className="w-5 h-5" />;
    case 'other': return <Zap className="w-5 h-5" />;
    default: return <HelpCircle className="w-5 h-5" />;
  }
};

const getFrameworkDescription = (framework: FrameworkType) => {
  switch (framework) {
    case 'sbi': return 'Perfect for giving specific, actionable feedback by focusing on observable behaviors and their impact.';
    case 'grow': return 'Ideal for coaching conversations and helping others find their own solutions through guided questions.';
    case 'mediation': return 'Structured approach to resolve conflicts by understanding all parties\' interests and finding win-win solutions.';
    case 'decision-matrix': return 'Systematic evaluation of options against key criteria to make well-informed decisions.';
    case 'interest-based-negotiation': return 'Framework for resolving cross-team conflicts by focusing on underlying interests rather than positions.';
    case 'feedforward-coaching': return 'Future-focused approach to peer feedback that emphasizes constructive suggestions for improvement.';
    case 'responsibility-mapping': return 'Clear framework for defining roles and responsibilities using RACI methodology.';
    case 'alignment-canvas': return 'Structured approach for preparing and conducting alignment conversations with leadership.';
    case 'delegation-empowerment': return 'Framework for effectively delegating tasks and empowering team members to take ownership.';
    case 'five-dysfunctions': return 'Comprehensive assessment tool for identifying and addressing team health issues.';
    default: return '';
  }
};

const getExampleScenarios = (category: string) => {
  switch (category) {
    case 'feedback':
      return [
        'A team member consistently misses deadlines',
        'Someone did excellent work on a challenging project',
        'Need to address communication issues in meetings',
        'Facilitating feedback between two team members'
      ];
    case 'conflict':
      return [
        'Two team members disagree on technical approach',
        'Tension between frontend and backend teams',
        'Cross-team conflict over API design decisions'
      ];
    case 'decision':
      return [
        'Choosing between multiple technical solutions',
        'Strategic decision about technology stack',
        'Unclear ownership causing project delays'
      ];
    case 'stakeholder':
      return [
        'Managing expectations with product managers',
        'Getting leadership buy-in for technical debt work',
        'Aligning on quarterly priorities with leadership'
      ];
    case 'team-dynamics':
      return [
        'Team members unclear about their responsibilities',
        'Low trust and poor collaboration within team',
        'Need to delegate more effectively to team leads'
      ];
    default:
      return [];
  }
};
export function DecisionTree({ onFrameworkSelected }: DecisionTreeProps) {
  const [currentNode, setCurrentNode] = useState<DecisionTreeNode>(decisionTree);
  const [path, setPath] = useState<string[]>([]);
  const [showHelp, setShowHelp] = useState(false);

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
        // Navigate back through the tree - simplified for demo
        setCurrentNode(decisionTree);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto">
      {/* Help Section */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-900 mb-2">How this works</h3>
            <p className="text-blue-800 text-sm mb-3">
              Answer a few quick questions to identify the best framework for your leadership challenge. 
              This takes less than 30 seconds and ensures you get the most relevant guidance.
            </p>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              <Lightbulb className="w-4 h-4" />
              {showHelp ? 'Hide examples' : 'See example scenarios'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        {path.length > 0 && (
          <button
            onClick={goBack}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
        )}
        
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          {currentNode.question}
        </h2>
        <p className="text-slate-600">
          Select the option that best describes your current leadership challenge
        </p>
      </div>

      {/* Example scenarios when help is shown */}
      {showHelp && currentNode.options.some(opt => opt.category) && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Example scenarios for each category:
          </h4>
          <div className="space-y-3">
            {currentNode.options.filter(opt => opt.category).map((option, index) => {
              const examples = getExampleScenarios(option.category!);
              return (
                <div key={index} className="text-sm">
                  <div className="font-medium text-amber-900 mb-1">{option.text}:</div>
                  <ul className="text-amber-800 ml-4 space-y-1">
                    {examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-amber-600 rounded-full mt-2 flex-shrink-0"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="space-y-3">
        {currentNode.options.map((option, index) => (
          <div key={index}>
            <button
              onClick={() => handleOptionSelect(option)}
              className="w-full p-4 text-left border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {(option.category || option.next) && (
                    <div className="text-blue-600">
                      {option.category ? getCategoryIcon(option.category) : getCategoryIcon(option.next || '')}
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-slate-900 group-hover:text-blue-900 block">
                      {option.text}
                    </span>
                    {option.framework && (
                      <span className="text-sm text-slate-600 group-hover:text-blue-700">
                        Uses {option.framework.toUpperCase()} framework
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
              </div>
            </button>
            
            {/* Framework description for final options */}
            {option.framework && (
              <div className="mt-2 ml-12 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                {getFrameworkDescription(option.framework)}
              </div>
            )}
          </div>
        ))}
      </div>

      {path.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="text-sm text-slate-500">
            Path: {path.join(' → ')} → {currentNode.question}
          </div>
        </div>
      )}
    </div>
  );
}