export interface Designation {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  goalAmount: number | null;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDesignationData {
  name: string;
  description?: string;
  goalAmount?: number;
}

export interface UpdateDesignationData {
  name?: string;
  description?: string;
  goalAmount?: number;
}

