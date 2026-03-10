import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold tracking-[0.14em] uppercase transition-all select-none',
    'focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50',
    'disabled:opacity-50 disabled:pointer-events-none',
    size === 'sm' && 'px-4 py-2 text-base md:text-[11px]',
    size === 'md' && 'px-6 py-3 text-base md:text-[12px]',
    size === 'lg' && 'px-7 py-3.5 text-base md:text-[12px]',
    variant === 'primary' &&
      'bg-brand-700 text-white shadow-soft hover:bg-brand-600 active:translate-y-[1px] active:shadow-none',
    variant === 'secondary' &&
      'bg-stone-950 text-stone-50 shadow-soft hover:bg-stone-900 active:translate-y-[1px] active:shadow-none',
    variant === 'outline' &&
      'border border-stone-200 bg-white/60 backdrop-blur text-stone-900 hover:bg-white active:translate-y-[1px]',
    variant === 'ghost' && 'bg-transparent text-stone-900 hover:bg-stone-100',
    className
  );
}
