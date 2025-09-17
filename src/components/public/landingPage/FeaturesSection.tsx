import { 
  Target, 
  Calendar, 
  CreditCard, 
  Users, 
  BarChart3, 
  Shield,
  Zap,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Campaign Management",
    description: "Create, launch, and track fundraising campaigns with powerful tools for goal setting, progress monitoring, and donor communication.",
    highlights: ["Goal tracking", "Multi-channel campaigns", "Real-time analytics"]
  },
  {
    icon: Calendar,
    title: "Event Management",
    description: "Organize and manage fundraising events, galas, and community gatherings with integrated ticketing and attendee management.",
    highlights: ["Event registration", "Ticket sales", "Attendee tracking"]
  },
  {
    icon: CreditCard,
    title: "Transaction Tracking",
    description: "Comprehensive financial tracking with automated reporting, tax receipt generation, and donor contribution history.",
    highlights: ["Automated receipts", "Financial reporting", "Tax compliance"]
  },
  {
    icon: Users,
    title: "Donor Engagement",
    description: "Build lasting relationships with donors through personalized communication, engagement scoring, and stewardship workflows.",
    highlights: ["Donor profiles", "Engagement scoring", "Stewardship plans"]
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Make data-driven decisions with comprehensive analytics, custom reports, and performance insights across all activities.",
    highlights: ["Custom dashboards", "Performance metrics", "ROI tracking"]
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security with SOC 2 compliance, data encryption, and privacy controls to protect donor information.",
    highlights: ["SOC 2 compliant", "Data encryption", "Privacy controls"]
  }
];

const additionalFeatures = [
  { icon: Zap, title: "Automation", description: "Workflow automation" },
  { icon: Globe, title: "Multi-language", description: "Global accessibility" },
  { icon: Shield, title: "Backup", description: "Data protection" },
  { icon: BarChart3, title: "Integrations", description: "Third-party tools" }
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Scale Your Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful tools designed specifically for nonprofits to manage campaigns, 
            engage donors, and track their mission's progress.
          </p>
        </div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional features */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              And Much More
            </h3>
            <p className="text-gray-600">
              Additional features to support your nonprofit's unique needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
