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
    default: 'border',
    secondary: 'border',
    tertiary: 'border'
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return { backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' };
      case 'secondary':
        return { backgroundColor: 'var(--color-card-secondary)', borderColor: 'var(--color-border)' };
      case 'tertiary':
        return { backgroundColor: 'var(--color-card-tertiary)', borderColor: 'var(--color-border-light)' };
      default:
        return { backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' };
    }
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`} 
      style={getVariantStyles()}
      onClick={onClick}
    >
      {children}
    </div>
  );
} 