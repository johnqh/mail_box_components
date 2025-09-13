import React from 'react';

/**
 * Semantic HTML Enhancement Components
 * These components provide semantic meaning to improve accessibility and SEO
 */

interface SemanticSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

// Main content section
const Main: React.FC<SemanticSectionProps> = ({ children, className, ...props }) => (
  <main className={className} {...props} role="main">
    {children}
  </main>
);

// Article content
const Article: React.FC<SemanticSectionProps> = ({ children, className, ...props }) => (
  <article className={className} {...props}>
    {children}
  </article>
);

// Section within content
const Section: React.FC<SemanticSectionProps> = ({ children, className, ...props }) => (
  <section className={className} {...props}>
    {children}
  </section>
);

// Navigation component
interface NavProps extends SemanticSectionProps {
  'aria-label': string; // Required for nav elements
}

const Nav: React.FC<NavProps> = ({ children, className, ...props }) => (
  <nav className={className} {...props} role="navigation">
    {children}
  </nav>
);

// Header component
const Header: React.FC<SemanticSectionProps> = ({ children, className, ...props }) => (
  <header className={className} {...props} role="banner">
    {children}
  </header>
);

// Footer component
const Footer: React.FC<SemanticSectionProps> = ({ children, className, ...props }) => (
  <footer className={className} {...props} role="contentinfo">
    {children}
  </footer>
);

// Aside content (sidebars, related content)
const Aside: React.FC<SemanticSectionProps> = ({ children, className, ...props }) => (
  <aside className={className} {...props} role="complementary">
    {children}
  </aside>
);

// Figure with caption
interface FigureProps {
  children: React.ReactNode;
  caption?: string;
  className?: string;
  id?: string;
}

const Figure: React.FC<FigureProps> = ({ children, caption, className, ...props }) => (
  <figure className={className} {...props}>
    {children}
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

// Enhanced heading components with proper hierarchy
interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-level'?: number;
}

const H1: React.FC<HeadingProps> = ({ children, className, ...props }) => (
  <h1 className={className} {...props}>
    {children}
  </h1>
);

const H2: React.FC<HeadingProps> = ({ children, className, ...props }) => (
  <h2 className={className} {...props}>
    {children}
  </h2>
);

const H3: React.FC<HeadingProps> = ({ children, className, ...props }) => (
  <h3 className={className} {...props}>
    {children}
  </h3>
);

const H4: React.FC<HeadingProps> = ({ children, className, ...props }) => (
  <h4 className={className} {...props}>
    {children}
  </h4>
);

// List components with semantic meaning
interface ListProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const OrderedList: React.FC<ListProps> = ({ children, className, ...props }) => (
  <ol className={className} {...props}>
    {children}
  </ol>
);

const UnorderedList: React.FC<ListProps> = ({ children, className, ...props }) => (
  <ul className={className} {...props}>
    {children}
  </ul>
);

// Enhanced button with proper semantics
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  'aria-describedby'?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary',
  disabled,
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced link with accessibility
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  'aria-describedby'?: string;
}

const Link: React.FC<LinkProps> = ({ 
  children, 
  external, 
  className = '',
  href,
  ...props 
}) => {
  const linkProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-describedby': 'external-link-desc'
  } : {};
  
  return (
    <>
      <a
        className={`text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        href={href}
        {...linkProps}
        {...props}
      >
        {children}
        {external && <span className="sr-only"> (opens in new tab)</span>}
      </a>
      {external && (
        <span id="external-link-desc" className="sr-only">
          External links open in a new tab
        </span>
      )}
    </>
  );
};

// Skip navigation link for accessibility
const SkipLink: React.FC<{ href: string }> = ({ href }) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
  >
    Skip to main content
  </a>
);

// Landmark regions with proper ARIA labels
interface LandmarkProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const SearchRegion: React.FC<LandmarkProps> = ({ children, className, ...props }) => (
  <div role="search" className={className} {...props}>
    {children}
  </div>
);

const BannerRegion: React.FC<LandmarkProps> = ({ children, className, ...props }) => (
  <div role="banner" className={className} {...props}>
    {children}
  </div>
);

const ComplementaryRegion: React.FC<LandmarkProps> = ({ children, className, ...props }) => (
  <div role="complementary" className={className} {...props}>
    {children}
  </div>
);

// Form components with proper labeling
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

const Form: React.FC<FormProps> = ({ children, className, ...props }) => (
  <form className={className} {...props}>
    {children}
  </form>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helpText?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  helpText, 
  id, 
  className = '',
  ...props 
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const helpId = helpText ? `${inputId}-help` : undefined;
  
  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        id={inputId}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        aria-describedby={[helpId, errorId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      {helpText && (
        <p id={helpId} className="mt-1 text-sm text-gray-600">
          {helpText}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

// Screen reader only text
const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
);

// Loading indicator with proper semantics
interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Loading: React.FC<LoadingProps> = ({ 
  message = 'Loading...', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };
  
  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center space-x-2">
      <div 
        className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]}`}
        aria-hidden="true"
      />
      <span className="sr-only">{message}</span>
    </div>
  );
};


export { 
  Main, Article, Section, Nav, Header, Footer, Aside, Figure,
  H1, H2, H3, H4, OrderedList, UnorderedList, Button, Link, SkipLink,
  SearchRegion, BannerRegion, ComplementaryRegion, Form, Input,
  ScreenReaderOnly, Loading,
  type SemanticSectionProps, type NavProps, type FigureProps,
  type HeadingProps, type ListProps, type ButtonProps, type LinkProps,
  type LandmarkProps, type FormProps, type InputProps, type LoadingProps
};
export default Main;