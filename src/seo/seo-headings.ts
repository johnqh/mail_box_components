// SEO-optimized heading utility for consistent semantic structure
import React from 'react';
export interface HeadingConfig {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
  className?: string;
  id?: string;
  semanticContext?: 'page-title' | 'section' | 'subsection' | 'feature' | 'benefit' | 'step';
}

export const createSemanticHeading = (config: HeadingConfig): React.ReactElement => {
  const {
    level,
    text,
    className = '',
    id,
    semanticContext = 'section'
  } = config;

  const tagName = `h${level}` as keyof React.JSX.IntrinsicElements;
  
  // SEO-optimized class mappings for consistent visual hierarchy
  const seoClassMapping = {
    1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight', // Page titles
    2: 'text-3xl md:text-4xl font-bold leading-tight',              // Major sections  
    3: 'text-2xl md:text-3xl font-bold leading-tight',              // Subsections
    4: 'text-xl md:text-2xl font-semibold leading-tight',           // Features/Benefits
    5: 'text-lg md:text-xl font-semibold leading-tight',            // Sub-features
    6: 'text-base md:text-lg font-medium leading-tight'             // Details
  };

  // Context-specific styling
  const contextualStyling = {
    'page-title': 'text-gray-900 dark:text-white mb-6',
    'section': 'text-gray-900 dark:text-white mb-4',
    'subsection': 'text-gray-900 dark:text-white mb-3',
    'feature': 'text-gray-900 dark:text-white mb-2',
    'benefit': 'text-blue-600 dark:text-blue-400 mb-2',
    'step': 'text-green-600 dark:text-green-400 mb-2'
  };

  const finalClassName = [
    seoClassMapping[level],
    contextualStyling[semanticContext],
    className
  ].filter(Boolean).join(' ');

  // Auto-generate SEO-friendly IDs from text if not provided
  const headingId = id || text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return React.createElement(tagName, {
    id: headingId,
    className: finalClassName,
    'aria-level': level
  }, text);
};

// Predefined heading configurations for common Web3 contexts
export const WEB3_HEADING_PATTERNS = {
  pageTitle: (text: string, className?: string): HeadingConfig => ({
    level: 1,
    text,
    className,
    semanticContext: 'page-title'
  }),
  
  majorSection: (text: string, className?: string): HeadingConfig => ({
    level: 2,
    text,
    className,
    semanticContext: 'section'
  }),
  
  feature: (text: string, className?: string): HeadingConfig => ({
    level: 3,
    text,
    className,
    semanticContext: 'feature'
  }),
  
  benefit: (text: string, className?: string): HeadingConfig => ({
    level: 3,
    text,
    className,
    semanticContext: 'benefit'
  }),
  
  step: (text: string, stepNumber?: number, className?: string): HeadingConfig => ({
    level: 3,
    text: stepNumber ? `Step ${stepNumber}: ${text}` : text,
    className,
    semanticContext: 'step'
  }),
  
  subFeature: (text: string, className?: string): HeadingConfig => ({
    level: 4,
    text,
    className,
    semanticContext: 'feature'
  })
};

// Heading structure validation for SEO compliance
export const validateHeadingStructure = (headings: HeadingConfig[]): {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
} => {
  const errors: string[] = [];
  const suggestions: string[] = [];
  
  // Check for single H1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    errors.push('Missing H1 tag - every page should have exactly one H1');
  } else if (h1Count > 1) {
    errors.push(`Multiple H1 tags found (${h1Count}) - use only one H1 per page`);
  }
  
  // Check hierarchical structure
  for (let i = 1; i < headings.length; i++) {
    const current = headings[i];
    const previous = headings[i - 1];
    
    if (current.level > previous.level + 1) {
      errors.push(`Heading level jump from H${previous.level} to H${current.level} - avoid skipping levels`);
    }
  }
  
  // Check for descriptive text
  headings.forEach((heading, index) => {
    if (heading.text.length < 3) {
      errors.push(`Heading ${index + 1} is too short - use descriptive text`);
    }
    
    if (heading.text.length > 70) {
      suggestions.push(`Heading "${heading.text.substring(0, 30)}..." is long - consider shortening for better SEO`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    suggestions
  };
};

// Common Web3 email heading patterns
export const WEB3_EMAIL_HEADINGS = {
  walletConnection: WEB3_HEADING_PATTERNS.pageTitle('Connect Your Web3 Wallet'),
  emailBenefits: WEB3_HEADING_PATTERNS.majorSection('Why Choose Web3 Email?'),
  securityFeature: WEB3_HEADING_PATTERNS.feature('Secure & Private'),
  ensIntegration: WEB3_HEADING_PATTERNS.feature('ENS Domain Support'),
  multiChain: WEB3_HEADING_PATTERNS.feature('Multi-Chain Compatibility'),
  passwordless: WEB3_HEADING_PATTERNS.benefit('No Passwords Required'),
  setupStep1: WEB3_HEADING_PATTERNS.step('Connect Your Wallet', 1),
  setupStep2: WEB3_HEADING_PATTERNS.step('Verify Your Identity', 2),
  setupStep3: WEB3_HEADING_PATTERNS.step('Access Your Emails', 3)
};

export default {
  createSemanticHeading,
  WEB3_HEADING_PATTERNS,
  validateHeadingStructure,
  WEB3_EMAIL_HEADINGS
};