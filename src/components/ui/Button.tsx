import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const variants = {
  primary:
    'bg-game-accent hover:bg-violet-600 text-white shadow-lg shadow-violet-500/20',
  secondary:
    'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
  ghost:
    'bg-transparent hover:bg-slate-800 text-slate-300 border border-slate-700',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-3.5 text-lg rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        font-semibold transition-all duration-200 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        active:scale-[0.97]
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
