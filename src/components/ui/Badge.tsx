'use client';

import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'new' | 'sale' | 'soldout';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
}

export default Badge;
