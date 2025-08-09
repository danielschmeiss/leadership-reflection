import React, { useState, useEffect, Suspense } from 'react';

// Lazy load analytics components to prevent blocking initial render
const SpeedInsights = React.lazy(() => import('@vercel/speed-insights/react').then(module => ({ default: module.SpeedInsights })));
const Analytics = React.lazy(() => import('@vercel/analytics/react').then(module => ({ default: module.Analytics })));

// Lazy load heavy components to reduce initial bundle size
const EnhancedReflectionForm = React.lazy(() => import('./components/EnhancedReflectionForm').then(module => ({ default: module.EnhancedReflectionForm })));
const ReflectionHistory = React.lazy(() => import('./components/ReflectionHistory').then(module => ({ default: module.ReflectionHistory })));
const ReflectionCompletion = React.lazy(() => import('./components/ReflectionCompletion').then(module => ({ default: module.ReflectionCompletion })));
const FrameworksGuide = React.lazy(() => import('./components/FrameworksGuide').then(module => ({ default: module.FrameworksGuide })));
const About = React.lazy(() => import('./components/About').then(module => ({ default: module.About })));
const LocalLLMGuide = React.lazy(() => import('./components/LocalLLMGuide').then(module => ({ default: module.LocalLLMGuide })));
const Privacy = React.lazy(() => import('./components/Privacy').then(module => ({ default: module.Privacy })));

// Keep frequently used components as direct imports
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { DecisionTree } from './components/DecisionTree';
import { ReflectionSummary } from './components/ReflectionSummary';
import { Imprint } from './components/Imprint';
import { useReflections } from './hooks/useLocalStorage';
import { LocalLLMProvider } from './hooks/useLocalLLM';
import { frameworks, getCustomizedFramework } from './data/frameworks';
import { FrameworkType, SituationCategory, Situation, QuestionResponse } from './types';

type AppState = 
  | 'dashboard'
  | 'decision-tree'
  | 'reflection'
  | 'reflection-complete'
  | 'history'
  | 'view-reflection'
  | 'frameworks-guide'
  | 'about'
  | 'imprint'
  | 'local-llm-guide'
  | 'privacy';

interface ReflectionSession {
  framework: FrameworkType;
  category: SituationCategory;
  subcategory: string;
  editingReflection?: Situation;
  completedResponses?: Record<string, string>;
  viewingReflection?: Situation;
}

// URL utilities for routing
const parseURL = (): { route: AppState; params: URLSearchParams } => {
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  const params = url.searchParams;
  
  // Map URL paths to app states
  if (pathname === '/' || pathname === '/dashboard') {
    return { route: 'dashboard', params };
  } else if (pathname === '/decide' || pathname === '/decision-tree') {
    return { route: 'decision-tree', params };
  } else if (pathname.startsWith('/decide/')) {
    // Handle category-specific decision tree routes like /decide/conflict
    const category = pathname.split('/decide/')[1];
    if (category) {
      params.set('category', category);
    }
    return { route: 'decision-tree', params };
  } else if (pathname === '/reflect') {
    return { route: 'reflection', params };
  } else if (pathname === '/complete') {
    return { route: 'reflection-complete', params };
  } else if (pathname === '/history') {
    return { route: 'history', params };
  } else if (pathname === '/view') {
    return { route: 'view-reflection', params };
  } else if (pathname === '/frameworks') {
    return { route: 'frameworks-guide', params };
  } else if (pathname === '/about') {
    return { route: 'about', params };
  } else if (pathname === '/imprint') {
    return { route: 'imprint', params };
  } else if (pathname === '/local-llm-guide') {
    return { route: 'local-llm-guide', params };
  } else if (pathname === '/privacy') {
    return { route: 'privacy', params };
  }
  
  // Default to dashboard for unknown routes
  return { route: 'dashboard', params };
};

const updateURL = (route: AppState, params?: Record<string, string>) => {
  const url = new URL(window.location.href);
  
  // Map app states to URL paths
  switch (route) {
    case 'dashboard':
      url.pathname = '/';
      break;
    case 'decision-tree':
      // Use cleaner URLs for category-specific decision trees
      if (params?.category) {
        url.pathname = `/decide/${params.category}`;
        // Remove category from search params since it's in the path
        const { category, ...otherParams } = params;
        params = otherParams;
      } else {
        url.pathname = '/decide';
      }
      break;
    case 'reflection':
      url.pathname = '/reflect';
      break;
    case 'reflection-complete':
      url.pathname = '/complete';
      break;
    case 'history':
      url.pathname = '/history';
      break;
    case 'view-reflection':
      url.pathname = '/view';
      break;
    case 'frameworks-guide':
      url.pathname = '/frameworks';
      break;
    case 'about':
      url.pathname = '/about';
      break;
    case 'imprint':
      url.pathname = '/imprint';
      break;
    case 'local-llm-guide':
      url.pathname = '/local-llm-guide';
      break;
    case 'privacy':
      url.pathname = '/privacy';
      break;
  }
  
  // Clear existing search params and hash, then add new ones
  url.search = '';
  url.hash = '';
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }
  
  window.history.pushState(null, '', url.toString());
};

function App() {
  const [currentState, setCurrentState] = useState<AppState>(() => {
    const { route } = parseURL();
    return route;
  });
  const [session, setSession] = useState<ReflectionSession | null>(() => {
    const saved = sessionStorage.getItem('reflection-session');
    return saved ? JSON.parse(saved) : null;
  });
  const [viewingReflection, setViewingReflection] = useState<Situation | null>(() => {
    const saved = sessionStorage.getItem('viewing-reflection');
    return saved ? JSON.parse(saved) : null;
  });
  
  const { reflections, addReflection, updateReflection, deleteReflection } = useReflections();

  // Initialize state from URL on page load
  useEffect(() => {
    const { route, params } = parseURL();
    setCurrentState(route);
    
    // Restore session data from URL params
    const framework = params.get('framework') as FrameworkType;
    const category = params.get('category') as SituationCategory;
    const subcategory = params.get('subcategory');
    const reflectionId = params.get('id');
    
    if (route === 'reflection' && framework && category && subcategory) {
      const editingReflection = reflectionId ? reflections.find(r => r.id === reflectionId) : undefined;
      setSession({ framework, category, subcategory, editingReflection });
    } else if (route === 'view-reflection' && reflectionId) {
      const reflection = reflections.find(r => r.id === reflectionId);
      if (reflection) {
        setViewingReflection(reflection);
      } else {
        // Redirect to history if reflection not found
        setCurrentState('history');
        updateURL('history');
      }
    } else if (route === 'reflection-complete' && framework && category && subcategory) {
      const viewingReflection = reflectionId ? reflections.find(r => r.id === reflectionId) : undefined;
      const completedResponses = sessionStorage.getItem('completed-responses');
      setSession({ 
        framework, 
        category, 
        subcategory, 
        viewingReflection,
        completedResponses: completedResponses ? JSON.parse(completedResponses) : undefined
      });
    } else if (route === 'decision-tree' && category) {
      setSession({ category } as Partial<ReflectionSession>);
    } else if (route === 'decision-tree' && !category) {
      // Main decision tree, clear any category-specific session
      setSession(null);
    } else if (route === 'reflection' || route === 'reflection-complete') {
      // If missing required params, redirect to decision tree
      setCurrentState('decision-tree');
      updateURL('decision-tree');
    }
  }, [reflections]);

  // Sync with URL changes (browser back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const { route, params } = parseURL();
      setCurrentState(route);
      
      // Restore session data from URL params
      const framework = params.get('framework') as FrameworkType;
      const category = params.get('category') as SituationCategory;
      const subcategory = params.get('subcategory');
      const reflectionId = params.get('id');
      
      if (route === 'reflection' && framework && category && subcategory) {
        const editingReflection = reflectionId ? reflections.find(r => r.id === reflectionId) : undefined;
        setSession({ framework, category, subcategory, editingReflection });
      } else if (route === 'view-reflection' && reflectionId) {
        const reflection = reflections.find(r => r.id === reflectionId);
        if (reflection) {
          setViewingReflection(reflection);
        } else {
          // Redirect to history if reflection not found
          setCurrentState('history');
          updateURL('history');
        }
      } else if (route === 'reflection-complete' && framework && category && subcategory) {
        const viewingReflection = reflectionId ? reflections.find(r => r.id === reflectionId) : undefined;
        const completedResponses = sessionStorage.getItem('completed-responses');
        setSession({ 
          framework, 
          category, 
          subcategory, 
          viewingReflection,
          completedResponses: completedResponses ? JSON.parse(completedResponses) : undefined
        });
      } else if (route === 'decision-tree' && category) {
        setSession({ category } as Partial<ReflectionSession>);
      } else if (route === 'decision-tree' && !category) {
        // Back to main decision tree, clear any category-specific session
        setSession(null);
        setViewingReflection(null);
      } else if (route === 'reflection' || route === 'reflection-complete') {
        // If missing required params, redirect to decision tree
        setCurrentState('decision-tree');
        updateURL('decision-tree');
      } else {
        // Clear session if no URL params needed
        setSession(null);
        setViewingReflection(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [reflections]);

  // Persist session data
  useEffect(() => {
    if (session) {
      sessionStorage.setItem('reflection-session', JSON.stringify(session));
    } else {
      sessionStorage.removeItem('reflection-session');
    }
  }, [session]);

  useEffect(() => {
    if (viewingReflection) {
      sessionStorage.setItem('viewing-reflection', JSON.stringify(viewingReflection));
    } else {
      sessionStorage.removeItem('viewing-reflection');
    }
  }, [viewingReflection]);

  // Scroll to top whenever the current state changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentState]);

  const handleStartNewReflection = () => {
    setSession(null);
    setCurrentState('decision-tree');
    updateURL('decision-tree');
  };

  const handleStartCategoryReflection = (category: string) => {
    setSession({ category } as Partial<ReflectionSession>);
    setCurrentState('decision-tree');
    updateURL('decision-tree', { category });
  };
  
  const handleFrameworkSelected = (framework: FrameworkType, category: SituationCategory, subcategory: string) => {
    setSession({ framework, category, subcategory });
    setCurrentState('reflection');
    updateURL('reflection', { framework, category, subcategory });
  };

  const handleSaveReflection = (responses: Record<string, QuestionResponse>) => {
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

    // Store completed responses for the completion screen
    sessionStorage.setItem('completed-responses', JSON.stringify(responses));
    
    // Store the responses in session for the completion screen
    setSession(prev => prev ? { ...prev, completedResponses: responses } : null);
    setCurrentState('reflection-complete');
    updateURL('reflection-complete', { 
      framework: session.framework, 
      category: session.category, 
      subcategory: session.subcategory 
    });
  };

  const handleEditReflection = (reflection: Situation) => {
    setSession({
      framework: reflection.framework,
      category: reflection.category,
      subcategory: reflection.subcategory,
      editingReflection: reflection
    });
    setCurrentState('reflection');
    updateURL('reflection', { 
      framework: reflection.framework, 
      category: reflection.category, 
      subcategory: reflection.subcategory,
      id: reflection.id
    });
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
    updateURL('reflection-complete', { 
      framework: reflection.framework, 
      category: reflection.category, 
      subcategory: reflection.subcategory,
      id: reflection.id
    });
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
      case 'dashboard': return 'Reflacto';
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
      case 'about': return 'About Reflacto';
      case 'imprint': return 'Legal Information';
      case 'local-llm-guide': return 'Local LLM Integration';
      case 'privacy': return 'Privacy & Data Collection';
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
      case 'about':
        return 'Learn about the vision behind Reflacto and how it combines leadership development with privacy-first AI integration.';
      case 'imprint':
        return 'Legal information and contact details according to § 5 TMG.';
      case 'local-llm-guide':
        return 'Learn how to integrate local AI models for enhanced privacy and performance in your leadership reflections.';
      case 'privacy':
        return 'Understand how we protect your data and what information we collect to provide this service.';
      default: 
        return '';
    }
  };

  const handleNavigateToDashboard = () => {
    setCurrentState('dashboard');
    updateURL('dashboard');
  };

  const getFrameworkRationale = (frameworkId: string, category?: string, subcategory?: string) => {
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
        description: 'Tensions and disagreements are a natural part of working closely with others. This framework supports open, respectful conversations when a conflict arises—helping you and others better understand what\'s really at stake and find a way forward together.',
        whenToUse: 'Use this when you\'re in a conflict with a team member—or helping two colleagues in conflict—and you want to maintain trust, psychological safety, and a healthy working relationship. Especially helpful when tension is disrupting collaboration or team morale.',
        keyBenefits: [
          'Moves beyond fixed positions to explore what really matters to each person',
          'Shifts the focus from blame to shared understanding',
          'Builds empathy and preserves trust',
          'Leads to agreements that feel fair and workable for everyone involved'
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
        title: 'Stakeholder Alignment Framework',
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
      },
      'bound': {
        title: 'BOUND Framework',
        description: 'When stakeholders have unrealistic expectations, most people either cave in or push back defensively. BOUND helps you reset expectations using facts and collaborative problem-solving instead of conflict.',
        whenToUse: 'Use when facing impossible deadlines, unrealistic scope demands, or when stakeholders don\'t understand technical constraints. Essential when you need to preserve relationships while setting realistic boundaries.',
        keyBenefits: [
          'Uses objective evidence instead of opinions to ground discussions in reality',
          'Uncovers the real business drivers behind unrealistic requests',
          'Creates collaborative solutions that stakeholders help develop and own',
          'Documents agreements to prevent future scope creep and misunderstandings'
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
            onViewHistory={() => {
              setCurrentState('history');
              updateURL('history');
            }}
            onViewFrameworksGuide={() => {
              setCurrentState('frameworks-guide');
              updateURL('frameworks-guide');
            }}
            reflectionCount={reflections.length}
          />
        );

      case 'decision-tree':
        return (
          <DecisionTree
            onFrameworkSelected={handleFrameworkSelected}
            onNavigationChange={(category) => {
              // Update URL when navigating within decision tree
              if (category) {
                updateURL('decision-tree', { category });
              } else {
                updateURL('decision-tree');
              }
            }}
            preselectedCategory={session?.category}
          />
        );

      case 'reflection': {
        if (!session) return null;
        const framework = getCustomizedFramework(session.framework, session.category, session.subcategory);
        
        // Use enhanced form for all frameworks
        return (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
            <EnhancedReflectionForm
              framework={framework}
              problemDescription={getProblemDescription(session.category, session.subcategory)}
              onSave={(responses) => {
                // Store structured responses directly
                handleSaveReflection(responses);
              }}
              onCancel={() => {
                setCurrentState('dashboard');
                updateURL('dashboard');
              }}
              initialResponses={session.editingReflection?.responses || {}}
              category={session.category}
              subcategory={session.subcategory}
              frameworkRationale={getFrameworkRationale(session.framework, session.category, session.subcategory)}
            />
          </Suspense>
        );
      }

      case 'reflection-complete':
        if (!session) return null;
        const reflectionToEdit = session.editingReflection || session.viewingReflection;
        return (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
            <ReflectionCompletion
              framework={getCustomizedFramework(session.framework, session.category, session.subcategory)}
              responses={session.completedResponses || session.editingReflection?.responses || session.viewingReflection?.responses || {}}
              problemDescription={getProblemDescription(session.category, session.subcategory)}
              onContinue={() => {
                setCurrentState('history');
                setSession(null);
                updateURL('history');
              }}
              onStartNew={() => {
                setSession(null);
                setCurrentState('decision-tree');
                updateURL('decision-tree');
              }}
              onEdit={reflectionToEdit ? () => handleEditReflection(reflectionToEdit) : undefined}
            />
          </Suspense>
        );

      case 'history':
        return (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
            <ReflectionHistory
              reflections={reflections}
              onEdit={handleEditReflection}
              onDelete={handleDeleteReflection}
              onViewCompletion={handleViewCompletion}
            />
          </Suspense>
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

      case 'local-llm-guide':
        return (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
            <LocalLLMGuide />
          </Suspense>
        );

      case 'privacy':
        return (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
            <Privacy 
              onBack={() => {
                setCurrentState('dashboard');
                updateURL('dashboard');
              }}
            />
          </Suspense>
        );

      case 'frameworks-guide':
        return (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
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
                    'alignment-with-leadership': 'alignment-canvas',
                    'expectation-management': 'bound'
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
          </Suspense>
        );

      case 'about':
        return (
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
            <About />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <LocalLLMProvider>
      <Layout
        title={getTitle()}
        helpText={getHelpText()}
        onNavigateToImprint={() => {
          setCurrentState('imprint');
          updateURL('imprint');
        }}
        onNavigateToDashboard={handleNavigateToDashboard}
      >
        {renderContent()}
      </Layout>
      
      {/* Load analytics asynchronously after main content */}
      <Suspense fallback={null}>
        <SpeedInsights />
        <Analytics />
      </Suspense>
    </LocalLLMProvider>
  );
}

export default App;