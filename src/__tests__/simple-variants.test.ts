/**
 * Tests for Simple Variant System
 * Critical infrastructure that all components depend on
 */

import { SimpleVariants, createVariants, createQuickVariants } from '../lib/simple-variants';

// Mock design system variants for testing
const mockDesignSystemVariants = {
  button: {
    primary: () => 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700',
    secondary: () => 'bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300',
    outline: () => 'border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50',
    destructive: () => 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
    gradient: {
      primary: () => 'bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded',
      secondary: () => 'bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded'
    }
  },
  alert: {
    info: () => 'bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded',
    success: () => 'bg-green-50 border border-green-200 text-green-800 p-4 rounded',
    warning: () => 'bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded',
    error: () => 'bg-red-50 border border-red-200 text-red-800 p-4 rounded',
    destructive: () => 'bg-red-50 border border-red-200 text-red-800 p-4 rounded'
  },
  input: {
    default: () => 'border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500'
  }
};

// Separate mock for sized variants to test sizing functionality
const mockSizedVariants = {
  button: {
    primary: {
      sm: () => 'bg-blue-600 text-white px-2 py-1 text-sm rounded hover:bg-blue-700',
      lg: () => 'bg-blue-600 text-white px-6 py-3 text-lg rounded hover:bg-blue-700',
      default: () => 'bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
    }
  }
};

describe('SimpleVariants Class', () => {
  let variants: SimpleVariants;

  beforeEach(() => {
    variants = new SimpleVariants(mockDesignSystemVariants);
  });

  describe('Basic Variant Access', () => {
    it('should get basic variant classes', () => {
      expect(variants.get('button', 'primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
      expect(variants.get('alert', 'success')).toBe('bg-green-50 border border-green-200 text-green-800 p-4 rounded');
      expect(variants.get('input', 'default')).toBe('border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500');
    });

    it('should handle dot notation', () => {
      expect(variants.get('button.primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
      expect(variants.get('alert.success')).toBe('bg-green-50 border border-green-200 text-green-800 p-4 rounded');
    });

    it('should default to "default" variant when no variant specified', () => {
      expect(variants.get('input')).toBe('border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500');
    });

    it('should return fallback for missing components', () => {
      expect(variants.get('missing-component', 'primary')).toBe('');
    });

    it('should return fallback for missing variants', () => {
      // Should return empty string since button.missing-variant and button.default don't have fallbacks
      expect(variants.get('button', 'missing-variant')).toBe('');
    });
  });

  describe('Sized Variants', () => {
    let sizedVariants: SimpleVariants;

    beforeEach(() => {
      sizedVariants = new SimpleVariants(mockSizedVariants);
    });

    it('should get sized variants', () => {
      expect(sizedVariants.sized('button', 'primary', 'sm')).toBe('bg-blue-600 text-white px-2 py-1 text-sm rounded hover:bg-blue-700');
      expect(sizedVariants.sized('button', 'primary', 'lg')).toBe('bg-blue-600 text-white px-6 py-3 text-lg rounded hover:bg-blue-700');
    });

    it('should fallback to base variant for missing sizes', () => {
      expect(sizedVariants.sized('button', 'primary', 'missing-size')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
    });

    it('should handle missing component in sized', () => {
      expect(variants.sized('missing-component', 'primary', 'sm')).toBe('');
    });
  });

  describe('Nested Variants', () => {
    it('should get nested variant paths', () => {
      expect(variants.nested('button.gradient.primary')).toBe('bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded');
      expect(variants.nested('button.gradient.secondary')).toBe('bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded');
    });

    it('should return fallback for missing nested paths', () => {
      expect(variants.nested('button.missing.variant')).toBe('');
      expect(variants.nested('missing.component.variant')).toBe('');
    });

    it('should handle deep nesting', () => {
      const deepVariants = {
        button: {
          web3: {
            connect: {
              default: () => 'web3-connect-styles'
            }
          }
        }
      };
      const deepResolver = new SimpleVariants(deepVariants);
      expect(deepResolver.nested('button.web3.connect.default')).toBe('web3-connect-styles');
    });
  });

  describe('Conditional Variants', () => {
    it('should return true variant when condition is true', () => {
      expect(variants.when(true, 'button', 'primary', 'button', 'secondary'))
        .toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
    });

    it('should return false variant when condition is false', () => {
      expect(variants.when(false, 'button', 'primary', 'button', 'secondary'))
        .toBe('bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300');
    });

    it('should return empty string when condition is false and no false variant provided', () => {
      expect(variants.when(false, 'button', 'primary')).toBe('');
    });
  });

  describe('Variant Combination', () => {
    it('should combine multiple variants', () => {
      const result = variants.combine('button.primary', 'alert.success', 'custom-class');
      expect(result).toContain('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
      expect(result).toContain('bg-green-50 border border-green-200 text-green-800 p-4 rounded');
      expect(result).toContain('custom-class');
    });

    it('should handle empty combinations', () => {
      expect(variants.combine()).toBe('');
    });

    it('should filter out empty variants', () => {
      expect(variants.combine('button.primary', 'missing.variant', 'custom-class'))
        .toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 custom-class');
    });
  });

  describe('Custom Fallbacks', () => {
    it('should use custom fallbacks', () => {
      variants.addFallback('button.custom', 'custom-button-styles');
      expect(variants.get('button', 'custom')).toBe('custom-button-styles');
    });

    it('should override default fallbacks', () => {
      variants.addFallback('button.primary', 'overridden-primary-styles');
      // Should still use design system variant, not fallback
      expect(variants.get('button', 'primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
      
      // But fallback should be used for missing components
      const emptyVariants = new SimpleVariants({});
      emptyVariants.addFallback('button.primary', 'overridden-primary-styles');
      expect(emptyVariants.get('button', 'primary')).toBe('overridden-primary-styles');
    });

    it('should have default fallbacks', () => {
      const emptyVariants = new SimpleVariants({});
      expect(emptyVariants.get('button', 'primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded');
      expect(emptyVariants.get('alert', 'destructive')).toBe('bg-red-50 border border-red-200 text-red-800 p-4 rounded');
    });
  });

  describe('Variant Existence Check', () => {
    it('should check if variant exists', () => {
      expect(variants.has('button', 'primary')).toBe(true);
      expect(variants.has('button', 'missing-variant')).toBe(false);
      expect(variants.has('missing-component', 'primary')).toBe(false);
    });
  });

  describe('Error Handling', () => {
    it('should handle null/undefined design system gracefully', () => {
      const nullVariants = new SimpleVariants(null);
      expect(nullVariants.get('button', 'primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded');
    });

    it('should handle malformed variant objects', () => {
      const malformedVariants = {
        button: {
          primary: null,
          secondary: undefined,
          tertiary: 'not-a-function'
        }
      };
      const resolver = new SimpleVariants(malformedVariants);
      
      expect(resolver.get('button', 'primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded');
      expect(resolver.get('button', 'secondary')).toBe('bg-gray-200 text-gray-900 px-4 py-2 rounded');
      expect(resolver.get('button', 'tertiary')).toBe('not-a-function');
    });

    it('should handle functions that throw errors', () => {
      const errorVariants = {
        button: {
          error: () => { throw new Error('Variant error'); }
        }
      };
      const resolver = new SimpleVariants(errorVariants);
      
      // Should fallback gracefully when variant function throws
      expect(resolver.get('button', 'error')).toBe('');
    });
  });

  describe('String Variants Support', () => {
    it('should handle string variants', () => {
      const stringVariants = {
        button: {
          primary: 'bg-blue-600 text-white',
          secondary: {
            default: 'bg-gray-200 text-gray-900',
            sm: 'bg-gray-200 text-gray-900 text-sm'
          }
        }
      };
      const resolver = new SimpleVariants(stringVariants);
      
      expect(resolver.get('button', 'primary')).toBe('bg-blue-600 text-white');
      expect(resolver.get('button', 'secondary')).toBe('bg-gray-200 text-gray-900');
      expect(resolver.sized('button', 'secondary', 'sm')).toBe('bg-gray-200 text-gray-900 text-sm');
    });
  });
});

describe('Factory Functions', () => {
  describe('createVariants', () => {
    it('should create SimpleVariants instance', () => {
      const resolver = createVariants(mockDesignSystemVariants);
      expect(resolver).toBeInstanceOf(SimpleVariants);
      expect(resolver.get('button', 'primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
    });
  });

  describe('createQuickVariants', () => {
    let quickVariants: ReturnType<typeof createQuickVariants>;

    beforeEach(() => {
      quickVariants = createQuickVariants(mockDesignSystemVariants);
    });

    it('should create quick variant accessor', () => {
      expect(typeof quickVariants.button).toBe('function');
      expect(typeof quickVariants.alert).toBe('function');
      expect(typeof quickVariants.input).toBe('function');
      expect(typeof quickVariants.badge).toBe('function');
    });

    it('should have button helper', () => {
      expect(quickVariants.button('primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
      expect(quickVariants.button('secondary')).toBe('bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300');
    });

    it('should have alert helper', () => {
      expect(quickVariants.alert('success')).toBe('bg-green-50 border border-green-200 text-green-800 p-4 rounded');
      expect(quickVariants.alert('error')).toBe('bg-red-50 border border-red-200 text-red-800 p-4 rounded');
    });

    it('should have input helper', () => {
      expect(quickVariants.input('default')).toBe('border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500');
    });

    it('should have badge helper with fallback', () => {
      expect(quickVariants.badge('default')).toBe('bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm');
    });

    it('should have generic get method', () => {
      expect(quickVariants.get('button', 'primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
      expect(quickVariants.get('button.primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
    });

    it('should have nested method', () => {
      expect(quickVariants.nested('button.gradient.primary')).toBe('bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded');
    });

    it('should have when method', () => {
      expect(quickVariants.when(true, 'button', 'primary', 'button', 'secondary'))
        .toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
    });

    it('should have combine method', () => {
      const result = quickVariants.combine('button.primary', 'custom-class');
      expect(result).toContain('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
      expect(result).toContain('custom-class');
    });
  });

  describe('createQuickVariants with Sized Variants', () => {
    let sizedQuickVariants: ReturnType<typeof createQuickVariants>;

    beforeEach(() => {
      sizedQuickVariants = createQuickVariants(mockSizedVariants);
    });

    it('should have button helper with sizes', () => {
      expect(sizedQuickVariants.button('primary', 'sm')).toBe('bg-blue-600 text-white px-2 py-1 text-sm rounded hover:bg-blue-700');
      expect(sizedQuickVariants.button('primary', 'lg')).toBe('bg-blue-600 text-white px-6 py-3 text-lg rounded hover:bg-blue-700');
    });

    it('should fallback to default when no size specified', () => {
      expect(sizedQuickVariants.button('primary')).toBe('bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700');
    });
  });
});

describe('Integration Tests', () => {
  it('should work with real-world usage patterns', () => {
    const v = createQuickVariants(mockDesignSystemVariants);
    
    // Simulate button component usage
    const buttonClass = v.button('primary');
    expect(buttonClass).toBeTruthy();
    expect(buttonClass).toContain('bg-blue-600');
    
    // Simulate alert component usage  
    const alertClass = v.alert('success');
    expect(alertClass).toBeTruthy();
    expect(alertClass).toContain('bg-green-50');
    
    // Simulate gradient button usage
    const gradientClass = v.nested('button.gradient.primary');
    expect(gradientClass).toBeTruthy();
    expect(gradientClass).toContain('bg-gradient-to-r');
    
    // Simulate conditional usage
    const conditionalClass = v.when(true, 'button', 'destructive', 'button', 'secondary');
    expect(conditionalClass).toContain('bg-red-600');
  });

  it('should maintain consistent API across different usage patterns', () => {
    const v = createQuickVariants(mockDesignSystemVariants);
    const direct = new SimpleVariants(mockDesignSystemVariants);
    
    // All should return the same result
    expect(v.button('primary')).toBe(direct.get('button', 'primary'));
    expect(v.get('button', 'primary')).toBe(direct.get('button', 'primary'));
    expect(v.get('button.primary')).toBe(direct.get('button.primary'));
  });
});