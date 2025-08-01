import { Framework, DecisionTreeNode } from '../types';

// New framework definitions based on updated structure
const newFrameworks: Record<string, Framework> = {
  'interest-based-negotiation': {
    id: 'interest-based-negotiation',
    name: 'Interest-based Negotiation',
    description: 'Framework for resolving cross-team conflicts by focusing on underlying interests',
    questions: [
      {
        id: 'teams_priorities',
        text: 'Which teams are involved and what are their priorities?',
        type: 'textarea',
        required: true,
        placeholder: 'List the teams and their main priorities or goals...'
      },
      {
        id: 'alignment_conflicts',
        text: 'Where do their goals align or conflict?',
        type: 'textarea',
        required: true,
        placeholder: 'Identify areas of alignment and points of conflict...'
      },
      {
        id: 'constraints_pressures',
        text: 'What constraints or pressures influence their positions?',
        type: 'textarea',
        required: true,
        placeholder: 'Consider deadlines, resources, organizational pressures...'
      },
      {
        id: 'shared_problem',
        text: 'How can you frame this as a shared problem to solve?',
        type: 'textarea',
        required: true,
        placeholder: 'Reframe the conflict as a mutual challenge to address...'
      },
      {
        id: 'mutual_benefit',
        text: 'What compromise or mutual benefit is possible?',
        type: 'textarea',
        required: true,
        placeholder: 'Identify win-win solutions or acceptable compromises...'
      }
    ]
  },
  'feedforward-coaching': {
    id: 'feedforward-coaching',
    name: 'Feedforward Coaching',
    description: 'Future-focused approach to peer feedback facilitation',
    questions: [
      {
        id: 'peer_feedback',
        text: 'Which peer feedback is being given?',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the feedback situation between peers...'
      },
      {
        id: 'future_advice',
        text: 'What future-focused advice or suggestions can help?',
        type: 'textarea',
        required: true,
        placeholder: 'Focus on actionable suggestions for improvement...'
      },
      {
        id: 'constructive_framing',
        text: 'How can this be framed constructively without blame?',
        type: 'textarea',
        required: true,
        placeholder: 'Frame feedback positively and solution-oriented...'
      },
      {
        id: 'follow_up',
        text: 'What follow-up will ensure improvement is tracked?',
        type: 'textarea',
        required: true,
        placeholder: 'Define how progress will be monitored and supported...'
      }
    ]
  },
  'responsibility-mapping': {
    id: 'responsibility-mapping',
    name: 'RACI/Responsibility Mapping',
    description: 'Framework for clarifying ownership and accountability gaps',
    questions: [
      {
        id: 'unclear_ownership',
        text: 'What tasks or outcomes are unclear in ownership?',
        type: 'textarea',
        required: true,
        placeholder: 'List specific tasks or outcomes with unclear ownership...'
      },
      {
        id: 'raci_mapping',
        text: 'Who should be responsible, accountable, consulted, and informed?',
        type: 'textarea',
        required: true,
        placeholder: 'Map out RACI for each task or outcome...'
      },
      {
        id: 'overlaps_gaps',
        text: 'Where are overlaps or gaps causing confusion?',
        type: 'textarea',
        required: true,
        placeholder: 'Identify specific areas of confusion or conflict...'
      },
      {
        id: 'clarify_ownership',
        text: 'How can you clarify ownership with the team?',
        type: 'textarea',
        required: true,
        placeholder: 'Plan how to communicate and establish clear ownership...'
      },
      {
        id: 'prevent_ambiguity',
        text: 'What follow-up mechanism will prevent future ambiguity?',
        type: 'textarea',
        required: true,
        placeholder: 'Define ongoing processes to maintain clarity...'
      }
    ]
  },
  'alignment-canvas': {
    id: 'alignment-canvas',
    name: 'Alignment Canvas',
    description: 'Structured approach for aligning with leadership',
    questions: [
      {
        id: 'alignment_purpose',
        text: 'What is the purpose of this alignment?',
        type: 'textarea',
        required: true,
        placeholder: 'Why do you need to align with leadership on this topic?'
      },
      {
        id: 'decision_approval',
        text: 'What decision or approval do you need?',
        type: 'textarea',
        required: true,
        placeholder: 'Be specific about what you need from leadership...'
      },
      {
        id: 'information_data',
        text: 'What information or data must you provide?',
        type: 'textarea',
        required: true,
        placeholder: 'What context and evidence will support your case?'
      },
      {
        id: 'clear_argumentation',
        text: 'How will you ensure your argumentation is clear and evidence-based?',
        type: 'textarea',
        required: true,
        placeholder: 'How will you structure your presentation and reasoning?'
      }
    ]
  },
  'delegation-empowerment': {
    id: 'delegation-empowerment',
    name: 'Delegation/Empowerment',
    description: 'Framework for clarifying ownership and empowering team members',
    questions: [
      {
        id: 'ownership_confusion',
        text: 'What tasks are currently causing confusion around ownership?',
        type: 'textarea',
        required: true,
        placeholder: 'List specific tasks or areas with unclear ownership...'
      },
      {
        id: 'delegatable_decisions',
        text: 'What decisions can be delegated?',
        type: 'textarea',
        required: true,
        placeholder: 'Identify decisions that can be pushed down to the team...'
      },
      {
        id: 'best_suited_owners',
        text: 'Who is best suited to own each task or area?',
        type: 'textarea',
        required: true,
        placeholder: 'Match tasks to team members based on skills and interests...'
      },
      {
        id: 'empowerment_approach',
        text: 'How will you empower them to take responsibility?',
        type: 'textarea',
        required: true,
        placeholder: 'Define how you will support and enable ownership...'
      },
      {
        id: 'accountability_tracking',
        text: 'How will accountability be tracked?',
        type: 'textarea',
        required: true,
        placeholder: 'Establish mechanisms for monitoring and feedback...'
      }
    ]
  },
  'five-dysfunctions': {
    id: 'five-dysfunctions',
    name: '5 Dysfunctions of a Team',
    description: 'Framework for assessing and improving team health',
    questions: [
      {
        id: 'trust_level',
        text: 'Is there enough trust within the team?',
        type: 'textarea',
        required: true,
        placeholder: 'Assess the level of vulnerability-based trust in the team...'
      },
      {
        id: 'conflict_handling',
        text: 'Are conflicts addressed constructively?',
        type: 'textarea',
        required: true,
        placeholder: 'Evaluate how the team handles disagreements and debates...'
      },
      {
        id: 'commitment_strength',
        text: 'Is commitment to goals strong?',
        type: 'textarea',
        required: true,
        placeholder: 'Assess team buy-in and commitment to decisions and goals...'
      },
      {
        id: 'accountability_clarity',
        text: 'Is accountability clear and accepted?',
        type: 'textarea',
        required: true,
        placeholder: 'Evaluate how team members hold each other accountable...'
      },
      {
        id: 'results_focus',
        text: 'Are we achieving results effectively?',
        type: 'textarea',
        required: true,
        placeholder: 'Assess focus on collective results vs individual goals...'
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
        placeholder: 'Describe the specific context, time, and place...'
      },
      {
        id: 'behavior',
        text: 'What behavior did you observe?',
        type: 'textarea',
        required: true,
        placeholder: 'Focus on observable actions, not interpretations...'
      },
      {
        id: 'impact',
        text: 'What positive impact did this behavior have?',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the effect on you, the team, or outcomes...'
      },
      {
        id: 'reinforcement',
        text: 'How can you ensure this behavior is reinforced?',
        type: 'textarea',
        required: true,
        placeholder: 'What steps will help continue this positive behavior?'
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
        text: 'What is the specific situation that triggered the conflict?',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the triggering event or ongoing issue...'
      },
      {
        id: 'your_interests',
        text: 'What are your interests or needs in this situation?',
        type: 'textarea',
        required: true,
        placeholder: 'What do you really need or care about here?'
      },
      {
        id: 'their_interests',
        text: 'What interests or needs do you assume the other person has?',
        type: 'textarea',
        required: true,
        placeholder: 'Try to understand their perspective and needs...'
      },
      {
        id: 'solutions',
        text: 'What possible solutions do you see?',
        type: 'textarea',
        required: true,
        placeholder: 'Brainstorm options that could address both parties\' needs...'
      },
      {
        id: 'common_ground',
        text: 'How can you find common ground?',
        type: 'textarea',
        required: true,
        placeholder: 'What shared goals or values can you build on?'
      }
    ]
  },
  'decision-matrix': {
    id: 'decision-matrix',
    name: 'Decision Matrix',
    description: 'Systematic approach to evaluate options',
    questions: [
      {
        id: 'options',
        text: 'What options are available?',
        type: 'textarea',
        required: true,
        placeholder: 'List all viable alternatives you\'re considering...'
      },
      {
        id: 'criteria',
        text: 'What criteria are most important (e.g., cost, speed, team acceptance)?',
        type: 'textarea',
        required: true,
        placeholder: 'Define the factors that matter most for this decision...'
      },
      {
        id: 'scoring',
        text: 'How does each option score against these criteria?',
        type: 'textarea',
        required: true,
        placeholder: 'Rate each option against each criterion (e.g., 1-5 scale)...'
      },
      {
        id: 'best_option',
        text: 'Which option has the highest overall score?',
        type: 'textarea',
        required: true,
        placeholder: 'Based on your scoring, which option comes out ahead?'
      },
      {
        id: 'risks',
        text: 'What are the potential risks of this decision?',
        type: 'textarea',
        required: true,
        placeholder: 'What could go wrong and how might you mitigate these risks?'
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
        type: 'textarea',
        required: true,
        placeholder: 'List the strategic alternatives you\'re considering...'
      },
      {
        id: 'advantages',
        text: 'What are the advantages of each option?',
        type: 'textarea',
        required: true,
        placeholder: 'List the benefits and positive outcomes for each option...'
      },
      {
        id: 'disadvantages',
        text: 'What are the disadvantages of each option?',
        type: 'textarea',
        required: true,
        placeholder: 'List the drawbacks and potential negative consequences...'
      },
      {
        id: 'alignment',
        text: 'How does each option align with long-term vision or goals?',
        type: 'textarea',
        required: true,
        placeholder: 'Consider strategic fit and long-term implications...'
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
        placeholder: 'List all relevant parties and their roles...'
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
        placeholder: 'Identify areas of confusion or conflicting interests...'
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
        placeholder: 'Be specific about what you want to accomplish...'
      },
      {
        id: 'reality',
        text: 'What is the current reality?',
        type: 'textarea',
        required: true,
        placeholder: 'Describe the current situation objectively...'
      },
      {
        id: 'options',
        text: 'What options are available to you?',
        type: 'textarea',
        required: true,
        placeholder: 'Brainstorm different approaches you could take...'
      },
      {
        id: 'will',
        text: 'Which option will you choose and why?',
        type: 'textarea',
        required: true,
        placeholder: 'Decide on your approach and explain your reasoning...'
      },
      {
        id: 'next_step',
        text: 'What is your next step?',
        type: 'textarea',
        required: true,
        placeholder: 'Define the specific action you will take first...'
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
          placeholder: 'Describe when and where the behavior occurred...'
        },
        {
          id: 'behavior',
          text: 'What behavior was problematic?',
          type: 'textarea',
          required: true,
          placeholder: 'Focus on specific, observable actions...'
        },
        {
          id: 'impact',
          text: 'What negative impact did it have on the team or outcomes?',
          type: 'textarea',
          required: true,
          placeholder: 'Explain the consequences of this behavior...'
        },
        {
          id: 'constructive',
          text: 'How can you phrase feedback constructively and solution-focused?',
          type: 'textarea',
          required: true,
          placeholder: 'Frame the feedback in a way that encourages improvement...'
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
          placeholder: 'Look beyond surface issues to underlying causes...'
        },
        {
          id: 'team_impact',
          text: 'How is this conflict impacting daily team dynamics?',
          type: 'textarea',
          required: true,
          placeholder: 'Describe the effect on team collaboration and morale...'
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
          placeholder: 'Be specific about what you need from leadership...'
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
  question: 'What type of leadership challenge are you facing?',
  options: [
    {
      text: 'Conflict - Tensions or disagreements within the team or with individuals',
      next: 'conflict',
      category: 'conflict'
    },
    {
      text: 'Feedback - Preparation for feedback or performance conversations',
      next: 'feedback',
      category: 'feedback'
    },
    {
      text: 'Decision - Making an important technical or organizational decision',
      next: 'decision',
      category: 'decision'
    },
    {
      text: 'Stakeholder - Managing communication and expectations with stakeholders or leadership',
      next: 'stakeholder',
      category: 'stakeholder'
    },
    {
      text: 'Team dynamics - Improving collaboration, engagement, or clarity within the team',
      next: 'team-dynamics',
      category: 'team-dynamics'
    },
    {
      text: 'Other - Free-form reflection for situations that don\'t fit standard categories',
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
        text: 'I have a conflict with a team member',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'with-team-member'
      },
      {
        text: 'Two team members are in conflict with each other',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'between-team-members'
      },
      {
        text: 'Different teams disagree or have competing priorities',
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
        text: 'Team-level operational decision',
        framework: 'decision-matrix',
        category: 'decision',
        subcategory: 'operational'
      },
      {
        text: 'Strategic or organizational decision',
        framework: 'pros-cons',
        category: 'decision',
        subcategory: 'strategic'
      },
      {
        text: 'Unclear roles and responsibilities',
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