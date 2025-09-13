import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import {
  createSemanticHeading,
  WEB3_HEADING_PATTERNS,
  validateHeadingStructure,
  WEB3_EMAIL_HEADINGS,
  type HeadingConfig
} from '../seo/seo-headings';

describe('SEO Headings Utils', () => {
  describe('createSemanticHeading function', () => {
    it('should create a heading element with correct tag', () => {
      const config: HeadingConfig = {
        level: 1,
        text: 'Test Heading'
      };
      
      const heading = createSemanticHeading(config);
      
      expect(heading.type).toBe('h1');
      expect(heading.props.children).toBe('Test Heading');
    });

    it('should apply correct CSS classes based on level', () => {
      const config: HeadingConfig = {
        level: 2,
        text: 'Section Heading'
      };
      
      const heading = createSemanticHeading(config);
      
      expect(heading.props.className).toContain('text-3xl');
      expect(heading.props.className).toContain('md:text-4xl');
      expect(heading.props.className).toContain('font-bold');
    });

    it('should generate ID from text when not provided', () => {
      const config: HeadingConfig = {
        level: 3,
        text: 'This is a Test Heading!'
      };
      
      const heading = createSemanticHeading(config);
      
      expect(heading.props.id).toBe('this-is-a-test-heading');
    });

    it('should use provided ID when given', () => {
      const config: HeadingConfig = {
        level: 2,
        text: 'Custom Heading',
        id: 'custom-id'
      };
      
      const heading = createSemanticHeading(config);
      
      expect(heading.props.id).toBe('custom-id');
    });

    it('should apply semantic context styling', () => {
      const config: HeadingConfig = {
        level: 3,
        text: 'Feature Heading',
        semanticContext: 'benefit'
      };
      
      const heading = createSemanticHeading(config);
      
      expect(heading.props.className).toContain('text-blue-600');
      expect(heading.props.className).toContain('dark:text-blue-400');
    });

    it('should include accessibility attributes', () => {
      const config: HeadingConfig = {
        level: 4,
        text: 'Accessible Heading'
      };
      
      const heading = createSemanticHeading(config);
      
      expect(heading.props['aria-level']).toBe(4);
    });

    it('should handle all heading levels', () => {
      for (let level = 1; level <= 6; level++) {
        const config: HeadingConfig = {
          level: level as 1 | 2 | 3 | 4 | 5 | 6,
          text: `Level ${level} Heading`
        };
        
        const heading = createSemanticHeading(config);
        
        expect(heading.type).toBe(`h${level}`);
        expect(heading.props['aria-level']).toBe(level);
      }
    });
  });

  describe('WEB3_HEADING_PATTERNS', () => {
    it('should provide correct heading patterns', () => {
      expect(WEB3_HEADING_PATTERNS.pageTitle).toBeDefined();
      expect(WEB3_HEADING_PATTERNS.majorSection).toBeDefined();
      expect(WEB3_HEADING_PATTERNS.feature).toBeDefined();
      expect(WEB3_HEADING_PATTERNS.benefit).toBeDefined();
      expect(WEB3_HEADING_PATTERNS.step).toBeDefined();
      expect(WEB3_HEADING_PATTERNS.subFeature).toBeDefined();
    });

    it('should generate page title correctly', () => {
      const config = WEB3_HEADING_PATTERNS.pageTitle('Test Page Title');
      
      expect(config.level).toBe(1);
      expect(config.text).toBe('Test Page Title');
      expect(config.semanticContext).toBe('page-title');
    });

    it('should generate major section correctly', () => {
      const config = WEB3_HEADING_PATTERNS.majorSection('Section Title');
      
      expect(config.level).toBe(2);
      expect(config.text).toBe('Section Title');
      expect(config.semanticContext).toBe('section');
    });

    it('should generate feature heading correctly', () => {
      const config = WEB3_HEADING_PATTERNS.feature('Feature Name');
      
      expect(config.level).toBe(3);
      expect(config.text).toBe('Feature Name');
      expect(config.semanticContext).toBe('feature');
    });

    it('should generate benefit heading correctly', () => {
      const config = WEB3_HEADING_PATTERNS.benefit('Benefit Description');
      
      expect(config.level).toBe(3);
      expect(config.text).toBe('Benefit Description');
      expect(config.semanticContext).toBe('benefit');
    });

    it('should generate step heading with number', () => {
      const config = WEB3_HEADING_PATTERNS.step('Connect Wallet', 1);
      
      expect(config.level).toBe(3);
      expect(config.text).toBe('Step 1: Connect Wallet');
      expect(config.semanticContext).toBe('step');
    });

    it('should generate step heading without number', () => {
      const config = WEB3_HEADING_PATTERNS.step('Setup Process');
      
      expect(config.level).toBe(3);
      expect(config.text).toBe('Setup Process');
      expect(config.semanticContext).toBe('step');
    });
  });

  describe('validateHeadingStructure function', () => {
    it('should validate correct heading structure', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'Page Title' },
        { level: 2, text: 'Major Section' },
        { level: 3, text: 'Subsection' },
        { level: 3, text: 'Another Subsection' },
        { level: 2, text: 'Second Major Section' }
      ];
      
      const result = validateHeadingStructure(headings);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing H1', () => {
      const headings: HeadingConfig[] = [
        { level: 2, text: 'Section' },
        { level: 3, text: 'Subsection' }
      ];
      
      const result = validateHeadingStructure(headings);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Missing H1 tag - every page should have exactly one H1');
    });

    it('should detect multiple H1s', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'First Title' },
        { level: 1, text: 'Second Title' },
        { level: 2, text: 'Section' }
      ];
      
      const result = validateHeadingStructure(headings);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Multiple H1 tags found (2) - use only one H1 per page');
    });

    it('should detect heading level jumps', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'Title' },
        { level: 4, text: 'Jumped to H4' }
      ];
      
      const result = validateHeadingStructure(headings);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Heading level jump from H1 to H4 - avoid skipping levels');
    });

    it('should detect too short headings', () => {
      const headings: HeadingConfig[] = [
        { level: 1, text: 'OK' },
        { level: 2, text: 'Hi' }
      ];
      
      const result = validateHeadingStructure(headings);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Heading 2 is too short - use descriptive text');
    });

    it('should suggest shortening long headings', () => {
      const longText = 'This is an extremely long heading that exceeds the recommended character limit for SEO optimization';
      const headings: HeadingConfig[] = [
        { level: 1, text: 'Title' },
        { level: 2, text: longText }
      ];
      
      const result = validateHeadingStructure(headings);
      
      expect(result.suggestions.length).toBeGreaterThan(0);
      expect(result.suggestions[0]).toContain('is long - consider shortening');
    });
  });

  describe('WEB3_EMAIL_HEADINGS constants', () => {
    it('should provide predefined Web3 email headings', () => {
      expect(WEB3_EMAIL_HEADINGS.walletConnection).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.emailBenefits).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.securityFeature).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.ensIntegration).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.multiChain).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.passwordless).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.setupStep1).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.setupStep2).toBeDefined();
      expect(WEB3_EMAIL_HEADINGS.setupStep3).toBeDefined();
    });

    it('should have correct structure for predefined headings', () => {
      expect(WEB3_EMAIL_HEADINGS.walletConnection.level).toBe(1);
      expect(WEB3_EMAIL_HEADINGS.walletConnection.text).toBe('Connect Your Web3 Wallet');
      
      expect(WEB3_EMAIL_HEADINGS.emailBenefits.level).toBe(2);
      expect(WEB3_EMAIL_HEADINGS.emailBenefits.text).toBe('Why Choose Web3 Email?');
      
      expect(WEB3_EMAIL_HEADINGS.setupStep1.text).toBe('Step 1: Connect Your Wallet');
      expect(WEB3_EMAIL_HEADINGS.setupStep2.text).toBe('Step 2: Verify Your Identity');
      expect(WEB3_EMAIL_HEADINGS.setupStep3.text).toBe('Step 3: Access Your Emails');
    });
  });

  describe('Integration with React', () => {
    it('should render heading elements correctly', () => {
      const config: HeadingConfig = {
        level: 2,
        text: 'Test Heading',
        className: 'custom-class'
      };
      
      const HeadingElement = () => createSemanticHeading(config);
      const { container } = render(React.createElement(HeadingElement));
      
      const h2 = container.querySelector('h2');
      expect(h2).toBeInTheDocument();
      expect(h2?.textContent).toBe('Test Heading');
      expect(h2?.className).toContain('custom-class');
    });

    it('should handle dark mode classes', () => {
      const config: HeadingConfig = {
        level: 1,
        text: 'Dark Mode Heading',
        semanticContext: 'page-title'
      };
      
      const heading = createSemanticHeading(config);
      
      expect(heading.props.className).toContain('dark:text-white');
    });
  });
});