
import { 
  HeroSection,
  MainSection,
  AboutSection,
  ImpactSection,
  FeaturedSection,
  CampaignsSection
} from '@/components/public/organization';

export default function LandingPage() {
  // Dummy data for the organization
  const organizationData = {
    name: "Community Impact Foundation",
    logoUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
    hero: {
      headline: "Building a Better Community Together",
      message: "We're dedicated to creating lasting positive change through innovative programs, dedicated volunteers, and community partnerships.",
      bannerImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
    about: {
      text: "Founded in 2010, Community Impact Foundation has been at the forefront of positive change in our community. We believe in the power of collective action and have helped over 50,000 individuals through our various programs and initiatives.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    main: {
      title: "Making a Difference Together",
      text: "Our organization works tirelessly to create positive change in the community. Through innovative programs and dedicated volunteers, we're building a better future for everyone."
    },
    impact: {
      title: "Our Impact",
      text: "Through our programs and initiatives, we've helped thousands of individuals and families. Our impact is measured not just in numbers, but in the positive changes we see in our community every day.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    featured: {
      headlineOne: "Community Programs",
      descriptionOne: "Supporting local initiatives that make a real difference in people's lives.",
      imageOne: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      headlineTwo: "Volunteer Network",
      descriptionTwo: "Connecting dedicated volunteers with meaningful opportunities to serve.",
      imageTwo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      headlineThree: "Education & Training",
      descriptionThree: "Providing resources and training to empower individuals and communities.",
      imageThree: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    campaigns: [
      "Emergency Relief Fund",
      "Education Initiative", 
      "Community Health Program"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <OrganizationHeader 
        organizationName={organizationData.name}
        logoUrl={organizationData.logoUrl}
      /> */}
      
      <HeroSection 
        headline={organizationData.hero.headline}
        message={organizationData.hero.message}
        bannerImage={organizationData.hero.bannerImage}
      />
      
      <MainSection 
        title={organizationData.main.title}
        text={organizationData.main.text}
      />
      
      <AboutSection 
        aboutText={organizationData.about.text}
        aboutImage={organizationData.about.image}
      />
      
      <ImpactSection 
        title={organizationData.impact.title}
        text={organizationData.impact.text}
        impactImage={organizationData.impact.image}
      />
      
      <FeaturedSection 
        headlineOne={organizationData.featured.headlineOne}
        descriptionOne={organizationData.featured.descriptionOne}
        imageOne={organizationData.featured.imageOne}
        headlineTwo={organizationData.featured.headlineTwo}
        descriptionTwo={organizationData.featured.descriptionTwo}
        imageTwo={organizationData.featured.imageTwo}
        headlineThree={organizationData.featured.headlineThree}
        descriptionThree={organizationData.featured.descriptionThree}
        imageThree={organizationData.featured.imageThree}
      />
      
      <CampaignsSection 
        campaigns={organizationData.campaigns}
      />
    </div>
  );
}