# Category Colors Configuration

This directory contains centralized color configuration for reflection framework categories.

## Overview

The `categoryColors.ts` file defines all colors used across the application for the six main reflection categories:

- **Conflict** (Handle Team Tensions) - Amber/Orange theme
- **Feedback** (Deliver Feedback) - Blue theme  
- **Decision** (Make a Decision) - Purple theme
- **Stakeholder** (Align with Leadership) - Emerald/Green theme
- **Team Dynamics** (Improve Team Dynamics) - Rose/Pink theme
- **Other** (Free-form reflection) - Slate/Gray theme

## How to Change Colors

To update colors for any category, edit the `CATEGORY_COLORS` object in `categoryColors.ts`:

```typescript
export const CATEGORY_COLORS: Record<string, CategoryColorConfig> = {
  feedback: {
    name: 'Deliver Feedback',
    gradient: 'from-blue-500 to-blue-600',        // Button and icon gradients
    background: 'bg-gradient-to-br from-blue-50 to-blue-100', // Panel backgrounds
    border: 'border-blue-200',                    // Border colors
    hover: 'hover:from-blue-100 hover:to-blue-150', // Hover states
    text: {
      primary: 'text-blue-900',                   // Primary text
      secondary: 'text-blue-800',                 // Secondary text
    },
  },
  // ... other categories
};
```

## Helper Functions

Use these helper functions throughout the app to get consistent colors:

- `getCategoryGradient(category)` - Get gradient colors for buttons/icons
- `getCategoryBackground(category)` - Get background class with hover states
- `getCategoryBorder(category)` - Get border colors
- `getCategoryTextPrimary(category)` - Get primary text color
- `getCategoryTextSecondary(category)` - Get secondary text color

## Components Using This System

- `DecisionTree.tsx` - Category selection panels
- `FrameworksGuide.tsx` - Framework listings and headers
- Any future components that need category colors

## Benefits

- **Single source of truth** for all category colors
- **Easy maintenance** - change colors in one place
- **Consistency** across all components
- **Type safety** with TypeScript interfaces