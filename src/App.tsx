import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { DecisionTree } from './components/DecisionTree';
import { ReflectionForm } from './components/ReflectionForm';
import { ReflectionHistory } from './components/ReflectionHistory';
import { ReflectionSummary } from './components/ReflectionSummary';
import { useReflections } from './hooks/useLocalStorage';
import { frameworks, getCustomizedFramework } from './data/frameworks';
import { FrameworkType, SituationCategory, Situation } from './types';

type AppState = 
  | 'dashboard'
  | 'decision-tree'
  | 'reflection'
  | 'history'
  | 'view-reflection';

interface ReflectionSession {
  framework: FrameworkType;
  category: SituationCategory;
  subcategory: string;
  editingReflection?: Situation;
}

function App() {
  const [currentState, setCurrentState] = useState<AppState>('dashboard');
  const [session, setSession] = useState<ReflectionSession | null>(null);
  const [viewingReflection, setViewingReflection] = useState<Situation | null>(null);
  
  const { reflections, addReflection, updateReflection, deleteReflection } = useReflections();

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

    setCurrentState('dashboard');
    setSession(null);
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

  const handleDeleteReflection = (id: string) => {
    if (confirm('Are you sure you want to delete this reflection?')) {
      deleteReflection(id);
    }
  };

  const getProblemDescription = (category: SituationCategory, subcategory: string): string => {
    const descriptions: Record<string, Record<string, string>> = {
      conflict: {
        'with-team-member': 'Conflict with team member',
        'between-team-members': 'Conflict between team members',
        'cross-team-conflict': 'Cross-team conflict'
      },
      feedback: {
        'positive': 'Positive feedback',
        'developmental': 'Developmental feedback',
        'peer-to-peer-feedback-facilitation': 'Peer-to-peer feedback facilitation'
      },
      decision: {
        'operational': 'Operational decision (Team)',
        'strategic': 'Strategic decision (Domain/Organization)',
        'ownership-accountability-gaps': 'Ownership/Accountability gaps'
      },
      stakeholder: {
        'expectation-management': 'Expectation management',
        'alignment-with-leadership': 'Alignment with leadership'
      },
      'team-dynamics': {
        'ownership-clarity': 'Ownership clarity',
        'team-health-check': 'Team health check'
      },
      other: {
        'free-reflection': 'Free reflection'
      }
    };
    
    return descriptions[category]?.[subcategory] || `${category} situation`;
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
      case 'history': return 'Reflection History';
      case 'view-reflection': return viewingReflection?.title || 'Reflection';
      default: return 'Reflect & Lead';
    }
  };

  const getHelpText = () => {
    switch (currentState) {
      case 'decision-tree': 
        return 'Answer a few questions to find the best framework for your leadership challenge. This takes less than 30 seconds.';
      case 'reflection': 
        return session ? `Use the ${frameworks[session.framework].name} to work through your situation step by step.` : '';
      case 'history': 
        return 'Review your past reflections to identify patterns and track your leadership development over time.';
      default: 
        return 'Reflect & Act';
    }
  };

  const shouldShowBack = currentState !== 'dashboard';

  const handleBack = () => {
    switch (currentState) {
      case 'decision-tree':
      case 'history':
        setCurrentState('dashboard');
        break;
      case 'reflection':
        setCurrentState('decision-tree');
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

      case 'history':
        return (
          <ReflectionHistory
            reflections={reflections}
            onEdit={handleEditReflection}
            onDelete={handleDeleteReflection}
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
    >
      {renderContent()}
    </Layout>
  );
}

export default App;