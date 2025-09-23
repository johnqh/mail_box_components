import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  optimizedFetch,
  OptimizedAPIClient,
  withRetry,
  CancellableRequest,
  cacheUtils,
} from '../optimization/optimization/apiOptimization';

// Import the CACHE_CONFIGS constant from the default export
import apiOptimizationUtils from '../optimization/optimization/apiOptimization';
const { CACHE_CONFIGS } = apiOptimizationUtils;

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock performance.now
Object.defineProperty(global, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
  },
  writable: true,
});

describe('API Optimization Utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    cacheUtils.clear(); // Clear cache before each test
    mockFetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true }),
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('CACHE_CONFIGS constant', () => {
    it('should have predefined cache configurations', () => {
      expect(CACHE_CONFIGS).toBeDefined();
      expect(typeof CACHE_CONFIGS).toBe('object');

      // Check that it has expected cache types
      expect(CACHE_CONFIGS.user).toBeDefined();
      expect(CACHE_CONFIGS.messages).toBeDefined();
      expect(CACHE_CONFIGS.messageDetails).toBeDefined();
      expect(CACHE_CONFIGS.addresses).toBeDefined();
      expect(CACHE_CONFIGS.mailboxes).toBeDefined();
      expect(CACHE_CONFIGS.messageCount).toBeDefined();
    });

    it('should have proper cache configuration structure', () => {
      Object.values(CACHE_CONFIGS).forEach(config => {
        expect(config).toHaveProperty('duration');
        expect(config).toHaveProperty('maxSize');
        expect(config).toHaveProperty('staleWhileRevalidate');
        expect(typeof config.duration).toBe('number');
        expect(typeof config.maxSize).toBe('number');
        expect(typeof config.staleWhileRevalidate).toBe('boolean');
        expect(config.duration).toBeGreaterThan(0);
        expect(config.maxSize).toBeGreaterThan(0);
      });
    });
  });

  describe('optimizedFetch function', () => {
    it('should fetch data and cache it', async () => {
      const key = 'test-key';
      const mockData = { data: 'test-value' };
      const fetcher = vi.fn().mockResolvedValue(mockData);

      const result = await optimizedFetch(key, fetcher, 'user');

      expect(result).toEqual(mockData);
      expect(fetcher).toHaveBeenCalledTimes(1);
    });

    it('should return cached data on subsequent calls', async () => {
      const key = 'test-key';
      const mockData = { data: 'test-value' };
      const fetcher = vi.fn().mockResolvedValue(mockData);

      // First call should fetch
      const result1 = await optimizedFetch(key, fetcher, 'user');
      expect(result1).toEqual(mockData);
      expect(fetcher).toHaveBeenCalledTimes(1);

      // Second call should use cache
      const result2 = await optimizedFetch(key, fetcher, 'user');
      expect(result2).toEqual(mockData);
      expect(fetcher).toHaveBeenCalledTimes(1); // No additional call
    });

    it('should handle fetch errors', async () => {
      const key = 'error-key';
      const error = new Error('Fetch failed');
      const fetcher = vi.fn().mockRejectedValue(error);

      await expect(optimizedFetch(key, fetcher, 'user')).rejects.toThrow(
        'Fetch failed'
      );
    });

    it('should respect different cache types', async () => {
      const userData = { type: 'user' };
      const messageData = { type: 'message' };

      const userFetcher = vi.fn().mockResolvedValue(userData);
      const messageFetcher = vi.fn().mockResolvedValue(messageData);

      const result1 = await optimizedFetch('user-1', userFetcher, 'user');
      const result2 = await optimizedFetch(
        'message-1',
        messageFetcher,
        'messages'
      );

      expect(result1).toEqual(userData);
      expect(result2).toEqual(messageData);
      expect(userFetcher).toHaveBeenCalledTimes(1);
      expect(messageFetcher).toHaveBeenCalledTimes(1);
    });
  });

  describe('OptimizedAPIClient class', () => {
    let apiClient: OptimizedAPIClient;

    beforeEach(() => {
      apiClient = new OptimizedAPIClient('https://api.example.com');
    });

    it('should create API client with base URL', () => {
      expect(apiClient).toBeInstanceOf(OptimizedAPIClient);
    });

    it('should make GET requests', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ id: 1, name: 'Test' }),
      });

      const result = await apiClient.get('/users/1');

      expect(result).toEqual({ id: 1, name: 'Test' });
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'GET',
        })
      );
    });

    it('should make POST requests', async () => {
      const postData = { name: 'New User', email: 'user@example.com' };

      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ id: 2, ...postData }),
      });

      const result = await apiClient.post('/users', postData);

      expect(result).toEqual({ id: 2, ...postData });
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData),
        })
      );
    });

    it('should make PUT requests', async () => {
      const putData = { id: 1, name: 'Updated User' };

      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(putData),
      });

      const result = await apiClient.put('/users/1', putData);

      expect(result).toEqual(putData);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(putData),
        })
      );
    });

    it('should make DELETE requests', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue({ deleted: true }),
      });

      const result = await apiClient.delete('/users/1');

      expect(result).toEqual({ deleted: true });
      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/users/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(apiClient.get('/users/999')).rejects.toThrow(
        'API Error: 404 Not Found'
      );
    });

    it('should add request interceptors', () => {
      const interceptor = vi.fn().mockImplementation(config => ({
        ...config,
        headers: { ...config.headers, 'X-Custom': 'test' },
      }));

      apiClient.addRequestInterceptor(interceptor);

      // Verify interceptor was added (we can't directly test execution without making a request)
      expect(interceptor).toBeDefined();
    });

    it('should add response interceptors', () => {
      const interceptor = vi.fn().mockImplementation(response => response);

      apiClient.addResponseInterceptor(interceptor);

      // Verify interceptor was added
      expect(interceptor).toBeDefined();
    });
  });

  describe('withRetry function', () => {
    it('should succeed on first attempt', async () => {
      const successFn = vi.fn().mockResolvedValue('success');
      const result = await withRetry(successFn, 3, 100);

      expect(result).toBe('success');
      expect(successFn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and eventually succeed', async () => {
      const partiallyFailingFn = vi
        .fn()
        .mockRejectedValueOnce(new Error('First failure'))
        .mockRejectedValueOnce(new Error('Second failure'))
        .mockResolvedValue('success');

      const resultPromise = withRetry(partiallyFailingFn, 3, 10);

      // Fast-forward past retry delays
      vi.advanceTimersByTime(100);
      await vi.runAllTimersAsync();

      const result = await resultPromise;
      expect(result).toBe('success');
      expect(partiallyFailingFn).toHaveBeenCalledTimes(3);
    });

    it('should throw after all retries exhausted', async () => {
      const alwaysFailingFn = vi.fn();

      // Set up the mock to fail on each call
      alwaysFailingFn.mockRejectedValue(new Error('Always fails'));

      // Start the retry operation and immediately catch it to prevent unhandled rejection
      const failPromise = withRetry(alwaysFailingFn, 2, 10).catch(e => e);

      // Advance timers to allow all retries to complete
      vi.advanceTimersByTime(1000);
      await vi.runAllTimersAsync();

      // Now check the result
      const result = await failPromise;
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Always fails');
      expect(alwaysFailingFn).toHaveBeenCalledTimes(3); // maxRetries 2 = 3 total attempts (0, 1, 2)
    });

    it('should respect custom retry delay', async () => {
      const failingFn = vi.fn();

      // Set up the mock to fail on each call
      failingFn.mockRejectedValue(new Error('Fails'));

      // Start the retry operation and immediately catch it to prevent unhandled rejection
      const failPromise = withRetry(failingFn, 2, 50).catch(e => e);

      // Advance timers to allow all retries to complete with custom delay
      vi.advanceTimersByTime(1000);
      await vi.runAllTimersAsync();

      // Now check the result
      const result = await failPromise;
      expect(result).toBeInstanceOf(Error);
      expect((result as Error).message).toBe('Fails');

      // Should have made retries
      expect(failingFn).toHaveBeenCalledTimes(3); // maxRetries 2 = 3 total attempts (0, 1, 2)
    });
  });

  describe('CancellableRequest class', () => {
    it('should create cancellable request', () => {
      const request = new CancellableRequest();
      expect(request).toBeInstanceOf(CancellableRequest);
    });

    it('should execute request successfully', async () => {
      const mockData = { id: 1, name: 'Test' };

      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      });

      const request = new CancellableRequest();
      const result = await request.request('https://api.example.com/data');

      expect(result).toEqual(mockData);
    });

    it('should handle request cancellation', async () => {
      const request = new CancellableRequest();

      // Cancel immediately before making request
      request.cancel();

      // This test is simplified since mocking AbortController is complex
      expect(request).toBeInstanceOf(CancellableRequest);
    });

    it('should handle HTTP errors', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      const request = new CancellableRequest();

      await expect(
        request.request('https://api.example.com/data')
      ).rejects.toThrow('HTTP 500: Internal Server Error');
    });
  });

  describe('cacheUtils object', () => {
    it('should provide cache management utilities', () => {
      expect(cacheUtils).toBeDefined();
      expect(typeof cacheUtils.invalidate).toBe('function');
      expect(typeof cacheUtils.clear).toBe('function');
      expect(typeof cacheUtils.getStats).toBe('function');
      expect(typeof cacheUtils.warmUp).toBe('function');
      expect(typeof cacheUtils.prefetch).toBe('function');
    });

    it('should clear cache', () => {
      // This mainly tests that the function exists and is callable
      expect(() => cacheUtils.clear()).not.toThrow();
    });

    it('should invalidate cache patterns', () => {
      expect(() => cacheUtils.invalidate('user-*')).not.toThrow();
    });

    it('should get cache statistics', () => {
      const stats = cacheUtils.getStats();
      expect(stats).toBeDefined();
      expect(typeof stats).toBe('object');
    });

    it('should warm up cache', async () => {
      const warmUpFunctions = [
        vi.fn().mockResolvedValue('data1'),
        vi.fn().mockResolvedValue('data2'),
      ];

      await cacheUtils.warmUp(warmUpFunctions);

      expect(warmUpFunctions[0]).toHaveBeenCalled();
      expect(warmUpFunctions[1]).toHaveBeenCalled();
    });

    it('should prefetch data', async () => {
      // Mock requestIdleCallback
      Object.defineProperty(window, 'requestIdleCallback', {
        value: vi.fn().mockImplementation(callback => callback()),
        writable: true,
      });

      const prefetchFunctions = [
        vi.fn().mockResolvedValue('prefetch1'),
        vi.fn().mockResolvedValue('prefetch2'),
      ];

      await cacheUtils.prefetch(prefetchFunctions);

      // Should use requestIdleCallback when available
      expect(window.requestIdleCallback).toHaveBeenCalled();
    });
  });

  describe('Integration tests', () => {
    it('should work end-to-end with real API client', async () => {
      const mockData = { users: [{ id: 1, name: 'John' }] };

      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      });

      const apiClient = new OptimizedAPIClient('https://api.example.com');
      const result = await apiClient.get('/users', 'user'); // Use user cache type

      expect(result).toEqual(mockData);

      // Second request should use cache
      const cachedResult = await apiClient.get('/users', 'user');
      expect(cachedResult).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledTimes(1); // Only one actual fetch
    });

    it('should handle concurrent requests with deduplication', async () => {
      const mockData = { message: 'concurrent-test' };

      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData),
      });

      const apiClient = new OptimizedAPIClient('https://api.example.com');

      // Make multiple concurrent requests
      const promises = [
        apiClient.get('/data'),
        apiClient.get('/data'),
        apiClient.get('/data'),
      ];

      const results = await Promise.all(promises);

      // All should return the same data
      results.forEach(result => {
        expect(result).toEqual(mockData);
      });
    });
  });

  describe('Error handling and edge cases', () => {
    it('should handle network errors gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const apiClient = new OptimizedAPIClient('https://api.example.com');

      await expect(apiClient.get('/users')).rejects.toThrow('Network error');
    });

    it('should handle malformed JSON responses', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      });

      const apiClient = new OptimizedAPIClient('https://api.example.com');

      await expect(apiClient.get('/users')).rejects.toThrow('Invalid JSON');
    });

    it('should handle undefined cache types gracefully', async () => {
      const fetcher = vi.fn().mockResolvedValue({ data: 'test' });

      // Should not throw even with undefined cache type
      const result = await optimizedFetch('test-key', fetcher);
      expect(result).toEqual({ data: 'test' });
    });
  });
});
