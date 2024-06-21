'use client';

import { useEffect, useState } from 'react';

import Confetti from 'react-dom-confetti';
import Phone from '@/components/Phone';
import { Configuration } from '@prisma/client';
import { COLORS, MODELS } from '@/validators/option-validator';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const DesignPreview = ({ config }: { config: Configuration }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => setShowConfetti(true), []);

  const { color, model } = config;
  
  // Find correct color
  const tailwindColor = COLORS.find((supportedColor) => supportedColor.value === color)?.tw;
  
  // Find correct model
  const modelLabel = MODELS.options.find((supportedModel) => supportedModel.value === model)?.label;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90 }} />
      </div>

      <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
          <Phone className={cn(`bg-${tailwindColor}`)} imgSrc={config.croppedImgUrl!} />
        </div>

        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">Your {modelLabel} Case</h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
          <Check className="h-4 w-4 text-orange-500" />
          In stock and ready to ship
        </div>
        </div>
        
        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:gap-x-6 sm:py-6 md:py-10">

            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>

            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality, durable materials</li>
                <li>Scratch-resistant coating</li>
              </ol>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
