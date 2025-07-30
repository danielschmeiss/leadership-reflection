export interface Situation {
  id: string;
  category: SituationCategory;
  subcategory: string;
  framework: FrameworkType;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  responses: Record<string, string>;
  status: 'draft' | 'completed';
  problemDescription?: string;
}

export type SituationCategory = 'conflict' | 'feedback' | 'decision' | 'stakeholder' | 'other';

export type FrameworkType = 'sbi' | 'grow' | 'mediation' | 'decision-matrix' | 'raci' | 'pros-cons';

export interface Framework {
  id: FrameworkType;
  name: string;
  description: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'rating' | 'multiple-choice';
  options?: string[];
  required: boolean;
  placeholder?: string;
}

export interface DecisionTreeNode {
  id: string;
  question: string;
  options: {
    text: string;
    next?: string;
    framework?: FrameworkType;
    category?: SituationCategory;
    subcategory?: string;
  }[];
}