
// Types for website section defaults configuration
export type WebsiteSectionType = 'hero' | 'main' | 'about' | 'impact' | 'featured' | 'banner' | 'story' | 'what' | 'why' | 'team';

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
  message: string;
}

export interface MainSectionProps {
  title: string;
  text: string
}

export interface AboutSectionProps {
  title: string;
  text: string;
}

export interface ImpactSectionProps {
  title: string;
  text: string
}

export interface FeaturedSectionProps {
  title: string;
  text: string
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
  | TeamSectionProps;

// Complete website section interface
export interface WebsiteSection extends BaseWebsiteSection {
  props: WebsiteSectionProps;
}

// Specific section interfaces
export interface HeroSection extends BaseWebsiteSection {
  type: 'hero';
  required: boolean;
  collapsed: boolean;
  props: object;
}

export interface MainSection extends BaseWebsiteSection {
  type: 'main';
  required: boolean;
  collapsed: boolean;
  props: object;
}

export interface AboutSection extends BaseWebsiteSection {
  type: 'about';
  required: boolean;
  collapsed: boolean;
  props: object;
}

export interface ImpactSection extends BaseWebsiteSection {
  type: 'impact';
  required: boolean;
  collapsed: boolean;
  props: object;
}

export interface FeaturedSection extends BaseWebsiteSection {
  type: 'featured';
  required: boolean;
  collapsed: boolean;
  props: object;
}

export interface BannerSection extends BaseWebsiteSection {
  type: 'banner';
  props: object;
}

export interface StorySection extends BaseWebsiteSection {
  type: 'story';
  props: object;
}

export interface WhatSection extends BaseWebsiteSection {
  type: 'what';
  props: object;
}

export interface WhySection extends BaseWebsiteSection {
  type: 'why';
  props: object;
}

export interface TeamSection extends BaseWebsiteSection {
  type: 'team';
  props: object;
}

// Union type for all website sections
export type WebsiteSectionConfig = 
  | HeroSection 
  | MainSection 
  | AboutSection 
  | ImpactSection 
  | FeaturedSection 
  | BannerSection 
  | StorySection 
  | WhatSection 
  | WhySection 
  | TeamSection;

// Configuration object type
export interface WebsiteSectionDefaults {
  hero: HeroSection;
  main: MainSection;
  about: AboutSection;
  impact: ImpactSection;
  featured: FeaturedSection;
  banner: BannerSection;
  story: StorySection;
  what: WhatSection;
  why: WhySection;
  team: TeamSection;
}

export const websiteSectionDefaults: WebsiteSectionDefaults = {
    hero: { 
        type: 'hero', 
        enabled: true, 
        required: true, 
        collapsed: false, 
        props: { bannerImage: '' } 
    },
    main:  { 
        type: 'main', 
        enabled: true, 
        required: false, 
        collapsed: false, 
        props: {  } 
    },
    about:  { 
        type: 'about', 
        enabled: true, 
        required: false, 
        collapsed: false, 
        props: { } 
    },
    impact:  { 
        type: 'impact', 
        enabled: true, 
        required: false, 
        collapsed: false, 
        props: { } 
    },
    featured:  { 
        type: 'featured', 
        enabled: true, 
        required: false, 
        collapsed: false, 
        props: {  } 
    },
    banner: { 
        type: 'banner', 
        enabled: true, 
        required: true,
        collapsed: false,
        props: { bannerImage: '' } 
    },
    story:  { 
        type: 'story', 
        enabled: true,
        required: true,
        collapsed: false, 
        props: {} 
    },
    what:  { 
        type: 'what', 
        enabled: true, 
        required: false,
        collapsed: true,
        props: {} 
    },
    why:  { 
        type: 'why', 
        enabled: true, 
        required: false,
        collapsed: true,
        props: {} 
    },
    team:  { 
        type: 'team', 
        enabled: true, 
        required: false,
        collapsed: true,
        props: {} 
    },
}