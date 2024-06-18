import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Define our phone props here which takes in an img source and whether it's dark or not
interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
}

const Phone = ({ imgSrc, dark = false, className, ...props }: PhoneProps) => {
  return (
    <div className={cn('relative pointer-events-none z-50 overflow-hidden', className)} {...props}>
      <img
        alt="phone-image"
        className="pointer-events-none z-50 select-none"
        src={dark ? '/phone-template-dark-edges.png' : '/phone-template-white-edges.png'}
      />

      <div className="absolute -z-10 inset-0">
        <img className="object-cover" src={imgSrc} alt="overlayign phone image" />
      </div>
    </div>
  );
};

export default Phone;
