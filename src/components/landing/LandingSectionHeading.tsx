import React from 'react';
import { cn } from '@/lib/utils';

export type LandingSectionHeadingAlign = 'center' | 'left';

export interface LandingSectionHeadingProps {
  /** Optional icon inside the pill (e.g. Sparkles) — use brand color on the icon */
  badgeIcon?: React.ReactNode;
  badgeLabel: string;
  /** `neutral` = dark gray label (reference: Core Platform). `brand` = primary purple label. */
  badgeTone?: 'neutral' | 'brand';
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: LandingSectionHeadingAlign;
  className?: string;
  /** Override title typography. Merged last so it wins over defaults. */
  titleClassName?: string;
  /** Override description typography (e.g. responsive `text-base sm:text-lg`). Merged last. */
  descriptionClassName?: string;
  /** Override default bottom margin (e.g. `mb-12`) */
  mb?: string;
}

/**
 * Shared landing section header: pill badge + Rubik title + Satoshi description.
 * Matches the “Core Platform Capabilities” reference (badge medium, title bold, body regular).
 */
export function LandingSectionHeading({
  badgeIcon,
  badgeLabel,
  badgeTone = 'neutral',
  title,
  description,
  align = 'center',
  className,
  titleClassName,
  descriptionClassName,
  mb = 'mb-16',
}: LandingSectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        isCenter ? 'items-center text-center' : 'items-start text-left',
        mb,
        className,
      )}
    >
      <div
        className={cn(
          'font-body inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200/90 bg-white shadow-sm',
          isCenter && 'mx-auto',
        )}
      >
        {badgeIcon}
        <span
          className={cn(
            'text-sm font-medium',
            badgeTone === 'neutral' ? 'text-gray-700' : 'text-[#4427AD]',
          )}
        >
          {badgeLabel}
        </span>
      </div>

      <h2
        className={cn(
          'font-heading text-[28px] sm:text-4xl md:text-5xl font-bold text-[#111827] tracking-[-0.02em] leading-[1.1]',
          isCenter && 'max-w-4xl',
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description != null && description !== '' ? (
        typeof description === 'string' ? (
          <p
            className={cn(
              'font-body text-base sm:text-lg md:text-xl font-normal text-slate-500 leading-relaxed max-w-2xl',
              isCenter && 'mx-auto',
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : (
          <div
            className={cn(
              'font-body text-base sm:text-lg md:text-xl font-normal text-slate-500 leading-relaxed max-w-2xl',
              isCenter && 'mx-auto',
              descriptionClassName,
            )}
          >
            {description}
          </div>
        )
      ) : null}
    </div>
  );
}
