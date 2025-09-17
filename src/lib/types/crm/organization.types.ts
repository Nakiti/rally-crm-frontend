export interface Organization {
  id: string;
  name: string;
  subdomain: string;
  stripeAccountId: string | null;
  settings: object | null;
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
  settings?: object;
}

