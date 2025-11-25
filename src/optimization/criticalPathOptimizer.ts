/**
 * Critical rendering path optimizer for fastest possible page loads
 */

interface CriticalResource {
  url: string;
  type: 'script' | 'style' | 'font' | 'image';
  priority: 'critical' | 'high' | 'medium' | 'low';
  async?: boolean;
  defer?: boolean;
  preload?: boolean;
}

export class CriticalPathOptimizer {
  private criticalResources: CriticalResource[] = [];
  private observedMetrics = {
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
  };

  constructor() {
    this.defineCriticalResources();
    this.startPerformanceObservation();
  }

  private defineCriticalResources(): void {
    this.criticalResources = [
      // Critical CSS (inline or high priority)
      {
        url: '/assets/index-*.css',
        type: 'style',
        priority: 'critical',
        preload: true,
      },

      // Critical JavaScript (main bundle)
      {
        url: '/assets/index-*.js',
        type: 'script',
        priority: 'critical',
      },

      // High priority JavaScript (React core)
      {
        url: '/assets/react-core-*.js',
        type: 'script',
        priority: 'high',
        preload: true,
      },

      // Critical fonts
      {
        url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2',
        type: 'font',
        priority: 'critical',
        preload: true,
      },

      // Logo and critical images
      {
        url: '/logo.png',
        type: 'image',
        priority: 'high',
        preload: true,
      },
    ];
  }

  private startPerformanceObservation(): void {
    // Observe Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.name === 'first-contentful-paint') {
              this.observedMetrics.fcp = entry.startTime;
              this.optimizeBasedOnFCP(entry.startTime);
            }
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            this.observedMetrics.lcp = entry.startTime;
            this.optimizeBasedOnLCP(entry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.observedMetrics.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch {
        // CLS monitoring not supported
      }
    }

    // Navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.observedMetrics.ttfb =
            navigation.responseStart - navigation.requestStart;
          this.optimizeBasedOnTTFB(this.observedMetrics.ttfb);
        }
      }, 0);
    });
  }

  private optimizeBasedOnFCP(fcp: number): void {
    // FCP optimization based on timing

    if (fcp > 2000) {
      // Slow FCP detected, applying optimizations
      this.applyEmergencyOptimizations();
    } else if (fcp > 1500) {
      this.applyMediumOptimizations();
    }
  }

  private optimizeBasedOnLCP(lcp: number): void {
    // LCP optimization based on timing

    if (lcp > 2500) {
      this.optimizeLCPElements();
    }
  }

  private optimizeBasedOnTTFB(ttfb: number): void {
    // TTFB optimization based on timing

    if (ttfb > 600) {
      this.enableAggressiveCaching();
    }
  }

  private applyEmergencyOptimizations(): void {
    // Remove non-critical resources
    const nonCriticalImages = document.querySelectorAll(
      'img[data-priority="low"]'
    );
    nonCriticalImages.forEach(img => {
      (img as HTMLImageElement).loading = 'lazy';
      (img as HTMLImageElement).style.display = 'none';
      setTimeout(() => {
        (img as HTMLImageElement).style.display = '';
      }, 3000);
    });

    // Defer non-critical scripts
    const nonCriticalScripts = document.querySelectorAll(
      'script[data-priority="low"]'
    );
    nonCriticalScripts.forEach(script => {
      script.setAttribute('defer', '');
    });
  }

  private applyMediumOptimizations(): void {
    // Preload next likely resources
    const nextResources = [
      '/assets/app-core-*.js',
      '/assets/react-router-*.js',
    ];

    nextResources.forEach(resource => {
      this.preloadResource(resource, 'script');
    });
  }

  private optimizeLCPElements(): void {
    // Find and optimize LCP element
    const heroImages = document.querySelectorAll(
      'img[data-hero], [data-lcp-element]'
    );
    heroImages.forEach(img => {
      if (img instanceof HTMLImageElement) {
        img.fetchPriority = 'high';
        img.loading = 'eager';
      }
    });

    // Preload hero images
    const heroSrc = document
      .querySelector('img[data-hero]')
      ?.getAttribute('src');
    if (heroSrc) {
      this.preloadResource(heroSrc, 'image');
    }
  }

  private enableAggressiveCaching(): void {
    // Service worker for aggressive caching would go here
    // For now, we'll just set longer cache headers via meta tags
    const cacheHint = document.createElement('meta');
    cacheHint.httpEquiv = 'Cache-Control';
    cacheHint.content = 'public, max-age=31536000, immutable';
    document.head.appendChild(cacheHint);
  }

  private preloadResource(url: string, type: string): void {
    const existing = document.querySelector(`link[href*="${url}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;

    switch (type) {
      case 'script':
        link.as = 'script';
        break;
      case 'style':
        link.as = 'style';
        break;
      case 'font':
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = '';
        break;
      case 'image':
        link.as = 'image';
        break;
    }

    document.head.appendChild(link);
  }

  public optimizeCriticalPath(): void {
    // 1. Preload critical resources
    this.criticalResources
      .filter(resource => resource.priority === 'critical' && resource.preload)
      .forEach(resource => {
        this.preloadResource(resource.url, resource.type);
      });

    // 2. Inline critical CSS if small enough
    this.inlineCriticalCSS();

    // 3. Optimize font loading
    this.optimizeFontLoading();

    // 4. Remove render-blocking resources
    this.removeRenderBlocking();

    // 5. Setup progressive loading
    this.setupProgressiveLoading();
  }

  private inlineCriticalCSS(): void {
    // For very small critical CSS, inline it
    const criticalCSS = document.querySelector(
      'link[rel="stylesheet"][data-critical]'
    );
    if (
      criticalCSS &&
      this.isSmallResource(criticalCSS.getAttribute('href') || '')
    ) {
      fetch(criticalCSS.getAttribute('href') || '')
        .then(response => response.text())
        .then(css => {
          if (css.length < 10000) {
            // Only inline if < 10KB
            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
            criticalCSS.remove();
          }
        })
        .catch(() => {});
    }
  }

  private optimizeFontLoading(): void {
    // Add font-display: swap to font faces
    const fontLinks = document.querySelectorAll(
      'link[href*="fonts.googleapis.com"]'
    );
    fontLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (!href.includes('display=swap')) {
        const separator = href.includes('?') ? '&' : '?';
        link.setAttribute('href', `${href}${separator}display=swap`);
      }
    });
  }

  private removeRenderBlocking(): void {
    // Make non-critical stylesheets non-render-blocking
    const stylesheets = document.querySelectorAll(
      'link[rel="stylesheet"]:not([data-critical])'
    );
    stylesheets.forEach(link => {
      const newLink = link.cloneNode(true) as HTMLLinkElement;
      newLink.rel = 'preload';
      newLink.as = 'style';
      newLink.onload = () => {
        newLink.onload = null;
        newLink.rel = 'stylesheet';
      };

      // Add noscript fallback
      const noscript = document.createElement('noscript');
      const fallbackLink = link.cloneNode(true) as HTMLLinkElement;
      noscript.appendChild(fallbackLink);

      document.head.appendChild(newLink);
      document.head.appendChild(noscript);
      link.remove();
    });
  }

  private setupProgressiveLoading(): void {
    // Progressive enhancement for images
    const images = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = img.dataset.src || '';
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01,
        }
      );

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => {
        const image = img as HTMLImageElement;
        image.src = image.dataset.src || '';
      });
    }
  }

  private isSmallResource(url: string): boolean {
    // This would need to be determined based on actual resource size
    // For now, we'll use heuristics
    return url.includes('critical') || url.includes('inline');
  }

  public getPerformanceMetrics() {
    return {
      ...this.observedMetrics,
      score: this.calculatePerformanceScore(),
    };
  }

  private calculatePerformanceScore(): number {
    let score = 100;

    // Penalize slow metrics
    if (this.observedMetrics.fcp > 2000) score -= 20;
    else if (this.observedMetrics.fcp > 1500) score -= 10;

    if (this.observedMetrics.lcp > 2500) score -= 25;
    else if (this.observedMetrics.lcp > 2000) score -= 15;

    if (this.observedMetrics.cls > 0.1) score -= 15;
    else if (this.observedMetrics.cls > 0.05) score -= 8;

    if (this.observedMetrics.ttfb > 600) score -= 10;
    else if (this.observedMetrics.ttfb > 400) score -= 5;

    return Math.max(score, 0);
  }
}

let optimizerInstance: CriticalPathOptimizer | null = null;

export function initializeCriticalPathOptimization(): void {
  if (optimizerInstance) return;

  optimizerInstance = new CriticalPathOptimizer();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizerInstance?.optimizeCriticalPath();
    });
  } else {
    optimizerInstance.optimizeCriticalPath();
  }
}

export function getPerformanceMetrics() {
  return optimizerInstance?.getPerformanceMetrics();
}
