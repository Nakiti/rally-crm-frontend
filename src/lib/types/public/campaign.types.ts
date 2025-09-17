export interface PublicCampaign {
  externalName?: string;
  slug: string;
  goalAmount?: number;
  icon?: string;
  pageConfig?: object;
}

export interface DonationAnswerInput {
  questionId: string;
  answerValue: string;
}

export interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateDonationData {
  amount: number;
  designationId: string;
  donor: DonorInfo;
  answers?: DonationAnswerInput[];
}

export interface CreateDonationResponse {
  message: string;
}
