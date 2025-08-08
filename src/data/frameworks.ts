import { Framework, DecisionTreeNode } from '../types';

// New framework definitions based on updated structure
const newFrameworks: Record<string, Framework> = {
  'interest-based-negotiation': {
    id: 'interest-based-negotiation',
    name: 'Interest-based Negotiation',
    description: 'Framework for resolving cross-team conflicts by focusing on underlying interests',
    questions: [
      {
        type: 'enumeration',
        id: 'teams',
        text: 'Which teams are involved in this conflict?',
        required: true,
        itemLabel: 'Team',
        minItems: 2,
        placeholder: 'Frontend Engineering Team',
        helpText: 'List all teams that are part of the conflict or affected by it'
      },
      {
        type: 'itemized-analysis',
        id: 'team_priorities',
        text: 'What are the main priorities and constraints for each team?',
        required: true,
        referencedQuestion: 'teams',
        analysisPrompt: 'Q1 dashboard delivery, limited designers, engagement metrics, IE11 vs modern frameworks...',
        helpText: 'For each team, think about: What are they trying to achieve? What deadlines are they facing? What resources do they need? What organizational pressures are they under? What metrics are they measured on? Understanding these underlying drivers helps identify where teams can collaborate vs. where they truly conflict.'
      },
      {
        type: 'itemized-analysis',
        id: 'alignment_analysis',
        text: 'Where do their goals align or conflict?',
        required: true,
        referencedQuestion: 'teams',
        analysisPrompt: 'How does this team\'s goals align or conflict with others?',
        helpText: 'Look for shared objectives (both teams want the product to succeed), competing priorities (speed vs. quality), resource conflicts (same people/budget), or timeline mismatches. Focus on interests, not positions - what each team really needs to be successful.'
      },
      {
        type: 'textarea',
        id: 'shared_problem',
        text: 'How can you frame this as a shared problem to solve?',
        required: true,
        references: [
          { questionId: 'team_priorities', label: 'Team priorities' },
          { questionId: 'alignment_analysis', label: 'Alignment analysis' }
        ],
        placeholder: 'Reframe the conflict as a mutual challenge to address'
      },
      {
        type: 'textarea',
        id: 'mutual_benefit',
        text: 'What compromise or mutual benefit is possible?',
        required: true,
        references: [{ questionId: 'shared_problem', label: 'Shared problem framing' }],
        placeholder: 'Identify win-win solutions or acceptable compromises'
      }
    ]
  },
  'feedforward-coaching': {
    id: 'feedforward-coaching',
    name: 'Feedforward Coaching',
    description: 'Future-focused approach to peer feedback facilitation',
    questions: [
      {
        id: 'feedback_situation',
        text: 'What is the specific peer feedback situation you need to facilitate?',
        type: 'textarea',
        required: true,
        placeholder: 'Sarah giving Tom feedback on interrupting during planning meetings',
        helpText: 'Be specific about the participants, the behavior or performance area in question, and why this feedback conversation is needed now. Focus on the situation, not your interpretation of it.'
      },
      {
        id: 'current_behavior',
        text: 'What current behavior or pattern needs to be addressed?',
        type: 'textarea',
        required: true,
        placeholder: 'Interrupted 3 times, dismissed concerns, used impatient body language',
        helpText: 'Focus on specific, observable actions rather than personality traits or intentions. Good: "Interrupts others during meetings" Bad: "Has poor communication skills" or "Doesn\'t respect teammates"'
      },
      {
        id: 'future_vision',
        text: 'What would success look like in the future?',
        type: 'textarea',
        required: true,
        placeholder: 'Leading inclusive meetings where all voices are heard',
        helpText: 'Describe the positive future state you want to achieve. What would they be doing differently? How would others experience them? Make it concrete and inspiring, not just the absence of current problems.'
      },
      {
        id: 'practical_suggestions',
        text: 'What specific, actionable suggestions can help them get there?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Suggestion',
        minItems: 2,
        placeholder: 'Create a technical mentorship program',
        helpText: 'Provide concrete, actionable steps they can take. Focus on "next time, try..." rather than "you should stop..." Make each suggestion specific enough that they know exactly what to do.'
      },
      {
        id: 'strengths_to_leverage',
        text: 'What existing strengths can they build on?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Strength',
        minItems: 1,
        placeholder: 'Strong analytical thinking skills',
        helpText: 'Identify their existing capabilities, natural talents, or past successes that can help them improve in this area. This makes the feedback more balanced and builds confidence.'
      },
      {
        id: 'success_metrics',
        text: 'How will progress be measured and tracked?',
        type: 'textarea',
        required: true,
        references: [{ questionId: 'future_vision', label: 'Success vision' }],
        placeholder: '360 feedback scores improve, fewer meeting interruptions recorded',
        helpText: 'Establish clear, measurable ways to track progress toward the future vision. What will you and others observe when they\'re improving? How often will you check in?'
      }
    ]
  },
  'responsibility-mapping': {
    id: 'responsibility-mapping',
    name: 'RACI/Responsibility Mapping',
    description: 'Framework for clarifying ownership and accountability gaps',
    questions: [
      {
        id: 'unclear_tasks',
        text: 'What specific tasks, processes, or outcomes have unclear ownership?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Task/Process',
        minItems: 1,
        placeholder: 'API documentation maintenance',
        helpText: 'Be specific about the work that needs clear ownership. Examples: "Code review process", "Production incident response", "Feature prioritization decisions", "Customer escalation handling"'
      },
      {
        id: 'stakeholders',
        text: 'Who are all the people involved in or affected by these tasks?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Person/Role',
        minItems: 2,
        placeholder: 'Sarah (Senior Frontend Developer)',
        helpText: 'List everyone who currently does this work, should do this work, needs to be consulted, or needs to be informed. Include names or specific roles like "Product Manager", "Tech Lead", "Customer Success"'
      },
      {
        id: 'raci_analysis',
        text: 'For each task, who should be Responsible, Accountable, Consulted, and Informed?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'unclear_tasks',
        analysisPrompt: 'Define the RACI roles for this task',
        helpText: 'For each task: Responsible = does the work, Accountable = owns the outcome (only one person), Consulted = provides input before decisions, Informed = needs to know the outcome. Be specific about who fills each role.'
      },
      {
        id: 'current_confusion',
        text: 'What specific confusion or conflicts are happening now?',
        type: 'textarea',
        required: true,
        placeholder: 'Two PMs both making feature decisions, customer issues unassigned',
        helpText: 'What problems are you seeing? Examples: "Two people both think they own feature decisions", "No one responds to customer escalations", "Duplicate work being done", "Decisions getting blocked because no one has authority"'
      },
      {
        id: 'communication_plan',
        text: 'How will you communicate these role clarifications to the team?',
        type: 'textarea',
        required: true,
        references: [{ questionId: 'raci_analysis', label: 'RACI analysis' }],
        placeholder: 'Team meeting to present RACI, one-on-ones for concerns, wiki updates',
        helpText: 'Consider: team meeting, documentation updates, individual conversations, gradual rollout vs immediate change. How will you ensure everyone understands and accepts their new roles?'
      },
      {
        id: 'accountability_mechanisms',
        text: 'What ongoing mechanisms will maintain role clarity?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Mechanism',
        minItems: 2,
        placeholder: 'Weekly ownership review meetings',
        helpText: 'Think about: regular RACI reviews, role clarity in job descriptions, onboarding process updates, decision logs, escalation paths, performance metrics tied to ownership'
      }
    ]
  },
  'alignment-canvas': {
    id: 'alignment-canvas',
    name: 'Alignment Canvas',
    description: 'Structured approach for aligning with leadership',
    questions: [
      {
        id: 'alignment_context',
        text: 'What is the context requiring leadership alignment?',
        type: 'textarea',
        required: true,
        placeholder: 'Need approval for mobile-first redesign affecting Q2 roadmap',
        helpText: 'Provide the background: What\'s happening? Why now? What triggered the need for this alignment? Be clear about the business context and urgency.'
      },
      {
        id: 'specific_ask',
        text: 'What specific decision, approval, or support do you need?',
        type: 'textarea',
        required: true,
        placeholder: 'Budget approval, 2 developers, delay legacy migration by 1 quarter',
        helpText: 'Be very specific: Are you seeking approval for a plan? Budget for resources? Authority to make decisions? Support for a difficult conversation? The clearer your ask, the easier it is for leadership to respond.'
      },
      {
        id: 'leadership_concerns',
        text: 'What concerns or priorities will leadership likely have?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Concern/Priority',
        minItems: 2,
        placeholder: 'Worried about timeline impact on Q1 goals',
        helpText: 'Think from their perspective: budget impact, timeline concerns, risk to other initiatives, team capacity, customer impact, strategic alignment. What keeps them up at night?'
      },
      {
        id: 'supporting_evidence',
        text: 'What evidence supports your position?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Evidence',
        minItems: 2,
        placeholder: 'User feedback shows 40% want mobile-first redesign',
        helpText: 'Include: data/metrics, customer feedback, team input, industry benchmarks, past successful examples, expert opinions, cost-benefit analysis. Make your case compelling with facts.'
      },
      {
        id: 'address_concerns',
        text: 'How will you address each leadership concern?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'leadership_concerns',
        analysisPrompt: 'How will you address this concern?',
        helpText: 'For each concern: acknowledge it as valid, provide data or reasoning to address it, show how you\'ve mitigated risks, or explain why the benefits outweigh the costs.'
      },
      {
        id: 'communication_strategy',
        text: 'How will you structure your communication for maximum clarity?',
        type: 'textarea',
        required: true,
        references: [
          { questionId: 'specific_ask', label: 'Your specific ask' },
          { questionId: 'supporting_evidence', label: 'Supporting evidence' }
        ],
        placeholder: 'Start with business case, show user data, address timeline concerns',
        helpText: 'Consider: Start with the ask, provide context, present evidence, address concerns, propose next steps. Think about their time constraints and communication preferences.'
      }
    ]
  },
  'delegation-empowerment': {
    id: 'delegation-empowerment',
    name: 'Delegation/Empowerment',
    description: 'Framework for clarifying ownership and empowering team members',
    questions: [
      {
        id: 'ownership_challenges',
        text: 'What ownership or empowerment challenges are you seeing?',
        type: 'textarea',
        required: true,
        placeholder: 'Team waits for approval on routine decisions, tasks falling through cracks',
        helpText: 'Be specific about what you\'re observing: Are people waiting for permission for everything? Are tasks falling through cracks? Are team members afraid to make decisions? Do people escalate things they could handle?'
      },
      {
        id: 'delegatable_items',
        text: 'What tasks, decisions, or areas can be delegated?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Task/Decision/Area',
        minItems: 2,
        placeholder: 'Sprint planning facilitation',
        helpText: 'Consider: routine decisions, technical choices within your domain, process improvements, stakeholder communication, project planning, problem-solving that doesn\'t require your specific expertise'
      },
      {
        id: 'ownership_matching',
        text: 'Who is best positioned to own each delegated item?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'delegatable_items',
        analysisPrompt: 'Who should own this and why are they the right choice?',
        helpText: 'Consider: existing skills, growth interests, workload capacity, stakeholder relationships, career development goals. Match the opportunity to the person\'s strengths and development areas.'
      },
      {
        id: 'empowerment_strategy',
        text: 'How will you set each person up for success in their new ownership?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'delegatable_items',
        analysisPrompt: 'What support, resources, or authority does the owner need?',
        helpText: 'For each delegation: What training do they need? What resources or tools? What authority/decision rights? What boundaries or constraints? How will you communicate their authority to others?'
      },
      {
        id: 'gradual_transition',
        text: 'How will you transition ownership gradually and safely?',
        type: 'textarea',
        required: true,
        references: [{ questionId: 'ownership_matching', label: 'Ownership assignments' }],
        placeholder: 'Start with low-risk tasks, weekly check-ins, gradual authority increase',
        helpText: 'Consider starting with lower-risk items, shadowing/mentoring phases, trial periods, frequent check-ins initially, then gradually reducing oversight. How will you build confidence without micromanaging?'
      },
      {
        id: 'success_metrics',
        text: 'How will you measure empowerment success?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Success Indicator',
        minItems: 2,
        placeholder: 'Reduced escalations to me by 50%',
        helpText: 'Think about: decision velocity, quality of outcomes, team confidence levels, reduced escalations to you, team satisfaction, individual growth, innovation/initiative from team members'
      }
    ]
  },
  'five-dysfunctions': {
    id: 'five-dysfunctions',
    name: '5 Dysfunctions of a Team',
    description: 'Framework for assessing and improving team health',
    questions: [
      {
        type: 'rating',
        id: 'trust_level',
        text: 'How would you rate the level of trust within your team?',
        required: true,
        scale: [1, 5],
        labels: {
          1: 'Very Low - Team members hide weaknesses and mistakes',
          2: 'Low - Limited vulnerability-based trust',
          3: 'Moderate - Some openness about weaknesses',
          4: 'High - Team members admit mistakes and weaknesses',
          5: 'Very High - Complete vulnerability-based trust'
        },
        helpText: 'Vulnerability-based trust: can team members admit weaknesses and mistakes?'
      },
      {
        type: 'textarea',
        id: 'trust_analysis',
        text: 'What specific examples support your trust rating?',
        required: true,
        references: [{ questionId: 'trust_level', label: 'Your trust rating' }],
        placeholder: 'Sarah admitted error, Tom asked for help, but team hesitates on opinions'
      },
      {
        type: 'rating',
        id: 'conflict_handling',
        text: 'How well does your team handle productive conflict?',
        required: true,
        scale: [1, 5],
        labels: {
          1: 'Very Poor - Artificial harmony, no real debates',
          2: 'Poor - Conflicts avoided or handled poorly',
          3: 'Moderate - Some productive disagreement',
          4: 'Good - Regular productive debates',
          5: 'Excellent - Passionate, unfiltered debate around ideas'
        }
      },
      {
        type: 'textarea',
        id: 'conflict_examples',
        text: 'Describe how conflicts are typically handled in your team',
        required: true,
        references: [{ questionId: 'conflict_handling', label: 'Your conflict rating' }],
        placeholder: 'Architecture debate: aired views openly, reached consensus on standards'
      },
      {
        type: 'rating',
        id: 'commitment_strength',
        text: 'How strong is commitment to team goals and decisions?',
        required: true,
        scale: [1, 5],
        labels: {
          1: 'Very Weak - Team members don\'t follow through',
          2: 'Weak - Limited buy-in to decisions',
          3: 'Moderate - Some commitment issues',
          4: 'Strong - Generally good follow-through',
          5: 'Very Strong - Complete commitment to team decisions'
        }
      },
      {
        type: 'textarea',
        id: 'improvement_plan',
        text: 'Based on your assessment, what specific actions will improve team health?',
        required: true,
        references: [
          { questionId: 'trust_analysis', label: 'Trust analysis' },
          { questionId: 'conflict_examples', label: 'Conflict handling' }
        ],
        placeholder: 'Start trust-building: weekly vulnerability exercises, admit own mistakes'
      }
    ]
  }
};

// Base frameworks with their questions
const baseFrameworks: Record<string, Framework> = {
  ...newFrameworks,
  sbi: {
    id: 'sbi',
    name: 'SBI Framework',
    description: 'Situation-Behavior-Impact framework for effective feedback',
    questions: [
      {
        id: 'situation',
        text: 'What specific situation do you want to highlight?',
        type: 'textarea',
        required: true,
        placeholder: 'In yesterday\'s sprint planning, Sarah presented her payment integration analysis...',
        helpText: 'Be specific about when and where this happened. Good: "In yesterday\'s team meeting when we were discussing the Q4 roadmap..." Bad: "You always interrupt people in meetings..."'
      },
      {
        id: 'behavior',
        text: 'What behavior did you observe?',
        type: 'textarea',
        required: true,
        placeholder: 'Sarah asked clarifying questions, suggested three approaches, offered weekend research...',
        helpText: 'Describe only what you saw or heard, like a video camera would record. Good: "You interrupted Sarah three times while she was presenting..." Bad: "You were being disrespectful to Sarah..."'
      },
      {
        id: 'impact',
        text: 'What positive impact did this behavior have?',
        type: 'textarea',
        required: true,
        placeholder: 'Identified critical issues, prevented bugs, increased team confidence, reduced risk estimate...',
        helpText: 'Focus on concrete results and specific effects. Good: "This helped us move quickly through the agenda and everyone felt heard..." Bad: "It was really good leadership..."'
      },
      {
        id: 'reinforcement',
        text: 'How can you ensure this behavior is reinforced?',
        type: 'textarea',
        required: true,
        placeholder: 'Acknowledge in retrospective, assign risk assessment lead role, promote approach to team...',
        helpText: 'Think about recognition, future opportunities, or environmental changes that will encourage more of this behavior. Be specific about what you\'ll do.'
      }
    ]
  },
  mediation: {
    id: 'mediation',
    name: 'Mediation Framework',
    description: 'Structured approach to resolve conflicts',
    questions: [
      {
        id: 'situation',
        text: 'What event triggered the conflict?',
        type: 'textarea',
        required: true,
        placeholder: 'During code review, Alex suggested refactoring Mike\'s auth module, leading to defensive response and ongoing tension...',
        helpText: 'Be factual and objective. Focus on what happened, not why you think it happened. Include specific timing and context that both parties would agree on.'
      },
      {
        id: 'your_interests',
        text: 'What are your needs in this situation?',
        type: 'textarea',
        required: true,
        placeholder: 'Effective collaboration, respected team members, security standards, team cohesion before sprint impact...',
        helpText: 'Go deeper than your initial position. Ask yourself: Why do I want this? What am I really trying to achieve? What would success look like? Focus on needs, not demands.'
      },
      {
        id: 'their_interests',
        text: 'What needs does the other person have?',
        type: 'textarea',
        required: true,
        placeholder: 'Mike: expertise respected, security intact. Alex: meaningful contribution, team value. Both: good work, no conflict...',
        helpText: 'Put yourself in their shoes. What pressures are they facing? What are they trying to accomplish? What would make them feel successful? Avoid assuming negative motives.'
      },
      {
        id: 'solutions',
        text: 'What solutions could work for both parties?',
        type: 'textarea',
        required: true,
        placeholder: 'Security pairing session, knowledge sharing, code review guidelines, mutual mentoring arrangement...',
        helpText: 'Think beyond obvious compromises. Look for creative solutions that give both parties what they really need. Consider options like changing timing, scope, resources, or approach.'
      },
      {
        id: 'common_ground',
        text: 'How can you find common ground?',
        type: 'textarea',
        required: true,
        placeholder: 'Secure code, team respect, product quality, learning growth, great user software...',
        helpText: 'Look for shared interests: team success, customer satisfaction, professional reputation, or project outcomes. These become the foundation for collaborative solutions.'
      }
    ]
  },
  'decision-matrix': {
    id: 'decision-matrix',
    name: 'Decision Matrix',
    description: 'Systematic approach to evaluate options',
    questions: [
      {
        type: 'enumeration',
        id: 'options',
        text: 'What options are you considering?',
        required: true,
        itemLabel: 'Option',
        minItems: 2,
        placeholder: 'React with TypeScript',
        helpText: 'List all viable alternatives you\'re considering. Each option should be a distinct choice.'
      },
      {
        type: 'enumeration',
        id: 'criteria',
        text: 'What criteria are most important for this decision?',
        required: true,
        itemLabel: 'Criterion',
        minItems: 2,
        placeholder: 'Development speed',
        helpText: 'Think about factors like cost, timeline, team impact, technical complexity, maintainability, etc.'
      },
      {
        type: 'scoring-matrix',
        id: 'scoring',
        text: 'Rate each option against each criterion',
        required: true,
        optionsFrom: 'options',
        criteriaFrom: 'criteria',
        scale: [1, 5],
        helpText: 'Rate from 1 (poor) to 5 (excellent) how well each option meets each criterion'
      },
      {
        type: 'textarea',
        id: 'best_option',
        text: 'Based on your scoring, which option ranks highest and why?',
        required: true,
        references: [{ questionId: 'scoring', label: 'Your scoring results' }],
        placeholder: 'Analyze your matrix results and explain your recommended choice',
        helpText: 'Look at the total scores in your matrix above. Explain why the highest-scoring option is the best choice, considering both the numbers and any qualitative factors.'
      },
      {
        type: 'itemized-analysis',
        id: 'risks',
        text: 'What are the key risks for each option?',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'Identify potential risks and mitigation strategies for this option'
      }
    ]
  },
  'pros-cons': {
    id: 'pros-cons',
    name: 'Pros/Cons Analysis',
    description: 'Systematic evaluation of advantages and disadvantages',
    questions: [
      {
        id: 'options',
        text: 'What are the viable options you\'re considering?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Strategic Option',
        minItems: 2,
        placeholder: 'Build in-house analytics platform',
        helpText: 'List the viable strategic alternatives you\'re seriously considering. Each should be a distinct choice with different implications for your organization or domain.'
      },
      {
        id: 'advantages',
        text: 'What are the key advantages or potential upsides of each option?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'Complete control, perfect fit, team skills, no vendor lock-in, competitive advantage...',
        helpText: 'For each option, consider: strategic benefits, competitive advantages, resource gains, risk reduction, growth opportunities, and stakeholder benefits.'
      },
      {
        id: 'disadvantages',
        text: 'What are the risks, costs, or downsides of each option?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'High costs, 6-month delay, specialized hiring, maintenance burden, opportunity cost...',
        helpText: 'For each option, consider: costs, risks, resource requirements, potential negative impacts, opportunity costs, and stakeholder concerns.'
      },
      {
        id: 'alignment',
        text: 'How well does each option align with long-term strategic goals, product direction, or company mission?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'Assess how well this option aligns with strategic goals and vision',
        helpText: 'Consider fit with organizational vision, strategic priorities, values, and long-term objectives. Rate alignment and explain your reasoning.'
      },
      {
        id: 'stakeholders',
        text: 'Who are the critical stakeholders for each option, and what input or buy-in do you need from them?',
        type: 'textarea',
        required: true,
        placeholder: 'For each option, identify key stakeholders (Product, Engineering, Finance, etc.) and specify what input/approval you need from each'
      }
    ]
  },
  raci: {
    id: 'raci',
    name: 'RACI Matrix',
    description: 'Clarify roles and responsibilities using the RACI framework',
    questions: [
      {
        id: 'decision_or_task',
        text: 'What specific decision or task needs role clarity?',
        type: 'textarea',
        required: true,
        placeholder: 'Launch of new payment integration feature',
        helpText: 'Be specific about the decision, project, or task that needs clear roles and responsibilities defined.'
      },
      {
        id: 'people_roles',
        text: 'Who are all the people/roles that should be considered?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Person/Role',
        minItems: 3,
        placeholder: 'Product Manager',
        helpText: 'List all individuals, teams, or roles that might be involved. Include both obvious and potential stakeholders.'
      },
      {
        id: 'responsible',
        text: 'Who is RESPONSIBLE for doing the work?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'people_roles',
        analysisPrompt: 'What specific work is this person/role responsible for doing?',
        helpText: 'Responsible = who actually does the work. Each person should have clear, specific tasks they will execute.'
      },
      {
        id: 'accountable',
        text: 'Who is ACCOUNTABLE for the final outcome?',
        type: 'textarea',
        required: true,
        references: [{ questionId: 'people_roles', label: 'People/Roles to consider' }],
        placeholder: 'Product Manager is ultimately accountable for successful launch and user adoption metrics',
        helpText: 'Accountable = who is ultimately answerable for the success or failure. Usually one person who has final decision authority.'
      },
      {
        id: 'consulted',
        text: 'Who needs to be CONSULTED for input before decisions?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'people_roles',
        analysisPrompt: 'What input or expertise does this person/role need to provide?',
        helpText: 'Consulted = who provides expertise, input, or approval before work happens. Two-way communication.'
      },
      {
        id: 'informed',
        text: 'Who needs to be INFORMED about progress and decisions?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'people_roles',
        analysisPrompt: 'What information does this person/role need and when?',
        helpText: 'Informed = who needs to know about decisions and progress but does not provide input. One-way communication.'
      }
    ]
  },
  bound: {
    id: 'bound',
    name: 'BOUND Framework',
    description: 'Framework for resetting stakeholder expectations',
    questions: [
      {
        id: 'baseline',
        text: 'B – Baseline: What is the realistic situation based on facts, constraints, and what I know right now?',
        type: 'textarea',
        required: true,
        placeholder: 'Our team capacity: 15 story points/sprint. Technical constraints: API rate limits. Dependencies: Security review (2 weeks)...',
        helpText: 'Define realistic delivery scope, effort, and dependencies. Identify hard constraints like capacity, technical limits, regulatory requirements. Prepare data points like velocity, resource availability, historical benchmarks.'
      },
      {
        id: 'objectivity',
        text: 'O – Objectivity: What evidence or reasoning can I use to ground this discussion in reality rather than assumptions?',
        type: 'textarea',
        required: true,
        placeholder: 'Last 3 sprints averaged 12 story points. Similar features took 6 weeks historically. Current team: 3 engineers, 1 on vacation next month...',
        helpText: 'Use facts over opinions: timelines, burn-down rates, resource estimates. Reference past delivery data or benchmarks. Position it as a shared problem to solve, not a personal conflict.'
      },
      {
        id: 'understand',
        text: 'U – Understand: What underlying needs, concerns, or pressures might be shaping this stakeholder\'s expectations?',
        type: 'textarea',
        required: true,
        placeholder: 'Marketing launch planned for conference. CEO committed to board. Client contract has penalty clause. Competitor announced similar feature...',
        helpText: 'Ask why the timeline or scope is critical. Is it market-driven, executive optics, or misunderstanding? This often reveals flexibility in either scope or deadline.'
      },
      {
        id: 'negotiate',
        text: 'N – Negotiate: How can I frame balanced options or trade-offs that lead to a constructive decision?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Option',
        minItems: 2,
        placeholder: 'Deliver MVP by target date, drop advanced analytics',
        helpText: 'Present clear choices: 1) Deliver smaller scope by target date, 2) Extend timeline for full scope, 3) Add resources if possible. Frame as mutually exclusive trade-offs.'
      },
      {
        id: 'document',
        text: 'D – Document: How will I capture and share what we\'ve agreed on so it stays clear and aligned over time?',
        type: 'textarea',
        required: true,
        placeholder: 'Email summary of agreed scope. JIRA epic with locked requirements. Weekly checkpoint meetings. Change request process for additions...',
        helpText: 'Summarize agreed scope/timelines in writing (email, meeting notes, JIRA). Use as reference to prevent scope creep. Revisit regularly to manage scope changes formally.'
      }
    ]
  },
  grow: {
    id: 'grow',
    name: 'GROW Model',
    description: 'Goal-Reality-Options-Will framework for structured reflection',
    questions: [
      {
        id: 'goal',
        text: 'What is the goal you want to achieve in this situation?',
        type: 'textarea',
        required: true,
        placeholder: 'Reduce deployment from 2h to 30min this quarter, maintain zero-downtime, 5min rollbacks...',
        helpText: 'Make your goal SMART: Specific, Measurable, Achievable, Relevant, Time-bound. What would success look like? How will you know when you\'ve achieved it?'
      },
      {
        id: 'reality',
        text: 'What is the current reality?',
        type: 'textarea',
        required: true,
        placeholder: 'Manual scripts, no automated testing, 3-person requirement, maintenance windows only, 2 failed deployments, 15% time spent...',
        helpText: 'Be honest and objective. What resources do you have? What constraints exist? What\'s working well? What challenges are you facing? Avoid judgment - just describe facts.'
      },
      {
        id: 'options',
        text: 'What options are available to you?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Option',
        minItems: 3,
        placeholder: 'Implement CI/CD pipeline with automated testing',
        helpText: 'Brainstorm at least 3-5 different approaches. Include both obvious and creative options. Don\'t evaluate them yet - just generate possibilities.'
      },
      {
        id: 'evaluation',
        text: 'Evaluate each option: what are the pros and cons?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'List the advantages and disadvantages of this option',
        helpText: 'For each option, consider: feasibility, resource requirements, risks, timeline, and likelihood of success. Be realistic about what each approach would require.'
      },
      {
        id: 'will',
        text: 'Which option will you choose and what are your next steps?',
        type: 'textarea',
        required: true,
        references: [
          { questionId: 'options', label: 'Your options' },
          { questionId: 'evaluation', label: 'Option evaluation' }
        ],
        placeholder: 'Choose CI/CD pipeline: 1) Research tools this week, 2) Present Tuesday, 3) Start staging next sprint, 4) Train team...',
        helpText: 'Choose your preferred option and break it down into specific, actionable steps. What will you do first? By when? What support do you need?'
      },
      {
        id: 'next_step',
        text: 'What is your next step?',
        type: 'textarea',
        required: true,
        placeholder: 'Schedule 1-on-1 Thursday, prepare talking points on expectations/timeline/support, confirm bandwidth...'
      }
    ]
  }
};

// Function to get customized framework based on situation
export function getCustomizedFramework(frameworkId: string, category: string, subcategory: string): Framework {
  const baseFramework = baseFrameworks[frameworkId as keyof typeof baseFrameworks];
  if (!baseFramework) return baseFrameworks.sbi;

  // Create a deep copy of the base framework
  const customizedFramework: Framework = {
    ...baseFramework,
    questions: baseFramework.questions.map(q => ({ ...q }))
  };

  // Customize questions based on category and subcategory
  if (frameworkId === 'sbi') {
    if (category === 'feedback' && subcategory === 'developmental') {
      customizedFramework.questions = [
        {
          id: 'situation',
          text: 'What specific situation requires feedback?',
          type: 'textarea',
          required: true,
          placeholder: 'During standup, Mike interrupted Sarah twice while discussing production issue...'
        },
        {
          id: 'behavior',
          text: 'What behavior was problematic?',
          type: 'textarea',
          required: true,
          placeholder: 'Spoke over Sarah, used dismissive language, showed impatient body language...'
        },
        {
          id: 'impact',
          text: 'What negative impact did it have on the team or outcomes?',
          type: 'textarea',
          required: true,
          placeholder: 'Sarah stopped contributing, team missed insights, others seemed uncomfortable...'
        },
        {
          id: 'constructive',
          text: 'How can you phrase feedback constructively and solution-focused?',
          type: 'textarea',
          required: true,
          placeholder: 'Want to discuss communication patterns so everyone\'s expertise gets heard...'
        },
        {
          id: 'support',
          text: 'How will you support the person in improving?',
          type: 'textarea',
          required: true,
          placeholder: 'Pair programming sessions, communication training, regular feedback check-ins'
        }
      ];
    }
  } else if (frameworkId === 'mediation') {
    if (category === 'conflict' && subcategory === 'between-team-members') {
      customizedFramework.questions = [
        {
          id: 'root_cause',
          text: 'What is the root cause of the conflict between the parties?',
          type: 'textarea',
          required: true,
          placeholder: 'Surface: missed deadlines. Root: unclear requirements, unrealistic estimates, no buffer time...'
        },
        {
          id: 'team_impact',
          text: 'How is this conflict impacting daily team dynamics?',
          type: 'textarea',
          required: true,
          placeholder: 'Team avoids raising concerns, less enthusiasm, more side conversations, input doesn\'t matter...'
        },
        {
          id: 'moderator_role',
          text: 'What role should you take as a moderator?',
          type: 'textarea',
          required: true,
          placeholder: 'Listen to both sides, focus on interests not positions, guide toward solutions'
        },
        {
          id: 'resolution_steps',
          text: 'What steps can each side take towards resolution?',
          type: 'textarea',
          required: true,
          placeholder: 'Better planning estimates, clearer requirements, weekly check-ins, shared ownership'
        },
        {
          id: 'future_collaboration',
          text: 'How will you ensure the team collaborates effectively afterwards?',
          type: 'textarea',
          required: true,
          placeholder: 'Retrospective process improvements, conflict resolution training, team charter'
        }
      ];
    }
  } else if (frameworkId === 'raci') {
    if (category === 'stakeholder' && subcategory === 'alignment-with-leadership') {
      customizedFramework.questions = [
        {
          id: 'purpose',
          text: 'What is the purpose of this alignment?',
          type: 'textarea',
          required: true,
          placeholder: 'Why do you need to align with leadership on this topic?'
        },
        {
          id: 'decision_needed',
          text: 'What decision or approval do you need?',
          type: 'textarea',
          required: true,
          placeholder: 'Mobile redesign approval, 2 developers for Q2, $50K budget, delay legacy migration...'
        },
        {
          id: 'information',
          text: 'What information or data must you provide?',
          type: 'textarea',
          required: true,
          placeholder: 'User research data, competitor analysis, revenue impact projections, team capacity'
        },
        {
          id: 'clear_argument',
          text: 'How will you ensure your argumentation is clear and evidence-based?',
          type: 'textarea',
          required: true,
          placeholder: 'Problem statement, solution benefits, resource needs, timeline, risk mitigation'
        }
      ];
    }
  }

  return customizedFramework;
}

// Keep the original export for backward compatibility
export const frameworks: Record<string, Framework> = baseFrameworks;

export const decisionTree: DecisionTreeNode = {
  id: 'root',
  question: 'What situation would you like to reflect on?',
  options: [
    {
      text: 'Handle Team Tensions - When team members aren\'t getting along or there\'s ongoing friction',
      next: 'conflict',
      category: 'conflict'
    },
    {
      text: 'Deliver Feedback - When someone\'s performance or behavior needs to change',
      next: 'feedback',
      category: 'feedback'
    },
    {
      text: 'Make a Decision - When you\'re weighing important options with real consequences',
      next: 'decision',
      category: 'decision'
    },
    {
      text: 'Align with Leadership - When you need buy-in, resources, or support from above',
      next: 'stakeholder',
      category: 'stakeholder'
    },
    {
      text: 'Improve Team Dynamics - When collaboration feels off or people seem disengaged',
      next: 'team-dynamics',
      category: 'team-dynamics'
    },
    {
      text: 'Other - Free-form reflection for unique or complex leadership situations',
      next: 'other',
      category: 'other'
    }
  ]
};

export const decisionTreeNodes: Record<string, DecisionTreeNode> = {
  conflict: {
    id: 'conflict',
    question: 'What type of conflict situation?',
    options: [
      {
        text: 'With team member - You have tension or disagreement with someone on the team',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'with-team-member'
      },
      {
        text: 'Between team members - Two team members are in conflict with each other',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'between-team-members'
      },
      {
        text: 'Cross-team conflict - Different teams have competing priorities or disagreements',
        framework: 'interest-based-negotiation',
        category: 'conflict',
        subcategory: 'cross-team-conflict'
      }
    ]
  },
  feedback: {
    id: 'feedback',
    question: 'What type of feedback situation?',
    options: [
      {
        text: 'Positive feedback',
        framework: 'sbi',
        category: 'feedback',
        subcategory: 'positive'
      },
      {
        text: 'Developmental feedback',
        framework: 'sbi',
        category: 'feedback',
        subcategory: 'developmental'
      },
      {
        text: 'Peer-to-peer feedback facilitation',
        framework: 'feedforward-coaching',
        category: 'feedback',
        subcategory: 'peer-to-peer-feedback-facilitation'
      }
    ]
  },
  decision: {
    id: 'decision',
    question: 'What kind of decision?',
    options: [
      {
        text: 'Operational (Team)',
        framework: 'decision-matrix',
        category: 'decision',
        subcategory: 'operational'
      },
      {
        text: 'Strategic (Domain/Organization)',
        framework: 'pros-cons',
        category: 'decision',
        subcategory: 'strategic'
      },
      {
        text: 'Ownership/Accountability gaps',
        framework: 'responsibility-mapping',
        category: 'decision',
        subcategory: 'ownership-accountability-gaps'
      }
    ]
  },
  stakeholder: {
    id: 'stakeholder',
    question: 'What stakeholder challenge?',
    options: [
      {
        text: 'Expectation management - Reset unrealistic stakeholder demands using evidence-based negotiation',
        framework: 'bound',
        category: 'stakeholder',
        subcategory: 'expectation-management'
      },
      {
        text: 'Alignment with leadership - Prepare for high-stakes conversations with strategic decision-makers',
        framework: 'alignment-canvas',
        category: 'stakeholder',
        subcategory: 'alignment-with-leadership'
      }
    ]
  },
  'team-dynamics': {
    id: 'team-dynamics',
    question: 'What team dynamics challenge?',
    options: [
      {
        text: 'Ownership clarity',
        framework: 'delegation-empowerment',
        category: 'team-dynamics',
        subcategory: 'ownership-clarity'
      },
      {
        text: 'Team health check',
        framework: 'five-dysfunctions',
        category: 'team-dynamics',
        subcategory: 'team-health-check'
      }
    ]
  },
  other: {
    id: 'other',
    question: 'What would be most helpful?',
    options: [
      {
        text: 'Free reflection',
        framework: 'grow',
        category: 'other',
        subcategory: 'free-reflection'
      }
    ]
  }
};