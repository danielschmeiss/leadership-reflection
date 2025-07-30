import { Framework, DecisionTreeNode } from '../types';

// Base frameworks - these will be customized based on the specific situation
const baseFrameworks: Record<string, Framework> = {
  sbi: {
    id: 'sbi',
    name: 'SBI Framework',
    description: 'Situation-Behavior-Impact framework for effective feedback',
    questions: [
      {
        id: 'situation',
        text: 'Describe the specific situation (when and where)',
        type: 'textarea',
        required: true,
        placeholder: 'e.g., During yesterday\'s sprint planning meeting...'
      },
      {
        id: 'behavior',
        text: 'What specific behavior did you observe?',
        type: 'textarea',
        required: true,
        placeholder: 'Focus on observable actions, not interpretations...'
      },
      {
        id: 'impact',
        text: 'What was the impact of this behavior?',
        type: 'textarea',
        required: true,
        placeholder: 'How did it affect you, the team, or the outcome?'
      },
      {
        id: 'desired_outcome',
        text: 'What outcome do you want to achieve?',
        type: 'textarea',
        required: true,
        placeholder: 'What change or understanding are you seeking?'
      }
    ]
  },
  grow: {
    id: 'grow',
    name: 'GROW Model',
    description: 'Goal-Reality-Options-Way forward coaching framework',
    questions: [
      {
        id: 'goal',
        text: 'What is your goal or desired outcome?',
        type: 'textarea',
        required: true,
        placeholder: 'Be specific and measurable...'
      },
      {
        id: 'reality',
        text: 'What is the current reality/situation?',
        type: 'textarea',
        required: true,
        placeholder: 'What\'s happening now? What are the facts?'
      },
      {
        id: 'obstacles',
        text: 'What obstacles or challenges exist?',
        type: 'textarea',
        required: true,
        placeholder: 'What\'s preventing progress?'
      },
      {
        id: 'options',
        text: 'What options or alternatives do you have?',
        type: 'textarea',
        required: true,
        placeholder: 'Brainstorm multiple approaches...'
      },
      {
        id: 'way_forward',
        text: 'What specific actions will you take?',
        type: 'textarea',
        required: true,
        placeholder: 'Define concrete next steps with timelines...'
      }
    ]
  },
  mediation: {
    id: 'mediation',
    name: 'Conflict Mediation',
    description: 'Structured approach to resolve conflicts',
    questions: [
      {
        id: 'parties',
        text: 'Who are the parties involved?',
        type: 'textarea',
        required: true,
        placeholder: 'List all stakeholders (use roles, not names for privacy)'
      },
      {
        id: 'issue',
        text: 'What is the core issue?',
        type: 'textarea',
        required: true,
        placeholder: 'Focus on the underlying problem, not symptoms'
      },
      {
        id: 'interests',
        text: 'What are each party\'s underlying interests?',
        type: 'textarea',
        required: true,
        placeholder: 'What does each person really need or care about?'
      },
      {
        id: 'common_ground',
        text: 'What common ground exists?',
        type: 'textarea',
        required: true,
        placeholder: 'Shared goals, values, or concerns...'
      },
      {
        id: 'solutions',
        text: 'What potential solutions could address everyone\'s interests?',
        type: 'textarea',
        required: true,
        placeholder: 'Brainstorm win-win options...'
      }
    ]
  },
  'decision-matrix': {
    id: 'decision-matrix',
    name: 'Decision Matrix',
    description: 'Systematic approach to evaluate options',
    questions: [
      {
        id: 'decision',
        text: 'What decision needs to be made?',
        type: 'textarea',
        required: true,
        placeholder: 'Clearly define the decision to be made...'
      },
      {
        id: 'criteria',
        text: 'What are the key criteria for evaluation?',
        type: 'textarea',
        required: true,
        placeholder: 'List important factors (cost, time, risk, etc.)'
      },
      {
        id: 'options',
        text: 'What options are you considering?',
        type: 'textarea',
        required: true,
        placeholder: 'List all viable alternatives...'
      },
      {
        id: 'stakeholders',
        text: 'Who are the key stakeholders affected?',
        type: 'textarea',
        required: true,
        placeholder: 'Who needs to be consulted or informed?'
      },
      {
        id: 'evaluation',
        text: 'How do the options score against your criteria?',
        type: 'textarea',
        required: true,
        placeholder: 'Rate each option against each criterion...'
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
    if (category === 'feedback') {
      if (subcategory === 'constructive') {
        customizedFramework.questions[0].text = 'Describe the specific situation where you observed the behavior that needs addressing';
        customizedFramework.questions[0].placeholder = 'e.g., During yesterday\'s code review when discussing the API design...';
        customizedFramework.questions[1].text = 'What specific behavior did you observe that you want to address?';
        customizedFramework.questions[1].placeholder = 'e.g., They dismissed the security concerns without discussion and pushed back on suggested changes...';
        customizedFramework.questions[2].text = 'What was the impact of this behavior on you, the team, or the work?';
        customizedFramework.questions[2].placeholder = 'e.g., The team felt their expertise wasn\'t valued, and we may have security vulnerabilities...';
        customizedFramework.questions[3].text = 'What positive change do you want to see from this feedback conversation?';
        customizedFramework.questions[3].placeholder = 'e.g., More collaborative discussion of technical concerns and better security practices...';
      } else if (subcategory === 'positive') {
        customizedFramework.questions[0].text = 'Describe the specific situation where you observed excellent performance';
        customizedFramework.questions[0].placeholder = 'e.g., During the incident response last week when the payment system went down...';
        customizedFramework.questions[1].text = 'What specific positive behaviors did you observe?';
        customizedFramework.questions[1].placeholder = 'e.g., They quickly identified the root cause, communicated clearly with stakeholders, and coordinated the fix...';
        customizedFramework.questions[2].text = 'What was the positive impact of their behavior?';
        customizedFramework.questions[2].placeholder = 'e.g., We resolved the issue 50% faster than usual, customers were well-informed, and the team felt confident...';
        customizedFramework.questions[3].text = 'How do you want them to continue or expand on this behavior?';
        customizedFramework.questions[3].placeholder = 'e.g., Continue taking leadership in incidents and maybe mentor others on incident response...';
      }
    } else if (category === 'stakeholder' && subcategory === 'communication') {
      customizedFramework.questions[0].text = 'Describe the specific communication situation with your stakeholder';
      customizedFramework.questions[0].placeholder = 'e.g., During the quarterly planning meeting with the product team...';
      customizedFramework.questions[1].text = 'What communication behaviors do you want to address?';
      customizedFramework.questions[1].placeholder = 'e.g., They frequently interrupt technical explanations and seem dismissive of engineering constraints...';
      customizedFramework.questions[2].text = 'How is this communication pattern affecting the relationship and work?';
      customizedFramework.questions[2].placeholder = 'e.g., Engineering team feels unheard, technical debt is accumulating, and project timelines are unrealistic...';
      customizedFramework.questions[3].text = 'What improved communication dynamic do you want to achieve?';
      customizedFramework.questions[3].placeholder = 'e.g., More collaborative planning sessions where technical constraints are respected and discussed...';
    }
  } else if (frameworkId === 'grow') {
    if (category === 'feedback' && subcategory === 'difficult') {
      customizedFramework.questions[0].text = 'What is your goal for this difficult conversation?';
      customizedFramework.questions[0].placeholder = 'e.g., Address performance issues while maintaining team relationship and motivation...';
      customizedFramework.questions[1].text = 'What is the current reality of the situation?';
      customizedFramework.questions[1].placeholder = 'e.g., Team member is missing deadlines, code quality has declined, and other team members are frustrated...';
      customizedFramework.questions[2].text = 'What obstacles might prevent a successful conversation?';
      customizedFramework.questions[2].placeholder = 'e.g., They might get defensive, I might avoid being direct enough, or external stressors might be affecting them...';
      customizedFramework.questions[3].text = 'What options do you have for approaching this conversation?';
      customizedFramework.questions[3].placeholder = 'e.g., One-on-one meeting, involve HR, focus on specific examples, explore if they need support...';
      customizedFramework.questions[4].text = 'What specific steps will you take to prepare for and conduct this conversation?';
      customizedFramework.questions[4].placeholder = 'e.g., Schedule private meeting, prepare specific examples, plan to listen for underlying issues, set clear expectations...';
    } else if (category === 'stakeholder' && subcategory === 'expectations') {
      customizedFramework.questions[0].text = 'What is your goal for managing stakeholder expectations?';
      customizedFramework.questions[0].placeholder = 'e.g., Align on realistic timelines and scope while maintaining trust and support for the engineering team...';
      customizedFramework.questions[1].text = 'What is the current reality of stakeholder expectations vs. engineering capacity?';
      customizedFramework.questions[1].placeholder = 'e.g., They expect feature delivery in 2 weeks, but our estimate is 6 weeks due to technical complexity...';
      customizedFramework.questions[2].text = 'What obstacles exist in aligning expectations?';
      customizedFramework.questions[2].placeholder = 'e.g., Lack of technical understanding, pressure from their leadership, previous over-promising, market pressures...';
      customizedFramework.questions[3].text = 'What options do you have for better expectation management?';
      customizedFramework.questions[3].placeholder = 'e.g., Technical deep-dive sessions, phased delivery approach, involve architect in discussions, create visual roadmaps...';
      customizedFramework.questions[4].text = 'What specific actions will you take to improve expectation alignment?';
      customizedFramework.questions[4].placeholder = 'e.g., Schedule technical walkthrough, create detailed project plan, establish regular check-ins, document assumptions...';
    } else if (category === 'other' && subcategory === 'problem-solving') {
      customizedFramework.questions[0].text = 'What specific problem or challenge do you want to solve?';
      customizedFramework.questions[0].placeholder = 'e.g., Team productivity has decreased and morale seems low after the recent reorganization...';
      customizedFramework.questions[1].text = 'What is the current reality of this problem?';
      customizedFramework.questions[1].placeholder = 'e.g., Sprint velocity down 30%, more bugs in production, team members seem disengaged in meetings...';
      customizedFramework.questions[2].text = 'What obstacles or root causes might be contributing to this problem?';
      customizedFramework.questions[2].placeholder = 'e.g., Unclear new roles, loss of team identity, increased context switching, communication gaps...';
      customizedFramework.questions[3].text = 'What options do you have for addressing this problem?';
      customizedFramework.questions[3].placeholder = 'e.g., Team retrospective, one-on-ones with each member, clarify roles and responsibilities, team building activities...';
      customizedFramework.questions[4].text = 'What specific actions will you take to solve this problem?';
      customizedFramework.questions[4].placeholder = 'e.g., Schedule team retrospective this week, conduct individual check-ins, create role clarity document, plan team lunch...';
    }
  } else if (frameworkId === 'decision-matrix') {
    if (category === 'decision' && subcategory === 'complex') {
      customizedFramework.questions[0].text = 'What complex decision needs to be made?';
      customizedFramework.questions[0].placeholder = 'e.g., Choose the architecture approach for our new microservices platform...';
      customizedFramework.questions[1].text = 'What are the key criteria for evaluating this complex decision?';
      customizedFramework.questions[1].placeholder = 'e.g., Scalability, development speed, team expertise, maintenance cost, integration complexity, future flexibility...';
      customizedFramework.questions[2].text = 'What are all the viable options you\'re considering?';
      customizedFramework.questions[2].placeholder = 'e.g., Event-driven architecture, REST-based services, GraphQL federation, hybrid approach...';
      customizedFramework.questions[3].text = 'Who are the key stakeholders that will be affected by this decision?';
      customizedFramework.questions[3].placeholder = 'e.g., Development teams, DevOps, Product managers, QA team, future engineers who will maintain this...';
      customizedFramework.questions[4].text = 'How do you evaluate each option against your criteria?';
      customizedFramework.questions[4].placeholder = 'e.g., Rate each architecture option 1-5 on scalability, development speed, etc. Include reasoning for each score...';
    } else if (category === 'decision' && subcategory === 'urgent') {
      customizedFramework.questions[0].text = 'What urgent decision needs to be made and by when?';
      customizedFramework.questions[0].placeholder = 'e.g., Choose incident response approach for the current production outage - decision needed within 30 minutes...';
      customizedFramework.questions[1].text = 'What are the most critical criteria for this urgent decision?';
      customizedFramework.questions[1].placeholder = 'e.g., Time to resolution, risk of making it worse, resource availability, customer impact...';
      customizedFramework.questions[2].text = 'What are your immediate options?';
      customizedFramework.questions[2].placeholder = 'e.g., Rollback to previous version, apply hotfix, scale up infrastructure, redirect traffic...';
      customizedFramework.questions[3].text = 'Who needs to be involved in or informed about this urgent decision?';
      customizedFramework.questions[3].placeholder = 'e.g., On-call engineer, DevOps lead, Product manager, Customer support, Executive team...';
      customizedFramework.questions[4].text = 'How do you quickly evaluate the options given the time constraint?';
      customizedFramework.questions[4].placeholder = 'e.g., Rollback: Low risk, 5min implementation. Hotfix: Medium risk, 20min implementation. Consider impact vs. speed...';
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
      text: 'Giving or receiving feedback',
      next: 'feedback'
    },
    {
      text: 'Resolving a conflict',
      next: 'conflict'
    },
    {
      text: 'Making a decision',
      next: 'decision'
    },
    {
      text: 'Managing stakeholders',
      next: 'stakeholder'
    },
    {
      text: 'Other leadership challenge',
      next: 'other'
    }
  ]
};

export const decisionTreeNodes: Record<string, DecisionTreeNode> = {
  feedback: {
    id: 'feedback',
    question: 'What type of feedback situation?',
    options: [
      {
        text: 'Giving constructive feedback',
        framework: 'sbi',
        category: 'feedback',
        subcategory: 'constructive'
      },
      {
        text: 'Giving positive feedback',
        framework: 'sbi',
        category: 'feedback',
        subcategory: 'positive'
      },
      {
        text: 'Having a difficult conversation',
        framework: 'grow',
        category: 'feedback',
        subcategory: 'difficult'
      }
    ]
  },
  conflict: {
    id: 'conflict',
    question: 'What type of conflict situation?',
    options: [
      {
        text: 'Team members disagreeing',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'team-conflict'
      },
      {
        text: 'Cross-team conflict',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'cross-team-conflict'
      },
      {
        text: 'Resource or priority disputes',
        framework: 'mediation',
        category: 'conflict',
        subcategory: 'resource-conflict'
      }
    ]
  },
  decision: {
    id: 'decision',
    question: 'What kind of decision?',
    options: [
      {
        text: 'Complex decision with multiple options',
        framework: 'decision-matrix',
        category: 'decision',
        subcategory: 'complex'
      },
      {
        text: 'Quick decision needed',
        framework: 'decision-matrix',
        category: 'decision',
        subcategory: 'urgent'
      }
    ]
  },
  stakeholder: {
    id: 'stakeholder',
    question: 'What stakeholder challenge?',
    options: [
      {
        text: 'Managing expectations',
        framework: 'grow',
        category: 'stakeholder',
        subcategory: 'expectations'
      },
      {
        text: 'Improving communication',
        framework: 'sbi',
        category: 'stakeholder',
        subcategory: 'communication'
      }
    ]
  },
  other: {
    id: 'other',
    question: 'What would be most helpful?',
    options: [
      {
        text: 'Structured problem-solving',
        framework: 'grow',
        category: 'other',
        subcategory: 'problem-solving'
      },
      {
        text: 'Reflection and planning',
        framework: 'grow',
        category: 'other',
        subcategory: 'reflection'
      }
    ]
  }
};