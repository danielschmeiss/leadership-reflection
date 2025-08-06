import React, { useState, useEffect } from 'react';
import { Shield, MessageSquare, Users, Target, GitBranch, BarChart3, TrendingUp, FileText, UserPlus, Heart, Compass, Lightbulb, CheckCircle, List, ArrowRight, Play, ExternalLink, Copy, Link } from './icons';

interface FrameworksGuideProps {
  onStartReflection?: (category: string, subcategory: string) => void;
  onStartNewReflection?: () => void;
}

export function FrameworksGuide({ onStartReflection, onStartNewReflection }: FrameworksGuideProps) {
  const [copiedFramework, setCopiedFramework] = useState<string | null>(null);

  const copyFrameworkLink = async (frameworkId: string) => {
    const url = `${window.location.origin}/frameworks#${frameworkId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedFramework(frameworkId);
      setTimeout(() => setCopiedFramework(null), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);
  const frameworks = [
    // FEEDBACK FRAMEWORKS
    {
      id: 'sbi',
      title: 'SBI Framework (Situation-Behavior-Impact)',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      usedFor: [
        { category: 'feedback', subcategory: 'positive', label: 'Feedback → Positive feedback' },
        { category: 'feedback', subcategory: 'developmental', label: 'Feedback → Developmental feedback' }
      ],
      abbreviationExplanation: 'SBI stands for Situation-Behavior-Impact, a three-step structure for giving effective feedback.',
      description: 'Most feedback fails because it\'s vague ("be more collaborative") or feels like an attack ("you\'re not a team player"). SBI gives you a script that focuses on facts, not personality.',
      whenToUse: 'Use when someone did something specific that had a clear impact - either positive (to reinforce) or problematic (to change). Works for any feedback conversation.',
      keyBenefits: [
        'Person can\'t argue with facts - reduces the "that\'s not what I meant" defensiveness',
        'Shows clear cause-and-effect so they understand why it matters',
        'Gives them something specific to repeat (positive) or change (developmental)',
        'Takes the emotion out of difficult conversations'
      ]
    },
    {
      id: 'feedforward-coaching',
      title: 'Feedforward Coaching',
      icon: <Compass className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      usedFor: [
        { category: 'feedback', subcategory: 'peer-to-peer-feedback-facilitation', label: 'Feedback → Peer-to-peer feedback facilitation' }
      ],
      description: 'Peer feedback often turns into blame sessions about past mistakes. Feedforward flips this: instead of "here\'s what you did wrong," it\'s "here\'s what would work better next time."',
      whenToUse: 'Use when facilitating feedback between team members, especially when there\'s tension or when previous feedback conversations went poorly.',
      keyBenefits: [
        'Eliminates defensiveness because you\'re not relitigating past mistakes',
        'Creates specific actions people can take instead of vague "be better" advice',
        'Actually improves relationships instead of creating resentment',
        'People get excited about improving instead of defensive about criticism'
      ]
    },
    // CONFLICT FRAMEWORKS
    {
      id: 'mediation',
      title: 'Mediation Framework',
      icon: <Users className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600',
      usedFor: [
        { category: 'conflict', subcategory: 'with-team-member', label: 'Conflict → With team member' },
        { category: 'conflict', subcategory: 'between-team-members', label: 'Conflict → Between team members' }
      ],
      description: 'When people are in conflict, they argue about positions ("I want X") instead of interests ("I need Y because..."). This framework gets to the real needs underneath the fight.',
      whenToUse: 'Use when two people are stuck arguing, avoiding each other, or when their conflict is affecting team dynamics. Essential when you need them to keep working together.',
      keyBenefits: [
        'Gets past the surface argument to the real problem (usually different priorities or constraints)',
        'Preserves working relationships instead of creating winners and losers',
        'Both people own the solution because they helped create it',
        'Addresses root causes so the same fight doesn\'t happen again'
      ]
    },
    {
      id: 'interest-based-negotiation',
      title: 'Interest-Based Negotiation',
      icon: <GitBranch className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600',
      usedFor: [
        { category: 'conflict', subcategory: 'cross-team-conflict', label: 'Conflict → Cross-team conflict' }
      ],
      description: 'Cross-team conflicts usually happen because teams optimize for their own success metrics. This framework reframes the problem as "how do we both win?" instead of "who gets their way?"',
      whenToUse: 'Use when teams are blocking each other, have competing priorities, or when you need a solution that both teams will actually implement (not just agree to).',
      keyBenefits: [
        'Stops the "us vs them" dynamic that kills cross-team collaboration',
        'Identifies the real constraints each team faces (not just what they\'re asking for)',
        'Creates solutions that make both teams more successful',
        'Builds relationships that prevent future conflicts'
      ]
    },
    // DECISION FRAMEWORKS
    {
      id: 'decision-matrix',
      title: 'Decision Matrix',
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      usedFor: [
        { category: 'decision', subcategory: 'operational', label: 'Decision → Operational (Team)' }
      ],
      description: 'When you have multiple good options, your brain gets overwhelmed and defaults to gut feeling or the loudest voice in the room. This forces you to define what actually matters and score objectively.',
      whenToUse: 'Use when you have 3+ viable options, when the decision affects multiple people who need to understand your reasoning, or when you\'re second-guessing yourself.',
      keyBenefits: [
        'Breaks decision paralysis by giving you a clear "winner" based on what matters most',
        'Shows your team/boss exactly how you made the decision (builds trust)',
        'Forces you to consider factors you might forget under pressure',
        'Creates a template for similar decisions in the future'
      ]
    },
    {
      id: 'pros-cons',
      title: 'Pros/Cons Analysis',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      usedFor: [
        { category: 'decision', subcategory: 'strategic', label: 'Decision → Strategic (Domain/Organization)' }
      ],
      description: 'Most people make pros/cons lists that miss the real decision factors. This framework forces you to think about second-order effects, opportunity costs, and how each option plays out 6-12 months later.',
      whenToUse: 'Use for decisions that will significantly impact your team\'s direction, when you need to justify your choice to leadership, or when the "obvious" choice feels wrong but you can\'t articulate why.',
      keyBenefits: [
        'Uncovers the hidden costs and unexpected benefits you didn\'t see initially',
        'Forces you to think about how each option aligns with long-term strategy',
        'Identifies which stakeholders will be affected and need to be consulted',
        'Creates a clear record of your reasoning for future reference'
      ]
    },
    {
      id: 'responsibility-mapping',
      title: 'RACI/Responsibility Mapping (Responsible-Accountable-Consulted-Informed)',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      usedFor: [
        { category: 'decision', subcategory: 'ownership-accountability-gaps', label: 'Decision → Ownership/Accountability gaps' }
      ],
      abbreviationExplanation: 'RACI stands for Responsible (does the work), Accountable (makes decisions), Consulted (provides input), and Informed (needs updates).',
      description: 'The "I thought you were handling that" problem kills projects. RACI forces you to explicitly assign who does the work (R), who\'s accountable for outcomes (A), who gives input (C), and who just needs updates (I).',
      whenToUse: 'Use when tasks are getting dropped, people are duplicating work, decisions are slow because no one knows who decides, or when onboarding new people to complex projects.',
      keyBenefits: [
        'Eliminates the "I thought someone else was doing that" problem completely',
        'Speeds up decisions because everyone knows who has the authority to decide',
        'Stops people from stepping on each other\'s toes or duplicating work',
        'New team members know exactly who to ask about what'
      ]
    },
    // STAKEHOLDER FRAMEWORKS
    {
      id: 'bound',
      title: 'BOUND Framework (Baseline-Objectivity-Understand-Negotiate-Document)',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      usedFor: [
        { category: 'stakeholder', subcategory: 'expectation-management', label: 'Stakeholder → Expectation management' }
      ],
      abbreviationExplanation: 'BOUND stands for Baseline-Objectivity-Understand-Negotiate-Document, a five-step framework for resetting unrealistic stakeholder expectations.',
      description: 'When stakeholders have unrealistic expectations, most people either cave in or push back defensively. BOUND helps you reset expectations using facts and collaborative problem-solving instead of conflict.',
      whenToUse: 'Use when facing impossible deadlines, unrealistic scope demands, or when stakeholders don\'t understand technical constraints. Essential when you need to preserve relationships while setting realistic boundaries.',
      keyBenefits: [
        'Uses objective evidence instead of opinions to ground discussions in reality',
        'Uncovers the real business drivers behind unrealistic requests',
        'Creates collaborative solutions that stakeholders help develop and own',
        'Documents agreements to prevent future scope creep and misunderstandings'
      ]
    },
    {
      id: 'alignment-canvas',
      title: 'Stakeholder Alignment Framework',
      icon: <Target className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      usedFor: [
        { category: 'stakeholder', subcategory: 'alignment-with-leadership', label: 'Stakeholder → Alignment with leadership' }
      ],
      description: 'Most people go into leadership meetings hoping to "wing it" or with a vague sense of what they need. This framework forces you to organize your evidence and anticipate the questions you\'ll get.',
      whenToUse: 'Use before any meeting where you need leadership buy-in, budget approval, or strategic decisions. Essential when the stakes are high and you only get one shot.',
      keyBenefits: [
        'Prevents the "I hadn\'t thought of that" moment when leadership asks obvious questions',
        'Organizes your argument so it builds logically instead of jumping around',
        'Dramatically increases your success rate in high-stakes conversations',
        'Shows leadership you think like they do (strategic, evidence-based)'
      ]
    },
    // TEAM DYNAMICS FRAMEWORKS
    {
      id: 'delegation-empowerment',
      title: 'Delegation/Empowerment',
      icon: <UserPlus className="w-6 h-6" />,
      color: 'from-rose-500 to-pink-600',
      usedFor: [
        { category: 'team-dynamics', subcategory: 'ownership-clarity', label: 'Team dynamics → Ownership clarity' }
      ],
      description: 'Most "delegation" is just task assignment with micromanagement. Real empowerment means giving people the context and authority to make decisions within clear boundaries.',
      whenToUse: 'Use when you\'re the bottleneck for decisions, when you want to develop someone\'s judgment, or when you need things to happen without your constant involvement.',
      keyBenefits: [
        'Develops people\'s judgment so they make better decisions over time',
        'Gets you out of the daily weeds so you can focus on bigger problems',
        'Creates a team that doesn\'t need you for every decision',
        'People care more about outcomes when they own the decisions'
      ]
    },
    {
      id: 'five-dysfunctions',
      title: '5 Dysfunctions of a Team',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-rose-500 to-pink-600',
      usedFor: [
        { category: 'team-dynamics', subcategory: 'team-health-check', label: 'Team dynamics → Team health check' }
      ],
      description: 'Team problems usually have a root cause: people don\'t trust each other enough to have real conflicts, so they fake agreement, avoid accountability, and focus on individual success over team results.',
      whenToUse: 'Use when your team feels "off" but you can\'t pinpoint why, when meetings are polite but unproductive, or when people seem disengaged despite being capable.',
      keyBenefits: [
        'Identifies the real problem (usually trust) instead of treating symptoms',
        'Shows you which dysfunction to fix first (they build on each other)',
        'Based on research with thousands of teams, not just theory',
        'Gives you specific actions to take at each level of team development'
      ]
    },
    // GENERAL PROBLEM-SOLVING FRAMEWORKS
    {
      id: 'grow',
      title: 'GROW Model (Goal-Reality-Options-Way Forward)',
      icon: <Target className="w-6 h-6" />,
      color: 'from-slate-500 to-gray-600',
      usedFor: [
        { category: 'other', subcategory: 'free-reflection', label: 'Other → Free reflection' }
      ],
      abbreviationExplanation: 'GROW stands for Goal-Reality-Options-Way Forward, a four-step coaching model for structured problem-solving.',
      description: 'Most people jump straight to solutions without understanding the real goal or current reality. GROW forces you to get clear on what success looks like before brainstorming how to get there.',
      whenToUse: 'Use when you\'re stuck on a complex problem, when you keep going in circles, or when coaching someone who says "I don\'t know what to do."',
      keyBenefits: [
        'Prevents you from solving the wrong problem by getting clear on the real goal first',
        'Uncovers options you missed because you were focused on obvious solutions',
        'Turns vague intentions ("I should improve X") into specific next steps',
        'Works whether you\'re coaching yourself or helping someone else think through a problem'
      ]
    }
  ];

  const handleReflectionClick = (category: string, subcategory: string) => {
    if (onStartReflection) {
      onStartReflection(category, subcategory);
    }
  };

  const scrollToFramework = (frameworkId: string) => {
    const element = document.getElementById(frameworkId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-lg">
        <div className="flex items-start gap-6">
          <div className="p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">
            <Lightbulb className="w-12 h-12" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">Leadership Frameworks Guide</h1>
            <p className="text-xl text-blue-100 mb-4">
              Comprehensive explanations of all available frameworks to help you choose the right approach for your leadership challenges.
            </p>
            <div className="flex items-center gap-2 text-blue-200">
              <CheckCircle className="w-4 h-4" />
              <span>Research-backed • Proven in practice • Ready to use</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-slate-600 to-gray-700 rounded-xl">
            <List className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Table of Contents</h2>
            <p className="text-gray-600">Jump to any framework for detailed information</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Feedback Frameworks */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Feedback</h3>
              <div className="h-px bg-blue-200 flex-1"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {frameworks.filter(f => f.usedFor.some(u => u.category === 'feedback')).map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => scrollToFramework(framework.id)}
                  className="flex items-start gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-200 text-left group"
                >
                  <div className={`p-2 bg-gradient-to-r ${framework.color} rounded-lg text-white group-hover:scale-105 transition-transform flex-shrink-0`}>
                    {framework.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {framework.title}
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {framework.id === 'sbi' && (
                        <>
                          <li>• Specific behavior feedback</li>
                          <li>• Clear impact explanation</li>
                          <li>• Reduces defensiveness</li>
                        </>
                      )}
                      {framework.id === 'feedforward-coaching' && (
                        <>
                          <li>• Future-focused feedback</li>
                          <li>• Eliminates defensiveness</li>
                          <li>• Builds team relationships</li>
                        </>
                      )}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Conflict Frameworks */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg text-white">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Conflict</h3>
              <div className="h-px bg-amber-200 flex-1"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {frameworks.filter(f => f.usedFor.some(u => u.category === 'conflict')).map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => scrollToFramework(framework.id)}
                  className="flex items-start gap-4 p-4 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 hover:border-amber-300 transition-all duration-200 text-left group"
                >
                  <div className={`p-2 bg-gradient-to-r ${framework.color} rounded-lg text-white group-hover:scale-105 transition-transform flex-shrink-0`}>
                    {framework.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors mb-2">
                      {framework.title}
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {framework.id === 'mediation' && (
                        <>
                          <li>• Two people arguing/avoiding</li>
                          <li>• Find common interests</li>
                          <li>• Preserve relationships</li>
                        </>
                      )}
                      {framework.id === 'interest-based-negotiation' && (
                        <>
                          <li>• Cross-team conflicts</li>
                          <li>• Competing priorities</li>
                          <li>• "How do we both win?"</li>
                        </>
                      )}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Decision Frameworks */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Decision</h3>
              <div className="h-px bg-purple-200 flex-1"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {frameworks.filter(f => f.usedFor.some(u => u.category === 'decision')).map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => scrollToFramework(framework.id)}
                  className="flex items-start gap-4 p-4 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 hover:border-purple-300 transition-all duration-200 text-left group"
                >
                  <div className={`p-2 bg-gradient-to-r ${framework.color} rounded-lg text-white group-hover:scale-105 transition-transform flex-shrink-0`}>
                    {framework.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                      {framework.title}
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {framework.id === 'decision-matrix' && (
                        <>
                          <li>• 3+ viable options</li>
                          <li>• Objective scoring</li>
                          <li>• Clear reasoning</li>
                        </>
                      )}
                      {framework.id === 'pros-cons' && (
                        <>
                          <li>• Strategic decisions</li>
                          <li>• Long-term impact</li>
                          <li>• Second-order effects</li>
                        </>
                      )}
                      {framework.id === 'responsibility-mapping' && (
                        <>
                          <li>• Who does what (RACI)</li>
                          <li>• Eliminate dropped tasks</li>
                          <li>• Clear decision authority</li>
                        </>
                      )}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Stakeholder Frameworks */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Stakeholder</h3>
              <div className="h-px bg-emerald-200 flex-1"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {frameworks.filter(f => f.usedFor.some(u => u.category === 'stakeholder')).map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => scrollToFramework(framework.id)}
                  className="flex items-start gap-4 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 hover:border-emerald-300 transition-all duration-200 text-left group"
                >
                  <div className={`p-2 bg-gradient-to-r ${framework.color} rounded-lg text-white group-hover:scale-105 transition-transform flex-shrink-0`}>
                    {framework.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                      {framework.title}
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {framework.id === 'bound' && (
                        <>
                          <li>• Reset unrealistic expectations</li>
                          <li>• Evidence-based negotiation</li>
                          <li>• Preserve relationships</li>
                        </>
                      )}
                      {framework.id === 'alignment-canvas' && (
                        <>
                          <li>• Leadership buy-in meetings</li>
                          <li>• Organize evidence</li>
                          <li>• Anticipate questions</li>
                        </>
                      )}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Team Dynamics Frameworks */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg text-white">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Team Dynamics</h3>
              <div className="h-px bg-rose-200 flex-1"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {frameworks.filter(f => f.usedFor.some(u => u.category === 'team-dynamics')).map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => scrollToFramework(framework.id)}
                  className="flex items-start gap-4 p-4 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 hover:border-rose-300 transition-all duration-200 text-left group"
                >
                  <div className={`p-2 bg-gradient-to-r ${framework.color} rounded-lg text-white group-hover:scale-105 transition-transform flex-shrink-0`}>
                    {framework.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors mb-2">
                      {framework.title}
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {framework.id === 'delegation-empowerment' && (
                        <>
                          <li>• You're the bottleneck</li>
                          <li>• Develop judgment</li>
                          <li>• Clear boundaries</li>
                        </>
                      )}
                      {framework.id === 'five-dysfunctions' && (
                        <>
                          <li>• Team feels "off"</li>
                          <li>• Polite but unproductive</li>
                          <li>• Trust foundation</li>
                        </>
                      )}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Other Frameworks */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-slate-500 to-gray-600 rounded-lg text-white">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">General Problem-Solving</h3>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {frameworks.filter(f => f.usedFor.some(u => u.category === 'other')).map((framework) => (
                <button
                  key={framework.id}
                  onClick={() => scrollToFramework(framework.id)}
                  className="flex items-start gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 text-left group"
                >
                  <div className={`p-2 bg-gradient-to-r ${framework.color} rounded-lg text-white group-hover:scale-105 transition-transform flex-shrink-0`}>
                    {framework.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
                      {framework.title}
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {framework.id === 'grow' && (
                        <>
                          <li>• Stuck on complex problem</li>
                          <li>• Goal-Reality-Options-Way</li>
                          <li>• Clear next steps</li>
                        </>
                      )}
                    </ul>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Frameworks Grid */}
      <div className="space-y-8">
        {frameworks.map((framework) => (
          <div key={framework.id} id={framework.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden scroll-mt-8">
            {/* Framework Header */}
            <div className={`bg-gradient-to-r ${framework.color} text-white p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl">
                    {framework.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{framework.title}</h2>
                  </div>
                </div>
                <button
                  onClick={() => copyFrameworkLink(framework.id)}
                  className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all duration-200 group"
                  title="Copy link to this framework"
                >
                  {copiedFramework === framework.id ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4" />
                      <span className="text-sm font-medium hidden sm:inline">Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Framework Content */}
            <div className="p-8 space-y-6">
              {/* Used For */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Used in these reflections:</h3>
                <div className="flex flex-wrap gap-2">
                  {framework.usedFor.map((usage, index) => (
                    <button
                      key={index}
                      onClick={() => handleReflectionClick(usage.category, usage.subcategory)}
                      className="group flex items-center gap-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 hover:text-blue-900 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-sm"
                      title={`Start a ${usage.label.toLowerCase()} reflection`}
                    >
                      <span>{usage.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Abbreviation Explanation */}
              {framework.abbreviationExplanation && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-500 rounded-lg text-white">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">What does the abbreviation mean?</h4>
                      <p className="text-amber-800 text-sm">
                        {framework.abbreviationExplanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Why {framework.title}?</h3>
                <p className="text-gray-700 leading-relaxed">
                  {framework.description}
                </p>
              </div>

              {/* When to Use */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">When to use:</h3>
                <p className="text-gray-700 leading-relaxed">
                  {framework.whenToUse}
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key benefits:</h3>
                <ul className="space-y-3">
                  {framework.keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External Resources */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Learn More</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore these trusted resources to deepen your understanding of {framework.title}:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {(() => {
                    const getExternalLinks = (frameworkId: string) => {
                      switch(frameworkId) {
                        case 'sbi':
                          return [
                            { title: "PM101 - The SBI Feedback Framework", url: "https://medium.com/pm101/the-situation-behavior-impact-feedback-framework-e20ce52c9357", description: "Comprehensive guide to using the Situation-Behavior-Impact model" },
                            { title: "CareerMinds - SBI Model Guide", url: "https://careerminds.com/blog/sbi-model-situation-behavior-impact", description: "Practical examples and implementation of the SBI feedback framework" }
                          ];
                        case 'mediation':
                          return [
                            { title: "Mediators Beyond Borders - Mediation Framework", url: "https://mediatorsbeyondborders.org/what-we-do/conflict-literacy-framework/mediation", description: "Professional mediation framework and conflict literacy approach" },
                            { title: "The Workplace Mediator - Project Team Conflicts", url: "https://theworkplacemediator.co.uk/using-mediation-to-resolve-conflicts-in-project-based-teams", description: "Using mediation to resolve conflicts in project-based teams and workplace settings" }
                          ];
                        case 'interest-based-negotiation':
                          return [
                            { title: "Wikipedia - Getting to Yes", url: "https://en.wikipedia.org/wiki/Getting_to_Yes", description: "Overview of the foundational book on principled negotiation and interest-based methods" },
                            { title: "Technical Leaders - Harvard Negotiation Framework", url: "https://www.technical-leaders.com/post/harvard-negotiation-framework-engineering-case-studies", description: "Engineering case studies applying Harvard's negotiation framework in technical leadership" }
                          ];
                        case 'decision-matrix':
                          return [
                            { title: "Shopify - How to Use a Decision Matrix", url: "https://www.shopify.com/blog/decision-matrix", description: "Practical guide to creating and using decision matrices for business decisions" },
                            { title: "Simplilearn - What is Decision Matrix and How to Use", url: "https://www.simplilearn.com/what-is-decision-matrix-how-to-use-article", description: "Comprehensive tutorial on decision matrix methodology and applications" }
                          ];
                        case 'pros-cons':
                          return [
                            { title: "BrainApps - Pros and Cons Lists Essential Guide", url: "https://brainapps.io/blog/2024/12/pros-and-cons-lists-essential/", description: "Comprehensive guide to creating effective pros and cons lists for better decision-making" },
                            { title: "The Geeky Leader - Second Order Thinking", url: "https://thegeekyleader.com/2025/04/13/second-order-thinking-the-key-to-making-better-decisions/", description: "Advanced decision-making strategies using second-order thinking principles" }
                          ];
                        case 'grow':
                          return [
                            { title: "Positive Psychology - GROW Coaching Model", url: "https://positivepsychology.com/grow-coaching-model/", description: "Comprehensive guide to the GROW model with practical examples and applications" },
                            { title: "Wikipedia - GROW Model", url: "https://en.wikipedia.org/wiki/GROW_model", description: "Detailed overview of the GROW model's history, methodology, and variations" }
                          ];
                        case 'responsibility-mapping':
                          return [
                            { title: "Wikipedia - Responsibility Assignment Matrix", url: "https://en.wikipedia.org/wiki/Responsibility_assignment_matrix", description: "Comprehensive overview of RACI matrices and responsibility assignment frameworks" },
                            { title: "CIO - How to Design a Successful RACI Project Plan", url: "https://www.cio.com/article/287088/project-management-how-to-design-a-successful-raci-project-plan.html", description: "Practical guide to implementing RACI matrices in project management" }
                          ];
                        case 'alignment-canvas':
                          return [
                            { title: "LaunchNotes - Stakeholder Alignment Framework", url: "https://www.launchnotes.com/glossary/stakeholder-alignment-framework-in-product-management-and-operations", description: "Comprehensive guide to stakeholder alignment in product management and operations" },
                            { title: "Simply Stakeholders - Stakeholder Alignment", url: "https://simplystakeholders.com/stakeholder-alignment", description: "Practical strategies and tools for achieving effective stakeholder alignment" }
                          ];
                        case 'delegation-empowerment':
                          return [
                            { title: "Your Thought Partner - Benefits of Delegation", url: "https://www.yourthoughtpartner.com/blog/the-benefits-of-delegation-and-why-most-leaders-under-delegate", description: "Comprehensive guide on delegation benefits and why leaders struggle with it" },
                            { title: "PMC - Empowerment Research Study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9806223", description: "Peer-reviewed research on empowerment strategies and organizational effectiveness" }
                          ];
                        case 'five-dysfunctions':
                          return [
                            { title: "Patrick Lencioni - The Table Group Official Guide", url: "https://www.tablegroup.com/topics-and-resources/teamwork-5-dysfunctions", description: "Original author's comprehensive resource on the 5 dysfunctions framework" },
                            { title: "Kaizenko - 5 Dysfunctions Guide for Leaders", url: "https://www.kaizenko.com/lencionis-5-dysfunctions-of-a-team-a-guide-for-product-leaders", description: "Practical application guide for implementing the 5 dysfunctions model in leadership" }
                          ];
                        case 'feedforward-coaching':
                          return [
                            { title: "Small Improvements - The Feedforward Approach", url: "https://www.small-improvements.com/blog/feedback-too-critical-try-the-feedforward-approach/", description: "Practical guide to implementing feedforward instead of traditional feedback" },
                            { title: "Global Coach Group - What is Feedforward?", url: "https://globalcoachgroup.com/what-is-feedforward/", description: "Comprehensive explanation of feedforward principles and applications" }
                          ];
                        case 'bound':
                          return [
                            { title: "Spec Innovations - 8 Ways to Manage Unrealistic Stakeholder Expectations", url: "https://specinnovations.com/blog/8-ways-to-manage-unrealistic-stakeholder-expectations", description: "Practical strategies for handling unrealistic expectations and maintaining stakeholder relationships" },
                            { title: "Simply Stakeholders - How to Deal with Difficult Stakeholders", url: "https://simplystakeholders.com/how-to-deal-with-difficult-stakeholders", description: "Comprehensive guide to managing challenging stakeholder situations and communication strategies" }
                          ];
                        default:
                          return [];
                      }
                    };

                    return getExternalLinks(framework.id).map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 text-sm">
                            {link.title}
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            {link.description}
                          </p>
                        </div>
                      </a>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-2">Ready to get started?</h4>
            <p className="text-blue-800 text-sm">
              Each framework is designed to be practical and immediately actionable. Choose the one that matches your current challenge, or start with a new reflection to get a personalized recommendation.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={() => {
              window.location.href = '/decide';
            }}
            className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="p-1 bg-white bg-opacity-20 rounded-lg">
              <Play className="w-4 h-4" />
            </div>
            Begin Your Reflection Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}