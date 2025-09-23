import { useMutation } from '@tanstack/react-query';
import * as stripeService from '../../lib/services/crm/stripe.service';

/**
 * A mutation hook to create a new Stripe Connect onboarding link.
 * Its most important job is to redirect the user to the Stripe URL
 * upon a successful API response.
 */
export const useCreateStripeConnectLinkMutation = () => {
  return useMutation({
    mutationFn: stripeService.createStripeConnectLink,
    onSuccess: (data) => {
      // This is the key step. When our backend successfully returns the
      // one-time-use URL, we immediately redirect the user's browser to it.
      console.log("data", data.url)
      if (data && data.url) {
        window.location.href = data.url;
      }
    },
    // The component will handle onError to display a message.
  });
};