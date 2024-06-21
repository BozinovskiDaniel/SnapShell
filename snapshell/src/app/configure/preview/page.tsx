'use server';
import { db } from '@/components/db';
import { notFound } from 'next/navigation';
import DesignPreview from './DesignPreview';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined,
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  // If not valid id, re-direct to not found page
  if (!id || typeof id !== 'string') return notFound();

  const config = await db.configuration.findUnique({
    where: { id },
  });

  // If no config found, re-direct to not found page
  if (!config) return notFound();

  // Display preview of the configuration
  return <DesignPreview config={config} />;
};

export default Page;
