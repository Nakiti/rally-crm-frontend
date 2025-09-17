import {
  HeroSection,
  FeaturesSection,
  StatsSection,
  TestimonialsSection,
  PricingSection,
  CTASection,
  Footer
} from "@/components/public";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      {/* <TestimonialsSection /> */}
      {/* <PricingSection /> */}
      {/* <CTASection /> */}
      <Footer />
    </main>
  );
}
