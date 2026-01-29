'use client';

import React from 'react';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

export function PageHero({ title, subtitle, breadcrumbs, className = '' }: PageHeroProps) {
  return (
    <section className={`page-hero ${className}`}>
      {/* Floral decorations */}
      <div className="hero-floral-tl" />
      <div className="hero-floral-tr" />
      <div className="hero-floral-bl" />
      <div className="hero-floral-br" />

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="breadcrumb-separator">/</span>}
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span className="breadcrumb-current">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Content */}
      <h1 className="page-title">{title}</h1>
      {subtitle && (
        <p className="page-subtitle">{subtitle}</p>
      )}
    </section>
  );
}

export default PageHero;
