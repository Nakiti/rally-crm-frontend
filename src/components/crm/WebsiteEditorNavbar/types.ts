export interface NavigationLink {
  name: string;
  href: string;
  isActive: boolean;
}

export interface WebsiteEditorNavbarProps {
  organizationId: string;
  title?: string;
  isPublished: boolean,
  links: NavigationLink[];
  handleSave?: () => void;
  handlePublish?: () => void;
  handleDeactivate?: () => void;
  handlePreview?: () => void;
  isSaving?: boolean;
  isPublishing?: boolean;
  isDeactivating?: boolean;
}

export interface StatusBadgeProps {
  isPublished: boolean
}

export interface ActionButtonsProps {
  isPublished: boolean;
  pageSlug: string
}

export interface BackButtonProps {
}

export interface HeaderSectionProps {
  title?: string;
}

export interface NavigationTabsProps {
  links: NavigationLink[];
}
