import { ReactNode } from "react";
import type { Designation } from "./designation.types";
import type { CampaignQuestion } from "./campaignQuestion.types";

export interface CampaignAvailableDesignation {
    id: string;
    campaignId: string;
    designationId: string;
    designation: Designation;
    createdAt: string;
    updatedAt: string;
}

export interface Campaign {
    id: string;
    organizationId: string;
    defaultDesignationId: string | null;
    internalName: string;
    externalName: string;
    title: string;
    slug: string;
    goalAmount: number;
    amountRaised: number;
    donations: number;
    icon: string;
    bannerImageUrl: string | null;
    pageConfig: object | null; // You could define a more specific type for this later
    isActive: boolean;
    createdAt: string; // Dates are typically serialized as ISO strings over JSON
    updatedAt: string;
    availableDesignations?: CampaignAvailableDesignation[]; // Available designations for this campaign
    questions?: CampaignQuestion[]; // Questions for this campaign
}

// Define the shape of the data needed to create a new campaign
export interface CreateCampaignData {
    title: string;
    goalAmount: number;
}
  
// Define the shape of the data for updating a campaign's basic information
export interface UpdateCampaignData {
    externalName?: string;
    internalName?: string;
    goalAmount?: number;
    slug?: string;
    updated_by?: string;
}

// Define the shape of the data for updating a campaign's page config
export interface UpdatePageConfigData {
    pageConfig: object;
}

// Define the shape of the data for updating campaign designations
export interface UpdateCampaignDesignationsData {
    designationIds: string[];
}

// Define the response from updating campaign designations
export interface UpdateCampaignDesignationsResponse {
    added: number;
    removed: number;
    total: number;
}

// Define the shape of the data for updating campaign questions (bulk operation)
export interface UpdateCampaignQuestionsData {
    questions: (CampaignQuestion | Omit<CampaignQuestion, 'id' | 'campaignId' | 'createdAt' | 'updatedAt'>)[];
}

// Define the response from updating campaign questions
export interface UpdateCampaignQuestionsResponse {
    added: number;
    updated: number;
    removed: number;
    total: number;
}

export interface ColumnDefinition<T> {
  accessorKey: keyof T;
  label: string;
  sortable?: boolean;
  render: (row: T) => ReactNode; // A function that returns a JSX element
}

// Generic type for sort configuration
export interface SortConfig<T> {
  key: keyof T | null;
  direction: 'ascending' | 'descending';
}