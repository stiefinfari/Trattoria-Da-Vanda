import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export default function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-brand-200 bg-brand-50/70 px-3 py-1 text-base font-semibold tracking-[0.24em] uppercase text-brand-800 md:text-[11px]',
        className
      )}
      {...props}
    />
  );
}
