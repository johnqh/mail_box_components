import React, { createContext, useContext, ReactNode } from 'react';

export type LayoutMode = 'standard' | 'wide' | 'full';

export interface LayoutContextValue {
  /** Current layout mode */
  mode: LayoutMode;
  /** CSS classes for the container */
  containerClass: string;
  /** CSS classes for just the max-width (without padding) */
  maxWidthClass: string;
  /** CSS classes for just the padding */
  paddingClass: string;
}

const containerClasses: Record<LayoutMode, string> = {
  standard: 'max-w-7xl mx-auto px-4',
  wide: 'max-w-[1920px] mx-auto px-4',
  full: 'w-full px-4',
};

const maxWidthClasses: Record<LayoutMode, string> = {
  standard: 'max-w-7xl mx-auto',
  wide: 'max-w-[1920px] mx-auto',
  full: 'w-full',
};

const paddingClass = 'px-4';

const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

export interface LayoutProviderProps {
  /** Layout mode - controls max-width of content */
  mode?: LayoutMode;
  /** Children to render */
  children: ReactNode;
}

/**
 * LayoutProvider - Provides consistent layout width settings to child components
 *
 * @example
 * ```tsx
 * // Standard width for landing pages
 * <LayoutProvider mode="standard">
 *   <Topbar />
 *   <main>...</main>
 *   <Footer />
 * </LayoutProvider>
 *
 * // Full width for app pages
 * <LayoutProvider mode="full">
 *   <Topbar />
 *   <main>...</main>
 *   <Footer />
 * </LayoutProvider>
 * ```
 */
export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  mode = 'standard',
  children,
}) => {
  const value: LayoutContextValue = {
    mode,
    containerClass: containerClasses[mode],
    maxWidthClass: maxWidthClasses[mode],
    paddingClass,
  };

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};

/**
 * useLayout - Hook to access layout context
 *
 * Returns default 'standard' values if used outside LayoutProvider
 */
export const useLayout = (): LayoutContextValue => {
  const context = useContext(LayoutContext);

  // Return default values if not within provider (backward compatible)
  if (!context) {
    return {
      mode: 'standard',
      containerClass: containerClasses.standard,
      maxWidthClass: maxWidthClasses.standard,
      paddingClass,
    };
  }

  return context;
};

export { LayoutContext };
