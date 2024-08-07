import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Phone from '@/components/Phone';
import { Check, Star } from 'lucide-react';
import React from 'react';

function SectionOne() {
  return (
    <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
      <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
        <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="absolute w-28 left-0 -top-20 hidden lg:block">
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
            <img src="/snake-1.png" className="w-full" alt="logo" />
          </div>
          <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
            Your Image on a <span className="bg-orange-600 px-2 text-white">Custom</span> Phone Case
          </h1>
          <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
            Preserve your cherished memories with a unique,{' '}
            <span className="font-semibold">one-of-a-kind</span> phone case. SnapShell not only
            protects your phone but also safeguards your precious moments
          </p>

          <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
            <div className="space-y-2">
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-orange-600" />
                Crafted from premium, long-lasting materials
              </li>
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-orange-600" />
                Five-year guarantee on print quality
              </li>
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-orange-600" />
                Compatible with the latest iPhone models
              </li>
              <li className="flex gap-1.5 items-center text-left">
                <Check className="h-5 w-5 shrink-0 text-orange-600" />
                Sleek design tailored for a perfect fit
              </li>
            </div>
          </ul>

          <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="flex -space-x-4">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                src="/users/user-1.png"
                alt="user image"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                src="/users/user-2.png"
                alt="user image"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                src="/users/user-3.png"
                alt="user image"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-100"
                src="/users/user-4.jpg"
                alt="user image"
              />
              <img
                className="inline-block object-cover h-10 w-10 rounded-full ring-2 ring-slate-100"
                src="/users/user-5.jpg"
                alt="user image"
              />
            </div>

            <div className="flex flex-col justify-between items-center sm:items-start">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} className="h-4 w-4 text-orange-600 fill-orange-600" />
                ))}
              </div>

              <p>
                Over <span className="font-semibold">1,500</span> happy customers
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
        <div className="relative md:max-w-xl">
          <img
            alt="phone case with custom image"
            src="/your-image.png"
            className="absolute w-40 lg:w-52 left-56 -top-20 select-none hidden sm:block lg:hidden xl:block"
          />
          <img
            alt="separator line"
            src="/line.png"
            className="absolute w-20 -left-6 -bottom-6 select-none"
          />
          <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default SectionOne;
