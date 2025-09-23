import Link from "next/link";
import { CreditCard, FileText, Settings } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { StatusIndicator } from "./StatusIndicator";

interface RequirementsCardProps {
  hasStripeAccount: boolean;
  stripeVerified: boolean;
  landingPagePublished: boolean;
  aboutPagePublished: boolean;
  organizationNameSet: boolean;
  subdomainConfigured: boolean;
  statusLoading: boolean;
  pagesLoading: boolean;
}

export const RequirementsCard = ({
  hasStripeAccount,
  stripeVerified,
  landingPagePublished,
  aboutPagePublished,
  organizationNameSet,
  subdomainConfigured,
  statusLoading,
  pagesLoading
}: RequirementsCardProps) => {
  return (
    <div className="space-y-6">
      {/* Stripe Configuration */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
            Payment Configuration
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <StatusIndicator 
              isComplete={hasStripeAccount} 
              isLoading={statusLoading}
            >
              Stripe Account Connected
            </StatusIndicator>
            <StatusIndicator 
              isComplete={stripeVerified} 
              isLoading={statusLoading}
            >
              Stripe Account Verified
            </StatusIndicator>
            {!hasStripeAccount && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Action Required:</strong> Connect your Stripe account in the{' '}
                  <Link href="/settings/payment" className="underline hover:text-blue-900">
                    Payment Settings
                  </Link>{' '}
                  to accept donations.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Required Pages */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Required Pages
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <StatusIndicator 
              isComplete={landingPagePublished} 
              isLoading={pagesLoading}
            >
              Landing Page Published
            </StatusIndicator>
            <StatusIndicator 
              isComplete={aboutPagePublished} 
              isLoading={pagesLoading}
            >
              About Page Published
            </StatusIndicator>
            {(!landingPagePublished || !aboutPagePublished) && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Action Required:</strong> Publish your required pages in the{' '}
                  <Link href="/website" className="underline hover:text-blue-900">
                    Website Editor
                  </Link>{' '}
                  to make them live.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Organization Information */}
      <Card className="shadow-sm border border-gray-200">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Settings className="w-5 h-5 mr-2 text-blue-600" />
            Organization Information
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <StatusIndicator 
              isComplete={organizationNameSet} 
              isLoading={false}
            >
              Organization Name Set
            </StatusIndicator>
            <StatusIndicator 
              isComplete={subdomainConfigured} 
              isLoading={false}
            >
              Subdomain Configured
            </StatusIndicator>
            {(!organizationNameSet || !subdomainConfigured) && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Action Required:</strong> Complete your organization details in the{' '}
                  <Link href="/settings/organization" className="underline hover:text-blue-900">
                    Organization Settings
                  </Link>{' '}
                  to set up your basic information.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
