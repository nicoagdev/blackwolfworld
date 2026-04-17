import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-display text-xs tracking-widest uppercase text-bw-muted">
          {label}
        </label>
      )}
      <input
        className={cn(
          'w-full bg-bw-dark border border-white/10 rounded-xl px-4 py-3',
          'font-body text-bw-cream placeholder:text-bw-muted/50',
          'transition-all duration-300 ease-apple',
          'focus:outline-none focus:border-bw-gold/50 focus:ring-2 focus:ring-bw-gold/10',
          'hover:border-white/20',
          error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-red-400 text-xs font-body">{error}</span>
      )}
    </div>
  );
};

export default Input;