import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
import Phone from '../Phone';

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

const POSSIBLE_ANIMATION_DELAYS = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s'];

function Review({ imgSrc, className, ...props }: ReviewProps) {
  // Choose any random possible number between 0 to length of possible animations - 1
  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)];

  return (
    <div
      className={cn(
        'animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5',
        className
      )}
      style={{ animationDelay }}
      {...props}
    >
      <Phone imgSrc={imgSrc} />
    </div>
  );
}

export default Review;
