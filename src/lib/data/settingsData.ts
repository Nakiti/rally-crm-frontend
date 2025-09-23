// Dummy data for settings page

import React from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Palette,
  Download,
  HelpCircle,
  Mail,
  Lock
} from 'lucide-react';

export interface SettingsCardData {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

export const settingsCards: SettingsCardData[] = [
  {
    title: 'Profile Settings',
    description: 'Update your personal information, contact details, and profile picture.',
    href: '/dashboard/settings/profile',
    icon: React.createElement(User, { className: "w-6 h-6 text-blue-600" })
  },
  {
    title: 'Notifications',
    description: 'Manage your email notifications, alerts, and communication preferences.',
    href: '/dashboard/settings/notifications',
    icon: React.createElement(Bell, { className: "w-6 h-6 text-green-600" })
  },
  {
    title: 'Privacy & Security',
    description: 'Control your privacy settings, password, and account security options.',
    href: '/dashboard/settings/privacy',
    icon: React.createElement(Shield, { className: "w-6 h-6 text-purple-600" })
  },
  {
    title: 'Payment Methods',
    description: 'Manage your saved payment methods and billing information.',
    href: '/dashboard/settings/payment',
    icon: React.createElement(CreditCard, { className: "w-6 h-6 text-orange-600" })
  },
  {
    title: 'Account Preferences',
    description: 'Customize your dashboard, language, timezone, and display preferences.',
    href: '/dashboard/settings/preferences',
    icon: React.createElement(Globe, { className: "w-6 h-6 text-indigo-600" })
  },
  {
    title: 'Appearance',
    description: 'Customize the look and feel of your dashboard with themes and layouts.',
    href: '/dashboard/settings/appearance',
    icon: React.createElement(Palette, { className: "w-6 h-6 text-pink-600" }),
    comingSoon: true
  },
  {
    title: 'Data Export',
    description: 'Download your data, transaction history, and account information.',
    href: '/dashboard/settings/export',
    icon: React.createElement(Download, { className: "w-6 h-6 text-teal-600" })
  },
  {
    title: 'Help & Support',
    description: 'Access help documentation, contact support, and submit feedback.',
    href: '/dashboard/settings/help',
    icon: React.createElement(HelpCircle, { className: "w-6 h-6 text-cyan-600" })
  },
  {
    title: 'Communication',
    description: 'Manage your communication preferences and newsletter subscriptions.',
    href: '/dashboard/settings/communication',
    icon: React.createElement(Mail, { className: "w-6 h-6 text-red-600" })
  },
  {
    title: 'Two-Factor Authentication',
    description: 'Enhance your account security with two-factor authentication.',
    href: '/dashboard/settings/2fa',
    icon: React.createElement(Lock, { className: "w-6 h-6 text-gray-600" }),
    comingSoon: true
  }
];
