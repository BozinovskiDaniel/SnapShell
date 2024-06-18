'use client';

import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';

// Utils
import MaxWidthWrapper from '../MaxWidthWrapper';
import ReviewGrid from './ReviewGrid';

function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img
        aria-hidden="true"
        src="/what-people-are-buying.png"
        alt=""
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />

      <ReviewGrid />
    </MaxWidthWrapper>
  );
}

export default Reviews;
