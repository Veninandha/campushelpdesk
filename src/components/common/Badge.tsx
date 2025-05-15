import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  icon?: ReactNode;
}

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon
}: BadgeProps) => {
  const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  const baseStyles = 'inline-flex items-center font-medium rounded-full';
  
  const classes = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  return (
    <span className={classes}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;