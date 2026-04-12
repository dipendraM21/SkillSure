import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CapabilityFeatureCardProps {
  title: string;
  description: string;
  /** Top (default) or left (wide) illustration / animation */
  illustration: React.ReactNode;
  /** `default`: illustration stacked above copy. `wide`: copy left, illustration right on large screens. */
  layout?: 'default' | 'wide';
  /** Merged onto the root `motion.div` (e.g. `lg:col-span-2` for wide cards). */
  className?: string;
  /** Optional extra classes on the text column wrapper */
  textColumnClassName?: string;
}

const titleClassName =
  'font-heading text-[24px] font-semibold leading-snug tracking-tight text-[#1a1a1a]';

const descriptionClassName =
  'font-body text-[16px] font-normal leading-relaxed text-[#555555]';

/**
 * Shared feature card for capability grids: lavender gradient shell, 22px Rubik title, 16px / 400 Satoshi body.
 */
export function CapabilityFeatureCard({
  title,
  description,
  illustration,
  layout = 'default',
  className,
  textColumnClassName,
}: CapabilityFeatureCardProps) {
  const copy = (
    <>
      <h3 className={cn(titleClassName, layout === 'wide' ? 'mb-3' : 'mb-2')}>{title}</h3>
      <p className={cn(descriptionClassName, layout === 'wide' && 'max-w-md')}>{description}</p>
    </>
  );

  const shellDefault =
    'bg-gradient-to-b from-[#F0EAFF] to-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden';

  if (layout === 'wide') {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className={cn(
          'flex flex-col bg-gradient-to-br from-[#F0EAFF] to-white lg:flex-row',
          'rounded-2xl border border-purple-100 shadow-sm overflow-hidden',
          className,
        )}
      >
        <div
          className={cn(
            'relative z-10 flex flex-col justify-center bg-transparent p-8 lg:w-[55%] lg:p-12',
            textColumnClassName,
          )}
        >
          {copy}
        </div>
        {illustration}
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ y: -4 }} className={cn('flex flex-col', shellDefault, className)}>
      {illustration}
      <div className={cn('relative z-10 flex flex-1 flex-col bg-transparent p-8', textColumnClassName)}>
        {copy}
      </div>
    </motion.div>
  );
}
