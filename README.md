# Reflacto

*Pause, reflect and act with purpose.*

## Table of Contents

- [Purpose](#-purpose)
- [Key Features](#-key-features)
  - [Interactive Decision Tree](#-interactive-decision-tree)
  - [Proven Frameworks](#-proven-frameworks)
  - [Privacy-First Design](#-privacy-first-design)
  - [Reflection Management](#-reflection-management)
- [Quick Start](#-quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Building for Production](#building-for-production)
- [Privacy & Security](#-privacy--security)
- [Technical Architecture](#-technical-architecture)
  - [Built With](#built-with)
  - [Project Structure](#project-structure)
  - [Content Management Architecture](#content-management-architecture)
- [Development](#-development)
  - [Available Scripts](#available-scripts)
  - [Contributing](#contributing)
  - [Content Updates](#content-updates)
- [Roadmap](#-roadmap)
  - [Near Term](#near-term)
  - [Medium Term](#medium-term)
  - [Long Term](#long-term)
- [Support & Usage](#-support--usage)
  - [Best Practices](#best-practices)
- [License](#-license)

A privacy-focused React application designed to help engineering leaders navigate situational challenges through structured reflection frameworks. Built with a clean separation of content and code for maximum maintainability and internationalization readiness.

## 🎯 Purpose

This tool supports engineering leaders in handling situational leadership challenges such as:
- Giving constructive or positive feedback
- Resolving team and cross-team conflicts
- Making complex or urgent decisions
- Managing stakeholder expectations and alignment
- Improving team dynamics and ownership clarity

## ✨ Key Features

### 🌳 Interactive Decision Tree
- Quick 30-second classification of your leadership challenge
- Guided selection of the most appropriate framework
- Context-aware recommendations based on situation type
- Smart framework customization based on your specific scenario

### 📋 Proven Frameworks
- **SBI Framework**: Situation-Behavior-Impact for effective feedback
- **GROW Model**: Goal-Reality-Options-Way forward for coaching conversations
- **Mediation Framework**: Structured approach to resolve interpersonal conflicts
- **Interest-Based Negotiation**: Cross-team conflict resolution
- **Decision Matrix**: Systematic evaluation of operational choices
- **Pros/Cons Analysis**: Strategic decision-making framework
- **RACI/Responsibility Mapping**: Clarify ownership and accountability
- **Alignment Canvas**: Structure leadership alignment conversations
- **Delegation/Empowerment**: Effective task and decision delegation
- **5 Dysfunctions of a Team**: Comprehensive team health assessment
- **Feedforward Coaching**: Future-focused peer feedback facilitation

### 🔒 Privacy-First Design
- **100% Local Storage**: All data stays on your device
- **No External Dependencies**: Works completely offline
- **No Data Collection**: No tracking, analytics, or external data transmission
- **Export Capability**: Download reflections as comprehensive PDF reports
- **AI Integration**: Optional AI assistance with privacy-conscious prompts

### 📊 Reflection Management
- **Historical Tracking**: Review past reflections and identify patterns
- **Search & Filter**: Find specific reflections by content or category
- **Progress Dashboard**: Track your reflection journey and development level
- **Actionable Insights**: Get specific next steps for each completed reflection
- **Mobile Optimized**: Seamless experience across all devices
- **Content Management**: Clean separation of content from code for easy updates

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd reflacto

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 🛡️ Privacy & Security

- **Local-First**: All reflections stored in your browser's local storage
- **No Tracking**: No analytics, cookies, or external data collection
- **Offline Capable**: Works without internet connection
- **Data Control**: Export or delete your data anytime
- **Privacy-Conscious AI**: AI assistance uses anonymized, formatted prompts with privacy warnings

## 🏗️ Technical Architecture

### Built With
- **React 18** with TypeScript for robust component architecture
- **Tailwind CSS** for responsive, mobile-first styling
- **Lucide React** for consistent iconography
- **Vite** for fast development and optimized builds
- **Local Storage API** for client-side data persistence
- **jsPDF** for comprehensive PDF export functionality
- **html2canvas** for advanced PDF generation
- **JSON-based Content Management** for maintainable text and messaging

### Project Structure
```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard with progress tracking
│   ├── DecisionTree.tsx # Challenge classification system
│   ├── ReflectionForm.tsx # Dynamic framework questions
│   ├── ReflectionCompletion.tsx # Results and action plans
│   ├── ReflectionHistory.tsx # Historical reflection management
│   └── Layout.tsx       # App shell and navigation
├── data/               # Content and framework definitions
│   ├── content.json     # UI text, labels, and messages
│   ├── actionInsights.json # Framework-specific action plans
│   ├── frameworkRationales.json # Framework explanations
│   ├── questionHelp.json # Question-specific help content
│   └── frameworks.ts    # Framework definitions and decision tree
├── hooks/              # Custom React hooks for local storage
├── types/              # TypeScript type definitions
└── App.tsx            # Main application logic and routing
```

### Content Management Architecture

The application uses a clean separation between content and code:

#### **📁 Content Files**
- **`content.json`** - Main UI content (buttons, labels, help text, tooltips)
- **`actionInsights.json`** - Framework-specific action plans and next steps
- **`frameworkRationales.json`** - Detailed framework explanations and benefits
- **`questionHelp.json`** - Context-sensitive help for reflection questions

#### **🌐 Internationalization Ready**
```
src/data/
├── content.json         # Default (English) content
├── content.es.json      # Spanish content (future)
├── content.de.json      # German content (future)
└── content.fr.json      # French content (future)
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 📈 Roadmap

### Near Term
- [ ] Enhanced PDF export with better formatting
- [ ] Bulk reflection export functionality
- [ ] Advanced search and filtering options
- [ ] Custom framework builder for organizations
- [ ] Multi-language support using the content architecture

### Medium Term
- [ ] Encrypted local storage option
- [ ] Team collaboration features (privacy-preserving)
- [ ] Advanced analytics and pattern recognition
- [ ] Integration with calendar apps for reflection reminders
- [ ] Content management interface for organizations

### Long Term
- [ ] Native mobile app versions
- [ ] Offline-first PWA capabilities
- [ ] Multi-language support
- [ ] Enterprise deployment options
- [ ] Advanced content personalization

## 🤝 Support & Usage

This tool is designed for engineering leaders, managers, and anyone who wants to improve their leadership skills through structured reflection. It's not a replacement for professional coaching but provides a solid foundation for leadership development and situational problem-solving.

## 📄 License

MIT License - see LICENSE file for details

---

**Reflacto - Built for engineering leaders, by engineering leaders** 🚀

*Transform leadership challenges into growth opportunities through structured reflection.*
