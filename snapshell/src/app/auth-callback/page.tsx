'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getAuthStatus } from './action';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  const [configId, setConfigId] = useState<string | null>(null);

  useEffect(() => {
    const configurationId = localStorage.getItem('configId');
    if (configurationId) {
      setConfigId(configurationId);
    }
  }, []);

  const { data } = useQuery({
    queryKey: ['auth-callback'],
    queryFn: async () => await getAuthStatus(),
    retry: true, // If the user doesnt have an email or id, we wnt to retry
    retryDelay: 500,
  });

  if (data?.success) {
    // User is in our DB
    localStorage.removeItem('configId'); // Remove configId from LS

    // If they had a config saved, redirect them to the preview page
    if (configId) router.push(`/configure/preview?id=${configId}`);
    else router.push('/');
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
