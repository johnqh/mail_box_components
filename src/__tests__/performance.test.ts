import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  performanceUtils,
  useStableCallback,
  useDebugMemo,
  useRenderCount,
  getRenderCounts,
  clearRenderCounts,
  createLazyComponentFactory,
  useImageLazyLoading,
  preloadRoute,
  reportWebVitals,
  getWebVitals,
  prefetchResource,
  preloadResource,
  useMemoryLeakDetection,
  performanceBudget
} from '../optimization/performance';

// Mock React
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useMemo: vi.fn((fn, _deps) => fn()),
    useCallback: vi.fn((fn) => fn),
    useEffect: vi.fn(),
    useRef: vi.fn(() => ({ current: null })),
    useState: vi.fn(() => [null, vi.fn()]),
    lazy: vi.fn()
  };
});

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  mark: vi.fn(),
  measure: vi.fn(),
  getEntriesByType: vi.fn(() => []),
  getEntriesByName: vi.fn(() => [{ duration: 100 }]),
  clearMarks: vi.fn(),
  clearMeasures: vi.fn()
};

Object.defineProperty(global, 'performance', {
  value: mockPerformance,
  writable: true
});

describe('Performance Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('performanceUtils object', () => {
    it('should have all required methods', () => {
      expect(performanceUtils).toBeDefined();
      expect(typeof performanceUtils.mark).toBe('function');
      expect(typeof performanceUtils.measure).toBe('function');
      expect(typeof performanceUtils.getEntries).toBe('function');
      expect(typeof performanceUtils.clearEntries).toBe('function');
    });

    it('should create performance marks', () => {
      performanceUtils.mark('test-mark');
      expect(mockPerformance.mark).toHaveBeenCalledWith('test-mark');
    });

    it('should measure performance between marks', () => {
      mockPerformance.getEntriesByName.mockReturnValue([{ duration: 150 }]);
      
      const duration = performanceUtils.measure('test-measure', 'start-mark', 'end-mark');
      
      expect(mockPerformance.measure).toHaveBeenCalledWith('test-measure', 'start-mark', 'end-mark');
      expect(duration).toBe(150);
    });

    it('should get performance entries', () => {
      const mockEntries = [{ name: 'test', duration: 100 }];
      mockPerformance.getEntriesByName.mockReturnValue(mockEntries);
      
      const entries = performanceUtils.getEntries('test');
      expect(entries).toEqual(mockEntries);
      expect(mockPerformance.getEntriesByName).toHaveBeenCalledWith('test');
    });

    it('should clear performance entries', () => {
      performanceUtils.clearEntries('test');
      expect(mockPerformance.clearMarks).toHaveBeenCalledWith('test');
      expect(mockPerformance.clearMeasures).toHaveBeenCalledWith('test');
    });
  });

  describe('getRenderCounts and clearRenderCounts', () => {
    it('should track render counts', () => {
      // These functions work with internal state
      const initialCounts = getRenderCounts();
      expect(typeof initialCounts).toBe('object');
      
      clearRenderCounts();
      const clearedCounts = getRenderCounts();
      expect(typeof clearedCounts).toBe('object');
    });
  });

  describe('performance budget', () => {
    it('should have budget configuration', () => {
      expect(performanceBudget).toBeDefined();
      expect(typeof performanceBudget.maxBundleSize).toBe('number');
      expect(typeof performanceBudget.maxFCP).toBe('number');
      expect(typeof performanceBudget.maxLCP).toBe('number');
      expect(typeof performanceBudget.check).toBe('function');
    });

    it('should check performance metrics against budget', () => {
      const goodMetrics = {
        FCP: 1000,
        LCP: 2000,
        FID: 50,
        CLS: 0.05
      };
      
      const violations = performanceBudget.check(goodMetrics);
      expect(Array.isArray(violations)).toBe(true);
      expect(violations.length).toBe(0);
    });

    it('should detect budget violations', () => {
      const badMetrics = {
        FCP: 3000, // Exceeds 1800ms
        LCP: 4000, // Exceeds 2500ms
        FID: 200,  // Exceeds 100ms
        CLS: 0.2   // Exceeds 0.1
      };
      
      const violations = performanceBudget.check(badMetrics);
      expect(violations.length).toBeGreaterThan(0);
      expect(violations.some(v => v.includes('FCP'))).toBe(true);
      expect(violations.some(v => v.includes('LCP'))).toBe(true);
    });
  });

  describe('utility functions', () => {
    it('should provide preload route function', () => {
      expect(typeof preloadRoute).toBe('function');
      
      const mockRouteImport = vi.fn().mockResolvedValue({});
      preloadRoute(mockRouteImport);
      
      // Function should execute without throwing
      expect(preloadRoute).toBeDefined();
    });

    it('should provide prefetch resource function', () => {
      expect(typeof prefetchResource).toBe('function');
      
      // Mock document
      const mockLink = { rel: '', href: '', as: '' };
      const mockHead = { appendChild: vi.fn() };
      Object.defineProperty(global, 'document', {
        value: {
          createElement: vi.fn(() => mockLink),
          head: mockHead
        },
        writable: true
      });
      
      prefetchResource('/test.js', 'script');
      expect(global.document.createElement).toHaveBeenCalledWith('link');
    });

    it('should provide preload resource function', () => {
      expect(typeof preloadResource).toBe('function');
      
      const mockLink = { rel: '', href: '', as: '', crossOrigin: '' };
      const mockHead = { appendChild: vi.fn() };
      Object.defineProperty(global, 'document', {
        value: {
          createElement: vi.fn(() => mockLink),
          head: mockHead
        },
        writable: true
      });
      
      preloadResource('/test.css', 'style', true);
      expect(global.document.createElement).toHaveBeenCalledWith('link');
    });

    it('should provide web vitals reporting', () => {
      expect(typeof reportWebVitals).toBe('function');
      expect(typeof getWebVitals).toBe('function');
      
      reportWebVitals({ name: 'FCP', value: 1200 });
      const vitals = getWebVitals();
      
      expect(vitals).toBeDefined();
      expect(typeof vitals).toBe('object');
    });
  });

  describe('React hooks', () => {
    it('should provide useStableCallback hook', () => {
      expect(typeof useStableCallback).toBe('function');
      
      const callback = vi.fn();
      const stableCallback = useStableCallback(callback);
      
      expect(typeof stableCallback).toBe('function');
    });

    it('should provide useDebugMemo hook', () => {
      expect(typeof useDebugMemo).toBe('function');
      
      const factory = vi.fn(() => 'memoized');
      const deps = [1, 2, 3];
      const result = useDebugMemo(factory, deps, 'test-memo');
      
      expect(result).toBe('memoized');
      expect(factory).toHaveBeenCalled();
    });

    it('should provide useRenderCount hook', () => {
      expect(typeof useRenderCount).toBe('function');
      
      // This hook uses useEffect internally which is mocked
      useRenderCount('TestComponent');
      
      // Should not throw
      expect(useRenderCount).toBeDefined();
    });

    it('should provide useMemoryLeakDetection hook', () => {
      expect(typeof useMemoryLeakDetection).toBe('function');
      
      const result = useMemoryLeakDetection('TestComponent');
      
      expect(result).toBeDefined();
      expect(typeof result.createTimer).toBe('function');
      expect(typeof result.createInterval).toBe('function');
    });

    it('should provide useImageLazyLoading hook', () => {
      expect(typeof useImageLazyLoading).toBe('function');
      
      const result = useImageLazyLoading(0.1);
      
      expect(result).toBeDefined();
      expect(typeof result.observeImage).toBe('function');
      expect(result.loadedImages).toBeDefined();
    });
  });

  describe('component utilities', () => {
    it('should provide createLazyComponentFactory function', () => {
      expect(typeof createLazyComponentFactory).toBe('function');
      
      const importFunc = () => Promise.resolve({ default: () => null });
      const lazyComponent = createLazyComponentFactory(importFunc);
      
      expect(lazyComponent).toBeDefined();
    });
  });
});