
import { 
  AboutHeroSection,
  StorySection,
  WhatSection,
  WhySection,
  TeamSection
} from '@/components/public/organization/about';

export default function AboutPage() {
  // Dummy data for the about page
  const aboutData = {
    organization: {
      name: "Community Impact Foundation",
      logoUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
    },
    hero: {
      headline: "About Our Organization",
      description: "We are dedicated to making a positive impact in our community through innovative solutions and unwavering commitment to our mission.",
      bgImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
    story: {
      title: "Our Story",
      text: "Founded in 2010, Community Impact Foundation began as a small group of passionate individuals who believed in the power of collective action. What started as a local initiative has grown into a comprehensive organization serving thousands of people across our region. Our journey has been marked by resilience, innovation, and an unwavering commitment to creating lasting positive change in our community."
    },
    what: {
      text: "We provide innovative solutions to address the most pressing challenges facing our community. Through strategic partnerships and evidence-based approaches, we create sustainable impact that transforms lives. Our programs span education, healthcare, economic development, and environmental sustainability, ensuring we address the full spectrum of community needs.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    why: {
      text: "We believe in the power of community and the importance of giving back to create lasting positive change. Every action we take is driven by our commitment to building a better future for all. Our values of integrity, compassion, and excellence guide everything we do, ensuring that our impact is both meaningful and sustainable."
    },
    team: {
      text: "Meet the dedicated individuals who make our mission possible. Our team brings together diverse expertise and shared passion for creating positive change. From our leadership team to our volunteers, each person plays a vital role in advancing our mission and serving our community.",
      showTeamPhotos: true,
      teamImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  };

  return (
    <div className="min-h-screen bg-white">      
      <AboutHeroSection 
        headline={aboutData.hero.headline}
        description={aboutData.hero.description}
        bgImage={aboutData.hero.bgImage}
      />
      
      <div className="max-w-6xl mx-auto px-6 py-16">
        <StorySection 
          title={aboutData.story.title}
          text={aboutData.story.text}
        />
        
        <WhatSection 
          whatText={aboutData.what.text}
          aboutImage={aboutData.what.image}
        />
        
        <WhySection 
          whyText={aboutData.why.text}
        />
        
        <TeamSection 
          teamText={aboutData.team.text}
          showTeamPhotos={aboutData.team.showTeamPhotos}
          teamImage={aboutData.team.teamImage}
        />
      </div>
    </div>
  );
}