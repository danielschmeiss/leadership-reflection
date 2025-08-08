/**
 * Centralized color configuration for reflection framework categories
 * 
 * This file defines all colors used across the application for the six main
 * reflection categories. Colors are extracted from the logo's palette to create
 * a cohesive brand experience from deep blue through teal, green, to golden yellow.
 * 
 * Change colors here to update them throughout the app.
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
    gradient: 'from-[rgb(90,160,200)] to-[rgb(80,143,176)]',
    background: 'bg-gradient-to-br from-[rgb(170,210,240)] to-[rgb(150,200,230)]',
    border: 'border-[rgb(90,160,200)]',
    hover: 'hover:from-[rgb(150,200,230)] hover:to-[rgb(130,190,220)]',
    text: {
      primary: 'text-[rgb(30,64,175)]',
      secondary: 'text-[rgb(37,99,235)]',
    },
  },
  feedback: {
    name: 'Deliver Feedback',
    gradient: 'from-[rgb(114,212,120)] to-[rgb(101,185,107)]',
    background: 'bg-gradient-to-br from-[rgb(190,240,195)] to-[rgb(170,230,175)]',
    border: 'border-[rgb(114,212,120)]',
    hover: 'hover:from-[rgb(170,230,175)] hover:to-[rgb(150,220,155)]',
    text: {
      primary: 'text-[rgb(22,101,52)]',
      secondary: 'text-[rgb(21,128,61)]',
    },
  },
  decision: {
    name: 'Make a Decision',
    gradient: 'from-[rgb(249,227,100)] to-[rgb(233,206,90)]',
    background: 'bg-gradient-to-br from-[rgb(255,245,150)] to-[rgb(250,235,130)]',
    border: 'border-[rgb(249,227,100)]',
    hover: 'hover:from-[rgb(250,235,130)] hover:to-[rgb(245,225,110)]',
    text: {
      primary: 'text-[rgb(133,77,14)]',
      secondary: 'text-[rgb(146,64,14)]',
    },
  },
  stakeholder: {
    name: 'Align with Leadership',
    gradient: 'from-[rgb(117,217,255)] to-[rgb(104,189,223)]',
    background: 'bg-gradient-to-br from-[rgb(200,250,255)] to-[rgb(180,240,255)]',
    border: 'border-[rgb(117,217,255)]',
    hover: 'hover:from-[rgb(180,240,255)] hover:to-[rgb(160,230,255)]',
    text: {
      primary: 'text-[rgb(12,74,110)]',
      secondary: 'text-[rgb(14,116,144)]',
    },
  },
  'team-dynamics': {
    name: 'Improve Team Dynamics',
    gradient: 'from-[rgb(200,240,110)] to-[rgb(180,220,100)]',
    background: 'bg-gradient-to-br from-[rgb(240,255,180)] to-[rgb(220,250,160)]',
    border: 'border-[rgb(200,240,110)]',
    hover: 'hover:from-[rgb(220,250,160)] hover:to-[rgb(200,240,140)]',
    text: {
      primary: 'text-[rgb(50,80,20)]',
      secondary: 'text-[rgb(70,100,30)]',
    },
  },
  other: {
    name: 'Other',
    gradient: 'from-[rgb(247,185,85)] to-[rgb(223,162,77)]',
    background: 'bg-gradient-to-br from-[rgb(255,220,150)] to-[rgb(250,210,130)]',
    border: 'border-[rgb(247,185,85)]',
    hover: 'hover:from-[rgb(250,210,130)] hover:to-[rgb(245,200,110)]',
    text: {
      primary: 'text-[rgb(154,52,18)]',
      secondary: 'text-[rgb(194,65,12)]',
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