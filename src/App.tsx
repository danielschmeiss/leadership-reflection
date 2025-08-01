import React, { useState } from 'react';
import { useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { DecisionTree } from './components/DecisionTree';
import { ReflectionForm } from './components/ReflectionForm';
import { ReflectionHistory } from './components/ReflectionHistory';
import { ReflectionSummary } from './components/ReflectionSummary';
import { ReflectionCompletion } from './components/ReflectionCompletion';
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
      default:
        setCurrentState('dashboard');
    }
  };

  const getFrameworkRationale = (frameworkId: string) => {
    const rationales: Record<string, { title: string; description: string; whenToUse: string; keyBenefits: string[] }> = {
      'sbi': {
        title: 'SBI Framework',
        description: 'The Situation-Behavior-Impact framework is the gold standard for giving specific, actionable feedback.',
        whenToUse: 'Perfect for both positive recognition and developmental feedback conversations.',
        keyBenefits: [
          'Removes emotion and judgment from feedback',
          'Focuses on observable behaviors, not personality',
          'Shows clear connection between actions and outcomes',
          'Makes feedback specific and actionable'
        ]
      },
      'mediation': {
        title: 'Mediation Framework',
        description: 'A structured approach to resolve conflicts by focusing on underlying interests rather than positions.',
        whenToUse: 'Best for interpersonal conflicts where both parties have valid concerns.',
        keyBenefits: [
          'Moves beyond "who\'s right" to "what\'s needed"',
          'Helps find win-win solutions',
          'Preserves relationships while solving problems',
          'Creates sustainable agreements'
        ]
      },
      'interest-based-negotiation': {
        title: 'Interest-Based Negotiation',
        description: 'Resolves cross-team conflicts by identifying shared interests and collaborative solutions.',
        whenToUse: 'Ideal for conflicts between teams with different priorities but shared organizational goals.',
        keyBenefits: [
          'Transforms competition into collaboration',
          'Addresses root causes, not just symptoms',
          'Creates solutions that benefit all parties',
          'Builds stronger cross-team relationships'
        ]
      },
      'decision-matrix': {
        title: 'Decision Matrix',
        description: 'A systematic approach to evaluate multiple options against defined criteria.',
        whenToUse: 'Perfect for complex operational decisions with multiple factors to consider.',
        keyBenefits: [
          'Removes bias from decision-making',
          'Makes decision rationale transparent',
          'Ensures all important factors are considered',
          'Creates defensible, logical choices'
        ]
      },
      'pros-cons': {
        title: 'Pros/Cons Analysis',
        description: 'A comprehensive evaluation of strategic alternatives considering long-term implications.',
        whenToUse: 'Best for high-stakes strategic decisions that affect the organization\'s direction.',
        keyBenefits: [
          'Forces consideration of both benefits and risks',
          'Aligns decisions with long-term strategy',
          'Engages stakeholders in decision process',
          'Creates thorough documentation for future reference'
        ]
      },
      'grow': {
        title: 'GROW Model',
        description: 'A coaching framework that guides systematic thinking from goals to concrete actions.',
        whenToUse: 'Excellent for complex situations requiring structured problem-solving and planning.',
        keyBenefits: [
          'Provides clear structure for complex thinking',
          'Moves from abstract goals to concrete actions',
          'Encourages creative option generation',
          'Creates accountability through specific commitments'
        ]
      },
      'responsibility-mapping': {
        title: 'RACI/Responsibility Mapping',
        description: 'Clarifies ownership and accountability using the RACI framework (Responsible, Accountable, Consulted, Informed).',
        whenToUse: 'Essential when team members are unclear about roles and decision-making authority.',
        keyBenefits: [
          'Eliminates confusion about who does what',
          'Prevents work from falling through cracks',
          'Reduces conflicts over ownership',
          'Improves team efficiency and coordination'
        ]
      },
      'alignment-canvas': {
        title: 'Alignment Canvas',
        description: 'A structured approach to prepare for and conduct alignment conversations with leadership.',
        whenToUse: 'When you need leadership buy-in, approval, or support for important initiatives.',
        keyBenefits: [
          'Ensures you have all necessary information',
          'Structures your argument logically',
          'Increases likelihood of successful alignment',
          'Demonstrates strategic thinking to leadership'
        ]
      },
      'delegation-empowerment': {
        title: 'Delegation/Empowerment',
        description: 'A framework for effectively delegating tasks and empowering team members to take ownership.',
        whenToUse: 'When you need to distribute ownership and develop team members\' capabilities.',
        keyBenefits: [
          'Develops team members\' skills and confidence',
          'Frees up your time for higher-level work',
          'Creates more resilient and capable teams',
          'Improves team engagement and motivation'
        ]
      },
      'five-dysfunctions': {
        title: '5 Dysfunctions of a Team',
        description: 'Based on Patrick Lencioni\'s model, this framework assesses and improves team health across five key areas.',
        whenToUse: 'When you sense team dynamics issues but need to diagnose the root causes.',
        keyBenefits: [
          'Provides comprehensive team health assessment',
          'Identifies root causes of team problems',
          'Offers clear path for team improvement',
          'Based on proven organizational psychology research'
        ]
      },
      'feedforward-coaching': {
        title: 'Feedforward Coaching',
        description: 'A future-focused approach to peer feedback that emphasizes improvement rather than criticism.',
        whenToUse: 'When facilitating peer feedback conversations that need to stay constructive and forward-looking.',
        keyBenefits: [
          'Keeps conversations positive and solution-focused',
          'Reduces defensiveness in feedback recipients',
          'Builds stronger peer relationships',
          'Creates actionable improvement plans'
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
            onViewHistory={() => setCurrentState('history')}
            reflectionCount={reflections.length}
          />
        );

      case 'decision-tree':
        return (
          <DecisionTree
            onFrameworkSelected={handleFrameworkSelected}
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