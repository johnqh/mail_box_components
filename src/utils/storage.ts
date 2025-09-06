/**
 * @fileoverview Cross-Platform Storage Management System
 * @description Provides unified storage interface with TTL support, caching strategies, and platform abstraction
 * 
 * @example Basic Usage
 * ```typescript
 * import { walletStorage, themeStorage } from '@/utils/storage';
 * 
 * // Store user wallet data with 7-day TTL
 * walletStorage.set('0x742d35cc...', {
 *   username: 'alice.eth',
 *   addresses: ['alice@0xmail.box'],
 *   lastLogin: Date.now()
 * });
 * 
 * // Retrieve cached data
 * const userData = walletStorage.get('0x742d35cc...');
 * if (userData) {
 *   console.log(`Welcome back ${userData.username}!`);
 * }
 * 
 * // Store theme preference permanently
 * themeStorage.set('darkMode', true);
 * ```
 * 
 * @example Custom Storage Manager
 * ```typescript
 * import { StorageManager } from '@/utils/storage';
 * 
 * // Create custom storage with 1-hour TTL
 * const apiCache = new StorageManager({
 *   prefix: 'api-cache',
 *   ttl: 60 * 60 * 1000, // 1 hour
 *   storageType: 'localStorage'
 * });
 * 
 * // Cache API responses
 * apiCache.set('user-123', apiResponse, 30 * 60 * 1000); // 30 min override
 * ```
 * 
 * @description Storage Types:
 * - **walletStorage**: User authentication data (7-day TTL)
 * - **appStorage**: General application data (no TTL)
 * - **themeStorage**: UI preferences (no TTL)
 * 
 * @description Features:
 * - **TTL Support**: Automatic expiration and cleanup
 * - **Platform Abstraction**: Works on web and React Native
 * - **Error Handling**: Graceful fallbacks for storage failures
 * - **Type Safety**: Full TypeScript support with generics
 * - **Prefix Management**: Isolated storage namespaces
 */

// Platform storage types
export interface PlatformStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
  getAllKeys?: () => string[];
}

export type StorageType = 'localStorage' | 'sessionStorage' | 'asyncStorage' | 'memory';

/**
 * Configuration options for creating a storage manager
 */
interface StorageOptions {
  /** Prefix for all storage keys to avoid conflicts */
  prefix?: string;
  /** Default TTL in milliseconds for all stored items */
  ttl?: number;
  /** Platform-specific storage implementation */
  platformStorage?: PlatformStorage;
  /** Storage type identifier */
  storageType?: StorageType;
}

/**
 * Internal storage item wrapper with metadata
 * @template T - Type of the stored value
 */
interface StoredItem<T> {
  /** The actual stored data */
  value: T;
  /** Timestamp when item was stored */
  timestamp: number;
  /** Time-to-live in milliseconds (optional) */
  ttl?: number;
}

/**
 * Cross-platform storage manager with TTL and caching capabilities
 * 
 * @description Provides a unified interface for data persistence across
 * different platforms (web localStorage, React Native AsyncStorage, etc.)
 * with built-in expiration handling and error recovery.
 * 
 * @example Basic Operations
 * ```typescript
 * const storage = new StorageManager({ prefix: 'myapp', ttl: 60000 });
 * 
 * // Store with default TTL (1 minute)
 * storage.set('user', { name: 'Alice', id: 123 });
 * 
 * // Store with custom TTL (5 minutes)
 * storage.set('session', sessionData, 5 * 60 * 1000);
 * 
 * // Retrieve (returns undefined if expired)
 * const user = storage.get('user');
 * 
 * // Clear all items with pattern
 * storage.clear('user-'); // Removes all keys starting with 'user-'
 * ```
 */
class StorageManager {
  private prefix: string;
  private defaultTTL?: number;
  private platformStorage: PlatformStorage;

  constructor(options: StorageOptions = {}) {
    this.prefix = options.prefix || 'mailbox';
    this.defaultTTL = options.ttl;
    // Use provided platform storage or require it to be passed in
    this.platformStorage = options.platformStorage || this.createFallbackStorage();
  }

  private createFallbackStorage(): PlatformStorage {
    // Create a minimal in-memory storage for fallback
    const memoryStore = new Map<string, string>();
    return {
      getItem: (key: string) => memoryStore.get(key) || null,
      setItem: (key: string, value: string) => { memoryStore.set(key, value); },
      removeItem: (key: string) => { memoryStore.delete(key); },
      clear: () => { memoryStore.clear(); },
      getAllKeys: () => Array.from(memoryStore.keys())
    };
  }

  private getKey(key: string): string {
    return `${this.prefix}-${key}`;
  }

  private isExpired<T>(item: StoredItem<T>): boolean {
    if (!item.ttl) return false;
    return Date.now() - item.timestamp > item.ttl;
  }

  /**
   * Stores a value with optional TTL
   * 
   * @template T - Type of value being stored
   * @param key - Storage key (will be prefixed)
   * @param value - Data to store (must be JSON serializable)
   * @param ttl - Time-to-live in milliseconds (overrides default)
   * 
   * @description Behavior:
   * - Values are JSON serialized with metadata (timestamp, TTL)
   * - TTL parameter overrides the manager's default TTL
   * - Storage errors are logged but don't throw exceptions
   * - Supports any JSON-serializable data type
   * 
   * @example Usage
   * ```typescript
   * // Store with default TTL
   * storage.set('user-123', { name: 'Alice', email: 'alice@example.com' });
   * 
   * // Store with custom 5-minute TTL
   * storage.set('session', sessionData, 5 * 60 * 1000);
   * 
   * // Store permanently (no TTL)
   * storage.set('preferences', userPrefs, undefined);
   * ```
   */
  set<T>(key: string, value: T, ttl?: number): void {
    try {
      const item: StoredItem<T> = {
        value,
        timestamp: Date.now(),
        ttl: ttl || this.defaultTTL
      };
      this.platformStorage.setItem(this.getKey(key), JSON.stringify(item));
    } catch (error) {
      console.error(`Failed to store item ${key}:`, error);
    }
  }

  /**
   * Retrieves a stored value with automatic expiration handling
   * 
   * @template T - Expected type of stored value
   * @param key - Storage key to retrieve
   * @param defaultValue - Value to return if key doesn't exist or is expired
   * @returns Stored value or defaultValue
   * 
   * @description Behavior:
   * - Returns undefined if key doesn't exist and no defaultValue provided
   * - Automatically removes expired items from storage
   * - Handles JSON parsing errors gracefully
   * - Type-safe return values with TypeScript generics
   * 
   * @example Usage
   * ```typescript
   * // Get with undefined fallback
   * const user = storage.get<User>('user-123');
   * if (user) {
   *   console.log(`Hello ${user.name}!`);
   * }
   * 
   * // Get with default value
   * const theme = storage.get('theme', 'light');
   * 
   * // Type-safe retrieval
   * const settings = storage.get<AppSettings>('settings', defaultSettings);
   * ```
   */
  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const itemStr = this.platformStorage.getItem(this.getKey(key)) as string | null;
      if (!itemStr) return defaultValue;

      const item = JSON.parse(itemStr) as StoredItem<T>;
      
      if (this.isExpired(item)) {
        this.remove(key);
        return defaultValue;
      }

      return item.value;
    } catch (error) {
      console.error(`Failed to retrieve item ${key}:`, error);
      return defaultValue;
    }
  }

  remove(key: string): void {
    try {
      this.platformStorage.removeItem(this.getKey(key));
    } catch (error) {
      console.error(`Failed to remove item ${key}:`, error);
    }
  }

  clear(pattern?: string): void {
    try {
      if (this.platformStorage.getAllKeys) {
        const allKeys = this.platformStorage.getAllKeys() as string[];
        const prefix = this.getKey(pattern || '');
        
        const keysToRemove = allKeys.filter(key => key.startsWith(prefix));
        
        for (const key of keysToRemove) {
          this.platformStorage.removeItem(key);
        }
      } else {
        // Fallback: try to clear everything if getAllKeys is not available
        this.platformStorage.clear?.();
      }
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  has(key: string): boolean {
    try {
      const item = this.platformStorage.getItem(this.getKey(key));
      return item !== null;
    } catch (error) {
      console.error(`Failed to check item ${key}:`, error);
      return false;
    }
  }

  getAllKeys(): string[] {
    try {
      if (this.platformStorage.getAllKeys) {
        const allKeys = this.platformStorage.getAllKeys() as string[];
        const prefix = `${this.prefix}-`;
        
        return allKeys
          .filter(key => key.startsWith(prefix))
          .map(key => key.substring(prefix.length));
      }
      return [];
    } catch (error) {
      console.error('Failed to get all keys:', error);
      return [];
    }
  }
}

// =============================================================================
// PRE-CONFIGURED STORAGE INSTANCES
// =============================================================================

/**
 * General application storage for temporary and session data
 * 
 * @description Configuration:
 * - Prefix: 'mailbox'
 * - TTL: None (permanent storage)
 * - Use case: App settings, UI state, temporary data
 * 
 * @example Usage
 * ```typescript
 * import { appStorage } from '@/utils/storage';
 * 
 * // Store temporary app state
 * appStorage.set('sidebar-collapsed', true);
 * appStorage.set('last-visited-page', '/inbox');
 * 
 * // Retrieve app state
 * const isCollapsed = appStorage.get('sidebar-collapsed', false);
 * ```
 */
export const appStorage = new StorageManager();

/**
 * Theme and UI preference storage
 * 
 * @description Configuration:
 * - Prefix: 'mailbox-theme'
 * - TTL: None (permanent storage)
 * - Use case: Dark/light mode, layout preferences, UI customization
 * 
 * @example Usage
 * ```typescript
 * import { themeStorage } from '@/utils/storage';
 * 
 * // Store user preferences
 * themeStorage.set('darkMode', true);
 * themeStorage.set('fontSize', 'large');
 * themeStorage.set('compactMode', false);
 * 
 * // Load preferences on app start
 * const isDark = themeStorage.get('darkMode', false);
 * ```
 */
export const themeStorage = new StorageManager({ prefix: 'mailbox-theme' });

/**
 * Wallet authentication and user data storage with 7-day TTL
 * 
 * @description Configuration:
 * - Prefix: 'walletUser'
 * - TTL: 7 days (604,800,000 ms)
 * - Use case: Authentication tokens, user profiles, wallet data
 * 
 * @example Usage
 * ```typescript
 * import { walletStorage } from '@/utils/storage';
 * import type { WalletUserData } from './types';
 * 
 * // Store user authentication data
 * const userData: WalletUserData = {
 *   id: 'user123',
 *   username: 'alice.eth',
 *   addresses: ['alice@0xmail.box'],
 *   mailboxes: [...]
 * };
 * 
 * walletStorage.set('0x742d35cc...', userData);
 * 
 * // Retrieve user data (automatically expires after 7 days)
 * const user = walletStorage.get<WalletUserData>('0x742d35cc...');
 * if (user) {
 *   console.log(`Welcome back ${user.username}!`);
 * } else {
 *   console.log('Please authenticate again');
 * }
 * ```
 */
export const walletStorage = new StorageManager({ 
  prefix: 'walletUser',
  ttl: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
});

export const createSimpleStorage = (platformStorage?: PlatformStorage) => {
  if (!platformStorage) {
    throw new Error('PlatformStorage must be provided to createSimpleStorage');
  }
  
  return {
  setItem: (key: string, value: string) => {
    try {
      platformStorage.setItem(key, value);
    } catch (error) {
      console.error(`Failed to store ${key}:`, error);
    }
  },
  getItem: (key: string): string | null => {
    try {
      return platformStorage.getItem(key) as string | null;
    } catch (error) {
      console.error(`Failed to retrieve ${key}:`, error);
      return null;
    }
  },
  removeItem: (key: string) => {
    try {
      platformStorage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove ${key}:`, error);
    }
  }
  };
};

export default StorageManager;