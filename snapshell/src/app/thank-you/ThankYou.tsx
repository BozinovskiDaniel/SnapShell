'use client';

import { useQuery } from '@tanstack/react-query';
import { getPaymentStatus } from './actions';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * States:
 * -> loading
 * -> not paid
 * -> paid
 */
const ThankYou = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || '';

  const { data } = useQuery({
    queryKey: ['get-payment-status'],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  const getLoadingText = (title: string, description: string) => {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  };

  // If we're loading, display the loader
  if (data === undefined) return getLoadingText('Loading your order...', "This won't take long.");

  // Waiting for the webhook to update our database
  if (data === false)
    return getLoadingText('Verifying your payment...', 'This might take a moment.');

  // If the paid has been successful
  const { configuration, billingAddress, shippingAddress, amount } = data;
  const { color } = configuration;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your case is on the way!
          </h1>

          <p className="mt-2 text-base text-zinc-500">
            We've received your oder and are now processing it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
