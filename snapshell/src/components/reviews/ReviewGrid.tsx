import React, { useRef } from 'react';

import { cn } from '@/lib/utils';
import { splitArray } from '@/utils/arrayUtils';
import { useInView } from 'framer-motion';

import ReviewColumn from './ReviewColumn';

const PHONES = [
  '/testimonials/1.jpg',
  '/testimonials/2.jpg',
  '/testimonials/3.jpg',
  '/testimonials/4.jpg',
  '/testimonials/5.jpg',
  '/testimonials/6.jpg',
];

function ReviewGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // We use container ref to run the animation when in view
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  // Split up the image strings into 3 columns
  const cols = splitArray(PHONES, 3);

  const col1 = cols[0];
  const col2 = cols[1];
  const col3 = splitArray(cols[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <ReviewColumn
            reviews={[...col1, ...col3.flat(), ...col2]}
            reviewClassName={(reviewIndex) =>
              cn({
                'md:hidden': reviewIndex >= col1.length + col3[0].length,
                'lg:hidden': reviewIndex >= col1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...col2, ...col3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) => (reviewIndex >= col2.length ? 'lg:hidden' : '')}
            msPerPixel={15}
          />
          <ReviewColumn reviews={col3.flat()} className="hidden md:block" msPerPixel={10} />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

export default ReviewGrid;
