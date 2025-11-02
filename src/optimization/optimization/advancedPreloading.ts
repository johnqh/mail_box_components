/**
 * Advanced preloading strategies for optimal user experience
 */

interface PreloadConfig {
  priority: 'critical' | 'high' | 'medium' | 'low';
  condition: () => boolean;
  delay?: number;
  onIdle?: boolean;
  onHover?: boolean;
  onScroll?: number; // scroll percentage
}

interface ChunkInfo {
  name: string;
  path: string;
  size: number;
  config: PreloadConfig;
}

// Define chunk preloading priorities based on user behavior
const CHUNK_PRELOAD_MAP: ChunkInfo[] = [
  // Critical: Always preload immediately
  {
    name: 'react-router',
    path: '/assets/react-router-*.js',
    size: 12,
    config: { priority: 'critical', condition: () => true },
  },

  // High Priority: Preload on user activity
  {
    name: 'app-core',
    path: '/assets/app-core-*.js',
    size: 25,
    config: {
      priority: 'high',
      condition: () => window.location.pathname === '/',
      delay: 1000,
      onIdle: true,
    },
  },

  // Web3 chunks - preload when wallet detected
  {
    name: 'wagmi',
    path: '/assets/wagmi-*.js',
    size: 15,
    config: {
      priority: 'high',
      condition: () =>
        !!((window as any).ethereum || localStorage.getItem('walletconnect')),
      onIdle: true,
    },
  },

  {
    name: 'wc-ethereum',
    path: '/assets/wc-ethereum-*.js',
    size: 273,
    config: {
      priority: 'medium',
      condition: () => !!(window as any).ethereum,
      delay: 2000,
      onHover: true,
    },
  },

  // Solana chunks - preload when Solana detected
  {
    name: 'solana-core',
    path: '/assets/solana-core-*.js',
    size: 29,
    config: {
      priority: 'medium',
      condition: () => !!((window as any).solana || (window as any).phantom),
      delay: 1500,
    },
  },

  // UI chunks - preload based on route hints
  {
    name: 'mail-features',
    path: '/assets/mail-features-*.js',
    size: 10,
    config: {
      priority: 'medium',
      condition: () =>
        window.location.pathname.includes('/connect') ||
        localStorage.getItem('wallet-connected') === 'true',
      onScroll: 20,
    },
  },

  // Large vendor chunks - lazy preload
  {
    name: 'coinbase',
    path: '/assets/coinbase-*.js',
    size: 75,
    config: {
      priority: 'low',
      condition: () => !!(window as any).ethereum,
      delay: 5000,
      onIdle: true,
    },
  },

  {
    name: 'design-system',
    path: '/assets/design-system-*.js',
    size: 112,
    config: {
      priority: 'low',
      condition: () => window.location.pathname.includes('/internal'),
      delay: 3000,
    },
  },
];

class AdvancedPreloader {
  private preloaded = new Set<string>();
  private networkSpeedEstimate: 'slow' | 'medium' | 'fast' = 'medium';
  private isLowEndDevice = false;
  private userActivityScore = 0;

  constructor() {
    this.detectNetworkSpeed();
    this.detectDeviceCapability();
    this.startUserActivityTracking();
  }

  private detectNetworkSpeed(): void {
    if ('connection' in navigator) {
      const connection = (
        navigator as { connection?: { effectiveType?: string } }
      ).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === '4g') {
          this.networkSpeedEstimate = 'fast';
        } else if (effectiveType === '3g') {
          this.networkSpeedEstimate = 'medium';
        } else {
          this.networkSpeedEstimate = 'slow';
        }
      }
    }

    // Fallback: measure download speed with a small resource
    const startTime = performance.now();
    fetch('/favicon.ico', { method: 'HEAD' })
      .then(() => {
        const duration = performance.now() - startTime;
        if (duration < 100) {
          this.networkSpeedEstimate = 'fast';
        } else if (duration < 300) {
          this.networkSpeedEstimate = 'medium';
        } else {
          this.networkSpeedEstimate = 'slow';
        }
      })
      .catch(() => {
        this.networkSpeedEstimate = 'slow';
      });
  }

  private detectDeviceCapability(): void {
    // Check for low-end device indicators
    const memory = (navigator as { deviceMemory?: number }).deviceMemory;
    const cores = navigator.hardwareConcurrency;

    if (memory && memory < 4) {
      this.isLowEndDevice = true;
    }

    if (cores && cores < 4) {
      this.isLowEndDevice = true;
    }

    // Check for battery API
    if ('getBattery' in navigator) {
      (navigator as { getBattery?: () => Promise<{ level?: number }> })
        .getBattery?.()
        .then(battery => {
          if (battery.level && battery.level < 0.2) {
            this.isLowEndDevice = true;
          }
        });
    }
  }

  private startUserActivityTracking(): void {
    let activityTimer: ReturnType<typeof setTimeout>;

    const updateActivity = () => {
      this.userActivityScore = Math.min(this.userActivityScore + 1, 100);
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        this.userActivityScore = Math.max(this.userActivityScore - 1, 0);
      }, 5000);
    };

    ['click', 'scroll', 'keydown', 'mousemove'].forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });
  }

  private shouldPreload(chunk: ChunkInfo): boolean {
    // Don't preload on slow networks or low-end devices for large chunks
    if (this.networkSpeedEstimate === 'slow' && chunk.size > 50) {
      return false;
    }

    if (this.isLowEndDevice && chunk.size > 30) {
      return false;
    }

    // Check chunk-specific conditions
    return chunk.config.condition();
  }

  private async preloadChunk(chunk: ChunkInfo): Promise<void> {
    if (this.preloaded.has(chunk.name)) {
      return;
    }

    try {
      // Find the actual chunk file
      const scripts = document.querySelectorAll(
        'script[src*="' + chunk.name + '"]'
      );
      if (scripts.length === 0) {
        // Try to find in link preload hints
        const links = document.querySelectorAll(
          'link[href*="' + chunk.name + '"]'
        );
        if (links.length > 0) {
          return; // Already preloading
        }
      }

      // Create preload link
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = chunk.path.replace('*', this.getChunkHash(chunk.name));
      link.crossOrigin = '';

      // Add priority hint if supported
      if ('fetchPriority' in link) {
        (link as { fetchPriority?: string }).fetchPriority =
          chunk.config.priority === 'critical' ? 'high' : 'low';
      }

      document.head.appendChild(link);
      this.preloaded.add(chunk.name);

      // Chunk preloaded successfully
    } catch {
      // Preload failed, will be loaded on demand
    }
  }

  private getChunkHash(chunkName: string): string {
    // Extract actual chunk hash from existing script tags
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    for (const script of scripts) {
      const src = (script as HTMLScriptElement).src;
      if (src.includes(chunkName)) {
        const match = src.match(
          new RegExp(`${chunkName}-([A-Za-z0-9_-]+)\\.js`)
        );
        if (match) {
          return match[1];
        }
      }
    }
    return 'unknown';
  }

  private async schedulePreload(chunk: ChunkInfo): Promise<void> {
    const config = chunk.config;

    if (config.delay) {
      await new Promise(resolve => setTimeout(resolve, config.delay));
    }

    if (config.onIdle && 'requestIdleCallback' in window) {
      return new Promise(resolve => {
        window.requestIdleCallback(() => {
          this.preloadChunk(chunk).then(resolve);
        });
      });
    }

    return this.preloadChunk(chunk);
  }

  public initializePreloading(): void {
    // Process chunks by priority
    const sortedChunks = CHUNK_PRELOAD_MAP.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return (
        priorityOrder[a.config.priority] - priorityOrder[b.config.priority]
      );
    });

    sortedChunks.forEach(chunk => {
      if (!this.shouldPreload(chunk)) {
        return;
      }

      if (chunk.config.priority === 'critical') {
        this.preloadChunk(chunk);
      } else {
        this.schedulePreload(chunk);
      }

      // Set up conditional preloading
      if (chunk.config.onHover) {
        this.setupHoverPreloading(chunk);
      }

      if (chunk.config.onScroll) {
        this.setupScrollPreloading(chunk, chunk.config.onScroll);
      }
    });

    // Start intelligent background preloading
    this.startIntelligentPreloading();
  }

  private setupHoverPreloading(chunk: ChunkInfo): void {
    const connectButtons = document.querySelectorAll('[data-preload-on-hover]');
    connectButtons.forEach(button => {
      let preloaded = false;
      button.addEventListener(
        'mouseenter',
        () => {
          if (!preloaded && this.userActivityScore > 30) {
            this.preloadChunk(chunk);
            preloaded = true;
          }
        },
        { passive: true }
      );
    });
  }

  private setupScrollPreloading(chunk: ChunkInfo, percentage: number): void {
    let triggered = false;
    const handleScroll = () => {
      if (triggered) return;

      const scrolled =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      if (scrolled >= percentage) {
        this.preloadChunk(chunk);
        triggered = true;
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private startIntelligentPreloading(): void {
    // Preload based on user behavior patterns
    setTimeout(() => {
      if (this.userActivityScore > 50 && this.networkSpeedEstimate !== 'slow') {
        // User is engaged, preload more chunks
        const mediumPriorityChunks = CHUNK_PRELOAD_MAP.filter(
          chunk =>
            chunk.config.priority === 'medium' && this.shouldPreload(chunk)
        );

        mediumPriorityChunks.forEach(chunk => {
          if (Math.random() > 0.5) {
            // Probabilistic loading
            this.schedulePreload(chunk);
          }
        });
      }
    }, 10000);
  }

  public getPreloadingStats(): {
    preloadedCount: number;
    networkSpeed: string;
    isLowEndDevice: boolean;
    userActivity: number;
  } {
    return {
      preloadedCount: this.preloaded.size,
      networkSpeed: this.networkSpeedEstimate,
      isLowEndDevice: this.isLowEndDevice,
      userActivity: this.userActivityScore,
    };
  }
}

// Global preloader instance
let preloaderInstance: AdvancedPreloader | null = null;

export function initializeAdvancedPreloading(): void {
  if (preloaderInstance) return;

  preloaderInstance = new AdvancedPreloader();

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloaderInstance?.initializePreloading();
    });
  } else {
    preloaderInstance.initializePreloading();
  }
}

export function getPreloadingStats() {
  return preloaderInstance?.getPreloadingStats();
}

export default AdvancedPreloader;
