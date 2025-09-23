/**
 * Image optimization utilities for SEO and performance
 */

// Image SEO metadata
export interface ImageSEOData {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  srcSet?: string;
}

// Generate image SEO attributes
export const generateImageSEO = (data: ImageSEOData): Record<string, any> => {
  const attributes: Record<string, any> = {
    src: data.src,
    alt: data.alt,
    loading: data.loading || 'lazy',
  };

  if (data.title) attributes.title = data.title;
  if (data.width) attributes.width = data.width;
  if (data.height) attributes.height = data.height;
  if (data.sizes) attributes.sizes = data.sizes;
  if (data.srcSet) attributes.srcSet = data.srcSet;

  // Add structured data attributes
  attributes.itemProp = 'image';

  return attributes;
};

// Generate responsive image srcSet
export const generateSrcSet = (
  baseUrl: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return sizes
    .map(size => {
      const url = baseUrl.replace(/\{width\}/g, size.toString());
      return `${url} ${size}w`;
    })
    .join(', ');
};

// Generate image sizes attribute for responsive images
export const generateSizes = (
  breakpoints: { maxWidth?: number; size: string }[]
): string => {
  return breakpoints
    .map(bp => {
      if (bp.maxWidth) {
        return `(max-width: ${bp.maxWidth}px) ${bp.size}`;
      }
      return bp.size;
    })
    .join(', ');
};

// Image metadata for OpenGraph and Twitter
export interface SocialImageMetadata {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

export const generateSocialImageMeta = (
  image: SocialImageMetadata,
  platform: 'openGraph' | 'twitter' = 'openGraph'
): Record<string, string> => {
  const meta: Record<string, string> = {};

  if (platform === 'openGraph') {
    meta['og:image'] = image.url;
    if (image.width) meta['og:image:width'] = image.width.toString();
    if (image.height) meta['og:image:height'] = image.height.toString();
    if (image.alt) meta['og:image:alt'] = image.alt;
    if (image.type) meta['og:image:type'] = image.type;
  } else {
    meta['twitter:image'] = image.url;
    if (image.alt) meta['twitter:image:alt'] = image.alt;
  }

  return meta;
};

// Lazy loading with native API
export const setupLazyLoading = (
  selector: string = 'img[loading="lazy"]'
): (() => void) | void => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const images = document.querySelectorAll<HTMLImageElement>(selector);

  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
    return;
  }

  // Fallback to Intersection Observer
  const imageObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
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

  // Cleanup function
  return () => {
    images.forEach(img => imageObserver.unobserve(img));
  };
};

// WebP support detection
export const supportsWebP = (): Promise<boolean> => {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = function () {
      resolve(webP.height === 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// AVIF support detection
export const supportsAVIF = (): Promise<boolean> => {
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  return new Promise(resolve => {
    const avif = new Image();
    avif.onload = () => resolve(true);
    avif.onerror = () => resolve(false);
    avif.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
};

// Optimize image format based on browser support
export const getOptimalImageFormat = async (
  baseFormat: string = 'jpg'
): Promise<string> => {
  const [webpSupported, avifSupported] = await Promise.all([
    supportsWebP(),
    supportsAVIF(),
  ]);

  if (avifSupported) return 'avif';
  if (webpSupported) return 'webp';
  return baseFormat;
};

// Generate picture element for responsive images
export interface PictureSource {
  srcSet: string;
  type?: string;
  media?: string;
  sizes?: string;
}

export const generatePictureElement = (
  sources: PictureSource[],
  fallbackSrc: string,
  alt: string,
  className?: string
): string => {
  const sourceTags = sources
    .map(source => {
      const attrs = [`srcset="${source.srcSet}"`];
      if (source.type) attrs.push(`type="${source.type}"`);
      if (source.media) attrs.push(`media="${source.media}"`);
      if (source.sizes) attrs.push(`sizes="${source.sizes}"`);
      return `<source ${attrs.join(' ')}>`;
    })
    .join('\n  ');

  return `
<picture>
  ${sourceTags}
  <img src="${fallbackSrc}" alt="${alt}"${className ? ` class="${className}"` : ''} loading="lazy">
</picture>`.trim();
};

// Preload critical images
export const preloadImage = (src: string, as: 'image' = 'image'): void => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;

  // Add specific attributes for images
  if (src.includes('.webp')) {
    link.type = 'image/webp';
  } else if (src.includes('.avif')) {
    link.type = 'image/avif';
  }

  document.head.appendChild(link);
};

// Progressive image loading
export const setupProgressiveLoading = (
  lowQualitySrc: string,
  highQualitySrc: string,
  container: HTMLElement
): void => {
  if (typeof window === 'undefined') return;

  // Load low quality image first
  const lowQualityImg = new Image();
  lowQualityImg.src = lowQualitySrc;
  lowQualityImg.classList.add('progressive-image-placeholder');

  container.appendChild(lowQualityImg);

  // Load high quality image
  const highQualityImg = new Image();
  highQualityImg.src = highQualitySrc;
  highQualityImg.classList.add('progressive-image-main');
  highQualityImg.style.opacity = '0';

  highQualityImg.onload = () => {
    container.appendChild(highQualityImg);

    // Fade in high quality image
    requestAnimationFrame(() => {
      highQualityImg.style.transition = 'opacity 0.3s';
      highQualityImg.style.opacity = '1';

      // Remove low quality image after transition
      setTimeout(() => {
        lowQualityImg.remove();
      }, 300);
    });
  };
};

// Image performance metrics
export interface ImagePerformanceMetrics {
  loadTime: number;
  size: number;
  format: string;
  dimensions: { width: number; height: number };
  isLazyLoaded: boolean;
  isOptimized: boolean;
}

export const measureImagePerformance = (
  img: HTMLImageElement
): Promise<ImagePerformanceMetrics> => {
  return new Promise(resolve => {
    const startTime = performance.now();

    if (img.complete) {
      // Image already loaded
      resolve({
        loadTime: 0,
        size: 0, // Can't determine size from client-side
        format: img.src.split('.').pop() || 'unknown',
        dimensions: {
          width: img.naturalWidth,
          height: img.naturalHeight,
        },
        isLazyLoaded: img.loading === 'lazy',
        isOptimized: img.srcset !== '' || img.sizes !== '',
      });
    } else {
      img.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;

        resolve({
          loadTime,
          size: 0, // Can't determine size from client-side
          format: img.src.split('.').pop() || 'unknown',
          dimensions: {
            width: img.naturalWidth,
            height: img.naturalHeight,
          },
          isLazyLoaded: img.loading === 'lazy',
          isOptimized: img.srcset !== '' || img.sizes !== '',
        });
      });
    }
  });
};

// Placeholder generation for lazy loading
export const generatePlaceholder = (
  width: number,
  height: number,
  color: string = '#e0e0e0'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Aspect ratio preservation
export const preserveAspectRatio = (
  container: HTMLElement,
  aspectRatio: number
): void => {
  const paddingTop = (1 / aspectRatio) * 100;
  container.style.position = 'relative';
  container.style.paddingTop = `${paddingTop}%`;

  const img = container.querySelector('img');
  if (img) {
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
  }
};

export default {
  generateImageSEO,
  generateSrcSet,
  generateSizes,
  generateSocialImageMeta,
  setupLazyLoading,
  supportsWebP,
  supportsAVIF,
  getOptimalImageFormat,
  generatePictureElement,
  preloadImage,
  setupProgressiveLoading,
  measureImagePerformance,
  generatePlaceholder,
  preserveAspectRatio,
};
