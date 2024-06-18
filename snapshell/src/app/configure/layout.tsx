import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Steps from '@/components/steps';
import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}

export default Layout;
