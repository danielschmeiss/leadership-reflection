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
      'interest-based-negotiation': {
        teams_priorities: {
          tip: "List each team involved and their main objectives. Focus on what they're trying to achieve, not their positions.",
          example: "Frontend team: Fast user experience, clean UI components. Backend team: Scalable architecture, maintainable APIs. Both want: On-time delivery, quality code."
        },
        alignment_conflicts: {
          tip: "Identify where teams share common goals and where their priorities create tension or competing demands.",
          example: "Alignment: Both want quality and timely delivery. Conflict: Frontend wants simple APIs, Backend wants flexible, future-proof design."
        },
        constraints_pressures: {
          tip: "Consider external factors affecting each team's positions - deadlines, resources, organizational pressures, technical debt.",
          example: "Frontend under pressure from product for quick iterations. Backend dealing with legacy system constraints and upcoming compliance requirements."
        },
        shared_problem: {
          tip: "Reframe the conflict as a challenge that affects everyone, focusing on shared outcomes rather than individual team positions.",
          example: "Instead of 'Frontend vs Backend API design,' frame as 'How can we deliver great user experience while maintaining system scalability?'"
        },
        mutual_benefit: {
          tip: "Look for solutions that address core needs of all parties, not just splitting the difference between positions.",
          example: "Phased API approach: Start with simple endpoints for quick wins, then iterate toward more flexible design as requirements clarify."
        }
      },
      'feedforward-coaching': {
        peer_feedback: {
          tip: "Describe the feedback situation objectively, focusing on the behavior and context rather than personalities.",
          example: "Sarah needs to give feedback to Mike about interrupting during code reviews, but wants to maintain their collaborative relationship."
        },
        future_advice: {
          tip: "Focus on specific, actionable suggestions for improvement rather than dwelling on past mistakes.",
          example: "Suggest: 'Try asking clarifying questions before offering solutions' rather than 'You always jump to conclusions.'"
        },
        constructive_framing: {
          tip: "Frame feedback in terms of impact and future success, avoiding blame or personal criticism.",
          example: "Frame as: 'To help our code reviews be more effective...' rather than 'You have a problem with...'"
        },
        follow_up: {
          tip: "Define specific, measurable ways to track improvement and provide ongoing support.",
          example: "Schedule weekly check-ins for a month, observe next 3 code reviews, ask for peer feedback on improvement."
        }
      },
      'responsibility-mapping': {
        unclear_ownership: {
          tip: "List specific tasks, decisions, or outcomes where it's unclear who should take the lead or make the call.",
          example: "API design decisions, deployment approvals, bug triage prioritization, cross-team dependency coordination."
        },
        raci_mapping: {
          tip: "For each unclear area, define who is Responsible (does the work), Accountable (makes decisions), Consulted (provides input), Informed (needs updates).",
          example: "API design: Backend lead (R), Tech lead (A), Frontend team (C), Product manager (I)."
        },
        overlaps_gaps: {
          tip: "Identify where multiple people think they're responsible (overlap) or where no one is taking ownership (gap).",
          example: "Overlap: Both senior devs think they own architecture decisions. Gap: No one owns cross-team communication."
        },
        clarify_ownership: {
          tip: "Plan how to communicate the new ownership structure clearly and get buy-in from all involved parties.",
          example: "Team meeting to present RACI, individual conversations with affected people, document in team wiki, trial period with feedback."
        },
        prevent_ambiguity: {
          tip: "Establish ongoing processes to maintain clarity as the team and responsibilities evolve.",
          example: "Monthly ownership review, RACI updates during sprint planning, new team member onboarding checklist."
        }
      },
      'alignment-canvas': {
        alignment_purpose: {
          tip: "Be clear about why this alignment conversation is needed and what success looks like.",
          example: "Need leadership support for technical debt sprint because current pace is unsustainable and affecting team morale."
        },
        decision_approval: {
          tip: "Specify exactly what you need from leadership - approval, resources, decision, or just awareness.",
          example: "Need approval to dedicate 30% of next quarter's capacity to technical debt and infrastructure improvements."
        },
        information_data: {
          tip: "Gather concrete evidence and context that leadership needs to make an informed decision.",
          example: "Performance metrics showing 40% increase in bug reports, developer survey showing frustration, time spent on maintenance vs features."
        },
        clear_argumentation: {
          tip: "Structure your case logically with clear problem statement, evidence, proposed solution, and expected outcomes.",
          example: "Problem: Technical debt slowing delivery. Evidence: Metrics and team feedback. Solution: Dedicated tech debt time. Outcome: Faster feature delivery."
        }
      },
      'delegation-empowerment': {
        ownership_confusion: {
          tip: "List specific tasks or areas where team members are unclear about who should take the lead or make decisions.",
          example: "Code review standards, deployment procedures, customer bug escalation, new feature scoping, junior developer mentoring."
        },
        delegatable_decisions: {
          tip: "Identify decisions you're currently making that could be handled by team members with proper context and boundaries.",
          example: "Technical implementation choices, code review approval for small changes, sprint task prioritization, tool selection for team use."
        },
        best_suited_owners: {
          tip: "Match tasks to people based on their skills, interests, and development goals, not just availability.",
          example: "Senior dev owns architecture decisions, mid-level dev owns code standards, junior dev owns documentation with mentorship."
        },
        empowerment_approach: {
          tip: "Define how you'll provide context, boundaries, and support without micromanaging their approach.",
          example: "Provide clear success criteria, regular check-ins, access to resources, and permission to make mistakes and learn."
        },
        accountability_tracking: {
          tip: "Establish clear, measurable ways to track progress and outcomes without hovering over day-to-day work.",
          example: "Weekly progress updates, monthly outcome reviews, peer feedback sessions, clear escalation criteria."
        }
      },
      'five-dysfunctions': {
        trust_level: {
          tip: "Assess whether team members feel safe to be vulnerable, admit mistakes, and ask for help without fear of judgment.",
          example: "Do people admit when they don't know something? Do they ask for help? Do they acknowledge mistakes openly in meetings?"
        },
        conflict_handling: {
          tip: "Evaluate whether the team engages in productive debate about ideas or avoids difficult conversations.",
          example: "Do people challenge ideas in meetings? Do technical disagreements get resolved openly? Do people avoid giving honest feedback?"
        },
        commitment_strength: {
          tip: "Determine if team members truly buy into decisions and goals, even when they initially disagreed.",
          example: "After decisions are made, do people follow through enthusiastically? Do they support decisions publicly even if they disagreed privately?"
        },
        accountability_clarity: {
          tip: "Check whether team members hold each other accountable for commitments and standards, not just you as the leader.",
          example: "Do team members call out missed deadlines? Do they address quality issues with each other? Do they enforce team agreements?"
        },
        results_focus: {
          tip: "Assess whether the team prioritizes collective success over individual recognition or departmental goals.",
          example: "Do people celebrate team wins over individual achievements? Do they make decisions based on team success rather than personal advancement?"
        }
      },
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
        reinforcement: {
          tip: "Think about specific actions you can take to encourage this positive behavior to continue.",
          example: "I'll mention this in our next team meeting as a great example, and I'll make sure to create more opportunities for collaborative problem-solving."
        },
        constructive: {
          tip: "Frame the feedback in a way that focuses on improvement and solutions rather than blame or criticism.",
          example: "Instead of 'You always interrupt,' try 'I'd love to hear everyone's full thoughts before we move to solutions.'"
        },
        support: {
          tip: "Think about concrete ways you can help the person improve, such as resources, training, or ongoing guidance.",
          example: "I can pair you with Sarah for the next few code reviews to practice collaborative discussion techniques."
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
        options: {
          tip: "Brainstorm multiple approaches without judging them initially. Think creatively about solutions.",
          example: "Assign review buddies, add review time to sprint capacity, implement review rotation, set up automated reminders."
        },
        will: {
          tip: "Choose specific, actionable steps with clear timelines and ownership. What will you do first?",
          example: "This week: Discuss with team in retro. Next week: Implement buddy system pilot. Month 1: Measure and adjust."
        },
        next_step: {
          tip: "Define the very first concrete action you will take, with a specific timeline.",
          example: "Tomorrow morning: Schedule 30-minute team discussion for Friday's retro to present the review buddy system idea."
        }
      },
      mediation: {
        situation: {
          tip: "Describe the triggering event or ongoing issue objectively, without taking sides or assigning blame.",
          example: "During yesterday's architecture review, tensions escalated when the frontend and backend teams disagreed about API design approach."
        },
        your_interests: {
          tip: "Focus on what you really need or care about in this situation, not your position or preferred solution.",
          example: "I need the teams to work collaboratively, make good technical decisions together, and maintain mutual respect."
        },
        their_interests: {
          tip: "Try to understand what each party really needs, beyond their stated positions. Look for underlying concerns.",
          example: "Frontend team needs predictable, easy-to-use APIs. Backend team needs maintainable, scalable architecture. Both want to deliver quality work."
        },
        solutions: {
          tip: "Generate options that could address everyone's underlying interests, not just compromise between positions.",
          example: "Joint API design sessions, shared documentation standards, prototype-and-iterate approach, cross-team pairing."
        },
        common_ground: {
          tip: "Identify shared values, goals, or concerns that everyone can agree on as a foundation for resolution.",
          example: "Everyone wants to deliver great user experience, maintain code quality, and work in a collaborative environment."
        },
        root_cause: {
          tip: "Look beyond the surface disagreement to understand the deeper issues causing the conflict.",
          example: "Surface: Disagreement about API design. Root cause: Lack of shared understanding about user needs and technical constraints."
        },
        team_impact: {
          tip: "Describe specific ways the conflict is affecting daily work, team morale, and productivity.",
          example: "Daily standups are tense, people are avoiding cross-team collaboration, and feature delivery is delayed by API disagreements."
        },
        moderator_role: {
          tip: "Define how you'll facilitate resolution while staying neutral and helping both sides communicate effectively.",
          example: "I'll facilitate a structured discussion, ensure both sides are heard, help identify shared goals, and guide toward win-win solutions."
        },
        resolution_steps: {
          tip: "Identify specific, actionable commitments each party can make to move toward resolution.",
          example: "Frontend team: Share user stories and UI mockups. Backend team: Explain technical constraints. Both: Attend joint design sessions."
        },
        future_collaboration: {
          tip: "Plan ongoing practices to prevent similar conflicts and maintain good working relationships.",
          example: "Monthly cross-team design reviews, shared Slack channel for API discussions, joint retrospectives on collaboration."
        }
      },
      'decision-matrix': {
        options: {
          tip: "List all viable alternatives you're considering, including creative options you might not have fully explored yet.",
          example: "Node.js with Express, Python with FastAPI, Java with Spring Boot, Go with Gin, hybrid approach with multiple services."
        },
        criteria: {
          tip: "Define the factors that matter most for this decision, considering both technical and business aspects.",
          example: "Development speed, scalability, team expertise, maintenance cost, integration complexity, community support, hiring availability."
        },
        scoring: {
          tip: "Rate each option against each criterion objectively using a consistent scale (e.g., 1-5), and consider weighting criteria by importance.",
          example: "Node.js: Development speed (4), Scalability (3), Team expertise (5), Maintenance cost (4). Weight: Development speed x2, Scalability x3."
        },
        best_option: {
          tip: "Calculate which option has the highest weighted score, but also consider qualitative factors that numbers might miss.",
          example: "Python scores highest (weighted total: 87), but Node.js is close (82) and has better team expertise. Consider team preference and learning curve."
        },
        risks: {
          tip: "For your chosen option, identify what could go wrong and how you might prevent or mitigate these risks.",
          example: "Risk: Team lacks Python expertise. Mitigation: Training budget, hire senior Python dev, start with pilot project, pair programming."
        }
      },
      'pros-cons': {
        options: {
          tip: "List the strategic alternatives you're considering, focusing on significantly different approaches rather than minor variations.",
          example: "Build in-house platform, adopt existing SaaS solution, hybrid approach with core in-house and integrations, partner with vendor for custom solution."
        },
        advantages: {
          tip: "For each option, list the benefits and positive outcomes, considering both immediate and long-term advantages.",
          example: "In-house: Full control, custom features, no vendor lock-in, team learning. SaaS: Fast implementation, proven reliability, ongoing support."
        },
        disadvantages: {
          tip: "Honestly assess the drawbacks and potential negative consequences of each option, including hidden costs.",
          example: "In-house: High development cost, ongoing maintenance burden, longer time to market. SaaS: Limited customization, monthly costs, data dependency."
        },
        alignment: {
          tip: "Consider how each option fits with your organization's long-term strategy, values, and technical direction.",
          example: "In-house aligns with our platform strategy and engineering growth goals. SaaS aligns with our speed-to-market and focus-on-core-business priorities."
        },
        stakeholders: {
          tip: "Identify who needs to be involved in or informed about this decision, considering both technical and business stakeholders.",
          example: "Engineering team, Product leadership, Finance (for budget), Legal (for vendor contracts), Customer Success (for user impact)."
        }
      },
      raci: {
        stakeholders: {
          tip: "List all people or groups who are involved in or affected by this situation, including their current roles.",
          example: "Product Manager, Engineering Team Lead, Frontend Developers, Backend Developers, QA Team, DevOps Engineer, Engineering Director."
        },
        expectations: {
          tip: "For each stakeholder, describe what they expect or need from this situation or project.",
          example: "Product Manager expects clear timelines and regular updates. Developers expect clear requirements and technical autonomy. QA expects testable features."
        },
        misunderstandings: {
          tip: "Identify specific areas where stakeholders have different assumptions or conflicting goals.",
          example: "Product thinks 'done' means feature-complete. Engineering thinks 'done' includes performance testing. QA thinks 'done' includes full regression testing."
        },
        transparency: {
          tip: "Define specific communication mechanisms and schedules to keep everyone informed about progress and decisions.",
          example: "Weekly status emails, bi-weekly stakeholder demos, shared project dashboard, Slack updates for blockers, monthly retrospectives."
        },
        roles: {
          tip: "Use RACI framework to clarify who is Responsible, Accountable, Consulted, and Informed for key decisions and tasks.",
          example: "Feature prioritization: Product Manager (A), Engineering Lead (C), Team (I). Technical implementation: Senior Dev (R), Tech Lead (A), Product (I)."
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
      ],
      'delegation-empowerment': [
        "Start with clear expectations and boundaries for delegated tasks",
        "Match tasks to people's strengths and development goals",
        "Provide support without micromanaging - check in regularly but don't hover"
      ],
      raci: [
        "Focus on clarity over perfection - roles can be adjusted as you learn",
        "Get stakeholder buy-in on the RACI assignments before implementing",
        "Use this as a communication tool, not just a documentation exercise"
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

        {/* Previous Questions and Answers */}
        {currentQuestionIndex > 0 && (
          <div className="mb-8 space-y-4">
            <h3 className="text-lg font-medium text-slate-900 mb-4">Your Previous Responses</h3>
            {framework.questions.slice(0, currentQuestionIndex).map((question, index) => (
              <div key={question.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <h4 className="font-medium text-slate-900 text-sm">
                    {question.text}
                  </h4>
                </div>
                <div className="ml-9">
                  <p className="text-slate-700 text-sm whitespace-pre-wrap bg-white p-3 rounded border">
                    {responses[question.id] || 'No response'}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-slate-300 pt-6 mt-6">
              <h3 className="text-lg font-medium text-slate-900 mb-2 flex items-center gap-2">
                <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {currentQuestionIndex + 1}
                </div>
                Current Question
              </h3>
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