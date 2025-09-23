import apiClient from '../../apiClient';

interface StripeConnectLinkResponse {
  url: string;
}

/**
 * A service function that asks the backend for a new Stripe Connect onboarding link.
 */
export const createStripeConnectLink = async (): Promise<StripeConnectLinkResponse> => {
  const response = await apiClient.post('/crm/stripe/onboarding-link');
  console.log(response)
  return response.data.data;
};

