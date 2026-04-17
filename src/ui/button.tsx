import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'icon-sm';
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-display font-semibold tracking-wide uppercase transition-all duration-300 ease-apple focus:outline-none focus:ring-2 focus:ring-bw-gold/30 disabled:opacity-50 disabled:pointer-events-none';

  const variants: Record<string, string> = {
    primary: 'bg-bw-gold text-bw-black hover:bg-bw-gold-light active:scale-[0.98]',
    secondary: 'bg-bw-dark text-bw-cream hover:bg-bw-dark-hover active:scale-[0.98]',
    outline: 'border border-bw-gold/30 text-bw-cream hover:border-bw-gold hover:text-bw-gold bg-transparent active:scale-[0.98]',
    ghost: 'text-bw-muted hover:text-bw-cream bg-transparent hover:bg-white/5 active:scale-[0.98]',
    gold: 'bg-bw-gold text-bw-black hover:bg-bw-gold-light shadow-lg shadow-bw-gold/20 active:scale-[0.98]',
  };

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-xs rounded-lg gap-1.5',
    md: 'px-6 py-3 text-sm rounded-xl gap-2',
    lg: 'px-8 py-4 text-base rounded-xl gap-2.5',
    'icon-sm': 'p-2 rounded-lg',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
export default Button;