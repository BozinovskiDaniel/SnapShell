import React from 'react';

import { db } from '@/components/db';
import { notFound } from 'next/navigation';
import DesignConfig from './DesignConfig';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined,
  };
}

const Page = async ({ searchParams }: PageProps) => {
  // Make db call
  const { id } = searchParams;

  if (!id || typeof id !== 'string') {
    // Need an id for this to work
    return notFound();
  }

  // Find config with id in searchParams
  const config = await db.configuration.findUnique({
    where: { id },
  });

  if (!config) {
    // Nothing was found
    return notFound();
  }

  const { imgUrl, width, height } = config;
  console.log(imgUrl);

  return <DesignConfig configId={id} imgUrl={imgUrl} imageDimensions={{ width, height }} />;
};

export default Page;
