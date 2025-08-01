# Reflect & Act

*Pause, reflect, and move forward with purpose.*

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
cd reflect-and-act

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

## 🎮 How to Use

### 1. Start a New Reflection (< 30 seconds)
1. Click "Begin Your Reflection Now" on the dashboard
2. Answer 2 quick questions about your challenge type
3. The system automatically selects and customizes the best framework

### 2. Work Through Your Challenge (5-10 minutes)
1. Follow the structured questions tailored to your specific situation
2. Use built-in help, examples, and guidance for each question
3. Optionally copy your progress for AI analysis (privacy-conscious)
4. Complete the reflection step-by-step with smart navigation

### 3. Review and Apply
1. Get actionable insights and specific next steps
2. Export your reflection as a comprehensive PDF report
3. Copy formatted content for AI analysis and additional insights
4. Track patterns in your reflection history

## 🧠 Available Frameworks

### SBI Framework
**Best for**: Giving feedback (constructive or positive)
- **Situation**: When and where did this happen?
- **Behavior**: What specific actions did you observe?
- **Impact**: What was the effect on you, the team, or work?
- **Reinforcement/Support**: How to continue or improve the behavior

### GROW Model  
**Best for**: Coaching conversations and structured problem-solving
- **Goal**: What do you want to achieve?
- **Reality**: What's the current situation?
- **Options**: What alternatives do you have?
- **Way Forward**: What specific actions will you take?

### Mediation Framework
**Best for**: Resolving interpersonal conflicts
- Focus on underlying interests, not positions
- Find common ground and win-win solutions
- Structure difficult conversations effectively

### Interest-Based Negotiation
**Best for**: Cross-team conflicts and alignment
- Identify team priorities and constraints
- Find shared problems and mutual benefits
- Create collaborative solutions

### Decision Matrix
**Best for**: Complex operational decisions with multiple factors
- Define clear evaluation criteria
- Systematically compare options
- Consider risks and stakeholder impact

### Pros/Cons Analysis
**Best for**: Strategic decisions with long-term implications
- Comprehensive advantage/disadvantage analysis
- Strategic alignment assessment
- Stakeholder engagement planning

### RACI/Responsibility Mapping
**Best for**: Clarifying ownership and accountability
- Define who is Responsible, Accountable, Consulted, Informed
- Eliminate confusion and gaps in ownership
- Establish clear decision-making authority

### Alignment Canvas
**Best for**: Preparing for leadership alignment conversations
- Structure your case with evidence and clear argumentation
- Define what approval or decision you need
- Prepare for stakeholder engagement

### Delegation/Empowerment
**Best for**: Distributing ownership and developing team members
- Identify delegatable decisions and tasks
- Match responsibilities to team member strengths
- Create accountability without micromanagement

### 5 Dysfunctions of a Team
**Best for**: Comprehensive team health assessment
- Evaluate trust, conflict, commitment, accountability, and results
- Identify root causes of team dysfunction
- Create targeted improvement plans

### Feedforward Coaching
**Best for**: Facilitating constructive peer feedback
- Focus on future improvement rather than past mistakes
- Frame feedback positively and solution-oriented
- Support ongoing development and relationships

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

#### **✅ Benefits**
- **Easy Updates**: Change text without touching component code
- **Consistent Messaging**: Centralized content management
- **Translation Ready**: Simple to add multiple languages
- **Type Safety**: Full TypeScript support for content references
- **Maintainable**: Clear separation of concerns

## 🎨 Design Principles

- **Apple-level aesthetics**: Clean, sophisticated, attention to detail
- **Mobile-first responsive**: Optimized for all screen sizes
- **Accessibility-first**: High contrast, keyboard navigation, screen reader support
- **Progressive disclosure**: Reveal complexity gradually
- **Micro-interactions**: Subtle animations and feedback
- **Privacy-focused UX**: Clear privacy indicators and controls
- **Content-Code Separation**: Maintainable architecture with externalized content

## 📱 Mobile Experience

- **Touch-optimized**: Large touch targets and gesture-friendly navigation
- **Responsive layouts**: Adapts seamlessly to different screen sizes
- **Smart scrolling**: Automatic scroll to relevant content on navigation
- **Offline capable**: Full functionality without internet connection
- **Fast loading**: Optimized for mobile networks

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes:
   - **Content changes**: Update JSON files in `src/data/`
   - **Feature changes**: Update TypeScript components with proper types
4. Test thoroughly across devices and browsers
5. Submit a pull request with detailed description

### Content Updates
To update text, labels, or messaging:
1. Locate the appropriate JSON file in `src/data/`
2. Update the content while maintaining the JSON structure
3. Test the changes in the application
4. No component code changes required!

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

### Best Practices
- **Regular use**: Aim for 1-2 reflections per week for maximum benefit
- **Honest responses**: The tool is most effective with candid self-reflection
- **Action-oriented**: Focus on implementing the suggested next steps
- **Pattern recognition**: Review your history regularly to identify growth areas
- **Content feedback**: Report any unclear or confusing text for improvement

## 📄 License

MIT License - see LICENSE file for details

---

**Reflect & Act - Built for engineering leaders, by engineering leaders** 🚀

*Transform leadership challenges into growth opportunities through structured reflection.*