/**
 * CSS and styling performance optimization utilities
 */

import React from "react";

// CSS-in-JS optimization utilities
export const createOptimizedStyles = (baseStyles: Record<string, unknown>) => {
  // Return the styles directly - memoization should be done at the hook level
  return baseStyles;
};

// Critical CSS utilities
export const loadCriticalCSS = (css: string) => {
  if (typeof document === "undefined") return;

  const style = document.createElement("style");
  style.textContent = css;
  style.setAttribute("data-critical", "true");
  document.head.appendChild(style);
};

// Non-critical CSS lazy loading
export const loadNonCriticalCSS = (href: string) => {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "style";
  link.href = href;
  link.onload = () => {
    link.rel = "stylesheet";
  };
  document.head.appendChild(link);

  // Fallback for browsers that don't support preload
  const noscriptLink = document.createElement("noscript");
  noscriptLink.innerHTML = `<link rel="stylesheet" href="${href}">`;
  document.head.appendChild(noscriptLink);
};

// CSS custom properties optimization
export const createCSSVariables = (
  variables: Record<string, string | number>
) => {
  const cssVars: Record<string, string> = {};

  Object.entries(variables).forEach(([key, value]) => {
    cssVars[`--${key}`] = typeof value === "number" ? `${value}px` : value;
  });

  return cssVars;
};

// Responsive design optimization
interface BreakpointConfig {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

const defaultBreakpoints: BreakpointConfig = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useResponsiveStyles = (
  styles: Partial<Record<keyof BreakpointConfig | "base", React.CSSProperties>>,
  breakpoints: BreakpointConfig = defaultBreakpoints
) => {
  const [currentBreakpoint, setCurrentBreakpoint] = React.useState<
    keyof BreakpointConfig | "base"
  >("base");

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;

      if (width >= breakpoints["2xl"]) setCurrentBreakpoint("2xl");
      else if (width >= breakpoints.xl) setCurrentBreakpoint("xl");
      else if (width >= breakpoints.lg) setCurrentBreakpoint("lg");
      else if (width >= breakpoints.md) setCurrentBreakpoint("md");
      else if (width >= breakpoints.sm) setCurrentBreakpoint("sm");
      else if (width >= breakpoints.xs) setCurrentBreakpoint("xs");
      else setCurrentBreakpoint("base");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);

    return () => window.removeEventListener("resize", updateBreakpoint);
  }, [breakpoints]);

  return styles[currentBreakpoint] || styles.base || {};
};

// Animation optimization
export const prefersReducedMotion = () => {
  if (typeof window === "undefined") return false;
  
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  return mediaQuery.matches;
};

export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = React.useState(prefersReducedMotion);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const handleChange = () => {
      setReducedMotion(mediaQuery.matches);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return reducedMotion;
};

// CSS containment optimization
export const optimizeContainment = (
  element: HTMLElement,
  containTypes: Array<"layout" | "paint" | "size" | "style"> = ["layout", "paint"]
) => {
  if (!element) return;
  
  element.style.contain = containTypes.join(" ");
};

// CSS will-change optimization
export const optimizeWillChange = (
  element: HTMLElement,
  properties: string[]
) => {
  if (!element) return;
  
  // Add will-change before animation
  element.style.willChange = properties.join(", ");
  
  // Remove will-change after animation to free memory
  const cleanup = () => {
    element.style.willChange = "auto";
  };
  
  return cleanup;
};

// Batch DOM updates
export const batchDOMUpdates = (updates: (() => void)[]) => {
  if (typeof window === "undefined") return;
  
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
};

// CSS class name optimization
export const optimizeClassNames = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Inline critical styles
export const inlineCriticalStyles = (styles: React.CSSProperties): React.CSSProperties => {
  // Only inline truly critical above-the-fold styles
  const criticalStyles: React.CSSProperties = {};
  
  const criticalProperties = [
    'display',
    'position',
    'width',
    'height',
    'margin',
    'padding',
    'fontSize',
    'fontFamily',
    'color',
    'backgroundColor'
  ];
  
  Object.entries(styles).forEach(([key, value]) => {
    if (criticalProperties.includes(key)) {
      (criticalStyles as any)[key] = value;
    }
  });
  
  return criticalStyles;
};

// Lazy load styles
export const useLazyStyles = (
  getStyles: () => Promise<{ default: any }>,
  deps: React.DependencyList = []
) => {
  const [styles, setStyles] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    let mounted = true;
    
    getStyles().then(module => {
      if (mounted) {
        setStyles(module.default);
        setLoading(false);
      }
    });
    
    return () => {
      mounted = false;
    };
  }, deps);
  
  return { styles, loading };
};

// CSS Grid optimization
export const optimizeGrid = (columns: number, gap: string = "1rem") => {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap,
    // Optimize for performance
    contain: "layout",
    willChange: "transform"
  };
};

// Flexbox optimization
export const optimizeFlex = (
  direction: "row" | "column" = "row",
  align: string = "center",
  justify: string = "flex-start"
) => {
  return {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    // Optimize for performance
    contain: "layout"
  };
};

// Media query optimization
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = React.useState(false);
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    
    const handleChange = () => setMatches(mediaQuery.matches);
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]);
  
  return matches;
};

// Theme optimization
export const useOptimizedTheme = <T extends Record<string, any>>(
  lightTheme: T,
  darkTheme: T
) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
    
    const handleChange = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
  
  return theme === "dark" ? darkTheme : lightTheme;
};

export default {
  createOptimizedStyles,
  loadCriticalCSS,
  loadNonCriticalCSS,
  createCSSVariables,
  useResponsiveStyles,
  prefersReducedMotion,
  useReducedMotion,
  optimizeContainment,
  optimizeWillChange,
  batchDOMUpdates,
  optimizeClassNames,
  inlineCriticalStyles,
  useLazyStyles,
  optimizeGrid,
  optimizeFlex,
  useMediaQuery,
  useOptimizedTheme
};