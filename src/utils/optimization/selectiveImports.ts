/**
 * Selective imports for UI libraries to improve tree-shaking
 * Import only the specific components we use instead of entire libraries
 */

// Type declarations for optional packages (for future use)
// These are placeholders for conditional loading features
export const PACKAGE_FLAGS = {
  radix: typeof window !== 'undefined',
  crypto: typeof crypto !== 'undefined', 
  firebase: false // placeholder for firebase detection
} as const;

// Radix UI selective imports
export const loadRadixComponents = async () => {
  // Only import the specific Radix components we actually use
  try {
    const [
      Dialog,
      Popover,
      Tooltip,
      Select,
      DropdownMenu
    ] = await Promise.all([
      import('@radix-ui/react-dialog'),
      import('@radix-ui/react-popover'), 
      import('@radix-ui/react-tooltip'),
      import('@radix-ui/react-select'),
      import('@radix-ui/react-dropdown-menu')
    ]);

    return {
      Dialog: Dialog.Root,
      DialogContent: Dialog.Content,
      DialogTrigger: Dialog.Trigger,
      DialogTitle: Dialog.Title,
      DialogDescription: Dialog.Description,
      Popover: Popover.Root,
      PopoverContent: Popover.Content,
      PopoverTrigger: Popover.Trigger,
      Tooltip: Tooltip.Provider,
      TooltipContent: Tooltip.Content,
      TooltipTrigger: Tooltip.Trigger,
      Select: Select.Root,
      SelectContent: Select.Content,
      SelectItem: Select.Item,
      SelectTrigger: Select.Trigger,
      SelectValue: Select.Value,
      DropdownMenu: DropdownMenu.Root,
      DropdownMenuContent: DropdownMenu.Content,
      DropdownMenuItem: DropdownMenu.Item,
      DropdownMenuTrigger: DropdownMenu.Trigger
    };
  } catch (error) {
    console.warn('Radix UI components not available:', error);
    return {};
  }
};

// Heroicons selective imports - import only used icons
export const loadHeroicons = async () => {
  // Import only the specific icons we use instead of the entire library
  const [
    { ChevronDownIcon },
    { ChevronRightIcon },
    { HomeIcon },
    { UserIcon },
    { CogIcon },
    { InboxIcon },
    { PlusIcon },
    { XMarkIcon },
    { CheckIcon },
    { ExclamationTriangleIcon },
    { InformationCircleIcon },
    { ScaleIcon },
    { BuildingLibraryIcon },
    { CurrencyDollarIcon },
    { GlobeAltIcon }
  ] = await Promise.all([
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline'),
    import('@heroicons/react/24/outline')
  ]);

  return {
    ChevronDownIcon,
    ChevronRightIcon,
    HomeIcon,
    UserIcon,
    CogIcon,
    InboxIcon,
    PlusIcon,
    XMarkIcon,
    CheckIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    ScaleIcon,
    BuildingLibraryIcon,
    CurrencyDollarIcon,
    GlobeAltIcon
  };
};

// Crypto utilities selective imports
export const loadCryptoUtils = async () => {
  // Load only needed crypto utilities
  try {
    const { secp256k1 } = await import('@noble/curves/secp256k1');
    
    // Use sha3 instead of keccak256 if needed
    const { sha3_256 } = await import('@noble/hashes/sha3');

    return { sha3_256, secp256k1 };
  } catch (error) {
    console.warn('Crypto utilities not available:', error);
    return { sha3_256: null, secp256k1: null };
  }
};

// Firebase selective imports
export const loadFirebaseComponents = async () => {
  // Import only Firebase modules we use
  try {
    const [
      { getApps, initializeApp },
      { getAuth },
      { getAnalytics }
    ] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
      import('firebase/analytics')
    ]);

    return {
      getApps,
      initializeApp,
      getAuth,
      getAnalytics
    };
  } catch (error) {
    console.warn('Firebase not available:', error);
    return {
      getApps: null,
      initializeApp: null,
      getAuth: null,
      getAnalytics: null
    };
  }
};