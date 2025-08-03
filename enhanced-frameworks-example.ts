// EXAMPLE: Enhanced Framework Definitions with New Question Types
// This shows how frameworks should be restructured for better user experience

import { Framework } from '../types';

export const enhancedFrameworks: Record<string, Framework> = {
  // Decision Matrix Framework - Perfect example of structured flow
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
        placeholder: 'Enter each option you are evaluating'
      },
      {
        type: 'enumeration',
        id: 'criteria',
        text: 'What criteria are most important for this decision?',
        required: true,
        itemLabel: 'Criterion',
        minItems: 2,
        placeholder: 'Enter evaluation criteria (e.g., cost, speed, team acceptance)',
        helpText: 'Think about factors like cost, timeline, team impact, technical complexity, maintainability, etc.'
      },
      {
        type: 'scoring-matrix',
        id: 'evaluation',
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
        references: [{ questionId: 'evaluation', label: 'Your scoring results' }],
        placeholder: 'Analyze your matrix results and explain your recommended choice'
      },
      {
        type: 'itemized-analysis',
        id: 'risk_analysis',
        text: 'What are the key risks for each option?',
        required: true,
        referencedQuestion: 'options',
        analysisPrompt: 'Identify potential risks and mitigation strategies for this option'
      }
    ]
  },

  // Interest-Based Negotiation - Enumeration followed by analysis
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
        placeholder: 'Enter each team involved'
      },
      {
        type: 'itemized-analysis',
        id: 'team_priorities',
        text: 'What are the main priorities and constraints for each team?',
        required: true,
        referencedQuestion: 'teams',
        analysisPrompt: 'Describe this team\'s priorities, goals, and constraints'
      },
      {
        type: 'itemized-analysis',
        id: 'alignment_analysis',
        text: 'Where do their goals align or conflict?',
        required: true,
        referencedQuestion: 'teams',
        analysisPrompt: 'How does this team\'s goals align or conflict with others?'
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

  // RACI/Responsibility Mapping - Matrix-based approach
  'responsibility-mapping': {
    id: 'responsibility-mapping',
    name: 'RACI/Responsibility Mapping',
    description: 'Framework for clarifying ownership and accountability gaps',
    questions: [
      {
        type: 'enumeration',
        id: 'tasks',
        text: 'What tasks or outcomes need clearer ownership?',
        required: true,
        itemLabel: 'Task/Outcome',
        minItems: 1,
        placeholder: 'Enter each task or outcome with unclear ownership'
      },
      {
        type: 'enumeration',
        id: 'people',
        text: 'Who are the key people involved?',
        required: true,
        itemLabel: 'Person/Role',
        minItems: 2,
        placeholder: 'Enter names or roles of people involved'
      },
      {
        type: 'matrix',
        id: 'raci_matrix',
        text: 'Assign RACI roles for each task',
        required: true,
        rows: [], // Will be populated from 'tasks'
        columns: [], // Will be populated from 'people'
        cellType: 'text',
        helpText: 'Use R (Responsible), A (Accountable), C (Consulted), I (Informed) for each person-task combination',
        references: [
          { questionId: 'tasks', label: 'Tasks to clarify' },
          { questionId: 'people', label: 'People involved' }
        ]
      },
      {
        type: 'textarea',
        id: 'communication_plan',
        text: 'How will you communicate these role clarifications to the team?',
        required: true,
        references: [{ questionId: 'raci_matrix', label: 'RACI assignments' }],
        placeholder: 'Plan how to communicate and establish clear ownership'
      }
    ]
  },

  // Five Dysfunctions - Rating-based assessment
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
        placeholder: 'Provide specific examples of trust-building or trust-limiting behaviors'
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
      // Continue for commitment, accountability, and results...
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

// Key Benefits of This Approach:
// 1. Structured Data Collection - No more parsing bullet points from text
// 2. Automatic References - Questions can reference previous structured data
// 3. Progressive Disclosure - Complex questions broken into manageable steps  
// 4. Type Safety - Each response type has proper validation
// 5. Better UX - Appropriate input types for each data structure
// 6. Reusable Patterns - Matrix, enumeration, analysis patterns work across frameworks