import React, { useState } from 'react';
import { Save, Sparkles, ArrowRight, AlertCircle, HelpCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { Framework, Question } from '../types';

interface ReflectionFormProps {
  framework: Framework;
  problemDescription: string;
  onSave: (responses: Record<string, string>) => void;
  onCancel: () => void;
  initialResponses?: Record<string, string>;
}

export function ReflectionForm({ framework, problemDescription, onSave, onCancel, initialResponses = {} }: ReflectionFormProps) {
  const [responses, setResponses] = useState<Record<string, string>>(initialResponses);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAI, setShowAI] = useState(false);
  const [showQuestionHelp, setShowQuestionHelp] = useState(false);

  const currentQuestion = framework.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === framework.questions.length - 1;
  const canProceed = !currentQuestion.required || responses[currentQuestion.id]?.trim();

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSave();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSave = () => {
    onSave(responses);
  };

  const getAISuggestion = () => {
    // Placeholder for AI integration
    return "AI suggestions would appear here, based on anonymized input to protect privacy.";
  };

  const getQuestionHelp = (questionId: string, frameworkId: string) => {
    const helpContent: Record<string, Record<string, { tip: string; example: string }>> = {
      sbi: {
        situation: {
          tip: "Be specific about when and where this happened. Context helps the other person understand and remember the situation.",
          example: "During yesterday's sprint planning meeting when we were discussing the API integration timeline..."
        },
        behavior: {
          tip: "Focus on what you observed, not your interpretation. Use neutral, factual language without judgment.",
          example: "You interrupted Sarah twice while she was explaining the database schema, and you didn't acknowledge her points before moving to the next topic."
        },
        impact: {
          tip: "Explain the effect on you, the team, or the work. Be honest about how it made you feel or what it caused.",
          example: "This made Sarah seem frustrated, and we didn't get her full input on the technical approach, which could lead to implementation issues later."
        },
        desired_outcome: {
          tip: "Be clear about what you want to achieve. Focus on future behavior and positive outcomes.",
          example: "I'd like us to create space for everyone to share their expertise fully, so we make better technical decisions as a team."
        }
      },
      grow: {
        goal: {
          tip: "Make your goal specific, measurable, and time-bound. What exactly do you want to achieve?",
          example: "Improve team code review process so that 90% of PRs get reviewed within 24 hours, reducing deployment delays."
        },
        reality: {
          tip: "Be honest about the current situation. What's working? What isn't? What are the facts?",
          example: "Currently, PRs sit for 2-3 days on average. Team members say they're too busy with feature work to prioritize reviews."
        },
        obstacles: {
          tip: "Identify what's preventing progress. Include both external barriers and internal challenges.",
          example: "Heavy feature workload, no clear review assignment process, reviews aren't prioritized in sprint planning."
        },
        options: {
          tip: "Brainstorm multiple approaches without judging them initially. Think creatively about solutions.",
          example: "Assign review buddies, add review time to sprint capacity, implement review rotation, set up automated reminders."
        },
        way_forward: {
          tip: "Choose specific, actionable steps with clear timelines and ownership. What will you do first?",
          example: "This week: Discuss with team in retro. Next week: Implement buddy system pilot. Month 1: Measure and adjust."
        }
      },
      mediation: {
        parties: {
          tip: "List everyone involved or affected. Use roles instead of names to maintain privacy.",
          example: "Senior Frontend Developer, Backend Team Lead, Product Manager, and the broader development team."
        },
        issue: {
          tip: "Focus on the underlying problem, not just the symptoms. What's really at stake here?",
          example: "Disagreement about API design approach is causing delays and tension between frontend and backend teams."
        },
        interests: {
          tip: "Look beyond positions to understand what each person really needs or cares about.",
          example: "Frontend dev wants predictable, easy-to-use APIs. Backend lead wants maintainable, scalable architecture. Both want to deliver quality work on time."
        },
        common_ground: {
          tip: "Find shared values, goals, or concerns that everyone can agree on.",
          example: "Everyone wants to deliver a great user experience, maintain code quality, and work collaboratively."
        },
        solutions: {
          tip: "Generate options that address everyone's core interests, not just compromise positions.",
          example: "Create API design sessions with both teams, establish shared documentation standards, implement gradual rollout for testing."
        }
      },
      'decision-matrix': {
        decision: {
          tip: "Frame the decision clearly. What exactly needs to be decided and by when?",
          example: "Choose the primary technology stack for our new microservices architecture, decision needed by end of month."
        },
        criteria: {
          tip: "List the factors that matter most for this decision. Consider both technical and business aspects.",
          example: "Development speed, scalability, team expertise, maintenance cost, integration complexity, community support."
        },
        options: {
          tip: "Include all viable alternatives, even if some seem less likely. Don't eliminate options too early.",
          example: "Node.js with Express, Python with FastAPI, Java with Spring Boot, Go with Gin framework."
        },
        stakeholders: {
          tip: "Consider who will be affected by this decision and who should have input.",
          example: "Development team, DevOps team, Product Manager, Engineering Director, and future team members who'll maintain this."
        },
        evaluation: {
          tip: "Rate each option against each criterion objectively. Use a consistent scale (e.g., 1-5).",
          example: "Node.js: Development speed (4), Scalability (3), Team expertise (5), Maintenance cost (4)..."
        }
      }
    };

    return helpContent[frameworkId]?.[questionId] || { tip: "Take your time to think through this question thoroughly.", example: "" };
  };

  const getFrameworkTips = (frameworkId: string) => {
    const tips: Record<string, string[]> = {
      sbi: [
        "Keep it factual and specific - avoid generalizations like 'always' or 'never'",
        "Focus on one situation at a time for clarity",
        "Prepare for dialogue - this is a conversation, not a monologue"
      ],
      grow: [
        "Be honest with yourself - this works best with genuine self-reflection",
        "Think big picture first, then get specific with actions",
        "Consider multiple perspectives on each question"
      ],
      mediation: [
        "Stay neutral and focus on interests, not positions",
        "Look for win-win solutions that address everyone's core needs",
        "Remember that understanding doesn't mean agreeing"
      ],
      'decision-matrix': [
        "Weight your criteria by importance before evaluating options",
        "Get input from others to avoid blind spots",
        "Consider both short-term and long-term implications"
      ]
    };

    return tips[frameworkId] || [];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6">
        <div className="mb-3">
          <div className="text-sm text-blue-200 mb-1">Working on:</div>
          <h2 className="text-xl font-semibold mb-2">{problemDescription}</h2>
          <div className="text-sm text-blue-200">Using: <span className="font-medium">{framework.name}</span></div>
        </div>
        <p className="text-blue-100 text-sm">{framework.description}</p>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-blue-100 mb-2">
            <span>Question {currentQuestionIndex + 1} of {framework.questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / framework.questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-blue-500 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / framework.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question content */}
      <div className="p-6">
        {/* Framework tips - shown only on first question */}
        {currentQuestionIndex === 0 && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900 mb-2">Tips for {framework.name}</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  {getFrameworkTips(framework.id).map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-1 h-1 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-medium text-slate-900">
              {currentQuestion.text}
              {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
            </h3>
            <button
              onClick={() => setShowQuestionHelp(!showQuestionHelp)}
              className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
              title="Get help with this question"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Question-specific help */}
          {showQuestionHelp && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-blue-900 mb-2">How to approach this question</h5>
                  <p className="text-blue-800 text-sm mb-3">
                    {getQuestionHelp(currentQuestion.id, framework.id).tip}
                  </p>
                  {getQuestionHelp(currentQuestion.id, framework.id).example && (
                    <div>
                      <p className="font-medium text-blue-900 text-sm mb-1">Example:</p>
                      <p className="text-blue-700 text-sm italic">
                        "{getQuestionHelp(currentQuestion.id, framework.id).example}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {currentQuestion.type === 'textarea' ? (
            <textarea
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          )}

          {!canProceed && currentQuestion.required && (
            <div className="mt-2 flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">This field is required</span>
            </div>
          )}
        </div>

        {/* AI assistance */}
        <div className="mb-6">
          <button
            onClick={() => setShowAI(!showAI)}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            <Sparkles className="w-4 h-4" />
            Get AI perspective (anonymized)
          </button>
          
          {showAI && (
            <div className="mt-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-800">
                {getAISuggestion()}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
              >
                Previous
              </button>
            )}
            <button
              onClick={onCancel}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
            >
              Cancel
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed font-medium"
          >
            {isLastQuestion ? (
              <>
                <Save className="w-4 h-4" />
                Complete Reflection
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}