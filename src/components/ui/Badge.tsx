import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'focus' | 'intensity' | 'tempo' | 'duration' | 'rest';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  focus: 'bg-blue-100 text-blue-700',
  intensity: 'bg-orange-100 text-orange-700',
  tempo: 'bg-purple-100 text-purple-700',
  duration: 'bg-green-100 text-green-700',
  rest: 'bg-teal-100 text-teal-700',
};

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
