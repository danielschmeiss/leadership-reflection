/**
 * Centralized color configuration for reflection framework categories
 * 
 * This file defines all colors used across the application for the six main
 * reflection categories. Change colors here to update them throughout the app.
 */

export interface CategoryColorConfig {
  name: string;
  // Gradient colors for buttons and icons
  gradient: string;
  // Background colors for panels and cards
  background: string;
  // Border and accent colors
  border: string;
  // Hover states
  hover: string;
  // Text colors
  text: {
    primary: string;
    secondary: string;
  };
}

export const CATEGORY_COLORS: Record<string, CategoryColorConfig> = {
  conflict: {
    name: 'Handle Team Tensions',
    gradient: 'from-amber-500 to-orange-600',
    background: 'bg-gradient-to-br from-amber-50 to-orange-100',
    border: 'border-amber-200',
    hover: 'hover:from-amber-100 hover:to-orange-150',
    text: {
      primary: 'text-amber-900',
      secondary: 'text-amber-800',
    },
  },
  feedback: {
    name: 'Deliver Feedback',
    gradient: 'from-blue-500 to-blue-600',
    background: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    hover: 'hover:from-blue-100 hover:to-blue-150',
    text: {
      primary: 'text-blue-900',
      secondary: 'text-blue-800',
    },
  },
  decision: {
    name: 'Make a Decision',
    gradient: 'from-purple-500 to-purple-600',
    background: 'bg-gradient-to-br from-purple-50 to-purple-100',
    border: 'border-purple-200',
    hover: 'hover:from-purple-100 hover:to-purple-150',
    text: {
      primary: 'text-purple-900',
      secondary: 'text-purple-800',
    },
  },
  stakeholder: {
    name: 'Align with Leadership',
    gradient: 'from-emerald-500 to-emerald-600',
    background: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    hover: 'hover:from-emerald-100 hover:to-emerald-150',
    text: {
      primary: 'text-emerald-900',
      secondary: 'text-emerald-800',
    },
  },
  'team-dynamics': {
    name: 'Improve Team Dynamics',
    gradient: 'from-rose-500 to-pink-600',
    background: 'bg-gradient-to-br from-rose-50 to-pink-100',
    border: 'border-rose-200',
    hover: 'hover:from-rose-100 hover:to-pink-150',
    text: {
      primary: 'text-rose-900',
      secondary: 'text-rose-800',
    },
  },
  other: {
    name: 'Other',
    gradient: 'from-slate-500 to-gray-600',
    background: 'bg-gradient-to-br from-slate-50 to-gray-100',
    border: 'border-slate-200',
    hover: 'hover:from-slate-100 hover:to-gray-150',
    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-800',
    },
  },
};

/**
 * Helper functions for accessing category colors
 */

export const getCategoryGradient = (category: string): string => {
  return CATEGORY_COLORS[category]?.gradient || CATEGORY_COLORS.feedback.gradient;
};

export const getCategoryBackground = (category: string): string => {
  const config = CATEGORY_COLORS[category] || CATEGORY_COLORS.feedback;
  return `${config.background} ${config.border} ${config.hover}`;
};

export const getCategoryBorder = (category: string): string => {
  return CATEGORY_COLORS[category]?.border || CATEGORY_COLORS.feedback.border;
};

export const getCategoryTextPrimary = (category: string): string => {
  return CATEGORY_COLORS[category]?.text.primary || CATEGORY_COLORS.feedback.text.primary;
};

export const getCategoryTextSecondary = (category: string): string => {
  return CATEGORY_COLORS[category]?.text.secondary || CATEGORY_COLORS.feedback.text.secondary;
};

/**
 * Get all category IDs
 */
export const getAllCategoryIds = (): string[] => {
  return Object.keys(CATEGORY_COLORS);
};

/**
 * Get category display name
 */
export const getCategoryName = (category: string): string => {
  return CATEGORY_COLORS[category]?.name || category;
};