import React, { useState } from 'react';
import { Save, Sparkles, ArrowRight, ArrowLeft, AlertCircle, HelpCircle, Lightbulb, CheckCircle, Target, Zap, Bot, AlertTriangle } from 'lucide-react';
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
  const [showCopyToast, setShowCopyToast] = useState(false);

  const currentQuestion = framework.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === framework.questions.length - 1;
  const canProceed = !currentQuestion.required || responses[currentQuestion.id]?.trim();
  const progress = ((currentQuestionIndex + 1) / framework.questions.length) * 100;

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
      setShowQuestionHelp(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowQuestionHelp(false);
    }
  };

  const handleSave = () => {
    onSave(responses);
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

    return helpContent[frameworkId]?.[questionId] || { tip: "Think through this question step by step, considering your specific situation and context.", example: "" };
  };

  const copyCurrentStepForAI = async () => {
    const completedResponses = framework.questions.slice(0, currentQuestionIndex + 1)
      .filter(q => responses[q.id]?.trim())
      .map((q, index) => `### ${index + 1}. ${q.text}

**My Response:**
${responses[q.id]}
`).join('\n');

    const aiContent = `# Leadership Reflection - In Progress Analysis Request

I'm working through a leadership reflection using the "${framework.name}" framework and would like your insights on my progress so far.

## Context
- **Framework**: ${framework.name}
- **Framework Purpose**: ${framework.description}
- **Current Progress**: Question ${currentQuestionIndex + 1} of ${framework.questions.length}
- **Current Question**: ${currentQuestion.text}

## My Responses So Far

${completedResponses || 'No responses completed yet.'}

## Current Question I'm Working On

**${currentQuestion.text}**

${responses[currentQuestion.id] ? `**My Current Response:**
${responses[currentQuestion.id]}` : '*I haven\'t answered this question yet.*'}

## What I'm Looking For

Please help me with:

1. **Current Question Guidance**: How can I approach the current question more effectively?
2. **Response Quality**: Are my responses so far thorough and insightful enough?
3. **Missing Elements**: What important aspects should I consider that I might be overlooking?
4. **Connection Patterns**: How do my responses connect and what themes are emerging?
5. **Next Steps**: What should I focus on as I continue this reflection?

Please provide specific, actionable guidance to help me get the most value from this leadership reflection process.`;

    try {
      await navigator.clipboard.writeText(aiContent);
      setShowCopyToast(true);
      setTimeout(() => setShowCopyToast(false), 8000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto space-y-8">
      {/* Copy Success Toast */}
      {showCopyToast && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-500 animate-in slide-in-from-top-2 duration-500 max-w-md">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold mb-1">Copied to Clipboard! 📋</div>
              <div className="text-sm text-emerald-100">
                Your reflection progress is ready to paste into your preferred AI assistant for guidance and insights.
              </div>
              <div className="mt-3 p-3 bg-amber-500 bg-opacity-20 rounded-lg border border-amber-400 border-opacity-30">
                <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-200 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-amber-100 font-semibold">Privacy Notice:</div>
                </div>
                <div className="text-xs text-amber-100 leading-relaxed">
                  You're sharing personal leadership reflections. <strong>Consider using local LLMs (like Ollama) for maximum privacy</strong>, or only use trusted AI services and avoid sharing sensitive company information.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Progress Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm text-blue-200 mb-1">Current Challenge:</div>
              <h2 className="text-2xl font-semibold mb-1">{problemDescription}</h2>
              <div className="text-sm text-blue-200">Framework: <span className="font-medium">{framework.name}</span></div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentQuestionIndex + 1}/{framework.questions.length}</div>
              <div className="text-sm text-blue-200">Questions</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-blue-200">
              <span>Progress</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-blue-700 bg-opacity-50 rounded-full h-3">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Framework tips - shown only on first question */}
        {currentQuestionIndex === 0 && (
          <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-600 rounded-lg text-white">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-3 text-lg">Framework Guidelines</h4>
                <div className="space-y-2 text-blue-800">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">Be specific and honest in your responses</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 mt-1 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">Use the help button if you need guidance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Current Question */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {currentQuestionIndex + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {currentQuestion.text}
                  {currentQuestion.required && <span className="text-red-500 ml-1">*</span>}
                </h3>
              </div>
            </div>
            <button
              onClick={() => setShowQuestionHelp(!showQuestionHelp)}
              className={`p-2 rounded-lg transition-all ${showQuestionHelp ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'}`}
              title="Get help with this question"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {/* Question Help */}
          {showQuestionHelp && (
            <div className="mb-6 p-6 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500 rounded-lg text-white">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="font-semibold text-amber-900 mb-3">How to approach this question</h5>
                  <p className="text-amber-800 mb-4">
                    {getQuestionHelp(currentQuestion.id, framework.id).tip}
                  </p>
                  {getQuestionHelp(currentQuestion.id, framework.id).example && (
                    <div className="bg-white bg-opacity-60 p-4 rounded-lg">
                      <p className="font-medium text-amber-900 mb-2">Example:</p>
                      <p className="text-amber-700 italic">
                        "{getQuestionHelp(currentQuestion.id, framework.id).example}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Input Field */}
          {currentQuestion.type === 'textarea' ? (
            <textarea
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-gray-900 placeholder-gray-500"
              autoFocus
            />
          ) : (
            <input
              type="text"
              value={responses[currentQuestion.id] || ''}
              onChange={(e) => handleResponseChange(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
              autoFocus
            />
          )}

          {!canProceed && currentQuestion.required && (
            <div className="mt-3 flex items-center gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-medium">This field is required to continue</span>
            </div>
          )}
        </div>

        {/* AI Assistant */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAI(!showAI)}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Get AI Assistance (Anonymous)
            </button>
            
            <button
              onClick={copyCurrentStepForAI}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              title="Copy progress with AI instructions to clipboard"
            >
              <Bot className="w-4 h-4" />
              Copy for AI Help
            </button>
          </div>
          
          {showAI && (
            <div className="mt-4 p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-600 rounded-lg text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-medium text-indigo-900 mb-2">AI Assistant</h5>
                  <p className="text-sm text-indigo-800">
                    AI suggestions would appear here, based on anonymized input to protect your privacy. 
                    This feature helps provide additional perspectives while keeping your data secure.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            {currentQuestionIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            )}
            <button
              onClick={onCancel}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:hover:scale-100"
          >
            {isLastQuestion ? (
              <>
                <Save className="w-5 h-5" />
                Complete Reflection
              </>
            ) : (
              <>
                Next Question
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}