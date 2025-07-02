import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export function Button({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-50';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: 'bg-[var(--color-button)] hover:bg-[var(--color-button-hover)] text-[var(--color-button-text)] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-[var(--color-card-secondary)] hover:bg-[var(--color-card-tertiary)] text-[var(--color-text-primary)] border border-[var(--color-border)]',
    danger: 'bg-[var(--color-danger)] hover:bg-red-600 text-white disabled:opacity-50 disabled:cursor-not-allowed',
    ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-secondary)]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
} 