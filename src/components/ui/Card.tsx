import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'tertiary';
  onClick?: () => void;
}

export function Card({ children, className = '', variant = 'default', onClick }: CardProps) {
  const baseClasses = 'rounded-lg p-4';
  
  const variantClasses = {
    default: 'bg-[var(--color-card)] border border-[var(--color-border)]',
    secondary: 'bg-[var(--color-card-secondary)] border border-[var(--color-border)]',
    tertiary: 'bg-[var(--color-card-tertiary)] border border-[var(--color-border-light)]'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
} 