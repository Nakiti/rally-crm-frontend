'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { ErrorModal } from '@/components/ui/ErrorModal';
import { useGetOrganization } from '@/hooks/crm/useOrganization';
import { useCreateStripeConnectLinkMutation } from '@/hooks/crm/useStripeApi';
import PaymentHeader from '@/components/crm/settings/PaymentHeader';
import { CheckCircle } from 'lucide-react';

/**
 * The main page component for managing Stripe Connect settings.
 */
export default function StripeConnectPage() {
  // 1. Fetch the organization's current status
  const { data: organization, isLoading, error } = useGetOrganization('');
  
  // 2. Get the mutation hook to trigger the connect flow
  const createLinkMutation = useCreateStripeConnectLinkMutation();

  const handleConnect = () => {
    // 3. When the button is clicked, call the mutate function.
    // The hook's onSuccess will handle the redirect.
    createLinkMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error instanceof Error ? error.message : 'Failed to load payment settings'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Check if the organization already has a Stripe account connected.
  const isStripeConnected = !!organization?.stripeAccountId;

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50">
      {createLinkMutation.error && (
        <ErrorModal 
          message={createLinkMutation.error instanceof Error ? createLinkMutation.error.message : 'Failed to connect with Stripe'} 
          onClose={() => createLinkMutation.reset()} 
        />
      )}
      
      <div className="p-6 max-w-6xl mx-auto">
        <PaymentHeader />
        
        <div className="space-y-8">
          <Card className="shadow-sm border border-gray-200">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Stripe Connect Integration
              </h2>
            </CardHeader>
            <CardContent>
              {isStripeConnected ? (
                <div className="text-center py-8">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-green-600" />
                  </div>
                  <p className="text-lg font-medium text-green-600 mb-2">
                    Your Stripe account is connected
                  </p>
                  <p className="text-sm text-gray-500">
                    You are ready to receive donations securely through Stripe.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Connect with Stripe
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Click the button below to be redirected to Stripe's secure onboarding
                      form to connect your bank account and verify your identity.
                    </p>
                  </div>
                  
                  <div className="flex justify-start">
                    <Button
                      onClick={handleConnect}
                      loading={createLinkMutation.isPending}
                      disabled={createLinkMutation.isPending}
                      size="lg"
                    >
                      Connect with Stripe
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}