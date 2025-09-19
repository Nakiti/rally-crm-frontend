export interface NavigationItem {
  title: string;
  path: string;
}

export interface DetailsLayoutProps {
  params: {
    id: string;
  };
  children: React.ReactNode;
}

export interface NavigationSidebarProps {
  campaignId: string;
  pathName: string;
  links: NavigationItem[];
}

export interface MainContentAreaProps {
  children: React.ReactNode;
}
