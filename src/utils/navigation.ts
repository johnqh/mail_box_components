/**
 * Platform-agnostic navigation service
 * Automatically selects the appropriate navigation implementation based on platform
 */

import {
  UINavigationService,
  UINavigationHook,
  UILocationHook,
  UINavigationConfig,
  UINavigationOptions
} from '@johnqh/design-system';

let navigationService: UINavigationService;

/**
 * Get platform-appropriate navigation service
 */
function createUINavigationService(_config?: Partial<UINavigationConfig>): UINavigationService {
  // Platform detection - web vs React Native
  if (typeof window !== 'undefined') {
    // Web environment - dynamic import for web navigation
    throw new Error('Web navigation service not implemented in shared library');
  } else {
    // React Native environment - dynamic import for RN navigation  
    throw new Error('React Native navigation service not implemented in shared library');
  }
}

/**
 * Get the default navigation service instance (singleton pattern)
 */
export function getUINavigationService(config?: Partial<UINavigationConfig>): UINavigationService {
  if (!navigationService) {
    navigationService = createUINavigationService(config);
  }
  return navigationService;
}

/**
 * Platform-agnostic navigation hook
 * Drop-in replacement for React Router's useNavigate
 */
export function useNavigation(): UINavigationHook {
  const service = getUINavigationService();
  const currentState = service.getCurrentState();

  return {
    navigate: (path: string, options?: UINavigationOptions) => {
      service.navigate(path, options);
    },
    goBack: (fallbackPath?: string) => {
      service.goBack(fallbackPath);
    },
    replace: (path: string, options?: UINavigationOptions) => {
      service.replace(path, options);
    },
    currentPath: currentState.currentPath,
    searchParams: currentState.searchParams,
    params: currentState.params,
    canGoBack: service.canGoBack(),
    isSupported: service.isSupported()
  };
}

/**
 * Platform-agnostic location hook
 * Drop-in replacement for React Router's useLocation
 */
export function useLocation(): UILocationHook {
  const service = getUINavigationService();
  const currentState = service.getCurrentState();

  // Build search string from searchParams
  const searchString = Object.keys(currentState.searchParams).length > 0 
    ? '?' + new URLSearchParams(currentState.searchParams).toString()
    : '';

  return {
    pathname: currentState.currentPath,
    search: searchString,
    searchParams: currentState.searchParams,
    hash: '', // Not commonly used in mobile apps
    state: {} as Record<string, any>, // Would need to be tracked separately
    key: currentState.currentPath // Simplified key generation
  };
}

/**
 * Platform-agnostic search params hook
 * Drop-in replacement for React Router's useSearchParams
 */
export function useSearchParams(): [URLSearchParams, (params: URLSearchParams | Record<string, string>) => void] {
  const service = getUINavigationService();
  const currentState = service.getCurrentState();
  
  const searchParams = new URLSearchParams(currentState.searchParams);
  
  const setSearchParams = (params: URLSearchParams | Record<string, string>) => {
    const newSearchParams = params instanceof URLSearchParams 
      ? Object.fromEntries(params.entries())
      : params;
    
    const newSearch = new URLSearchParams(newSearchParams).toString();
    const newPath = currentState.currentPath + (newSearch ? `?${newSearch}` : '');
    
    service.replace(newPath);
  };

  return [searchParams, setSearchParams];
}

/**
 * Convenience functions for common navigation operations
 */
export const navigationHelper = {
  /**
   * Navigate to a path
   * @param path Target path
   * @param options Navigation options
   */
  navigate: (path: string, options?: UINavigationOptions) => {
    const service = getUINavigationService();
    service.navigate(path, options);
  },

  /**
   * Go back to previous screen
   * @param fallbackPath Fallback path if no history
   */
  goBack: (fallbackPath?: string) => {
    const service = getUINavigationService();
    service.goBack(fallbackPath);
  },

  /**
   * Replace current route
   * @param path Target path
   * @param options Navigation options
   */
  replace: (path: string, options?: UINavigationOptions) => {
    const service = getUINavigationService();
    service.replace(path, options);
  },

  /**
   * Get current path
   */
  getCurrentPath: () => {
    const service = getUINavigationService();
    return service.getCurrentPath();
  },

  /**
   * Get search parameters
   */
  getSearchParams: () => {
    const service = getUINavigationService();
    return service.getSearchParams();
  },

  /**
   * Navigate to mail app
   */
  goToMail: () => {
    navigationHelper.navigate('/mail');
  },

  /**
   * Navigate to preferences
   */
  goToPreferences: () => {
    navigationHelper.navigate('/preferences');
  },

  /**
   * Navigate to compose page
   * @param type Compose type (compose, reply, forward)
   * @param params Additional parameters
   */
  goToCompose: (type?: string, params?: Record<string, string>) => {
    const searchParams = new URLSearchParams();
    if (type) searchParams.set('type', type);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, value);
      });
    }
    const search = searchParams.toString();
    navigationHelper.navigate(`/mail/compose${search ? `?${search}` : ''}`);
  },

  /**
   * Navigate to connect wallet page
   */
  goToConnect: () => {
    navigationHelper.navigate('/connect');
  },

  /**
   * Navigate to delegate page
   */
  goToDelegate: () => {
    navigationHelper.navigate('/admin/delegate');
  },

  /**
   * Navigate to home page
   */
  goToHome: () => {
    navigationHelper.navigate('/');
  },

  /**
   * Check if can go back
   */
  canGoBack: () => {
    const service = getUINavigationService();
    return service.canGoBack();
  }
};

// Re-export types for convenience
export type {
  UINavigationService,
  UINavigationHook,
  UILocationHook,
  UINavigationConfig,
  UINavigationOptions,
  UINavigationState
} from '@johnqh/design-system';