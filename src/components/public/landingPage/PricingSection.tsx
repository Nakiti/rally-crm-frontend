import { Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "per month",
    description: "Perfect for small nonprofits getting started",
    features: [
      "Up to 1,000 donors",
      "Basic campaign management",
      "Event management tools",
      "Transaction tracking",
      "Email support",
      "Basic reporting"
    ],
    cta: "Start Free Trial",
    popular: false,
    color: "blue"
  },
  {
    name: "Professional",
    price: "$79",
    period: "per month", 
    description: "Ideal for growing organizations",
    features: [
      "Up to 10,000 donors",
      "Advanced campaign management",
      "Donor engagement tools",
      "Custom reporting",
      "Priority support",
      "API access",
      "Advanced analytics",
      "Multi-user accounts"
    ],
    cta: "Start Free Trial",
    popular: true,
    color: "purple"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations with complex needs",
    features: [
      "Unlimited donors",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
      "Advanced security",
      "Custom training",
      "SLA guarantee",
      "24/7 phone support"
    ],
    cta: "Contact Sales",
    popular: false,
    color: "blue"
  }
];

const addOns = [
  {
    name: "Additional Donors",
    price: "$0.05",
    description: "Per donor per month beyond plan limits"
  },
  {
    name: "Custom Integrations",
    price: "$500",
    description: "One-time setup fee for custom integrations"
  },
  {
    name: "Training Sessions",
    price: "$200",
    description: "Per hour for custom training sessions"
  }
];

export function PricingSection() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your organization's needs. All plans include 
            a 14-day free trial with no credit card required.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border-2 p-8 ${
                plan.popular
                  ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50'
                  : 'border-gray-200 bg-white'
              } hover:shadow-lg transition-all duration-300`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.name === "Enterprise" ? "/contact" : "/signup"}
                className={`w-full inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Additional Services
            </h3>
            <p className="text-gray-600">
              Enhance your plan with these optional add-ons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{addon.name}</h4>
                <div className="text-2xl font-bold text-blue-600 mb-2">{addon.price}</div>
                <p className="text-sm text-gray-600">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Questions about pricing? We're here to help.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            Contact our sales team
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
