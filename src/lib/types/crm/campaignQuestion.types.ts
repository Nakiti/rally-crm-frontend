export type QuestionType = 
  | 'text'
  | 'textarea'
  | 'email'
  | 'phone'
  | 'number'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'url';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface CampaignQuestion {
  id: string;
  campaignId: string;
  questionText: string;
  questionType: QuestionType;
  options: QuestionOption[] | null;
  isRequired: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignQuestionData {
  questionText: string;
  questionType: QuestionType;
  options?: QuestionOption[] | null;
  isRequired?: boolean;
  displayOrder?: number;
}

export interface UpdateCampaignQuestionData {
  questionText?: string;
  questionType?: QuestionType;
  options?: QuestionOption[] | null;
  isRequired?: boolean;
  displayOrder?: number;
}

