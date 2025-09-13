import React, { useEffect } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  useEffect(() => {
    // Critical performance optimizations for Core Web Vitals

    // 1. Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: true },
        { href: '/images/hero-background.webp', as: 'image', type: 'image/webp' },
        { href: '/images/logo.svg', as: 'image', type: 'image/svg+xml' }
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.crossorigin) link.crossOrigin = '';
        document.head.appendChild(link);
      });
    };

    // 2. Optimize Largest Contentful Paint (LCP)
    const optimizeLCP = () => {
      // Add fetchpriority="high" to above-the-fold images
      const heroImages = document.querySelectorAll('img[data-priority="high"]');
      heroImages.forEach(img => {
        (img as HTMLImageElement).fetchPriority = 'high';
      });

      // Preload hero background image
      const heroSection = document.querySelector('[data-hero]');
      if (heroSection) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = '/images/hero-background.webp';
        link.as = 'image';
        link.type = 'image/webp';
        document.head.appendChild(link);
      }
    };

    // 3. Reduce Cumulative Layout Shift (CLS)
    const reduceCLS = () => {
      // Add explicit dimensions to prevent layout shifts
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        const image = img as HTMLImageElement;
        if (image.naturalWidth && image.naturalHeight) {
          image.width = image.naturalWidth;
          image.height = image.naturalHeight;
        }
      });

      // Reserve space for dynamic content
      const dynamicContainers = document.querySelectorAll('[data-dynamic]');
      dynamicContainers.forEach(container => {
        if (!container.getAttribute('style')?.includes('min-height')) {
          (container as HTMLElement).style.minHeight = '200px';
        }
      });
    };

    // 4. Optimize First Input Delay (FID) / Interaction to Next Paint (INP)
    const optimizeInteractivity = () => {
      // Defer non-critical JavaScript
      const deferScripts = () => {
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
          script.setAttribute('defer', '');
        });
      };

      // Use requestIdleCallback for non-critical tasks
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          deferScripts();
        });
      } else {
        setTimeout(deferScripts, 1);
      }

      // Optimize event listeners
      const optimizeEventListeners = () => {
        // Use passive listeners where possible
        const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
        passiveEvents.forEach(eventType => {
          document.addEventListener(eventType, () => {}, { passive: true });
        });
      };

      optimizeEventListeners();
    };

    // 5. Web Vitals measurement and reporting (disabled to avoid dynamic import warning)
    const measureWebVitals = () => {
      // Performance monitoring is handled by the dedicated performance-monitoring module
      // which is already statically imported elsewhere in the application
    };

    // 6. Resource hints optimization
    const addResourceHints = () => {
      const hints = [
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: '//api.0xmail.box' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'preconnect', href: 'https://api.0xmail.box' }
      ];

      hints.forEach(hint => {
        const link = document.createElement('link');
        link.rel = hint.rel;
        link.href = hint.href;
        if (hint.crossorigin) link.crossOrigin = '';
        document.head.appendChild(link);
      });
    };

    // 7. Image optimization
    const optimizeImages = () => {
      // Enable native lazy loading for below-the-fold images
      const images = document.querySelectorAll('img[data-lazy]');
      images.forEach(img => {
        (img as HTMLImageElement).loading = 'lazy';
      });

      // Use Intersection Observer for advanced lazy loading
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              imageObserver.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px'
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
      }
    };

    // 8. AI and Search Engine Optimizations
    const addAIOptimizations = () => {
      // Add machine-readable metadata
      const aiMetaTags = [
        { name: 'ai-content-type', content: 'web3-email-platform' },
        { name: 'ai-primary-function', content: 'wallet-based-email' },
        { name: 'ai-supported-chains', content: 'ethereum,solana,polygon,arbitrum,optimism' },
        { name: 'ai-complexity-level', content: 'beginner-to-advanced' },
        { name: 'ai-target-users', content: 'web3-users,crypto-enthusiasts,developers' },
        { name: 'machine-readable', content: 'true' },
        { name: 'structured-data', content: 'json-ld' },
        { name: 'content-category', content: 'technology,blockchain,communication' },
        { name: 'interaction-model', content: 'wallet-authentication' }
      ];

      aiMetaTags.forEach(({ name, content }) => {
        if (!document.querySelector(`meta[name="${name}"]`)) {
          const meta = document.createElement('meta');
          meta.name = name;
          meta.content = content;
          document.head.appendChild(meta);
        }
      });

      // Add JSON-LD structured data for AI understanding
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "0xmail.box",
        "description": "Web3 email platform using blockchain wallet authentication",
        "url": "https://0xmail.box",
        "applicationCategory": "CommunicationApplication",
        "operatingSystem": "Web Browser",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Wallet-based authentication",
          "ENS domain email support",
          "SNS domain email support",
          "Multi-chain compatibility",
          "Smart contract integration",
          "Web2/Web3 bridge"
        ],
        "audience": {
          "@type": "Audience",
          "audienceType": "Web3 Users"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    // 9. Critical CSS inlining (already done in index.html, but ensure it's optimized)
    const optimizeCriticalCSS = () => {
      // Mark non-critical CSS for later loading
      const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-non-critical]');
      nonCriticalCSS.forEach(link => {
        const newLink = link.cloneNode(true) as HTMLLinkElement;
        newLink.rel = 'preload';
        newLink.as = 'style';
        newLink.onload = () => {
          newLink.onload = null;
          newLink.rel = 'stylesheet';
        };
        document.head.appendChild(newLink);
        link.remove();
      });
    };

    // Execute optimizations
    preloadCriticalResources();
    optimizeLCP();
    reduceCLS();
    optimizeInteractivity();
    addResourceHints();
    optimizeImages();
    addAIOptimizations();
    optimizeCriticalCSS();

    // Measure web vitals after optimizations
    setTimeout(measureWebVitals, 2000);

    // Cleanup function
    return () => {
      // Remove any added event listeners or observers if needed
    };
  }, []);

  return <>{children}</>;
};

export default PerformanceOptimizer;