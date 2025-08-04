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
        analysisPrompt: 'Example: "Frontend team needs to deliver new user dashboard by Q1, constrained by limited designer availability, measured on user engagement metrics, facing pressure to support IE11 despite wanting to use modern frameworks"',
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
        placeholder: 'Describe the context: who is giving feedback to whom and about what behavior or performance area',
        helpText: 'Be specific about the participants, the behavior or performance area in question, and why this feedback conversation is needed now. Focus on the situation, not your interpretation of it.'
      },
      {
        id: 'current_behavior',
        text: 'What current behavior or pattern needs to be addressed?',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the specific, observable behavior without judgment',
        helpText: 'Focus on specific, observable actions rather than personality traits or intentions. Good: "Interrupts others during meetings" Bad: "Has poor communication skills" or "Doesn\'t respect teammates"'
      },
      {
        id: 'future_vision',
        text: 'What would success look like in the future?',
        type: 'textarea',
        required: true,
        placeholder: 'Paint a clear picture of the desired future state',
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
        placeholder: 'Define specific, observable indicators of improvement',
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
        placeholder: 'Describe current overlaps, gaps, or conflicts in ownership',
        helpText: 'What problems are you seeing? Examples: "Two people both think they own feature decisions", "No one responds to customer escalations", "Duplicate work being done", "Decisions getting blocked because no one has authority"'
      },
      {
        id: 'communication_plan',
        text: 'How will you communicate these role clarifications to the team?',
        type: 'textarea',
        required: true,
        references: [{ questionId: 'raci_analysis', label: 'RACI analysis' }],
        placeholder: 'Plan your approach for communicating the new ownership structure',
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
        placeholder: 'Describe the situation that requires leadership buy-in or decision',
        helpText: 'Provide the background: What\'s happening? Why now? What triggered the need for this alignment? Be clear about the business context and urgency.'
      },
      {
        id: 'specific_ask',
        text: 'What specific decision, approval, or support do you need?',
        type: 'textarea',
        required: true,
        placeholder: 'Be precise about what you need from leadership',
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
        placeholder: 'Plan your presentation structure and key messages',
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
        placeholder: 'Describe the current situation with team ownership and decision-making',
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
        placeholder: 'Plan a phased approach to transferring ownership',
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
        placeholder: 'Example: "Last week, Sarah admitted she made an error in the database migration that caused the staging issue. Tom openly asked for help with the React components he\'s struggling with. However, I notice people still hesitate to voice unpopular opinions in meetings, and some team members avoid asking questions that might seem basic..."'
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
        placeholder: 'Give examples of recent conflicts and how they were resolved'
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
        placeholder: 'Create specific, actionable steps to address the lowest-rated dysfunctions first'
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
        placeholder: 'Example: "During yesterday\'s sprint planning meeting when we were reviewing the user story estimates, Sarah presented her analysis of the payment integration complexity..."',
        helpText: 'Be specific about when and where this happened. Good: "In yesterday\'s team meeting when we were discussing the Q4 roadmap..." Bad: "You always interrupt people in meetings..."'
      },
      {
        id: 'behavior',
        text: 'What behavior did you observe?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Sarah asked clarifying questions about edge cases, suggested three specific technical approaches, and offered to research the security implications over the weekend..."',
        helpText: 'Describe only what you saw or heard, like a video camera would record. Good: "You interrupted Sarah three times while she was presenting..." Bad: "You were being disrespectful to Sarah..."'
      },
      {
        id: 'impact',
        text: 'What positive impact did this behavior have?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Her questions helped us identify two critical issues we hadn\'t considered, which prevented production bugs. The team felt more confident about the technical approach, and we reduced our risk estimate from high to medium..."',
        helpText: 'Focus on concrete results and specific effects. Good: "This helped us move quickly through the agenda and everyone felt heard..." Bad: "It was really good leadership..."'
      },
      {
        id: 'reinforcement',
        text: 'How can you ensure this behavior is reinforced?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "I\'ll acknowledge Sarah\'s thorough analysis in our team retrospective, ask her to lead technical risk assessment for our next major feature, and encourage the team to adopt her approach of researching edge cases before finalizing estimates..."',
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
        placeholder: 'Example: "Last Tuesday during the code review, Alex suggested refactoring Mike\'s authentication module. Mike responded that Alex doesn\'t understand the security requirements and hasn\'t worked on this system before. Since then, they\'ve been avoiding each other and tensions are affecting team morale..."',
        helpText: 'Be factual and objective. Focus on what happened, not why you think it happened. Include specific timing and context that both parties would agree on.'
      },
      {
        id: 'your_interests',
        text: 'What are your needs in this situation?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "I need the team to collaborate effectively and maintain code quality standards. I want both engineers to feel respected and valued. I need to ensure our security requirements are met while also being open to improvements. Most importantly, I need to restore team cohesion before it affects our sprint goals..."',
        helpText: 'Go deeper than your initial position. Ask yourself: Why do I want this? What am I really trying to achieve? What would success look like? Focus on needs, not demands.'
      },
      {
        id: 'their_interests',
        text: 'What needs does the other person have?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Mike needs to feel his expertise is respected and that security won\'t be compromised. Alex needs to contribute meaningfully and be seen as a valuable team member. Both likely want to do good work and avoid ongoing conflict..."',
        helpText: 'Put yourself in their shoes. What pressures are they facing? What are they trying to accomplish? What would make them feel successful? Avoid assuming negative motives.'
      },
      {
        id: 'solutions',
        text: 'What solutions could work for both parties?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Pair Alex with Mike on a security review session, create a team knowledge-sharing session on authentication best practices, establish code review guidelines that separate technical suggestions from personal criticism, or have Mike mentor Alex on security while Alex helps Mike with refactoring techniques..."',
        helpText: 'Think beyond obvious compromises. Look for creative solutions that give both parties what they really need. Consider options like changing timing, scope, resources, or approach.'
      },
      {
        id: 'common_ground',
        text: 'How can you find common ground?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Both engineers want to build secure, maintainable code and be respected team members. We all care about product quality and team success. Both value learning and growth. We share a commitment to delivering great software for our users..."',
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
        text: 'What strategic options are available?',
        type: 'enumeration',
        required: true,
        itemLabel: 'Strategic Option',
        minItems: 2,
        placeholder: 'Build in-house analytics platform',
        helpText: 'List all viable strategic alternatives. Each should be a distinct choice with different implications for your organization or domain.'
      },
      {
        id: 'advantages',
        text: 'What are the advantages of each option?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'Example for in-house platform: "Complete control over features, perfect fit for our needs, team learns new skills, no vendor lock-in, potential competitive advantage"',
        helpText: 'For each option, consider: strategic benefits, competitive advantages, resource gains, risk reduction, growth opportunities, and stakeholder benefits.'
      },
      {
        id: 'disadvantages',
        text: 'What are the disadvantages of each option?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'Example: "High development costs, 6-month delay to market, requires hiring specialized talent, ongoing maintenance burden, opportunity cost of other features"',
        helpText: 'For each option, consider: costs, risks, resource requirements, potential negative impacts, opportunity costs, and stakeholder concerns.'
      },
      {
        id: 'alignment',
        text: 'How does each option align with long-term vision or goals?',
        type: 'itemized-analysis',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'Assess how well this option aligns with strategic goals and vision',
        helpText: 'Consider fit with organizational vision, strategic priorities, values, and long-term objectives. Rate alignment and explain your reasoning.'
      },
      {
        id: 'stakeholders',
        text: 'Which stakeholders need to be engaged?',
        type: 'textarea',
        required: true,
        placeholder: 'Who needs to be involved in or informed about this decision?'
      }
    ]
  },
  raci: {
    id: 'raci',
    name: 'RACI/Alignment',
    description: 'Framework for stakeholder alignment and role clarity',
    questions: [
      {
        id: 'stakeholders',
        text: 'Who are the key stakeholders involved?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Product Manager (defines requirements), Frontend Team (implements UI), Backend Team (provides APIs), QA Team (tests integration), DevOps (handles deployment), Security Team (reviews compliance)..."'
      },
      {
        id: 'expectations',
        text: 'What are their expectations?',
        type: 'textarea',
        required: true,
        placeholder: 'What does each stakeholder expect or need?'
      },
      {
        id: 'misunderstandings',
        text: 'Where do misunderstandings or conflicting goals exist?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Product wants more features while Engineering wants stability. QA expectations unclear on testing scope. DevOps unsure about deployment windows. Frontend assumes Backend APIs ready, but Backend team hasn\'t confirmed timeline. Security requirements communicated late in process..."'
      },
      {
        id: 'transparency',
        text: 'How will you create transparency around status and decisions?',
        type: 'textarea',
        required: true,
        placeholder: 'What communication mechanisms will you establish?'
      },
      {
        id: 'roles',
        text: 'How do you ensure everyone understands their role?',
        type: 'textarea',
        required: true,
        placeholder: 'How will you clarify responsibilities and decision rights?'
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
        placeholder: 'Example: "Reduce our deployment time from 2 hours to 30 minutes within the next quarter, while maintaining zero-downtime deployments and improving our rollback capabilities to under 5 minutes..."',
        helpText: 'Make your goal SMART: Specific, Measurable, Achievable, Relevant, Time-bound. What would success look like? How will you know when you\'ve achieved it?'
      },
      {
        id: 'reality',
        text: 'What is the current reality?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Currently we have manual deployment scripts, no automated testing in production pipeline, deployments require 3 people and happen only during maintenance windows. We\'ve had 2 failed deployments this month requiring 4-hour rollbacks. Team spends 15% of time on deployment-related issues..."',
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
        placeholder: 'Example: "I\'ll implement the CI/CD pipeline approach because it addresses our core issues and has manageable risks. Next steps: 1) Research GitLab CI vs Jenkins (this week), 2) Present proposal to team (next Tuesday), 3) Start with staging environment (next sprint), 4) Train team on new process (ongoing)..."',
        helpText: 'Choose your preferred option and break it down into specific, actionable steps. What will you do first? By when? What support do you need?'
      },
      {
        id: 'next_step',
        text: 'What is your next step?',
        type: 'textarea',
        required: true,
        placeholder: 'Example: "Schedule 1-on-1 with Sarah this Thursday to discuss her interest in leading the mobile project. Prepare talking points about expectations, timeline, and support she\'ll need. Confirm she has bandwidth given her current commitments..."'
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
          placeholder: 'Example: "In Friday\'s team standup when discussing the production issue, Mike interrupted Sarah twice while she was explaining the timeline impact, then dismissed her concerns about user impact by saying \'users will understand\' without addressing her technical points..."'
        },
        {
          id: 'behavior',
          text: 'What behavior was problematic?',
          type: 'textarea',
          required: true,
          placeholder: 'Example: "Mike spoke over Sarah, used dismissive language, didn\'t ask follow-up questions about her concerns, showed impatient body language (sighing, looking at phone), and ended the discussion without allowing Sarah to finish her explanation..."'
        },
        {
          id: 'impact',
          text: 'What negative impact did it have on the team or outcomes?',
          type: 'textarea',
          required: true,
          placeholder: 'Example: "Sarah looked frustrated and stopped contributing ideas for the rest of the meeting. The team missed important technical insights about the production issue. Other team members seemed uncomfortable with the dynamic, and I noticed less participation from everyone afterward..."'
        },
        {
          id: 'constructive',
          text: 'How can you phrase feedback constructively and solution-focused?',
          type: 'textarea',
          required: true,
          placeholder: 'Example: "I want to talk about communication patterns in our standups so we can make sure everyone\'s expertise gets heard. When team members get interrupted, we lose valuable insights that could prevent issues. I\'d like to discuss how we can create space for everyone to contribute fully..."'
        },
        {
          id: 'support',
          text: 'How will you support the person in improving?',
          type: 'textarea',
          required: true,
          placeholder: 'What resources, guidance, or support will you provide?'
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
          placeholder: 'Example: "Surface issue is missed deadlines, but root cause might be unclear requirements from Product, insufficient technical discovery time, pressure to commit to unrealistic estimates, or lack of buffer for unexpected complexity. Need to examine our planning process, not just blame individuals..."'
        },
        {
          id: 'team_impact',
          text: 'How is this conflict impacting daily team dynamics?',
          type: 'textarea',
          required: true,
          placeholder: 'Example: "Team members avoid bringing up concerns in meetings, leading to issues discovered late. People seem less enthusiastic about brainstorming sessions. I notice more side conversations and less direct collaboration. Two team members mentioned feeling like their input doesn\'t matter..."'
        },
        {
          id: 'moderator_role',
          text: 'What role should you take as a moderator?',
          type: 'textarea',
          required: true,
          placeholder: 'How will you facilitate resolution while staying neutral?'
        },
        {
          id: 'resolution_steps',
          text: 'What steps can each side take towards resolution?',
          type: 'textarea',
          required: true,
          placeholder: 'What actions can each party commit to?'
        },
        {
          id: 'future_collaboration',
          text: 'How will you ensure the team collaborates effectively afterwards?',
          type: 'textarea',
          required: true,
          placeholder: 'What ongoing measures will prevent future conflicts?'
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
          placeholder: 'Example: "I need approval for the mobile-first redesign project, allocation of 2 senior developers for Q2, budget of $50K for design tools and user research, and commitment to delay the legacy feature migration by one quarter to allow focus on this strategic initiative..."'
        },
        {
          id: 'information',
          text: 'What information or data must you provide?',
          type: 'textarea',
          required: true,
          placeholder: 'What context and evidence will support your case?'
        },
        {
          id: 'clear_argument',
          text: 'How will you ensure your argumentation is clear and evidence-based?',
          type: 'textarea',
          required: true,
          placeholder: 'How will you structure your presentation and reasoning?'
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
  question: 'What\'s your biggest leadership challenge right now?',
  options: [
    {
      text: 'Handle Team Tensions - When team members aren\'t getting along or there\'s ongoing friction',
      next: 'conflict',
      category: 'conflict'
    },
    {
      text: 'Deliver Difficult Feedback - When someone\'s performance or behavior needs to change',
      next: 'feedback',
      category: 'feedback'
    },
    {
      text: 'Make a Tough Decision - When you\'re weighing important options with real consequences',
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
        text: 'With team member',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'with-team-member'
      },
      {
        text: 'Between team members',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'between-team-members'
      },
      {
        text: 'Cross-team conflict',
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
        text: 'Expectation management',
        framework: 'raci',
        category: 'stakeholder',
        subcategory: 'expectation-management'
      },
      {
        text: 'Alignment with leadership',
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