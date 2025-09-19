import { ReactNode } from 'react';

export interface SettingsCard {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

export interface SettingsPageProps {
  params: {
    organizationId: string;
  };
}

export interface SettingsCardProps {
  card: SettingsCard;
}

export interface SettingsHeaderProps {
  title: string;
  description: string;
}

export interface SettingsGridProps {
  cards: SettingsCard[];
}
