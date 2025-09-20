export type PublicPageType = 'landing' | 'about';

export interface PublicOrganizationPage {
    id: string;
    organizationId: string;
    pageType: PublicPageType;
    contentConfig: object | null;
    createdAt: string;
    updatedAt: string;
}
