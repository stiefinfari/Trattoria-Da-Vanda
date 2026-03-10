import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export default function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-stone-200/70 bg-white/70 backdrop-blur-sm shadow-soft',
        className
      )}
      {...props}
    />
  );
}
