export type PageType = 'landing' | 'about';

export interface OrganizationPage {
    id: string;
    organizationId: string;
    pageType: PageType;
    contentConfig: object | null;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

// Define the shape of the data needed to create a new organization page
export interface CreateOrganizationPageData {
    pageType: PageType;
    contentConfig?: object;
}

// Define the shape of the data for updating an organization page
export interface UpdateOrganizationPageData {
    pageType?: PageType;
    isPublished: boolean;
    contentConfig?: object;
}

// Define the shape of the data for updating content configuration
export interface UpdateContentConfigData {
    contentConfig: object;
}
