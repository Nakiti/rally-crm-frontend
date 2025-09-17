import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Executive Director",
    organization: "Hope Foundation",
    image: "/api/placeholder/64/64",
    content: "RallyCRM transformed our fundraising efforts. We've seen a 40% increase in donations and our donor engagement has never been stronger. The campaign management tools are incredibly intuitive.",
    rating: 5,
    results: "40% increase in donations"
  },
  {
    name: "Michael Chen",
    role: "Development Manager", 
    organization: "Green Earth Initiative",
    image: "/api/placeholder/64/64",
    content: "The event management features saved us countless hours. From registration to follow-up, everything is streamlined. Our last gala was our most successful yet, raising $150K more than our previous record.",
    rating: 5,
    results: "$150K increase in event revenue"
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    organization: "Community Care Network",
    image: "/api/placeholder/64/64", 
    content: "The analytics and reporting capabilities give us insights we never had before. We can now make data-driven decisions that directly impact our mission. The ROI tracking is phenomenal.",
    rating: 5,
    results: "Data-driven decision making"
  }
];

const caseStudies = [
  {
    title: "Children's Hospital Foundation",
    challenge: "Needed to streamline donor communication and track campaign progress",
    solution: "Implemented RallyCRM's donor engagement and campaign management tools",
    results: [
      "60% increase in donor retention",
      "35% faster campaign setup",
      "50% reduction in administrative time"
    ]
  },
  {
    title: "Environmental Conservation Society", 
    challenge: "Struggling with event management and attendee tracking",
    solution: "Deployed RallyCRM's event management and transaction tracking features",
    results: [
      "80% increase in event attendance",
      "45% boost in event revenue", 
      "90% reduction in manual data entry"
    ]
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Partners Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from nonprofit leaders who have transformed their operations with RallyCRM.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Quote className="w-6 h-6 text-blue-600" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Results highlight */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold text-sm">
                  Key Result: {testimonial.results}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gray-600 font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.organization}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case studies */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-200">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Success Stories
            </h3>
            <p className="text-gray-600">
              Detailed case studies showcasing real impact and measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  {study.title}
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Challenge:</h5>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Solution:</h5>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Results:</h5>
                    <ul className="space-y-1">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
