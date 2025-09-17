import { TrendingUp, Users, DollarSign, Heart } from "lucide-react";

const stats = [
  {
    icon: DollarSign,
    value: "$2.4M+",
    label: "Funds Raised",
    description: "Total funds raised by our nonprofit partners",
    change: "+23%",
    changeType: "positive" as const
  },
  {
    icon: Users,
    value: "15,000+",
    label: "Active Donors",
    description: "Donors actively engaged through our platform",
    change: "+18%",
    changeType: "positive" as const
  },
  {
    icon: TrendingUp,
    value: "89%",
    label: "Campaign Success Rate",
    description: "Average success rate of fundraising campaigns",
    change: "+5%",
    changeType: "positive" as const
  },
  {
    icon: Heart,
    value: "500+",
    label: "Nonprofits Served",
    description: "Organizations using RallyCRM worldwide",
    change: "+12%",
    changeType: "positive" as const
  }
];

export function StatsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Trusted by Nonprofits Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Join hundreds of organizations that have transformed their fundraising 
            and donor engagement with RallyCRM.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              
              <p className="text-blue-100 text-sm mb-4">
                {stat.description}
              </p>
              
              <div className="flex items-center justify-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof */}
        <div className="mt-16 text-center">
          <p className="text-blue-100 mb-8">
            Trusted by leading nonprofits across various sectors
          </p>
          
          {/* Logo placeholders */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              "Children's Foundation",
              "Environmental Alliance", 
              "Healthcare Initiative",
              "Education First",
              "Community Care"
            ].map((org, index) => (
              <div key={index} className="text-white font-medium text-sm">
                {org}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
