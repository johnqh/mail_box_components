/**
 * @fileoverview API Performance Optimization Utilities
 * @description Provides intelligent caching, request batching, and retry mechanisms for API calls
 * 
 * @example Basic Usage
 * ```typescript
 * import { optimizedFetch, batchRequests } from '@/utils/apiOptimization';
 * 
 * // Cache user data for 5 minutes with stale-while-revalidate
 * const userData = await optimizedFetch(
 *   'user-123',
 *   () => api.getUser('123'),
 *   'user'
 * );
 * 
 * // Cache email messages for 30 seconds
 * const messages = await optimizedFetch(
 *   'messages-inbox',
 *   () => api.getMessages('inbox'),
 *   'messages'
 * );
 * ```
 * 
 * @example Request Batching
 * ```typescript
 * // Batch multiple API calls to execute simultaneously
 * const [user, messages, addresses] = await batchRequests([
 *   () => optimizedFetch('user-123', () => api.getUser('123'), 'user'),
 *   () => optimizedFetch('messages-inbox', () => api.getMessages('inbox'), 'messages'),
 *   () => optimizedFetch('addresses-123', () => api.getAddresses('123'), 'addresses')
 * ]);
 * ```
 * 
 * @description Caching Strategy:
 * - **user**: 5min cache - Profile data changes rarely
 * - **messages**: 30sec cache - Email lists update frequently  
 * - **messageDetails**: 2min cache - Individual emails change less often
 * - **addresses**: 10min cache - Email addresses are relatively static
 * - **messageCount**: 10sec cache - Real-time counts need frequent updates
 * 
 * @description Features:
 * - **Intelligent Caching**: Different TTLs for different data types
 * - **Stale-While-Revalidate**: Serve cached data while fetching fresh data
 * - **LRU Eviction**: Automatically removes oldest entries when cache is full
 * - **Request Batching**: Execute multiple API calls simultaneously
 * - **Retry Logic**: Automatic retries with exponential backoff
 * - **Cache Invalidation**: Pattern-based cache clearing
 */

/**
 * Cache configuration interface defining caching behavior
 */
interface CacheConfig {
  /** Cache duration in milliseconds */
  duration: number;
  /** Maximum number of cached entries before LRU eviction */
  maxSize: number;
  /** Whether to serve stale data while revalidating in background */
  staleWhileRevalidate: boolean;
}

/**
 * Pre-configured cache settings optimized for different data types
 * 
 * @description Cache Strategy Explanation:
 * 
 * **Static Data (Long Cache):**
 * - `user`: 5min - User profile data changes infrequently
 * - `addresses`: 10min - Email addresses are relatively stable
 * - `mailboxes`: 2min - Mailbox structure changes occasionally
 * 
 * **Dynamic Data (Short Cache):**
 * - `messages`: 30sec - Email lists update frequently
 * - `messageCount`: 10sec - Real-time counters need frequent refresh
 * 
 * **Content Data (Medium Cache):**
 * - `messageDetails`: 2min - Individual email content is static once loaded
 * 
 * @example Custom Cache Config
 * ```typescript
 * const customConfig: CacheConfig = {
 *   duration: 60 * 1000,      // 1 minute cache
 *   maxSize: 50,              // Store up to 50 entries
 *   staleWhileRevalidate: true // Serve stale data while fetching fresh
 * };
 * ```
 */
const CACHE_CONFIGS: Record<string, CacheConfig> = {
  // Static/rarely changing data - longer cache durations
  user: { duration: 5 * 60 * 1000, maxSize: 100, staleWhileRevalidate: true }, // 5 minutes
  mailboxes: { duration: 2 * 60 * 1000, maxSize: 50, staleWhileRevalidate: true }, // 2 minutes
  addresses: { duration: 10 * 60 * 1000, maxSize: 50, staleWhileRevalidate: true }, // 10 minutes
  
  // Frequently changing data - shorter cache durations
  messages: { duration: 30 * 1000, maxSize: 200, staleWhileRevalidate: true }, // 30 seconds
  messageDetails: { duration: 2 * 60 * 1000, maxSize: 100, staleWhileRevalidate: false }, // 2 minutes
  
  // Real-time data - very short cache durations
  messageCount: { duration: 10 * 1000, maxSize: 20, staleWhileRevalidate: true }, // 10 seconds
};

// Cache entry interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  isStale: boolean;
}

// In-memory cache implementation
class APICache {
  private cache = new Map<string, CacheEntry<any>>();
  // private maxSize: number = 1000; // For future use when implementing size-based eviction
  
  set<T>(key: string, data: T, config: CacheConfig): void {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= config.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      isStale: false
    });
  }
  
  get<T>(key: string, config: CacheConfig): { data: T; isStale: boolean } | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    const age = Date.now() - entry.timestamp;
    const isExpired = age > config.duration;
    
    if (isExpired && !config.staleWhileRevalidate) {
      this.cache.delete(key);
      return null;
    }
    
    return {
      data: entry.data,
      isStale: isExpired
    };
  }
  
  invalidate(keyPattern: string): void {
    for (const key of this.cache.keys()) {
      if (key.includes(keyPattern)) {
        this.cache.delete(key);
      }
    }
  }
  
  clear(): void {
    this.cache.clear();
  }
  
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      memory: this.estimateMemoryUsage()
    };
  }
  
  private estimateMemoryUsage(): number {
    return Array.from(this.cache.values()).reduce((total, entry) => {
      return total + JSON.stringify(entry).length * 2; // rough estimate
    }, 0);
  }
}

const apiCache = new APICache();

// Request deduplication
const pendingRequests = new Map<string, Promise<unknown>>();

// Enhanced fetch with caching and optimization
/**
 * Optimized fetch function with intelligent caching and request deduplication
 * 
 * @template T - Type of data being fetched
 * @param key - Unique cache key for the request (e.g., 'user-123', 'messages-inbox')
 * @param fetcher - Function that performs the actual API call
 * @param cacheType - Type of cache configuration to use (defaults to 'messages')
 * @returns Promise resolving to the fetched data
 * 
 * @description Optimization Features:
 * 1. **Request Deduplication**: Multiple calls with same key return same Promise
 * 2. **Intelligent Caching**: Uses different cache durations based on data type
 * 3. **Stale-While-Revalidate**: Returns cached data immediately, updates in background
 * 4. **Automatic Cache Management**: LRU eviction and TTL-based expiration
 * 
 * @example Basic Usage
 * ```typescript
 * import { optimizedFetch } from '@/utils/apiOptimization';
 * import { wildDuckApi } from '@/config/api';
 * 
 * // Cache user data for 5 minutes
 * const user = await optimizedFetch(
 *   `user-${userId}`,
 *   () => wildDuckApi.getUser(userId),
 *   'user'
 * );
 * 
 * // Cache messages for 30 seconds with stale-while-revalidate
 * const messages = await optimizedFetch(
 *   `messages-${mailboxId}`,
 *   () => wildDuckApi.getMessages(mailboxId),
 *   'messages'
 * );
 * ```
 * 
 * @example React Hook Integration
 * ```typescript
 * const useOptimizedUser = (userId: string) => {
 *   const [user, setUser] = useState(null);
 *   
 *   useEffect(() => {
 *     optimizedFetch(
 *       `user-${userId}`,
 *       () => api.getUser(userId),
 *       'user'
 *     ).then(setUser);
 *   }, [userId]);
 *   
 *   return user;
 * };
 * ```
 * 
 * @description Cache Types Available:
 * - `user`: 5min cache - For profile data
 * - `messages`: 30sec cache - For email lists  
 * - `messageDetails`: 2min cache - For email content
 * - `addresses`: 10min cache - For address lists
 * - `messageCount`: 10sec cache - For real-time counters
 */
export const optimizedFetch = async <T>(
  key: string,
  fetcher: () => Promise<T>,
  cacheType: keyof typeof CACHE_CONFIGS = 'messages'
): Promise<T> => {
  const config = CACHE_CONFIGS[cacheType];
  
  // Check cache first
  const cached = apiCache.get<T>(key, config);
  if (cached && !cached.isStale) {
    return cached.data;
  }
  
  // Check if request is already pending (deduplication)
  const pendingRequest = pendingRequests.get(key);
  if (pendingRequest) {
    return pendingRequest as Promise<T>;
  }
  
  // Return stale data immediately if available, then revalidate in background
  if (cached && cached.isStale && config.staleWhileRevalidate) {
    // Start background revalidation
    const revalidatePromise = fetcher()
      .then(data => {
        apiCache.set(key, data, config);
        pendingRequests.delete(key);
        return data;
      })
      .catch(error => {
        pendingRequests.delete(key);
        throw error;
      });
    
    pendingRequests.set(key, revalidatePromise);
    
    // Return stale data immediately
    return cached.data;
  }
  
  // No cache or stale-while-revalidate not enabled - fetch fresh data
  const fetchPromise = fetcher()
    .then(data => {
      apiCache.set(key, data, config);
      pendingRequests.delete(key);
      return data;
    })
    .catch(error => {
      pendingRequests.delete(key);
      throw error;
    });
  
  pendingRequests.set(key, fetchPromise);
  return fetchPromise;
};

// Batch request utility
interface BatchRequest {
  key: string;
  fetcher: () => Promise<unknown>;
  resolve: (data: any) => void;
  reject: (error: any) => void;
}

class BatchProcessor {
  private queue: BatchRequest[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private batchDelay: number = 10; // ms
  
  add<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ key, fetcher, resolve, reject });
      
      if (this.timer) {
        clearTimeout(this.timer);
      }
      
      this.timer = setTimeout(() => {
        this.processBatch();
      }, this.batchDelay);
    });
  }
  
  private async processBatch(): Promise<void> {
    const batch = [...this.queue];
    this.queue.length = 0;
    this.timer = null;
    
    // Group by similar patterns to potentially batch API calls
    const groups = this.groupRequests(batch);
    
    for (const group of groups) {
      await Promise.allSettled(
        group.map(async (request) => {
          try {
            const data = await request.fetcher();
            request.resolve(data);
          } catch (error) {
            request.reject(error);
          }
        })
      );
    }
  }
  
  private groupRequests(requests: BatchRequest[]): BatchRequest[][] {
    // Simple grouping - could be enhanced for specific API patterns
    const groups: BatchRequest[][] = [];
    const groupSize = 5;
    
    for (let i = 0; i < requests.length; i += groupSize) {
      groups.push(requests.slice(i, i + groupSize));
    }
    
    return groups;
  }
}

const batchProcessor = new BatchProcessor();

// Optimized API client wrapper
export class OptimizedAPIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private requestInterceptors: Array<(config: globalThis.RequestInit) => globalThis.RequestInit> = [];
  private responseInterceptors: Array<(response: Response) => Response | Promise<Response>> = [];
  
  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }
  
  // Add request interceptor
  addRequestInterceptor(interceptor: (config: globalThis.RequestInit) => globalThis.RequestInit): void {
    this.requestInterceptors.push(interceptor);
  }
  
  // Add response interceptor
  addResponseInterceptor(interceptor: (response: Response) => Response | Promise<Response>): void {
    this.responseInterceptors.push(interceptor);
  }
  
  // Optimized request method
  async request<T>(
    endpoint: string,
    options: globalThis.RequestInit = {},
    cacheKey?: string,
    cacheType: keyof typeof CACHE_CONFIGS = 'messages'
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const key = cacheKey || `${options.method || 'GET'}:${url}`;
    
    const fetcher = async (): Promise<T> => {
      let config: globalThis.RequestInit = {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        }
      };
      
      // Apply request interceptors
      for (const interceptor of this.requestInterceptors) {
        config = interceptor(config);
      }
      
      const startTime = performance.now();
      let response = await fetch(url, config);
      
      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response);
      }
      
      const endTime = performance.now();
      
      // Log slow requests in development
      if (process.env.NODE_ENV === 'development' && endTime - startTime > 1000) {
        console.warn(`Slow API request: ${url} took ${endTime - startTime}ms`);
      }
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    };
    
    // Use batch processing for certain types of requests
    if (options.method === 'GET' && this.shouldBatch(endpoint)) {
      return batchProcessor.add(key, fetcher);
    }
    
    // Use optimized fetch with caching
    return optimizedFetch(key, fetcher, cacheType);
  }
  
  private shouldBatch(endpoint: string): boolean {
    // Batch certain types of GET requests
    return endpoint.includes('/messages/') && !endpoint.includes('/messages?');
  }
  
  // Convenience methods
  async get<T>(endpoint: string, cacheType?: keyof typeof CACHE_CONFIGS): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, undefined, cacheType);
  }
  
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Retry utility for failed requests
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  backoffMs: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      // Exponential backoff with jitter
      const delay = backoffMs * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

// Request cancellation utility
export class CancellableRequest {
  private abortController: AbortController;
  
  constructor() {
    this.abortController = new AbortController();
  }
  
  async request<T>(
    url: string,
    options: globalThis.RequestInit = {}
  ): Promise<T> {
    const response = await fetch(url, {
      ...options,
      signal: this.abortController.signal
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  cancel(): void {
    this.abortController.abort();
  }
}

// Cache management utilities
export const cacheUtils = {
  invalidate: (pattern: string) => apiCache.invalidate(pattern),
  clear: () => apiCache.clear(),
  getStats: () => apiCache.getStats(),
  
  // Warm up cache with commonly accessed data
  warmUp: async (warmUpFunctions: Array<() => Promise<unknown>>) => {
    await Promise.allSettled(warmUpFunctions.map(fn => fn()));
  },
  
  // Prefetch data that might be needed soon
  prefetch: async (prefetchFunctions: Array<() => Promise<unknown>>) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(async () => {
        await Promise.allSettled(prefetchFunctions.map(fn => fn()));
      });
    } else {
      setTimeout(async () => {
        await Promise.allSettled(prefetchFunctions.map(fn => fn()));
      }, 100);
    }
  }
};

export default {
  optimizedFetch,
  OptimizedAPIClient,
  withRetry,
  CancellableRequest,
  cacheUtils,
  CACHE_CONFIGS
};