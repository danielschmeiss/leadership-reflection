# Leadership Reflection Tool

A privacy-focused React application designed to help engineering leaders navigate situational challenges through structured reflection frameworks. Get from challenge to clarity in under 10 minutes with proven leadership methodologies.

## 🎯 Purpose

This tool supports engineering leaders in handling situational leadership challenges such as:
- Giving constructive or positive feedback
- Resolving team and cross-team conflicts
- Making complex or urgent decisions
- Managing stakeholder expectations
- Improving communication dynamics

## ✨ Key Features

### 🌳 Interactive Decision Tree
- Quick 30-second classification of your leadership challenge
- Guided selection of the most appropriate framework
- Context-aware recommendations based on situation type

### 📋 Proven Frameworks
- **SBI Framework**: Situation-Behavior-Impact for effective feedback
- **GROW Model**: Goal-Reality-Options-Way forward for coaching conversations
- **Conflict Mediation**: Structured approach to resolve disputes
- **Decision Matrix**: Systematic evaluation of complex choices

### 🔒 Privacy-First Design
- **100% Local Storage**: All data stays on your device
- **No External Dependencies**: Works completely offline
- **Optional AI Assistance**: Anonymized inputs only when requested
- **Export Capability**: Download reflections as text files

### 📊 Reflection Management
- **Historical Tracking**: Review past reflections and identify patterns
- **Search & Filter**: Find specific reflections by content or category
- **Insights Dashboard**: Track your most common challenges and growth areas
- **Reusable Templates**: Build on previous successful approaches

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd leadership-reflection-tool

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
1. Click "Start New Reflection" on the dashboard
2. Answer 2-3 quick questions about your challenge
3. The system automatically selects the best framework

### 2. Work Through Your Challenge (5-10 minutes)
1. Follow the structured questions tailored to your situation
2. Use the built-in help and examples for guidance
3. Optionally get AI perspectives (anonymized)
4. Complete the reflection step-by-step

### 3. Review and Apply
1. Export your reflection for future reference
2. Apply the insights to your leadership situation
3. Track patterns in your reflection history

## 🧠 Available Frameworks

### SBI Framework
**Best for**: Giving feedback (constructive or positive)
- **Situation**: When and where did this happen?
- **Behavior**: What specific actions did you observe?
- **Impact**: What was the effect on you, the team, or work?

### GROW Model  
**Best for**: Coaching conversations and problem-solving
- **Goal**: What do you want to achieve?
- **Reality**: What's the current situation?
- **Options**: What alternatives do you have?
- **Way Forward**: What specific actions will you take?

### Conflict Mediation
**Best for**: Resolving team or stakeholder conflicts
- Focus on underlying interests, not positions
- Find common ground and win-win solutions
- Structure difficult conversations

### Decision Matrix
**Best for**: Complex decisions with multiple factors
- Define clear evaluation criteria
- Systematically compare options
- Consider stakeholder impact

## 🛡️ Privacy & Security

- **Local-First**: All reflections stored in your browser's local storage
- **No Tracking**: No analytics, cookies, or external data collection
- **Offline Capable**: Works without internet connection
- **Data Control**: Export or delete your data anytime
- **Optional AI**: AI assistance uses anonymized data only

## 🏗️ Technical Architecture

### Built With
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **Local Storage API** for data persistence

### Project Structure
```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── DecisionTree.tsx # Challenge classification
│   ├── ReflectionForm.tsx # Framework questions
│   └── ...
├── data/               # Framework definitions
├── hooks/              # Custom React hooks
├── types/              # TypeScript definitions
└── App.tsx            # Main application
```

## 🎨 Design Principles

- **Apple-level aesthetics**: Clean, sophisticated, attention to detail
- **Accessibility-first**: High contrast, keyboard navigation, screen reader support
- **Mobile-responsive**: Optimized for desktop and tablet use
- **Micro-interactions**: Subtle animations and feedback
- **Progressive disclosure**: Reveal complexity gradually

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📈 Roadmap

- [ ] Encrypted local storage option
- [ ] Team collaboration features
- [ ] Advanced analytics and insights
- [ ] Mobile app version
- [ ] Integration with calendar apps
- [ ] Custom framework builder

## 🤝 Support

This tool is designed for engineering leaders who want to improve their leadership skills through structured reflection. It's not a replacement for professional coaching but provides a solid foundation for leadership development.

## 📄 License

MIT License - see LICENSE file for details

---

**Built for engineering leaders, by engineering leaders** 🚀

*Start your leadership reflection journey today and turn challenges into growth opportunities.*
