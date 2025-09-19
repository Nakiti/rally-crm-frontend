import React from 'react';
import { 
  Building2, 
  Power, 
  Users, 
  Tags, 
  Palette, 
  CreditCard 
} from 'lucide-react';
import { SettingsCard } from '@/lib/types/settings.types';

export const createSettingsCards = (organizationId: string): SettingsCard[] => [
  {
    title: "Organization Information",
    description: "Edit information regarding your organization",
    href: `/settings/organization`,
    icon: <Building2 className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Organization Activation",
    description: "Complete setup requirements and activate your organization",
    href: `/settings/activation`,
    icon: <Power className="w-6 h-6 text-emerald-600" />
  },
  {
    title: "Users",
    description: "Add and manage users that are a part of your organization",
    href: `/settings/users`,
    icon: <Users className="w-6 h-6 text-green-600" />
  },
  {
    title: "Designations",
    description: "Create and manage the designations that donors can donate to",
    href: `/settings/designations`,
    icon: <Tags className="w-6 h-6 text-purple-600" />
  },
  {
    title: "Theme",
    description: "Manage themes that can be used for your organization's campaigns",
    href: `/settings/theme`,
    icon: <Palette className="w-6 h-6 text-orange-600" />
  },
  {
    title: "Payment Settings",
    description: "Configure Stripe payments and manage your organization's payment processing",
    href: `/settings/payments`,
    icon: <CreditCard className="w-6 h-6 text-indigo-600" />
  }
];
