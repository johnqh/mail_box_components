/**
 * Main Variant Resolver for Mail Box Components
 * Simple, robust, platform-agnostic variant system
 */

// Import with fallback handling
let designSystemVariants: any;
let createQuickVariants: any;

try {
  const designSystem = require("@johnqh/design-system");
  designSystemVariants = designSystem.variants;
  createQuickVariants = designSystem.createQuickVariants;
} catch (error) {
  console.warn('Failed to import design system, using fallbacks:', error);
  designSystemVariants = {};
  createQuickVariants = null;
}

// Create the main variant resolver with fallback handling
let v: any = {};
try {
  if (createQuickVariants && designSystemVariants) {
    v = createQuickVariants(designSystemVariants);
  } else {
    // Fallback if createQuickVariants is not available
    v = designSystemVariants || {};
  }
} catch (error) {
  console.warn('Failed to create quick variants, using fallback:', error);
  v = designSystemVariants || {};
}

// Add missing overlays variants for backward compatibility
if (!v.overlays && !designSystemVariants?.overlays) {
  v.overlays = {
    modal: {
      backdrop: () => "fixed inset-0 bg-black/50 z-50",
      container: () => "fixed inset-0 z-50 flex items-center justify-center p-4",
      content: () => "relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-auto",
      small: () => "w-full max-w-sm",
      medium: () => "w-full max-w-md",
      large: () => "w-full max-w-lg",
      extraLarge: () => "w-full max-w-4xl",
      fullWidth: () => "w-full max-w-none mx-4",
      header: () => "flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700",
      title: () => "text-lg font-semibold text-gray-900 dark:text-white",
      closeButton: () => "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
      body: () => "p-6",
      footer: () => "flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700"
    },
    dropdown: {
      container: () => "relative",
      trigger: () => "cursor-pointer",
      menu: () => "absolute z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg",
      menuLeft: () => "left-0",
      menuRight: () => "right-0",
      menuBottom: () => "top-full",
      itemContainer: () => "py-1",
      item: () => "flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer",
      itemDisabled: () => "flex items-center px-4 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed",
      itemIcon: () => "w-4 h-4 mr-2"
    },
    loading: {
      backdrop: () => "fixed inset-0 bg-white/80 dark:bg-gray-900/80 z-50 flex items-center justify-center",
      container: () => "flex flex-col items-center gap-4 p-8",
      spinner: () => "text-blue-600 dark:text-blue-400",
      text: () => "text-sm text-gray-600 dark:text-gray-400"
    }
  };
}

// Ensure loading variants exist with proper structure
if (!v.loading || !v.loading.spinner) {
  if (!v.loading) v.loading = {};
  v.loading.spinner = {
    default: () => "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 w-6 h-6",
    white: () => "animate-spin rounded-full border-2 border-gray-300 border-t-white w-6 h-6",
    success: () => "animate-spin rounded-full border-2 border-gray-300 border-t-green-600 w-6 h-6",
    warning: () => "animate-spin rounded-full border-2 border-gray-300 border-t-yellow-600 w-6 h-6",
    error: () => "animate-spin rounded-full border-2 border-gray-300 border-t-red-600 w-6 h-6"
  };
}

// Add missing quick variant functions if they don't exist
if (!v.alert || typeof v.alert !== 'function') {
  v.alert = (variant: string) => {
    const alertVariants: any = {
      info: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
      success: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
      warning: "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
      error: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
      default: "bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200"
    };
    return alertVariants[variant] || alertVariants.default;
  };
}

if (!v.button || typeof v.button !== 'function') {
  v.button = (variant: string, size?: string) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
    
    const variantClasses: any = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
      outline: "border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800",
      destructive: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700",
      ghost: "text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800",
      link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
    };
    
    const sizeClasses: any = {
      sm: "h-8 px-3 text-sm",
      default: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-lg",
      icon: "h-10 w-10"
    };
    
    return `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size || 'default']}`;
  };
}

if (!v.nested || typeof v.nested !== 'function') {
  v.nested = (path: string) => {
    // Simple fallback for nested paths
    if (path.includes('button.gradient')) {
      const variant = path.split('.').pop();
      const gradientClasses: any = {
        primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
        success: "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700",
        secondary: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800"
      };
      return `inline-flex items-center justify-center rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-4 py-2 ${gradientClasses[variant || 'primary']}`;
    }
    return ""; // Default fallback
  };
}

// Add icon variants
if (!v.icon) {
  v.icon = {
    variant: {
      default: {
        sm: () => "w-4 h-4 text-blue-500",
        md: () => "w-5 h-5 text-blue-500", 
        lg: () => "w-6 h-6 text-blue-500"
      },
      warning: {
        sm: () => "w-4 h-4 text-yellow-500",
        md: () => "w-5 h-5 text-yellow-500",
        lg: () => "w-6 h-6 text-yellow-500"
      },
      error: {
        sm: () => "w-4 h-4 text-red-500",
        md: () => "w-5 h-5 text-red-500",
        lg: () => "w-6 h-6 text-red-500"
      },
      success: {
        sm: () => "w-4 h-4 text-green-500",
        md: () => "w-5 h-5 text-green-500",
        lg: () => "w-6 h-6 text-green-500"
      },
      muted: {
        sm: () => "w-4 h-4 text-gray-400",
        md: () => "w-5 h-5 text-gray-400",
        lg: () => "w-6 h-6 text-gray-400"
      }
    }
  };
}

// Add badge variants with proper function signatures
if (!v.badge) {
  v.badge = {
    success: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    warning: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    error: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    primary: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    default: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    verified: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    connected: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    disconnected: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    pending: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    ethereum: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    solana: () => "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    small: (variant?: string) => {
      const variantClasses: any = {
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        verified: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        connected: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        disconnected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        ethereum: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        solana: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      };
      return `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant || 'success']}`;
    },
    large: (variant?: string) => {
      const variantClasses: any = {
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        verified: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        connected: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        disconnected: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        ethereum: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        solana: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      };
      return `inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantClasses[variant || 'success']}`;
    }
  };
}

// Add tabs variants and add them to the variants object
if (!v.tabs) {
  v.tabs = {
    list: () => "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
    trigger: () => "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50",
    content: () => "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
  };
}

// Note: variants is assigned below, so we don't need to modify it here

// Add input function
if (!v.input || typeof v.input !== 'function') {
  v.input = (variant: string) => {
    const inputVariants: any = {
      default: "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400",
      error: "flex h-10 w-full rounded-md border border-red-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
    };
    return inputVariants[variant] || inputVariants.default;
  };
}

// Fix modal size variants  
v.overlays.modal.large = () => "w-full max-w-2xl";

// Add navigation variants for tabs
if (!v.navigation) {
  v.navigation = {
    tabs: v.tabs
  };
}

export { v };

// Export for backward compatibility if needed
export const variants = v;