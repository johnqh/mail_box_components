import { describe, it, expect } from 'vitest';
import { GRADIENTS, GRADIENT_CLASSES, getGradient, combineGradient } from '../utils/gradients';

describe('Gradients Utils', () => {
  describe('GRADIENTS constant', () => {
    it('should have predefined gradient configurations', () => {
      expect(GRADIENTS).toBeDefined();
      expect(typeof GRADIENTS).toBe('object');
    });

    it('should contain expected gradient types', () => {
      expect(GRADIENTS.backgrounds).toBeDefined();
      expect(GRADIENTS.buttons).toBeDefined();
      expect(GRADIENTS.text).toBeDefined();
      expect(GRADIENTS.effects).toBeDefined();
    });

    it('should have proper gradient structure', () => {
      Object.values(GRADIENTS).forEach((gradientCategory) => {
        expect(typeof gradientCategory).toBe('object');
        Object.values(gradientCategory).forEach((gradientClass) => {
          expect(typeof gradientClass).toBe('string');
          expect(gradientClass.length).toBeGreaterThan(0);
          // Should contain gradient-related CSS classes
          expect(gradientClass).toMatch(/bg-gradient|from-|to-/);
        });
      });
    });
  });

  describe('GRADIENT_CLASSES constant', () => {
    it('should have CSS class mappings for each gradient', () => {
      expect(GRADIENT_CLASSES).toBeDefined();
      expect(typeof GRADIENT_CLASSES).toBe('object');
    });

    it('should map to valid CSS classes', () => {
      Object.values(GRADIENT_CLASSES).forEach((className) => {
        expect(typeof className).toBe('string');
        expect(className.length).toBeGreaterThan(0);
        // Should contain gradient-related CSS classes
        expect(className).toMatch(/bg-gradient|from-|to-|via-/);
      });
    });

    it('should have predefined gradient class combinations', () => {
      expect(GRADIENT_CLASSES.primaryButton).toBeDefined();
      expect(GRADIENT_CLASSES.heroButton).toBeDefined();
      expect(GRADIENT_CLASSES.headerButton).toBeDefined();
      expect(GRADIENT_CLASSES.pageLayout).toBeDefined();
      expect(GRADIENT_CLASSES.gradientText).toBeDefined();
    });
  });

  describe('getGradient function', () => {
    it('should get gradient from category and variant', () => {
      const result = getGradient('buttons', 'primary');
      expect(typeof result).toBe('string');
      expect(result).toBe(GRADIENTS.buttons.primary);
    });

    it('should return empty string for non-existent variant', () => {
      const result = getGradient('buttons', 'nonexistent');
      expect(result).toBe('');
    });

    it('should work with all gradient categories', () => {
      const backgroundGradient = getGradient('backgrounds', 'main');
      const textGradient = getGradient('text', 'primary');
      const effectGradient = getGradient('effects', 'glow');

      expect(backgroundGradient).toBe(GRADIENTS.backgrounds.main);
      expect(textGradient).toBe(GRADIENTS.text.primary);
      expect(effectGradient).toBe(GRADIENTS.effects.glow);
    });
  });

  describe('combineGradient function', () => {
    it('should combine gradient with additional classes', () => {
      const gradient = 'bg-gradient-to-r from-blue-500 to-purple-500';
      const additional = 'hover:scale-105 transition-transform';
      
      const result = combineGradient(gradient, additional);
      
      expect(result).toBe(`${gradient} ${additional}`);
    });

    it('should handle empty additional classes', () => {
      const gradient = 'bg-gradient-to-r from-blue-500 to-purple-500';
      const result = combineGradient(gradient);
      
      expect(result).toBe(gradient);
    });

    it('should trim outer whitespace', () => {
      const gradient = 'bg-gradient-to-r from-blue-500 to-purple-500';
      const additional = '  hover:scale-105  ';
      
      const result = combineGradient(gradient, additional);
      
      // The function only trims outer whitespace, not internal spaces
      expect(result).toBe(`${gradient} ${additional}`.trim());
    });
  });

  describe('Integration tests', () => {
    it('should work with Tailwind CSS classes', () => {
      // Test that gradient classes contain expected Tailwind patterns
      Object.values(GRADIENT_CLASSES).forEach((className) => {
        expect(className).toMatch(/bg-gradient/);
        expect(typeof className).toBe('string');
        expect(className.length).toBeGreaterThan(0);
      });
    });

    it('should provide consistent theming', () => {
      // All gradient categories should be properly structured
      const categories = Object.keys(GRADIENTS);
      categories.forEach((category) => {
        expect(category).toMatch(/^[a-z]+$/); // lowercase names
        expect(GRADIENTS[category as keyof typeof GRADIENTS]).toBeDefined();
      });
    });

    it('should integrate with utility functions', () => {
      // Test integration between constants and functions
      const buttonGradient = getGradient('buttons', 'primary');
      const combined = combineGradient(buttonGradient, 'rounded-lg');
      
      expect(combined).toContain(GRADIENTS.buttons.primary);
      expect(combined).toContain('rounded-lg');
    });
  });
});