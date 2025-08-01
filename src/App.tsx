import React, { useState } from 'react';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { DecisionTree } from './components/DecisionTree';
import { ReflectionForm } from './components/ReflectionForm';
import { ReflectionHistory } from './components/ReflectionHistory';
import { ReflectionSummary } from './components/ReflectionSummary';
import { ReflectionCompletion } from './components/ReflectionCompletion';
import { FrameworksGuide } from './components/FrameworksGuide';
import { Imprint } from './components/Imprint';
import { useReflections } from './hooks/useLocalStorage';
import { frameworks, getCustomizedFramework } from './data/frameworks';
import { FrameworkType, SituationCategory, Situation } from './types';

type AppState = 
  | 'dashboard'
  | 'decision-tree'
  | 'reflection'
  | 'reflection-complete'
  | 'history'
  | 'view-reflection'
  | 'frameworks-guide'
  | 'imprint';

interface ReflectionSession {
  framework: FrameworkType;
  category: SituationCategory;
  subcategory: string;
  editingReflection?: Situation;
  completedResponses?: Record<string, string>;
  viewingReflection?: Situation;
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('dashboard');
  const [session, setSession] = useState<ReflectionSession | null>(null);
  const [viewingReflection, setViewingReflection] = useState<Situation | null>(null);
  
  const { reflections, addReflection, updateReflection, deleteReflection } = useReflections();

  // Scroll to top whenever the current state changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentState]);

  const handleStartNewReflection = () => {
    setSession(null);
    setCurrentState('decision-tree');
  };

  const handleStartCategoryReflection = (category: string) => {
    setSession(null);
    setCurrentState('decision-tree');
    // We'll pass the category to DecisionTree component
    setSession({ category } as any);
  };
  const handleFrameworkSelected = (framework: FrameworkType, category: SituationCategory, subcategory: string) => {
    setSession({ framework, category, subcategory });
    setCurrentState('reflection');
  };

  const handleSaveReflection = (responses: Record<string, string>) => {
    if (!session) return;

    const problemDescription = getProblemDescription(session.category, session.subcategory);
    const reflectionData = {
      category: session.category,
      subcategory: session.subcategory,
      framework: session.framework,
      title: `${frameworks[session.framework].name} - ${new Date().toLocaleDateString()}`,
      responses,
      status: 'completed' as const,
      problemDescription
    };

    if (session.editingReflection) {
      updateReflection(session.editingReflection.id, reflectionData);
    } else {
      addReflection(reflectionData);
    }

    // Store the responses in session for the completion screen
    setSession(prev => prev ? { ...prev, completedResponses: responses } : null);
    setCurrentState('reflection-complete');
  };

  const handleEditReflection = (reflection: Situation) => {
    setSession({
      framework: reflection.framework,
      category: reflection.category,
      subcategory: reflection.subcategory,
      editingReflection: reflection
    });
    setCurrentState('reflection');
  };

  const handleViewReflection = (reflection: Situation) => {
    setViewingReflection(reflection);
    setCurrentState('view-reflection');
  };

  const handleViewCompletion = (reflection: Situation) => {
    setSession({
      framework: reflection.framework,
      category: reflection.category,
      subcategory: reflection.subcategory,
      viewingReflection: reflection,
      completedResponses: reflection.responses
    });
    setCurrentState('reflection-complete');
  };

  const handleDeleteReflection = (id: string) => {
    if (confirm('🗑️ Are you sure you want to delete this reflection? This action cannot be undone.')) {
      deleteReflection(id);
    }
  };

  const getProblemDescription = (category: SituationCategory, subcategory: string): string => {
    const descriptions: Record<string, Record<string, string>> = {
      conflict: {
        'with-team-member': 'Conflict - With team member',
        'between-team-members': 'Conflict - Between team members',
        'cross-team-conflict': 'Conflict - Cross-team conflict'
      },
      feedback: {
        'positive': 'Feedback - Positive feedback',
        'developmental': 'Feedback - Developmental feedback',
        'peer-to-peer-feedback-facilitation': 'Feedback - Peer-to-peer feedback facilitation'
      },
      decision: {
        'operational': 'Decision - Operational (Team)',
        'strategic': 'Decision - Strategic (Domain/Organization)',
        'ownership-accountability-gaps': 'Decision - Ownership/Accountability gaps'
      },
      stakeholder: {
        'expectation-management': 'Stakeholder - Expectation management',
        'alignment-with-leadership': 'Stakeholder - Alignment with leadership'
      },
      'team-dynamics': {
        'ownership-clarity': 'Team dynamics - Ownership clarity',
        'team-health-check': 'Team dynamics - Team health check'
      },
      other: {
        'free-reflection': 'Other - Free reflection'
      }
    };
    
    return descriptions[category]?.[subcategory] || `${category.charAt(0).toUpperCase() + category.slice(1)} - ${subcategory}`;
  };

  const getTitle = () => {
    switch (currentState) {
      case 'dashboard': return 'Reflect & Act';
      case 'decision-tree': return 'Identify Your Challenge';
      case 'reflection': 
        if (session) {
          const problemDesc = getProblemDescription(session.category, session.subcategory);
          return problemDesc;
        }
        return 'Reflection';
      case 'reflection-complete': return 'Reflection Complete';
      case 'history': return 'Reflection History';
      case 'view-reflection': return viewingReflection?.title || 'Reflection';
      case 'frameworks-guide': return 'Leadership Frameworks Guide';
      case 'imprint': return 'Legal Information';
      default: return 'Reflect & Lead';
    }
  };

  const getHelpText = () => {
    switch (currentState) {
      case 'decision-tree': 
        return 'Answer a few questions to find the best framework for your leadership challenge. This takes less than 30 seconds.';
      case 'reflection': 
        if (session) {
          const framework = frameworks[session.framework];
          return `${framework.name}: ${framework.description}`;
        }
        return '';
      case 'reflection-complete':
        return 'Review your complete reflection and get specific action steps to implement your insights.';
      case 'history': 
        return 'Review your past reflections to identify patterns and track your leadership development over time.';
      case 'frameworks-guide':
        return 'Comprehensive explanations of all available frameworks to help you choose the right approach for your leadership challenges.';
      case 'imprint':
        return 'Legal information and contact details according to § 5 TMG.';
      default: 
        return '';
    }
  };

  const shouldShowBack = currentState !== 'dashboard';

  const handleBack = () => {
    switch (currentState) {
      case 'decision-tree':
      case 'history':
      case 'frameworks-guide':
      case 'imprint':
        setCurrentState('dashboard');
        break;
      case 'reflection':
        setCurrentState('decision-tree');
        setSession(null);
        break;
      case 'reflection-complete':
        if (session?.viewingReflection) {
          setCurrentState('history');
        } else {
          setCurrentState('dashboard');
        }
        setSession(null);
        break;
      case 'view-reflection':
        setCurrentState('history');
        setViewingReflection(null);
        break;
      case 'frameworks-guide':
        setCurrentState('dashboard');
        break;
      default:
        setCurrentState('dashboard');
    }
  };

  const getFrameworkRationale = (frameworkId: string) => {
    const rationales: Record<string, { title: string; description: string; whenToUse: string; keyBenefits: string[] }> = {
      'sbi': {
        title: 'SBI Framework',
        description: 'The Situation-Behavior-Impact framework removes emotion and subjectivity from feedback by focusing on observable facts and their concrete effects.',
        whenToUse: 'Use when you need to give specific feedback about someone\'s actions, whether positive reinforcement or developmental guidance.',
        keyBenefits: [
          'Eliminates defensiveness by focusing on facts, not personality',
          'Creates clear cause-and-effect understanding',
          'Makes feedback specific enough to act on immediately',
          'Works for both praise and constructive feedback'
        ]
      },
      'mediation': {
        title: 'Mediation Framework',
        description: 'Most feedback fails because it\'s vague ("be more collaborative") or feels like an attack ("you\'re not a team player"). SBI gives you a script that focuses on facts, not personality.',
        whenToUse: 'Use when someone did something specific that had a clear impact - either positive (to reinforce) or problematic (to change). Works for any feedback conversation.',
        keyBenefits: [
          'Person can\'t argue with facts - reduces the "that\'s not what I meant" defensiveness',
          'Shows clear cause-and-effect so they understand why it matters',
          'Gives them something specific to repeat (positive) or change (developmental)',
          'Takes the emotion out of difficult conversations'
        ]
      },
      'interest-based-negotiation': {
        title: 'Interest-Based Negotiation',
        description: 'When people are in conflict, they argue about positions ("I want X") instead of interests ("I need Y because..."). This framework gets to the real needs underneath the fight.',
        whenToUse: 'Use when two people are stuck arguing, avoiding each other, or when their conflict is affecting team dynamics. Essential when you need them to keep working together.',
        keyBenefits: [
          'Gets past the surface argument to the real problem (usually different priorities or constraints)',
          'Preserves working relationships instead of creating winners and losers',
          'Both people own the solution because they helped create it',
          'Addresses root causes so the same fight doesn\'t happen again'
        ]
      },
      'decision-matrix': {
        title: 'Decision Matrix',
        description: 'Cross-team conflicts usually happen because teams optimize for their own success metrics. This framework reframes the problem as "how do we both win?" instead of "who gets their way?"',
        whenToUse: 'Use when teams are blocking each other, have competing priorities, or when you need a solution that both teams will actually implement (not just agree to).',
        keyBenefits: [
          'Stops the "us vs them" dynamic that kills cross-team collaboration',
          'Identifies the real constraints each team faces (not just what they\'re asking for)',
          'Creates solutions that make both teams more successful',
          'Builds relationships that prevent future conflicts'
        ]
      },
      'pros-cons': {
        title: 'Pros/Cons Analysis',
        description: 'When you have multiple good options, your brain gets overwhelmed and defaults to gut feeling or the loudest voice in the room. This forces you to define what actually matters and score objectively.',
        whenToUse: 'Use when you have 3+ viable options, when the decision affects multiple people who need to understand your reasoning, or when you\'re second-guessing yourself.',
        keyBenefits: [
          'Breaks decision paralysis by giving you a clear "winner" based on what matters most',
          'Shows your team/boss exactly how you made the decision (builds trust)',
          'Forces you to consider factors you might forget under pressure',
          'Creates a template for similar decisions in the future'
        ]
      },
      'grow': {
        title: 'GROW Model',
        description: 'Most people jump straight to solutions without understanding the real goal or current reality. GROW forces you to get clear on what success looks like before brainstorming how to get there.',
        whenToUse: 'Use when you\'re stuck on a complex problem, when you keep going in circles, or when coaching someone who says "I don\'t know what to do."',
        keyBenefits: [
          'Prevents you from solving the wrong problem by getting clear on the real goal first',
          'Uncovers options you missed because you were focused on obvious solutions',
          'Turns vague intentions ("I should improve X") into specific next steps',
          'Works whether you\'re coaching yourself or helping someone else think through a problem'
        ]
      },
      'responsibility-mapping': {
        title: 'RACI/Responsibility Mapping',
        description: 'The "I thought you were handling that" problem kills projects. RACI forces you to explicitly assign who does the work (R), who\'s accountable for outcomes (A), who gives input (C), and who just needs updates (I).',
        whenToUse: 'Use when tasks are getting dropped, people are duplicating work, decisions are slow because no one knows who decides, or when onboarding new people to complex projects.',
        keyBenefits: [
          'Eliminates the "I thought someone else was doing that" problem completely',
          'Speeds up decisions because everyone knows who has the authority to decide',
          'Stops people from stepping on each other\'s toes or duplicating work',
          'New team members know exactly who to ask about what'
        ]
      },
      'alignment-canvas': {
        title: 'Alignment Canvas',
        description: 'Most people go into leadership meetings hoping to "wing it" or with a vague sense of what they need. This framework forces you to organize your evidence and anticipate the questions you\'ll get.',
        whenToUse: 'Use before any meeting where you need leadership buy-in, budget approval, or strategic decisions. Essential when the stakes are high and you only get one shot.',
        keyBenefits: [
          'Prevents the "I hadn\'t thought of that" moment when leadership asks obvious questions',
          'Organizes your argument so it builds logically instead of jumping around',
          'Dramatically increases your success rate in high-stakes conversations',
          'Shows leadership you think like they do (strategic, evidence-based)'
        ]
      },
      'delegation-empowerment': {
        title: 'Delegation/Empowerment',
        description: 'Most "delegation" is just task assignment with micromanagement. Real empowerment means giving people the context and authority to make decisions within clear boundaries.',
        whenToUse: 'Use when you\'re the bottleneck for decisions, when you want to develop someone\'s judgment, or when you need things to happen without your constant involvement.',
        keyBenefits: [
          'Develops people\'s judgment so they make better decisions over time',
          'Gets you out of the daily weeds so you can focus on bigger problems',
          'Creates a team that doesn\'t need you for every decision',
          'People care more about outcomes when they own the decisions'
        ]
      },
      'five-dysfunctions': {
        title: '5 Dysfunctions of a Team',
        description: 'Team problems usually have a root cause: people don\'t trust each other enough to have real conflicts, so they fake agreement, avoid accountability, and focus on individual success over team results.',
        whenToUse: 'Use when your team feels "off" but you can\'t pinpoint why, when meetings are polite but unproductive, or when people seem disengaged despite being capable.',
        keyBenefits: [
          'Identifies the real problem (usually trust) instead of treating symptoms',
          'Shows you which dysfunction to fix first (they build on each other)',
          'Based on research with thousands of teams, not just theory',
          'Gives you specific actions to take at each level of team development'
        ]
      },
      'feedforward-coaching': {
        title: 'Feedforward Coaching',
        description: 'Peer feedback often turns into blame sessions about past mistakes. Feedforward flips this: instead of "here\'s what you did wrong," it\'s "here\'s what would work better next time."',
        whenToUse: 'Use when facilitating feedback between team members, especially when there\'s tension or when previous feedback conversations went poorly.',
        keyBenefits: [
          'Eliminates defensiveness because you\'re not relitigating past mistakes',
          'Creates specific actions people can take instead of vague "be better" advice',
          'Actually improves relationships instead of creating resentment',
          'People get excited about improving instead of defensive about criticism'
        ]
      }
    };

    return rationales[frameworkId] || {
      title: 'Framework',
      description: 'A structured approach to leadership challenges.',
      whenToUse: 'Applicable to various leadership situations.',
      keyBenefits: ['Provides structure', 'Improves outcomes']
    };
  };

  const renderContent = () => {
    switch (currentState) {
      case 'dashboard':
        return (
          <Dashboard
            onStartNewReflection={handleStartNewReflection}
            onStartCategoryReflection={handleStartCategoryReflection}
            onViewHistory={() => setCurrentState('history')}
            onViewFrameworksGuide={() => setCurrentState('frameworks-guide')}
            reflectionCount={reflections.length}
          />
        );

      case 'decision-tree':
        return (
          <DecisionTree
            onFrameworkSelected={handleFrameworkSelected}
            preselectedCategory={session?.category}
          />
        );

      case 'reflection':
        if (!session) return null;
        return (
          <ReflectionForm
            framework={getCustomizedFramework(session.framework, session.category, session.subcategory)}
            problemDescription={getProblemDescription(session.category, session.subcategory)}
            onSave={handleSaveReflection}
            onCancel={() => setCurrentState('dashboard')}
            initialResponses={session.editingReflection?.responses}
          />
        );

      case 'reflection-complete':
        if (!session) return null;
        return (
          <ReflectionCompletion
            framework={getCustomizedFramework(session.framework, session.category, session.subcategory)}
            responses={session.completedResponses || session.editingReflection?.responses || session.viewingReflection?.responses || {}}
            problemDescription={getProblemDescription(session.category, session.subcategory)}
            onContinue={() => {
              setCurrentState('history');
              setSession(null);
            }}
            onStartNew={() => {
              setSession(null);
              setCurrentState('decision-tree');
            }}
          />
        );

      case 'history':
        return (
          <ReflectionHistory
            reflections={reflections}
            onEdit={handleEditReflection}
            onDelete={handleDeleteReflection}
            onViewCompletion={handleViewCompletion}
          />
        );

      case 'view-reflection':
        if (!viewingReflection) return null;
        return (
          <ReflectionSummary
            reflection={viewingReflection}
            onEdit={() => handleEditReflection(viewingReflection)}
            onDelete={() => handleDeleteReflection(viewingReflection.id)}
          />
        );

      case 'imprint':
        return <Imprint />;

      case 'frameworks-guide':
        return (
          <FrameworksGuide 
            onStartReflection={(category, subcategory) => {
              // Find the appropriate framework for this category/subcategory combination
              const frameworkMapping: Record<string, Record<string, string>> = {
                'feedback': {
                  'positive': 'sbi',
                  'developmental': 'sbi',
                  'peer-to-peer-feedback-facilitation': 'feedforward-coaching'
                },
                'conflict': {
                  'with-team-member': 'mediation',
                  'between-team-members': 'mediation',
                  'cross-team-conflict': 'interest-based-negotiation'
                },
                'decision': {
                  'operational': 'decision-matrix',
                  'strategic': 'pros-cons',
                  'ownership-accountability-gaps': 'responsibility-mapping'
                },
                'stakeholder': {
                  'alignment-with-leadership': 'alignment-canvas'
                },
                'team-dynamics': {
                  'ownership-clarity': 'delegation-empowerment',
                  'team-health-check': 'five-dysfunctions'
                },
                'other': {
                  'free-reflection': 'grow'
                }
              };
              
              const frameworkId = frameworkMapping[category]?.[subcategory];
              if (frameworkId) {
                handleFrameworkSelected(frameworkId as FrameworkType, category as SituationCategory, subcategory);
              }
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout
      title={getTitle()}
      helpText={getHelpText()}
      showBack={shouldShowBack}
      onBack={handleBack}
      onNavigateToImprint={() => setCurrentState('imprint')}
      showFrameworkInfo={currentState === 'reflection' && session !== null}
      frameworkRationale={session ? getFrameworkRationale(session.framework) : undefined}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;