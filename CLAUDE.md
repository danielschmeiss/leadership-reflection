# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- `npm run dev` - Start development server with hot reload at http://localhost:5173
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Architecture Overview

This is a **React + TypeScript** application built with Vite that provides a structured reflection tool for engineering leaders. The app uses a clean **content-code separation** architecture for maintainability and internationalization readiness.

### Core Architecture Patterns

**State Management**: Uses React hooks with localStorage persistence via custom `useLocalStorage` hook. No external state library - all state is component-local or stored in localStorage.

**Routing**: Simple state-based routing using `AppState` enum in App.tsx rather than React Router. Navigation is handled through `setCurrentState()` calls.

**Content Management**: All UI text, labels, help content, and framework definitions are externalized to JSON files in `src/data/` for easy updates without code changes.

### Key Components

- **App.tsx** - Main application logic, state management, and routing
- **Layout.tsx** - App shell with navigation, back button, and framework info
- **Dashboard.tsx** - Home screen with reflection statistics and quick actions
- **DecisionTree.tsx** - Guided framework selection based on situation type
- **ReflectionForm.tsx** - Dynamic form generation based on selected framework
- **ReflectionCompletion.tsx** - Results display with action insights and PDF export

### Framework System

The app uses a **decision tree** approach to select appropriate leadership frameworks:

1. **Decision Tree Navigation** (`src/data/frameworks.ts`): Users answer 2 questions to classify their challenge
2. **Framework Customization** (`getCustomizedFramework()`): Questions are dynamically customized based on situation context
3. **Content Externalization**: Framework definitions, questions, help text, and action insights are in separate JSON files

**Available Frameworks**:
- SBI (Situation-Behavior-Impact) for feedback
- GROW Model for coaching and problem-solving
- Mediation Framework for interpersonal conflicts
- Interest-Based Negotiation for cross-team conflicts
- Decision Matrix for operational decisions
- Pros/Cons Analysis for strategic decisions
- RACI/Responsibility Mapping for ownership clarity
- Alignment Canvas for leadership alignment
- Delegation/Empowerment for team ownership
- 5 Dysfunctions of a Team for team health
- Feedforward Coaching for peer feedback

### Data Architecture

**Local Storage Schema**:
```typescript
interface Situation {
  id: string;
  category: SituationCategory;
  subcategory: string;
  framework: FrameworkType;
  title: string;
  responses: Record<string, string>;
  status: 'draft' | 'completed';
  problemDescription?: string;
}
```

**Content Files** (`src/data/`):
- `frameworks.ts` - Framework definitions and decision tree logic
- `content.json` - UI text, labels, buttons, help text
- `actionInsights.json` - Framework-specific action plans and next steps
- `frameworkRationales.json` - Detailed framework explanations
- `questionHelp.json` - Context-sensitive help for reflection questions

### TypeScript Integration

The codebase uses strict TypeScript with comprehensive type definitions in `src/types/index.ts`. All components are fully typed, including framework definitions, question schemas, and localStorage data structures.

### Privacy-First Design

- **100% Local Storage**: All data persists only in browser localStorage
- **No External Dependencies**: No analytics, tracking, or data transmission
- **Offline Capable**: Full functionality without internet connection
- **Export Capability**: PDF generation using jsPDF and html2canvas

## Development Guidelines

**Content Updates**: Modify JSON files in `src/data/` rather than hardcoded strings in components.

**Framework Extensions**: Add new frameworks to `frameworks.ts` and update the decision tree logic. Ensure TypeScript types are updated in `src/types/index.ts`.

**Component Patterns**: Follow existing patterns for form handling, localStorage integration, and content externalization.

**Styling**: Uses Tailwind CSS with mobile-first responsive design. Follow existing utility patterns and component structure.