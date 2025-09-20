// Types for website page editor configuration
export type WebsitePageType = 'landing-page' | 'about-page';

export type WebsiteSectionType = 'banner' | 'main' | 'about' | 'impact' | 'featured' | 'hero' | 'story' | 'what' | 'why' | 'team' | 'donationButtons';

// Base section interface for website sections
export interface BaseWebsiteSection {
  type: WebsiteSectionType;
  enabled: boolean;
  required?: boolean;
  collapsed?: boolean;
}

// Section-specific prop interfaces
export interface HeroSectionProps {
  headline: string;
  buttonText: string;
}

export interface MainSectionProps {
  title: string;
}

export interface AboutSectionProps {
  title: string;
}

export interface ImpactSectionProps {
  title: string;
}

export interface FeaturedSectionProps {
  title: string;
}

export interface BannerSectionProps {
  headline: string;
  message: string;
}

export interface StorySectionProps {
  // Empty props for now, can be extended later
}

export interface WhatSectionProps {
  // Empty props for now, can be extended later
}

export interface WhySectionProps {
  // Empty props for now, can be extended later
}

export interface TeamSectionProps {
  // Empty props for now, can be extended later
}

export interface DonationButtonsSectionProps {
  // Empty props for now, can be extended later
}

// Union type for all website section props
export type WebsiteSectionProps = 
  | HeroSectionProps 
  | MainSectionProps 
  | AboutSectionProps 
  | ImpactSectionProps 
  | FeaturedSectionProps 
  | BannerSectionProps 
  | StorySectionProps 
  | WhatSectionProps 
  | WhySectionProps 
  | TeamSectionProps 
  | DonationButtonsSectionProps;

// Complete website section interface
export interface WebsiteSection extends BaseWebsiteSection {
  props: WebsiteSectionProps;
}

// Website page configuration interface
export interface WebsitePageConfig {
  title: string;
  availableSections: WebsiteSectionType[];
  defaultSections: WebsiteSection[];
}

// Website page editor configuration interface
export type WebsitePageEditorConfig = {
  [K in WebsitePageType]: WebsitePageConfig;
}

export const websitePageEditorConfig: WebsitePageEditorConfig = {
  'landing-page': {
    title: 'Landing Page',
    availableSections: ['banner', 'main', 'about', 'impact', 'featured'],
    defaultSections: [
      { type: 'hero', enabled: true, required: true, collapsed: false, props: { headline: 'Your Campaign Title', buttonText: 'Donate Now' } },
      { type: 'main', enabled: true, required: true, collapsed: false, props: { title: 'Our Story' } },
      { type: 'about', enabled: true, required: true, collapsed: false, props: { title: 'Our Story' } },
      { type: 'impact', enabled: true, required: true, collapsed: false, props: { title: 'Our Story' } },
      { type: 'featured', enabled: true, required: true, collapsed: false, props: { title: 'Our Story' } },
    ],
  },
  'about-page': {
    title: 'About Page',
    availableSections: ['banner', 'donationButtons'],
    defaultSections: [
      { type: 'banner', enabled: true, props: { headline: "Donate!", message: "Your Support is Greatly Appreciated" } },
      { type: 'story', enabled: true, props: {} },
      { type: 'what', enabled: true, props: {} },
      { type: 'why', enabled: true, props: {} },
      { type: 'team', enabled: true, props: {} },
    ],
  }
};