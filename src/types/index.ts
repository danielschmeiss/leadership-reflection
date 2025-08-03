export interface Situation {
  id: string;
  category: SituationCategory;
  subcategory: string;
  framework: FrameworkType;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  responses: Record<string, QuestionResponse>;
  status: 'draft' | 'completed';
  problemDescription?: string;
}

export type SituationCategory = 'conflict' | 'feedback' | 'decision' | 'stakeholder' | 'team-dynamics' | 'other';

export type FrameworkType = 'sbi' | 'grow' | 'mediation' | 'decision-matrix' | 'raci' | 'pros-cons' | 'interest-based-negotiation' | 'feedforward-coaching' | 'responsibility-mapping' | 'alignment-canvas' | 'delegation-empowerment' | 'five-dysfunctions';

export interface Framework {
  id: FrameworkType;
  name: string;
  description: string;
  questions: Question[];
}

// Response data structures
export type QuestionResponse = 
  | { type: 'text'; value: string }
  | { type: 'textarea'; value: string }
  | { type: 'rating'; value: number; scale: [number, number] }
  | { type: 'multiple-choice'; value: string }
  | { type: 'enumeration'; items: string[] }
  | { type: 'itemized-analysis'; items: { [key: string]: string } }
  | { type: 'matrix'; data: { [row: string]: { [col: string]: string } } }
  | { type: 'scoring-matrix'; data: { [option: string]: { [criterion: string]: number } } };

// Enhanced question types
export interface BaseQuestion {
  id: string;
  text: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  references?: QuestionReference[];
}

export interface QuestionReference {
  questionId: string;
  property?: string; // For accessing specific parts of the referenced response
  label: string;
}

export type Question = 
  | TextQuestion
  | TextareaQuestion  
  | RatingQuestion
  | MultipleChoiceQuestion
  | EnumerationQuestion
  | ItemizedAnalysisQuestion
  | MatrixQuestion
  | ScoringMatrixQuestion;

export interface TextQuestion extends BaseQuestion {
  type: 'text';
}

export interface TextareaQuestion extends BaseQuestion {
  type: 'textarea';
}

export interface RatingQuestion extends BaseQuestion {
  type: 'rating';
  scale: [number, number];
  labels?: { [key: number]: string };
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  options: string[];
}

export interface EnumerationQuestion extends BaseQuestion {
  type: 'enumeration';
  itemLabel: string; // e.g., "Team", "Option", "Stakeholder"
  minItems?: number;
  maxItems?: number;
}

export interface ItemizedAnalysisQuestion extends BaseQuestion {
  type: 'itemized-analysis';
  analysisPrompt: string;
  referencedQuestion: string; // ID of enumeration question to analyze
}

export interface MatrixQuestion extends BaseQuestion {
  type: 'matrix';
  rows: string[];
  columns: string[];
  cellType: 'text' | 'rating' | 'boolean';
}

export interface ScoringMatrixQuestion extends BaseQuestion {
  type: 'scoring-matrix';
  optionsFrom: string; // Reference to enumeration question for options
  criteriaFrom: string; // Reference to enumeration question for criteria  
  scale: [number, number];
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