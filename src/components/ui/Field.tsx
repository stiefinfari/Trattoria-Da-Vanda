import {
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';

export function Label({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { className?: string }) {
  return (
    <label
      className={cn('text-sm font-semibold tracking-wide text-stone-800', className)}
      {...props}
    />
  );
}

export function FieldHint({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { className?: string }) {
  return <p className={cn('text-xs text-stone-500', className)} {...props} />;
}

export function FieldError({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { className?: string }) {
  return <p className={cn('text-xs font-medium text-red-600', className)} {...props} />;
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 shadow-sm',
        'placeholder:text-stone-400',
        'focus:border-brand-300 focus:ring-2 focus:ring-brand-200',
        className
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-3 text-sm text-stone-900 shadow-sm',
          'placeholder:text-stone-400',
          'focus:border-brand-300 focus:ring-2 focus:ring-brand-200',
          className
        )}
        {...props}
      />
    );
  }
);
