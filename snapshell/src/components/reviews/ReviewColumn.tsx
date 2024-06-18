import React, { useState, useEffect, useRef } from 'react'
import Review from './Review'
import { cn } from '@/lib/utils'

function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0
} : {
  reviews: string[]
  className?: string
  reviewClassName?: (reviewIndex: number) => string
  msPerPixel?: number
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  
  const [colHeight, setColHeight] = useState<number>(0);
  const duration = `${colHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      // Listen to resizing events
      setColHeight(columnRef.current?.offsetHeight ?? 0)
    });

    resizeObserver.observe(columnRef.current); // Observe the column ref

    return () => {
      // Cleanup the observer
      resizeObserver.disconnect();
    }
  }, []);

  return <div ref={columnRef} className={cn("animate-marquee space-y-8 py-4", className)} style={{"--marquee-duration": duration} as React.CSSProperties}>
    {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
      <Review key={reviewIndex} className={reviewClassName?.(reviewIndex % reviews.length)} imgSrc={imgSrc} />
    ))}
  </div>
}

export default ReviewColumn