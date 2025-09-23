export interface OrganizationSettings {
  url?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
}

export interface Organization {
  id: string;
  name: string;
  subdomain: string;
  stripeAccountId: string | null;
  settings: OrganizationSettings | null;
  isPubliclyActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationData {
  name: string;
  subdomain: string;
}

export interface UpdateOrganizationData {
  name?: string;
  subdomain?: string;
  stripeAccountId?: string;
  settings?: OrganizationSettings;
}

// Organization Completeness Types
export interface OrganizationCompletenessStatus {
  isPubliclyActive: boolean;
  stripeAccountVerified: boolean;
  requiredPagesPublished: boolean;
  hasActiveSubscription: boolean;
  missingRequirements: string[];
}

export interface PublishSiteResponse {
  isPubliclyActive: boolean;
  publishedAt: string;
}

export interface CheckCompletenessResponse {
  isPubliclyActive: boolean;
}

