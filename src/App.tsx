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
          return `${problemDesc} - ${frameworks[session.framework].name}`;
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
        return session ? `Use the ${frameworks[session.framework].name} to work through your situation step by step.` : '';
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
    >
      {renderContent()}
    </Layout>
  );
}

export default App;