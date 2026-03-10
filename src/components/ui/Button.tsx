import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', type = 'button', ...props },
  ref
) {
  return <button ref={ref} type={type} className={buttonStyles({ variant, size, className })} {...props} />;
});

export default Button;
