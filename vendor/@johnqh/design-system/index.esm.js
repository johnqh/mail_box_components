const r = {
  // Blue palette - primary brand color
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554"
  },
  // Purple palette - secondary brand color
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764"
  },
  // Neutral palette - backgrounds, text, borders
  neutral: {
    0: "#ffffff",
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712"
  },
  // Semantic state colors
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a"
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407"
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03"
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16"
  },
  // Web3 specific colors
  web3: {
    ethereum: {
      light: "#627eea",
      DEFAULT: "#627eea",
      dark: "#4c63d2"
    },
    solana: {
      light: "#9945ff",
      DEFAULT: "#9945ff",
      dark: "#7d37d9"
    },
    polygon: {
      light: "#8247e5",
      DEFAULT: "#8247e5",
      dark: "#6a3bc0"
    },
    bitcoin: {
      light: "#f7931a",
      DEFAULT: "#f7931a",
      dark: "#e07f00"
    },
    binance: {
      light: "#f3ba2f",
      DEFAULT: "#f3ba2f",
      dark: "#d4a423"
    },
    cardano: {
      light: "#0033ad",
      DEFAULT: "#0033ad",
      dark: "#002488"
    },
    avalanche: {
      light: "#e84142",
      DEFAULT: "#e84142",
      dark: "#d1383a"
    },
    fantom: {
      light: "#1969ff",
      DEFAULT: "#1969ff",
      dark: "#0052ff"
    },
    arbitrum: {
      light: "#2d374b",
      DEFAULT: "#2d374b",
      dark: "#1e2532"
    },
    optimism: {
      light: "#ff0420",
      DEFAULT: "#ff0420",
      dark: "#e6031c"
    },
    chainlink: {
      light: "#375bd2",
      DEFAULT: "#375bd2",
      dark: "#2d4bb5"
    },
    cosmos: {
      light: "#2e3148",
      DEFAULT: "#2e3148",
      dark: "#1f2030"
    },
    polkadot: {
      light: "#e6007a",
      DEFAULT: "#e6007a",
      dark: "#cc006e"
    }
  }
}, u = {
  // Text colors
  text: {
    primary: {
      light: r.neutral[900],
      dark: r.neutral[0]
    },
    secondary: {
      light: r.neutral[600],
      dark: r.neutral[400]
    },
    tertiary: {
      light: r.neutral[500],
      dark: r.neutral[500]
    },
    disabled: {
      light: r.neutral[400],
      dark: r.neutral[600]
    },
    inverse: {
      light: r.neutral[0],
      dark: r.neutral[900]
    },
    link: {
      light: r.blue[600],
      dark: r.blue[400]
    },
    linkHover: {
      light: r.blue[700],
      dark: r.blue[300]
    }
  },
  // Background colors
  background: {
    primary: {
      light: r.neutral[0],
      dark: r.neutral[900]
    },
    secondary: {
      light: r.neutral[50],
      dark: r.neutral[800]
    },
    tertiary: {
      light: r.neutral[100],
      dark: r.neutral[700]
    },
    elevated: {
      light: r.neutral[0],
      dark: r.neutral[800]
    },
    overlay: {
      light: "rgba(0, 0, 0, 0.5)",
      dark: "rgba(0, 0, 0, 0.7)"
    },
    page: {
      light: r.neutral[50],
      dark: r.neutral[950]
    }
  },
  // Border colors
  border: {
    primary: {
      light: r.neutral[200],
      dark: r.neutral[700]
    },
    secondary: {
      light: r.neutral[100],
      dark: r.neutral[800]
    },
    focus: {
      light: r.blue[500],
      dark: r.blue[400]
    },
    error: {
      light: r.red[300],
      dark: r.red[700]
    }
  },
  // Brand colors
  brand: {
    primary: {
      light: r.blue[600],
      dark: r.blue[500]
    },
    primaryHover: {
      light: r.blue[700],
      dark: r.blue[400]
    },
    secondary: {
      light: r.purple[600],
      dark: r.purple[500]
    },
    secondaryHover: {
      light: r.purple[700],
      dark: r.purple[400]
    }
  },
  // State colors
  state: {
    success: {
      light: r.green[600],
      dark: r.green[500]
    },
    successBg: {
      light: r.green[100],
      dark: `${r.green[900]}/30`
    },
    successText: {
      light: r.green[700],
      dark: r.green[300]
    },
    warning: {
      light: r.amber[500],
      dark: r.amber[400]
    },
    warningBg: {
      light: r.amber[100],
      dark: `${r.amber[900]}/30`
    },
    warningText: {
      light: r.amber[700],
      dark: r.amber[300]
    },
    error: {
      light: r.red[600],
      dark: r.red[500]
    },
    errorBg: {
      light: r.red[100],
      dark: `${r.red[900]}/30`
    },
    errorText: {
      light: r.red[700],
      dark: r.red[300]
    },
    info: {
      light: r.blue[600],
      dark: r.blue[500]
    },
    infoBg: {
      light: r.blue[100],
      dark: `${r.blue[900]}/30`
    },
    infoText: {
      light: r.blue[700],
      dark: r.blue[300]
    },
    selected: {
      light: r.blue[100],
      dark: `${r.blue[900]}/30`
    }
  },
  // Action colors
  action: {
    primary: {
      light: r.blue[600],
      dark: r.blue[600]
    },
    primaryHover: {
      light: r.blue[700],
      dark: r.blue[700]
    },
    secondary: {
      light: r.neutral[100],
      dark: r.neutral[800]
    },
    danger: {
      light: r.red[600],
      dark: r.red[600]
    }
  },
  // Web3 specific colors
  web3: {
    ethereum: {
      light: r.web3.ethereum.light,
      dark: r.web3.ethereum.dark
    },
    ethereumBg: {
      light: `${r.blue[100]}`,
      dark: `${r.blue[900]}/30`
    },
    solana: {
      light: r.web3.solana.light,
      dark: r.web3.solana.dark
    },
    solanaBg: {
      light: `${r.purple[100]}`,
      dark: `${r.purple[900]}/30`
    },
    polygon: {
      light: r.web3.polygon.light,
      dark: r.web3.polygon.dark
    },
    polygonBg: {
      light: `${r.purple[50]}`,
      dark: `${r.purple[900]}/20`
    },
    bitcoin: {
      light: r.web3.bitcoin.light,
      dark: r.web3.bitcoin.dark
    },
    bitcoinBg: {
      light: `${r.orange[100]}`,
      dark: `${r.orange[900]}/30`
    },
    binance: {
      light: r.web3.binance.light,
      dark: r.web3.binance.dark
    },
    binanceBg: {
      light: `${r.amber[100]}`,
      dark: `${r.amber[900]}/30`
    },
    cardano: {
      light: r.web3.cardano.light,
      dark: r.web3.cardano.dark
    },
    cardanoBg: {
      light: `${r.blue[50]}`,
      dark: `${r.blue[900]}/20`
    },
    avalanche: {
      light: r.web3.avalanche.light,
      dark: r.web3.avalanche.dark
    },
    avalancheBg: {
      light: `${r.red[100]}`,
      dark: `${r.red[900]}/30`
    },
    arbitrum: {
      light: r.web3.arbitrum.light,
      dark: r.web3.arbitrum.dark
    },
    arbitrumBg: {
      light: `${r.neutral[100]}`,
      dark: `${r.neutral[800]}/50`
    },
    optimism: {
      light: r.web3.optimism.light,
      dark: r.web3.optimism.dark
    },
    optimismBg: {
      light: `${r.red[50]}`,
      dark: `${r.red[900]}/20`
    }
  }
}, g = {
  button: {
    // Primary button - main brand actions
    primary: {
      base: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-transparent",
      dark: "dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:text-white",
      focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
    },
    // Secondary button - alternative actions
    secondary: {
      base: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 border-transparent",
      dark: "dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 dark:text-gray-50",
      focus: "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed"
    },
    // Outline button - secondary emphasis
    outline: {
      base: "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-900 border-gray-300",
      dark: "dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-50 dark:border-gray-600",
      focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed"
    },
    // Ghost button - minimal emphasis
    ghost: {
      base: "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent",
      dark: "dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300",
      focus: "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed"
    },
    // Destructive button - dangerous actions
    destructive: {
      base: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-transparent",
      dark: "dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800 dark:text-white",
      focus: "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed"
    },
    // Success button - positive actions
    success: {
      base: "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-transparent",
      dark: "dark:bg-green-600 dark:hover:bg-green-700 dark:active:bg-green-800 dark:text-white",
      focus: "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed"
    },
    // Link button - text-like appearance
    link: {
      base: "bg-transparent hover:bg-transparent active:bg-transparent text-blue-600 border-transparent underline-offset-4 hover:underline",
      dark: "dark:text-blue-400",
      focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
    },
    // Gradient variants for special emphasis
    gradient: {
      primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-transparent shadow-lg hover:shadow-xl",
      secondary: "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border-transparent",
      success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-transparent"
    }
  },
  card: {
    // Default card styling
    default: {
      base: "bg-white border-gray-200",
      dark: "dark:bg-gray-800 dark:border-gray-700",
      hover: "hover:shadow-md transition-shadow duration-200"
    },
    // Elevated card with shadow
    elevated: {
      base: "bg-white shadow-sm border-gray-200",
      dark: "dark:bg-gray-800 dark:border-gray-700",
      hover: "hover:shadow-lg transition-shadow duration-200"
    },
    // Interactive card that can be clicked
    interactive: {
      base: "bg-white border-gray-200 cursor-pointer",
      dark: "dark:bg-gray-800 dark:border-gray-700",
      hover: "hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-700 transition-all duration-200",
      focus: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    },
    // Success state card
    success: {
      base: "bg-green-50 border-green-200",
      dark: "dark:bg-green-900/20 dark:border-green-800",
      text: "text-green-800 dark:text-green-200"
    },
    // Warning state card
    warning: {
      base: "bg-amber-50 border-amber-200",
      dark: "dark:bg-amber-900/20 dark:border-amber-800",
      text: "text-amber-800 dark:text-amber-200"
    },
    // Error state card
    error: {
      base: "bg-red-50 border-red-200",
      dark: "dark:bg-red-900/20 dark:border-red-800",
      text: "text-red-800 dark:text-red-200"
    }
  },
  badge: {
    // Default badge
    default: {
      base: "bg-gray-100 text-gray-800",
      dark: "dark:bg-gray-800 dark:text-gray-300"
    },
    // Primary badge
    primary: {
      base: "bg-blue-100 text-blue-800",
      dark: "dark:bg-blue-900/30 dark:text-blue-300"
    },
    // Success badge
    success: {
      base: "bg-green-100 text-green-800",
      dark: "dark:bg-green-900/30 dark:text-green-300"
    },
    // Warning badge
    warning: {
      base: "bg-amber-100 text-amber-800",
      dark: "dark:bg-amber-900/30 dark:text-amber-300"
    },
    // Error badge
    error: {
      base: "bg-red-100 text-red-800",
      dark: "dark:bg-red-900/30 dark:text-red-300"
    },
    // Web3 specific badges
    ethereum: {
      base: "bg-blue-100 text-blue-800",
      dark: "dark:bg-blue-900/30 dark:text-blue-300"
    },
    solana: {
      base: "bg-purple-100 text-purple-800",
      dark: "dark:bg-purple-900/30 dark:text-purple-300"
    },
    polygon: {
      base: "bg-purple-50 text-purple-800",
      dark: "dark:bg-purple-900/20 dark:text-purple-300"
    },
    bitcoin: {
      base: "bg-orange-100 text-orange-800",
      dark: "dark:bg-orange-900/30 dark:text-orange-300"
    },
    binance: {
      base: "bg-amber-100 text-amber-800",
      dark: "dark:bg-amber-900/30 dark:text-amber-300"
    },
    cardano: {
      base: "bg-blue-50 text-blue-900",
      dark: "dark:bg-blue-900/20 dark:text-blue-200"
    },
    avalanche: {
      base: "bg-red-100 text-red-800",
      dark: "dark:bg-red-900/30 dark:text-red-300"
    },
    arbitrum: {
      base: "bg-gray-100 text-gray-800",
      dark: "dark:bg-gray-800/50 dark:text-gray-300"
    },
    optimism: {
      base: "bg-red-50 text-red-900",
      dark: "dark:bg-red-900/20 dark:text-red-200"
    }
  },
  input: {
    // Default input styling
    default: {
      base: "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500",
      dark: "dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400",
      focus: "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400",
      error: "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700"
    },
    // Search input styling
    search: {
      base: "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500",
      dark: "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400",
      focus: "focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:bg-gray-900"
    }
  },
  alert: {
    // Info alert
    info: {
      base: "bg-blue-50 border-blue-200 text-blue-800",
      dark: "dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
      icon: "text-blue-600 dark:text-blue-400"
    },
    // Success alert
    success: {
      base: "bg-green-50 border-green-200 text-green-800",
      dark: "dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
      icon: "text-green-600 dark:text-green-400"
    },
    // Warning alert
    warning: {
      base: "bg-amber-50 border-amber-200 text-amber-800",
      dark: "dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200",
      icon: "text-amber-600 dark:text-amber-400"
    },
    // Error alert
    error: {
      base: "bg-red-50 border-red-200 text-red-800",
      dark: "dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
      icon: "text-red-600 dark:text-red-400"
    }
  }
}, x = (i, t, a = ["focus"]) => {
  const d = g[i][t];
  return d ? [
    d.base,
    d.dark,
    ...a.map((l) => d[l]).filter(Boolean)
  ].join(" ") : (console.warn(`Color variant '${t}' not found for component '${i}'`), "");
}, c = (i, t, a, o) => {
  const d = [`bg-${i}`, `text-${t}`];
  return a && d.push(`border-${a}`), o?.hover && (o.hover.background && d.push(`hover:bg-${o.hover.background}`), o.hover.text && d.push(`hover:text-${o.hover.text}`), o.hover.border && d.push(`hover:border-${o.hover.border}`)), o?.focus?.ring && d.push(`focus:ring-2 focus:ring-${o.focus.ring}`), o?.dark && (o.dark.background && d.push(`dark:bg-${o.dark.background}`), o.dark.text && d.push(`dark:text-${o.dark.text}`), o.dark.border && d.push(`dark:border-${o.dark.border}`)), d.join(" ");
}, p = {
  // Raw color palette (use sparingly, prefer semantic tokens)
  raw: r,
  // Semantic color tokens (recommended for most use cases)
  semantic: u,
  // Component-specific colors (use for components)
  component: g,
  // Utilities
  utils: {
    getColorClasses: x,
    buildColorClass: c
  }
}, e = {
  // Spacing scale (based on 4px grid)
  spacing: {
    xs: "p-1",
    // 4px
    sm: "p-2",
    // 8px
    md: "p-4",
    // 16px
    lg: "p-6",
    // 24px
    xl: "p-8",
    // 32px
    "2xl": "p-12",
    // 48px
    "3xl": "p-16",
    // 64px
    "4xl": "p-20",
    // 80px
    "5xl": "p-24"
    // 96px
  },
  // Margin utilities
  margin: {
    xs: "m-1",
    sm: "m-2",
    md: "m-4",
    lg: "m-6",
    xl: "m-8",
    "2xl": "m-12",
    "3xl": "m-16",
    "4xl": "m-20",
    "5xl": "m-24"
  },
  // Padding utilities  
  padding: {
    xs: "p-1",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
    "2xl": "p-12",
    "3xl": "p-16"
  },
  // Gap utilities for flex/grid
  gap: {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
    "2xl": "gap-12",
    "3xl": "gap-16"
  },
  // Border radius scale
  radius: {
    none: "rounded-none",
    sm: "rounded-sm",
    // 2px
    md: "rounded-md",
    // 6px
    lg: "rounded-lg",
    // 8px
    xl: "rounded-xl",
    // 12px
    "2xl": "rounded-2xl",
    // 16px
    "3xl": "rounded-3xl",
    // 24px
    full: "rounded-full"
  },
  // Shadow scale
  shadow: {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl"
  },
  // Typography scale
  typography: {
    // Font families
    family: {
      // Sans-serif fonts (default for UI)
      sans: "font-sans",
      // Inter, system-ui, sans-serif
      // Serif fonts (for editorial content)
      serif: "font-serif",
      // ui-serif, Georgia, serif
      // Monospace fonts (for code)
      mono: "font-mono",
      // ui-monospace, Menlo, Monaco, Consolas
      // Display fonts (for headings)
      display: "font-sans",
      // Same as sans for consistency
      // Body text font
      body: "font-sans"
      // Same as sans for consistency
    },
    // Font sizes with semantic names
    size: {
      // Micro text (10px)
      micro: "text-[10px]",
      // Extra small (12px) 
      xs: "text-xs",
      // Small (14px)
      sm: "text-sm",
      // Base/Body (16px) - Default browser size
      base: "text-base",
      md: "text-base",
      // Alias for base
      // Large (18px)
      lg: "text-lg",
      // Extra large (20px)
      xl: "text-xl",
      // 2X large (24px)
      "2xl": "text-2xl",
      // 3X large (30px) 
      "3xl": "text-3xl",
      // 4X large (36px)
      "4xl": "text-4xl",
      // 5X large (48px)
      "5xl": "text-5xl",
      // 6X large (60px)
      "6xl": "text-6xl",
      // 7X large (72px)
      "7xl": "text-7xl",
      // 8X large (96px)
      "8xl": "text-8xl",
      // 9X large (128px)
      "9xl": "text-9xl"
    },
    // Semantic font sizes for specific use cases
    semantic: {
      // Caption text
      caption: "text-xs",
      // 12px
      // Small body text
      small: "text-sm",
      // 14px
      // Regular body text
      body: "text-base",
      // 16px
      // Large body text
      bodyLarge: "text-lg",
      // 18px
      // Subheading text
      subheading: "text-xl",
      // 20px
      // Heading 6
      h6: "text-base",
      // 16px
      // Heading 5
      h5: "text-lg",
      // 18px
      // Heading 4
      h4: "text-xl",
      // 20px
      // Heading 3
      h3: "text-2xl",
      // 24px
      // Heading 2
      h2: "text-3xl",
      // 30px
      // Heading 1
      h1: "text-4xl",
      // 36px
      // Display text (hero headings)
      display: "text-6xl",
      // 60px
      // Giant display text
      hero: "text-8xl"
      // 96px
    },
    // Font weights with semantic names
    weight: {
      // Numeric weights
      thin: "font-thin",
      // 100
      extralight: "font-extralight",
      // 200
      light: "font-light",
      // 300
      normal: "font-normal",
      // 400
      medium: "font-medium",
      // 500
      semibold: "font-semibold",
      // 600
      bold: "font-bold",
      // 700
      extrabold: "font-extrabold",
      // 800
      black: "font-black",
      // 900
      // Semantic weights
      body: "font-normal",
      // For body text
      emphasis: "font-medium",
      // For emphasized text
      strong: "font-semibold",
      // For strong text
      heading: "font-bold",
      // For headings
      display: "font-extrabold"
      // For display text
    },
    // Font styles
    style: {
      normal: "not-italic",
      italic: "italic",
      oblique: "italic"
      // Maps to italic (closest approximation)
    },
    // Text decoration
    decoration: {
      none: "no-underline",
      underline: "underline",
      overline: "overline",
      lineThrough: "line-through"
    },
    // Text decoration style
    decorationStyle: {
      solid: "decoration-solid",
      double: "decoration-double",
      dotted: "decoration-dotted",
      dashed: "decoration-dashed",
      wavy: "decoration-wavy"
    },
    // Text decoration thickness
    decorationThickness: {
      auto: "decoration-auto",
      fromFont: "decoration-from-font",
      thin: "decoration-1",
      medium: "decoration-2",
      thick: "decoration-4"
    },
    // Text underline offset
    underlineOffset: {
      auto: "underline-offset-auto",
      small: "underline-offset-1",
      medium: "underline-offset-2",
      large: "underline-offset-4",
      xl: "underline-offset-8"
    },
    // Line heights with semantic names
    leading: {
      // Numeric values
      none: "leading-none",
      // 1
      tight: "leading-tight",
      // 1.25
      snug: "leading-snug",
      // 1.375
      normal: "leading-normal",
      // 1.5
      relaxed: "leading-relaxed",
      // 1.625
      loose: "leading-loose",
      // 2
      // Semantic values
      heading: "leading-tight",
      // For headings
      body: "leading-relaxed",
      // For body text
      caption: "leading-normal",
      // For captions
      display: "leading-none"
      // For display text
    },
    // Letter spacing with semantic names
    tracking: {
      // Numeric values
      tighter: "tracking-tighter",
      // -0.05em
      tight: "tracking-tight",
      // -0.025em
      normal: "tracking-normal",
      // 0em
      wide: "tracking-wide",
      // 0.025em
      wider: "tracking-wider",
      // 0.05em
      widest: "tracking-widest",
      // 0.1em
      // Semantic values
      heading: "tracking-tight",
      // For headings
      body: "tracking-normal",
      // For body text
      caption: "tracking-normal",
      // For captions
      button: "tracking-wide",
      // For button text
      uppercase: "tracking-wider"
      // For uppercase text
    },
    // Text transform
    transform: {
      none: "normal-case",
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize"
    },
    // Text alignment
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
      start: "text-start",
      end: "text-end"
    },
    // Vertical alignment
    verticalAlign: {
      baseline: "align-baseline",
      top: "align-top",
      middle: "align-middle",
      bottom: "align-bottom",
      textTop: "align-text-top",
      textBottom: "align-text-bottom",
      sub: "align-sub",
      super: "align-super"
    },
    // White space handling
    whitespace: {
      normal: "whitespace-normal",
      nowrap: "whitespace-nowrap",
      pre: "whitespace-pre",
      preLine: "whitespace-pre-line",
      preWrap: "whitespace-pre-wrap",
      break: "whitespace-break-spaces"
    },
    // Word breaking
    wordBreak: {
      normal: "break-normal",
      words: "break-words",
      all: "break-all",
      keep: "break-keep"
    },
    // Text overflow
    overflow: {
      clip: "text-clip",
      ellipsis: "text-ellipsis"
    },
    // Text indent
    indent: {
      none: "indent-0",
      sm: "indent-1",
      md: "indent-4",
      lg: "indent-8"
    }
  },
  // Animation durations
  animation: {
    none: "duration-0",
    fastest: "duration-75",
    fast: "duration-150",
    normal: "duration-200",
    slow: "duration-300",
    slower: "duration-500",
    slowest: "duration-700"
  },
  // Animation easing
  ease: {
    linear: "ease-linear",
    in: "ease-in",
    out: "ease-out",
    inOut: "ease-in-out"
  },
  // Z-index scale
  zIndex: {
    auto: "z-auto",
    base: "z-0",
    docked: "z-10",
    dropdown: "z-20",
    sticky: "z-30",
    banner: "z-40",
    overlay: "z-50",
    modal: "z-60",
    popover: "z-70",
    skipLink: "z-80",
    toast: "z-90",
    tooltip: "z-100"
  },
  // Breakpoints (for reference - these are handled by Tailwind)
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },
  // Grid columns
  grid: {
    cols1: "grid-cols-1",
    cols2: "grid-cols-2",
    cols3: "grid-cols-3",
    cols4: "grid-cols-4",
    cols5: "grid-cols-5",
    cols6: "grid-cols-6",
    cols12: "grid-cols-12"
  },
  // Responsive grid patterns
  gridResponsive: {
    responsive2: "grid-cols-1 md:grid-cols-2",
    responsive3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    responsive4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    responsive6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
  },
  // Flex utilities
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-center justify-start",
    end: "flex items-center justify-end",
    col: "flex flex-col",
    colCenter: "flex flex-col items-center justify-center",
    wrap: "flex flex-wrap"
  },
  // Common width utilities
  width: {
    full: "w-full",
    screen: "w-screen",
    auto: "w-auto",
    fit: "w-fit",
    container: "w-full max-w-7xl mx-auto",
    containerSm: "w-full max-w-3xl mx-auto",
    containerLg: "w-full max-w-full mx-auto"
  },
  // Common height utilities
  height: {
    full: "h-full",
    screen: "h-screen",
    auto: "h-auto",
    fit: "h-fit",
    min: "min-h-0",
    minScreen: "min-h-screen"
  }
}, f = {
  // =============================================================================
  // HEADINGS
  // =============================================================================
  heading: {
    // Display headings (hero sections, landing pages)
    display: {
      // Massive display text (128px)
      hero: () => `${e.typography.family.display} ${e.typography.semantic.hero} ${e.typography.weight.display} ${e.typography.leading.display} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
      // Large display text (96px)
      xl: () => `${e.typography.family.display} text-7xl ${e.typography.weight.display} ${e.typography.leading.display} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
      // Medium display text (72px)
      lg: () => `${e.typography.family.display} text-6xl ${e.typography.weight.bold} ${e.typography.leading.display} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
      // Small display text (60px)
      md: () => `${e.typography.family.display} text-5xl ${e.typography.weight.bold} ${e.typography.leading.tight} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
      // Extra small display text (48px)
      sm: () => `${e.typography.family.display} text-4xl ${e.typography.weight.bold} ${e.typography.leading.tight} ${e.typography.tracking.heading} text-gray-900 dark:text-white`
    },
    // Standard headings (H1-H6)
    h1: () => `${e.typography.family.sans} ${e.typography.semantic.h1} ${e.typography.weight.heading} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
    h2: () => `${e.typography.family.sans} ${e.typography.semantic.h2} ${e.typography.weight.heading} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
    h3: () => `${e.typography.family.sans} ${e.typography.semantic.h3} ${e.typography.weight.heading} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
    h4: () => `${e.typography.family.sans} ${e.typography.semantic.h4} ${e.typography.weight.semibold} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
    h5: () => `${e.typography.family.sans} ${e.typography.semantic.h5} ${e.typography.weight.semibold} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
    h6: () => `${e.typography.family.sans} ${e.typography.semantic.h6} ${e.typography.weight.semibold} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
    // Responsive headings that scale with screen size
    responsive: {
      h1: () => `${e.typography.family.sans} text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${e.typography.weight.heading} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
      h2: () => `${e.typography.family.sans} text-xl sm:text-2xl md:text-3xl lg:text-4xl ${e.typography.weight.heading} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
      h3: () => `${e.typography.family.sans} text-lg sm:text-xl md:text-2xl lg:text-3xl ${e.typography.weight.semibold} ${e.typography.leading.heading} ${e.typography.tracking.heading} text-gray-900 dark:text-white`,
      display: () => `${e.typography.family.display} text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl ${e.typography.weight.display} ${e.typography.leading.display} ${e.typography.tracking.heading} text-gray-900 dark:text-white`
    }
  },
  // =============================================================================
  // BODY TEXT
  // =============================================================================
  body: {
    // Large body text (18px)
    xl: () => `${e.typography.family.body} ${e.typography.semantic.bodyLarge} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    // Regular body text (16px) - Default
    lg: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    // Medium body text (16px) - Alias for lg
    md: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    // Small body text (14px)
    sm: () => `${e.typography.family.body} ${e.typography.semantic.small} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-600 dark:text-gray-400`,
    // Extra small body text (12px)
    xs: () => `${e.typography.family.body} ${e.typography.semantic.caption} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-600 dark:text-gray-400`,
    // Emphasized/strong body text variants
    strong: {
      xl: () => `${e.typography.family.body} ${e.typography.semantic.bodyLarge} ${e.typography.weight.strong} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-900 dark:text-white`,
      lg: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.strong} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-900 dark:text-white`,
      md: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.strong} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-900 dark:text-white`,
      sm: () => `${e.typography.family.body} ${e.typography.semantic.small} ${e.typography.weight.strong} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-900 dark:text-white`
    },
    // Emphasized/medium body text variants
    emphasis: {
      xl: () => `${e.typography.family.body} ${e.typography.semantic.bodyLarge} ${e.typography.weight.emphasis} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-900 dark:text-white`,
      lg: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.emphasis} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-900 dark:text-white`,
      md: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.emphasis} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-900 dark:text-white`,
      sm: () => `${e.typography.family.body} ${e.typography.semantic.small} ${e.typography.weight.emphasis} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-900 dark:text-white`
    },
    // Muted/secondary body text variants
    muted: {
      xl: () => `${e.typography.family.body} ${e.typography.semantic.bodyLarge} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-600 dark:text-gray-400`,
      lg: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-600 dark:text-gray-400`,
      md: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-600 dark:text-gray-400`,
      sm: () => `${e.typography.family.body} ${e.typography.semantic.small} ${e.typography.weight.body} ${e.typography.leading.body} ${e.typography.tracking.body} text-gray-600 dark:text-gray-400`
    }
  },
  // =============================================================================
  // SPECIALIZED TEXT
  // =============================================================================
  // Caption and small text
  caption: {
    // Default caption (12px)
    default: () => `${e.typography.family.body} ${e.typography.semantic.caption} ${e.typography.weight.body} ${e.typography.leading.caption} ${e.typography.tracking.caption} text-gray-500 dark:text-gray-500`,
    // Emphasized caption
    emphasis: () => `${e.typography.family.body} ${e.typography.semantic.caption} ${e.typography.weight.emphasis} ${e.typography.leading.caption} ${e.typography.tracking.caption} text-gray-600 dark:text-gray-400`,
    // Uppercase caption (for labels)
    uppercase: () => `${e.typography.family.body} ${e.typography.semantic.caption} ${e.typography.weight.emphasis} ${e.typography.leading.caption} ${e.typography.tracking.uppercase} ${e.typography.transform.uppercase} text-gray-500 dark:text-gray-500`
  },
  // Lead text (introduction paragraphs)
  lead: {
    // Large lead text
    lg: () => `${e.typography.family.body} text-xl ${e.typography.weight.body} ${e.typography.leading.relaxed} ${e.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    // Medium lead text
    md: () => `${e.typography.family.body} ${e.typography.semantic.bodyLarge} ${e.typography.weight.body} ${e.typography.leading.relaxed} ${e.typography.tracking.body} text-gray-700 dark:text-gray-300`,
    // Small lead text
    sm: () => `${e.typography.family.body} ${e.typography.semantic.body} ${e.typography.weight.body} ${e.typography.leading.relaxed} ${e.typography.tracking.body} text-gray-700 dark:text-gray-300`
  },
  // Links
  link: {
    // Default link
    default: () => `${e.typography.decoration.underline} ${e.typography.underlineOffset.medium} text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150`,
    // Link without underline
    subtle: () => `${e.typography.decoration.none} text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:${e.typography.decoration.underline} hover:${e.typography.underlineOffset.medium} transition-all duration-150`,
    // Muted link
    muted: () => `${e.typography.decoration.underline} ${e.typography.underlineOffset.medium} text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-150`,
    // External link (with icon space)
    external: () => `${e.typography.decoration.underline} ${e.typography.underlineOffset.medium} text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150 inline-flex items-center gap-1`
  },
  // Code and monospace text
  code: {
    // Inline code
    inline: () => `${e.typography.family.mono} text-sm ${e.typography.weight.medium} px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100`,
    // Code block
    block: () => `${e.typography.family.mono} text-sm ${e.typography.weight.body} ${e.typography.leading.relaxed} p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 overflow-x-auto`,
    // Small inline code
    small: () => `${e.typography.family.mono} text-xs ${e.typography.weight.medium} px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100`
  },
  // UI Labels and form text
  label: {
    // Form labels
    default: () => `${e.typography.family.body} text-sm ${e.typography.weight.emphasis} text-gray-900 dark:text-white`,
    // Required field labels
    required: () => `${e.typography.family.body} text-sm ${e.typography.weight.emphasis} text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500`,
    // Optional field labels
    optional: () => `${e.typography.family.body} text-sm ${e.typography.weight.body} text-gray-600 dark:text-gray-400`,
    // Helper text
    helper: () => `${e.typography.family.body} text-sm ${e.typography.weight.body} text-gray-500 dark:text-gray-500`,
    // Error text
    error: () => `${e.typography.family.body} text-sm ${e.typography.weight.body} text-red-600 dark:text-red-400`,
    // Success text
    success: () => `${e.typography.family.body} text-sm ${e.typography.weight.body} text-green-600 dark:text-green-400`
  },
  // =============================================================================
  // WEB3 SPECIFIC
  // =============================================================================
  web3: {
    // Wallet addresses
    address: () => `${e.typography.family.mono} text-sm ${e.typography.weight.body} text-gray-900 dark:text-white break-all`,
    // Short wallet addresses (truncated)
    addressShort: () => `${e.typography.family.mono} text-sm ${e.typography.weight.body} text-gray-900 dark:text-white`,
    // Transaction hashes
    hash: () => `${e.typography.family.mono} text-xs ${e.typography.weight.body} text-gray-500 dark:text-gray-500 break-all`,
    // Cryptocurrency amounts
    amount: () => `${e.typography.family.mono} text-base ${e.typography.weight.emphasis} text-gray-900 dark:text-white`,
    // Chain names
    chain: () => `${e.typography.family.body} text-sm ${e.typography.weight.emphasis} text-gray-900 dark:text-white`,
    // Token symbols
    symbol: () => `${e.typography.family.body} text-sm ${e.typography.weight.bold} ${e.typography.transform.uppercase} text-gray-900 dark:text-white`
  },
  // =============================================================================
  // UTILITY CLASSES
  // =============================================================================
  // Truncation utilities
  truncate: {
    // Single line truncation
    line: () => `${e.typography.overflow.ellipsis} ${e.typography.whitespace.nowrap} overflow-hidden`,
    // Multi-line truncation (2 lines)
    lines2: () => "line-clamp-2",
    // Multi-line truncation (3 lines)
    lines3: () => "line-clamp-3",
    // Multi-line truncation (4 lines)
    lines4: () => "line-clamp-4"
  },
  // Selection styles
  selection: {
    // Default text selection
    default: () => "selection:bg-blue-200 dark:selection:bg-blue-800 selection:text-blue-900 dark:selection:text-blue-100",
    // Brand colored selection
    brand: () => "selection:bg-purple-200 dark:selection:bg-purple-800 selection:text-purple-900 dark:selection:text-purple-100"
  }
}, m = (i = "body", t = "body", a = "body", o = "text-gray-900 dark:text-white", d = {}) => {
  const {
    leading: n = "body",
    tracking: l = "body",
    transform: b = "none",
    decoration: y = "none"
  } = d;
  return [
    e.typography.family[i],
    e.typography.semantic[t],
    e.typography.weight[a],
    e.typography.leading[n],
    e.typography.tracking[l],
    e.typography.transform[b],
    e.typography.decoration[y],
    o
  ].filter(Boolean).join(" ");
}, h = (...i) => i.filter(Boolean).join(" "), k = (i, t) => {
  const a = [];
  return a.push(i), t.sm && a.push(`sm:${t.sm}`), t.md && a.push(`md:${t.md}`), t.lg && a.push(`lg:${t.lg}`), t.xl && a.push(`xl:${t.xl}`), t["2xl"] && a.push(`2xl:${t["2xl"]}`), a.join(" ");
}, w = {
  // Button variants with complete styling
  button: {
    primary: {
      default: () => "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-transparent focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:text-white dark:focus-visible:ring-blue-400 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      small: () => "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-transparent focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:text-white dark:focus-visible:ring-blue-400 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 h-8",
      large: () => "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-transparent focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:text-white dark:focus-visible:ring-blue-400 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-colors duration-200 h-12",
      withIcon: () => "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-transparent focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:text-white dark:focus-visible:ring-blue-400 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      fullWidth: () => "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border-transparent focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:text-white dark:focus-visible:ring-blue-400 flex items-center justify-center w-full rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
    },
    secondary: {
      default: () => "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 border-transparent focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:active:bg-gray-600 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      small: () => "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 border-transparent focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:active:bg-gray-600 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 h-8",
      large: () => "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 border-transparent focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:active:bg-gray-600 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-colors duration-200 h-12",
      withIcon: () => "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 border-transparent focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700 dark:active:bg-gray-600 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
    },
    outline: {
      default: () => "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-900 border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-50 dark:border-gray-600 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      small: () => "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-900 border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-50 dark:border-gray-600 inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 h-8",
      large: () => "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-900 border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-50 dark:border-gray-600 inline-flex items-center justify-center rounded-md px-6 py-3 text-base font-medium transition-colors duration-200 h-12",
      withIcon: () => "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-900 border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-50 dark:border-gray-600 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
    },
    destructive: {
      default: () => "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-transparent focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800 dark:text-white inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      outline: () => "bg-transparent hover:bg-red-50 active:bg-red-100 text-red-600 border border-red-300 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-red-900/20 dark:text-red-400 dark:border-red-800 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      small: () => "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border-transparent focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800 dark:text-white inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-200 h-8"
    },
    ghost: {
      default: () => "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      small: () => "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300 inline-flex items-center justify-center rounded-md px-2 py-1 text-xs font-medium transition-colors duration-200 h-8",
      icon: () => "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300 inline-flex items-center justify-center rounded-md p-2 transition-colors duration-200 h-10 w-10"
    },
    link: {
      default: () => "bg-transparent hover:bg-transparent active:bg-transparent text-blue-600 border-transparent underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline dark:text-blue-400 inline-flex items-center justify-center rounded-md px-0 py-0 text-sm font-medium transition-colors duration-200",
      muted: () => "bg-transparent hover:bg-transparent active:bg-transparent text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-transparent underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline inline-flex items-center justify-center rounded-md px-0 py-0 text-sm font-medium transition-colors duration-200"
    },
    gradient: {
      primary: () => "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-transparent shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
      secondary: () => "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border-transparent focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
      success: () => "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-transparent shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200"
    },
    // Web3 specific button variants
    web3: {
      wallet: () => "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
      connect: () => "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-transparent shadow-lg hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
      disconnect: () => "bg-transparent hover:bg-red-50 active:bg-red-100 text-red-600 border border-red-300 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:hover:bg-red-900/20 dark:text-red-400 dark:border-red-800 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
    }
  },
  // Card variants
  card: {
    default: {
      base: () => "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg",
      padded: () => "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6",
      interactive: () => "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 transition-all duration-200 hover:shadow-md cursor-pointer"
    },
    elevated: {
      base: () => "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm",
      padded: () => "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6",
      interactive: () => "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-lg cursor-pointer"
    },
    state: {
      success: () => "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 text-green-800 dark:text-green-200 rounded-lg border p-4",
      warning: () => "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-lg border p-4",
      error: () => "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-200 rounded-lg border p-4",
      info: () => "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200 rounded-lg border p-4"
    }
  },
  // Badge variants
  badge: {
    default: () => "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    primary: () => "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    success: () => "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    warning: () => "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    error: () => "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    // Web3 specific
    ethereum: () => "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    solana: () => "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    // Sizes
    small: (i = "default") => {
      const t = {
        default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      };
      return `${t[i] || t.default} inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium`;
    },
    large: (i = "default") => {
      const t = {
        default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      };
      return `${t[i] || t.default} inline-flex items-center px-3 py-1 rounded-full text-sm font-medium`;
    }
  },
  // Input variants
  input: {
    default: () => "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 block w-full rounded-md px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    search: () => "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 block w-full rounded-md px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    error: () => "bg-white dark:bg-gray-900 border-red-300 dark:border-red-700 text-gray-900 dark:text-gray-100 focus:border-red-500 focus:ring-red-500 block w-full rounded-md px-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    // Sizes
    small: () => "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 block w-full rounded-md px-2 py-1.5 text-xs placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    large: () => "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 block w-full rounded-md px-4 py-3 text-base placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    // Special variants
    withIcon: () => "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 block w-full rounded-md pl-10 pr-3 py-2 text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  },
  // Alert variants
  alert: {
    info: () => "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200 rounded-md border p-4 flex items-start gap-3",
    success: () => "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 text-green-800 dark:text-green-200 rounded-md border p-4 flex items-start gap-3",
    warning: () => "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded-md border p-4 flex items-start gap-3",
    error: () => "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-200 rounded-md border p-4 flex items-start gap-3",
    // Compact variants
    compact: {
      info: () => "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 text-blue-800 dark:text-blue-200 rounded border px-3 py-2 text-sm",
      success: () => "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800 text-green-800 dark:text-green-200 rounded border px-3 py-2 text-sm",
      warning: () => "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-200 rounded border px-3 py-2 text-sm",
      error: () => "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800 text-red-800 dark:text-red-200 rounded border px-3 py-2 text-sm"
    }
  },
  // Loading/Spinner variants
  loading: {
    // Spinner variants
    spinner: {
      default: () => "animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400 w-5 h-5",
      small: () => "animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400 w-4 h-4",
      large: () => "animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400 w-8 h-8",
      extraLarge: () => "animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400 w-16 h-16",
      // Color variants
      white: () => "animate-spin rounded-full border-2 border-white/30 border-t-white w-5 h-5",
      success: () => "animate-spin rounded-full border-2 border-green-200 border-t-green-600 dark:border-green-700 dark:border-t-green-400 w-5 h-5",
      warning: () => "animate-spin rounded-full border-2 border-amber-200 border-t-amber-600 dark:border-amber-700 dark:border-t-amber-400 w-5 h-5",
      error: () => "animate-spin rounded-full border-2 border-red-200 border-t-red-600 dark:border-red-700 dark:border-t-red-400 w-5 h-5"
    },
    // Loading state containers
    state: {
      default: () => "flex flex-col items-center justify-center py-8 px-4",
      fullScreen: () => "flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900",
      inline: () => "inline-flex items-center gap-2",
      center: () => "flex items-center justify-center"
    },
    // Loading buttons
    button: {
      default: () => "inline-flex items-center gap-2 opacity-70 cursor-wait pointer-events-none",
      primary: () => "bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-2 opacity-70 cursor-wait pointer-events-none px-4 py-2 rounded-md text-sm font-medium",
      secondary: () => "bg-gray-100 text-gray-900 hover:bg-gray-200 inline-flex items-center gap-2 opacity-70 cursor-wait pointer-events-none px-4 py-2 rounded-md text-sm font-medium dark:bg-gray-800 dark:text-gray-50"
    },
    // Skeleton loading
    skeleton: {
      default: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded",
      text: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-4",
      title: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded h-6",
      avatar: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full w-10 h-10",
      card: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32"
    },
    // Progress indicators
    progress: {
      bar: () => "w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700",
      fill: () => "bg-blue-600 h-2 rounded-full transition-all duration-300",
      indeterminate: () => "w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden relative before:absolute before:inset-0 before:bg-blue-600 before:rounded-full before:animate-pulse"
    },
    // Dots indicator
    dots: {
      default: () => "flex space-x-1 justify-center items-center",
      dot: () => "w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse",
      dotStaggered: (i = 0) => `w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse animation-delay-${i}`
    }
  },
  // Modal/Dialog variants
  modal: {
    // Overlay variants
    overlay: {
      default: () => "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      dark: () => "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4",
      light: () => "fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    },
    // Container variants
    container: {
      default: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden",
      small: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden w-full max-w-sm",
      medium: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden w-full max-w-md",
      large: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden w-full max-w-2xl",
      extraLarge: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden w-full max-w-4xl",
      fullScreen: () => "bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 w-full h-full overflow-hidden"
    },
    // Header variants
    header: {
      default: () => "px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between",
      centered: () => "px-6 py-4 border-b border-gray-200 dark:border-gray-700 text-center",
      minimal: () => "px-6 py-4 flex items-center justify-between"
    },
    // Content variants
    content: {
      default: () => "px-6 py-4 overflow-y-auto flex-1",
      padded: () => "px-6 py-6 overflow-y-auto flex-1",
      compact: () => "px-4 py-3 overflow-y-auto flex-1",
      scrollable: () => "px-6 py-4 overflow-y-auto flex-1 max-h-96"
    },
    // Footer variants
    footer: {
      default: () => "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-3",
      centered: () => "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-3",
      spaceBetween: () => "px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between",
      minimal: () => "px-6 py-4 flex items-center justify-end gap-3"
    },
    // Close button variants
    close: {
      default: () => "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700",
      subtle: () => "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200",
      prominent: () => "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
    },
    // Web3 specific modal variants
    web3: {
      wallet: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden w-full max-w-md",
      transaction: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden w-full max-w-lg",
      confirmation: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-hidden w-full max-w-sm"
    },
    // Animation variants
    animation: {
      fadeIn: () => "animate-in fade-in-0 duration-200",
      slideIn: () => "animate-in fade-in-0 zoom-in-95 duration-200",
      slideUp: () => "animate-in fade-in-0 slide-in-from-bottom-4 duration-200",
      fadeOut: () => "animate-out fade-out-0 duration-150",
      slideOut: () => "animate-out fade-out-0 zoom-out-95 duration-150"
    }
  },
  // Navigation variants
  navigation: {
    // Breadcrumb variants
    breadcrumb: {
      container: () => "flex items-center justify-between text-sm",
      list: () => "flex items-center space-x-1",
      item: () => "flex items-center",
      separator: () => "h-4 w-4 text-gray-400 dark:text-gray-500 mx-2 flex-shrink-0",
      link: () => "flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:rounded-sm",
      current: () => "flex items-center text-gray-900 dark:text-white font-medium",
      home: () => "h-4 w-4 mr-1 flex-shrink-0"
    },
    // Tab variants
    tabs: {
      root: () => "",
      list: () => "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 p-1 text-gray-500 dark:text-gray-400",
      listUnderlined: () => "flex border-b border-gray-200 dark:border-gray-700",
      listPills: () => "flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1",
      trigger: () => "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-blue-400 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50",
      triggerUnderlined: () => "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-blue-600 focus:border-blue-600 dark:focus:text-blue-400 dark:focus:border-blue-400 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 dark:data-[state=active]:text-blue-400 dark:data-[state=active]:border-blue-400 transition-colors",
      triggerPills: () => "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100 transition-all",
      content: () => "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:ring-offset-gray-950 dark:focus-visible:ring-blue-400"
    },
    // Menu/Dropdown variants
    menu: {
      trigger: () => "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors",
      content: () => "z-50 min-w-[12rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-1 text-gray-900 dark:text-gray-100 shadow-lg",
      item: () => "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm font-medium outline-none focus:bg-gray-100 focus:text-gray-900 dark:focus:bg-gray-700 dark:focus:text-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
      separator: () => "-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700",
      label: () => "px-2 py-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100",
      shortcut: () => "ml-auto text-xs tracking-widest text-gray-500 dark:text-gray-400"
    },
    // Pagination variants
    pagination: {
      container: () => "flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 sm:px-6",
      info: () => "flex flex-1 justify-between sm:hidden",
      nav: () => "hidden sm:flex sm:flex-1 sm:items-center sm:justify-between",
      results: () => "text-sm text-gray-700 dark:text-gray-300",
      buttons: () => "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
      button: () => "relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors",
      buttonActive: () => "relative inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 z-10",
      buttonFirst: () => "rounded-l-md",
      buttonLast: () => "rounded-r-md",
      // Mobile variants
      mobileButton: () => "relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
    },
    // Sidebar/Menu navigation
    sidebar: {
      container: () => "flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700",
      nav: () => "flex-1 px-4 py-6 space-y-1",
      item: () => "group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors",
      itemActive: () => "group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500",
      icon: () => "mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400",
      iconActive: () => "mr-3 h-5 w-5 flex-shrink-0 text-blue-500 dark:text-blue-400"
    },
    // Step navigation
    steps: {
      container: () => "flex items-center justify-center",
      list: () => "flex items-center space-x-4",
      step: () => "flex items-center space-x-2",
      circle: () => "flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm font-medium",
      circleActive: () => "flex items-center justify-center w-8 h-8 rounded-full border-2 border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400 text-white text-sm font-medium",
      circleCompleted: () => "flex items-center justify-center w-8 h-8 rounded-full border-2 border-green-600 dark:border-green-400 bg-green-600 dark:bg-green-400 text-white text-sm font-medium",
      label: () => "text-sm font-medium text-gray-900 dark:text-gray-100",
      labelInactive: () => "text-sm font-medium text-gray-500 dark:text-gray-400",
      connector: () => "w-12 h-px bg-gray-300 dark:bg-gray-600",
      connectorActive: () => "w-12 h-px bg-blue-600 dark:bg-blue-400"
    }
  },
  // Data Display variants
  dataDisplay: {
    // Table variants
    table: {
      container: () => "w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700",
      wrapper: () => "overflow-x-auto",
      table: () => "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
      thead: () => "bg-gray-50 dark:bg-gray-800",
      tbody: () => "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700",
      tfoot: () => "bg-gray-50 dark:bg-gray-800",
      tr: () => "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
      trSelected: () => "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30",
      th: () => "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
      thSortable: () => "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors",
      td: () => "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100",
      tdCompact: () => "px-3 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
    },
    // List variants
    list: {
      container: () => "bg-white dark:bg-gray-900 shadow overflow-hidden rounded-lg",
      ul: () => "divide-y divide-gray-200 dark:divide-gray-700",
      li: () => "px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors",
      liActive: () => "px-4 py-4 sm:px-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500",
      // Email list specific
      emailItem: () => "flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors",
      emailItemRead: () => "flex items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors opacity-60",
      emailItemSelected: () => "flex items-center px-4 py-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer"
    },
    // Grid variants
    grid: {
      container: () => "grid gap-4",
      twoColumn: () => "grid grid-cols-1 md:grid-cols-2 gap-4",
      threeColumn: () => "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
      fourColumn: () => "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
      autoFit: () => "grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4"
    },
    // Key-Value pairs
    keyValue: {
      container: () => "bg-white dark:bg-gray-900 shadow overflow-hidden rounded-lg",
      list: () => "divide-y divide-gray-200 dark:divide-gray-700",
      row: () => "px-4 py-4 sm:px-6 sm:grid sm:grid-cols-3 sm:gap-4",
      key: () => "text-sm font-medium text-gray-500 dark:text-gray-400",
      value: () => "mt-1 text-sm text-gray-900 dark:text-gray-100 sm:mt-0 sm:col-span-2",
      // Inline variant
      inline: () => "flex items-center space-x-2",
      inlineKey: () => "text-sm font-medium text-gray-500 dark:text-gray-400",
      inlineValue: () => "text-sm text-gray-900 dark:text-gray-100"
    },
    // Code display
    code: {
      inline: () => "font-mono text-sm text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded",
      block: () => "font-mono text-sm text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto",
      // Web3 specific
      address: () => "font-mono text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded select-all",
      hash: () => "font-mono text-sm text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded select-all",
      // Syntax highlighting
      keyword: () => "text-purple-600 dark:text-purple-400",
      string: () => "text-green-600 dark:text-green-400",
      number: () => "text-blue-600 dark:text-blue-400",
      comment: () => "text-gray-500 dark:text-gray-500 italic"
    },
    // Stats/Metrics
    stats: {
      container: () => "bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg",
      grid: () => "grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700",
      item: () => "px-4 py-5 sm:p-6",
      label: () => "text-sm font-medium text-gray-500 dark:text-gray-400 truncate",
      value: () => "mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100",
      change: () => "mt-2 flex items-center text-sm",
      changePositive: () => "text-green-600 dark:text-green-400",
      changeNegative: () => "text-red-600 dark:text-red-400"
    },
    // Empty states
    empty: {
      container: () => "text-center py-12",
      icon: () => "mx-auto h-12 w-12 text-gray-400",
      title: () => "mt-2 text-sm font-medium text-gray-900 dark:text-gray-100",
      description: () => "mt-1 text-sm text-gray-500 dark:text-gray-400",
      action: () => "mt-6"
    },
    // Timeline
    timeline: {
      container: () => "flow-root",
      list: () => "-mb-8",
      item: () => "relative pb-8",
      itemLast: () => "relative",
      connector: () => "absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700",
      dot: () => "relative flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-gray-800 ring-8 ring-white dark:ring-gray-900",
      dotActive: () => "bg-blue-600 dark:bg-blue-400",
      dotComplete: () => "bg-green-600 dark:bg-green-400",
      content: () => "ml-12 flex flex-col",
      time: () => "text-xs text-gray-500 dark:text-gray-400",
      title: () => "text-sm font-medium text-gray-900 dark:text-gray-100",
      description: () => "mt-1 text-sm text-gray-500 dark:text-gray-400"
    }
  },
  // Forms Advanced variants
  formsAdvanced: {
    // Multi-step wizard
    wizard: {
      container: () => "w-full",
      steps: () => "flex items-center justify-between mb-8",
      step: () => "flex flex-col items-center",
      stepCircle: () => "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
      stepCompleted: () => "bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-400 dark:text-green-300",
      stepCurrent: () => "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300",
      stepInactive: () => "bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400",
      stepContent: () => "mt-2 text-center",
      stepTitle: () => "text-sm font-medium",
      stepDescription: () => "text-xs text-gray-500 dark:text-gray-400 mt-1",
      connector: () => "flex-1 h-px bg-gray-200 dark:bg-gray-700 mt-5",
      connectorCompleted: () => "flex-1 h-px bg-green-300 dark:bg-green-600 mt-5"
    },
    // File upload components
    fileUpload: {
      dropzone: () => "border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center transition-colors hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer",
      dropzoneActive: () => "border-blue-400 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500",
      dropzoneError: () => "border-red-400 bg-red-50 dark:bg-red-900/20 dark:border-red-500",
      icon: () => "h-12 w-12 text-gray-400 mx-auto mb-4",
      text: () => "text-lg font-medium text-gray-900 dark:text-gray-100 mb-2",
      subtext: () => "text-sm text-gray-500 dark:text-gray-400 mb-4",
      button: () => "inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors",
      input: () => "sr-only",
      fileList: () => "mt-6 space-y-2",
      fileItem: () => "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg",
      fileIcon: () => "w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mr-3",
      fileName: () => "text-sm font-medium text-gray-900 dark:text-gray-100",
      fileSize: () => "text-xs text-gray-500 dark:text-gray-400",
      removeButton: () => "p-1 text-gray-400 hover:text-red-500 transition-colors"
    },
    // Web3 specific inputs
    web3: {
      container: () => "space-y-2",
      label: () => "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center",
      labelIcon: () => "h-4 w-4 inline mr-1",
      inputGroup: () => "flex rounded-md shadow-sm",
      tokenInput: () => "rounded-r-none font-mono",
      tokenSymbol: () => "inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm font-medium",
      balance: () => "text-sm text-gray-500 dark:text-gray-400",
      balanceActions: () => "flex space-x-2",
      maxButton: () => "text-xs",
      addressInput: () => "font-mono text-sm",
      addressValid: () => "border-green-300 dark:border-green-600 pr-10",
      addressInvalid: () => "border-red-300 dark:border-red-600 pr-10",
      gasSettings: () => "grid grid-cols-3 gap-2",
      gasOption: () => "p-2 text-center border rounded-md transition-colors cursor-pointer",
      gasOptionActive: () => "border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20",
      gasOptionInactive: () => "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
    },
    // Advanced validation
    validation: {
      container: () => "space-y-1",
      label: () => "text-sm font-medium text-gray-700 dark:text-gray-300",
      input: () => "block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100",
      inputSuccess: () => "border-green-300 dark:border-green-600 focus:border-green-500 focus:ring-green-500 pr-10",
      inputError: () => "border-red-300 dark:border-red-600 focus:border-red-500 focus:ring-red-500 pr-10",
      inputWarning: () => "border-yellow-300 dark:border-yellow-600 focus:border-yellow-500 focus:ring-yellow-500 pr-10",
      successIcon: () => "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500",
      errorIcon: () => "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500",
      warningIcon: () => "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-500",
      loadingIcon: () => "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-blue-600",
      successMessage: () => "text-xs text-green-600 dark:text-green-400",
      errorMessage: () => "text-xs text-red-600 dark:text-red-400",
      warningMessage: () => "text-xs text-yellow-600 dark:text-yellow-400",
      helpMessage: () => "text-xs text-gray-500 dark:text-gray-400",
      requirements: () => "space-y-1 mt-2",
      requirement: () => "flex items-center text-xs",
      requirementMet: () => "text-green-600 dark:text-green-400",
      requirementUnmet: () => "text-gray-500 dark:text-gray-400",
      requirementIcon: () => "h-3 w-3 mr-1"
    },
    // Form sections and layouts
    layout: {
      section: () => "space-y-6",
      sectionTitle: () => "text-lg font-medium text-gray-900 dark:text-gray-100",
      sectionDescription: () => "text-sm text-gray-500 dark:text-gray-400",
      fieldGroup: () => "space-y-4",
      fieldRow: () => "grid grid-cols-1 md:grid-cols-2 gap-4",
      fieldColumn: () => "space-y-4",
      actions: () => "flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700",
      actionsRight: () => "flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700",
      actionsCenter: () => "flex justify-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700"
    },
    // Security and sensitive inputs
    security: {
      container: () => "relative",
      input: () => "font-mono",
      toggleButton: () => "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200",
      strengthMeter: () => "mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden",
      strengthBar: () => "h-full transition-all duration-300",
      strengthWeak: () => "bg-red-500 w-1/4",
      strengthMedium: () => "bg-yellow-500 w-1/2",
      strengthStrong: () => "bg-green-500 w-3/4",
      strengthVeryStrong: () => "bg-green-600 w-full"
    },
    // Conditional fields and dynamic forms
    conditional: {
      container: () => "space-y-4",
      trigger: () => "flex items-center space-x-2",
      content: () => "ml-6 mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-4",
      contentVisible: () => "opacity-100 max-h-none",
      contentHidden: () => "opacity-0 max-h-0 overflow-hidden"
    }
  },
  // Notifications & Feedback variants
  notifications: {
    // Toast notifications
    toast: {
      container: () => "fixed top-4 right-4 z-50 max-w-sm w-full transform transition-all duration-300 ease-out",
      content: () => "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4",
      // Toast with icon and content
      wrapper: () => "flex items-start space-x-3",
      icon: () => "flex-shrink-0 mt-0.5",
      successIcon: () => "h-5 w-5 text-green-500",
      errorIcon: () => "h-5 w-5 text-red-500",
      warningIcon: () => "h-5 w-5 text-yellow-500",
      infoIcon: () => "h-5 w-5 text-blue-500",
      text: () => "flex-1 min-w-0",
      title: () => "text-sm font-medium text-gray-900 dark:text-gray-100",
      message: () => "mt-1 text-sm text-gray-500 dark:text-gray-400",
      action: () => "mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 cursor-pointer",
      closeButton: () => "ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 cursor-pointer",
      // Toast variants by type
      success: () => "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20",
      error: () => "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20",
      warning: () => "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20",
      info: () => "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20"
    },
    // Progress indicators
    progress: {
      container: () => "w-full",
      content: () => "flex items-center justify-between mb-2",
      text: () => "flex-1 min-w-0 mr-4",
      title: () => "text-sm font-medium text-gray-700 dark:text-gray-300",
      message: () => "text-xs text-gray-500 dark:text-gray-400 mt-1",
      // Progress bar
      bar: () => "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden",
      fill: () => "h-full bg-blue-600 rounded-full transition-all duration-300",
      fillSuccess: () => "h-full bg-green-600 rounded-full transition-all duration-300",
      fillError: () => "h-full bg-red-600 rounded-full transition-all duration-300",
      fillWarning: () => "h-full bg-yellow-600 rounded-full transition-all duration-300",
      percentage: () => "text-sm text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0",
      // Circular progress
      circle: () => "relative w-8 h-8",
      circleTrack: () => "absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700",
      circleFill: () => "absolute inset-0 rounded-full border-2 border-transparent transition-all duration-300",
      // Loading spinners
      spinner: () => "animate-spin rounded-full border-2 border-transparent",
      spinnerPrimary: () => "border-t-blue-600 border-r-blue-600",
      spinnerSuccess: () => "border-t-green-600 border-r-green-600",
      spinnerError: () => "border-t-red-600 border-r-red-600",
      spinnerWarning: () => "border-t-yellow-600 border-r-yellow-600"
    },
    // Transaction status
    transaction: {
      container: () => "border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800",
      wrapper: () => "flex items-start space-x-3",
      icon: () => "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
      iconPending: () => "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
      iconConfirming: () => "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      iconConfirmed: () => "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      iconFailed: () => "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
      content: () => "flex-1 min-w-0",
      header: () => "flex items-center justify-between mb-1",
      type: () => "text-sm font-medium text-gray-900 dark:text-gray-100",
      status: () => "px-2 py-1 text-xs rounded-full font-medium",
      statusPending: () => "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
      statusConfirming: () => "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      statusConfirmed: () => "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      statusFailed: () => "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      details: () => "text-xs text-gray-500 dark:text-gray-400 mt-1",
      hash: () => "font-mono text-xs text-gray-500 dark:text-gray-400",
      amount: () => "text-sm text-gray-600 dark:text-gray-400 ml-2",
      confirmations: () => "mt-2 text-xs text-gray-500 dark:text-gray-400",
      confirmationBar: () => "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1",
      confirmationProgress: () => "h-1.5 bg-blue-600 rounded-full transition-all duration-300"
    },
    // System status indicators
    status: {
      indicator: () => "flex items-center space-x-2",
      dot: () => "w-3 h-3 rounded-full flex-shrink-0",
      text: () => "text-sm font-medium",
      // Status variants
      online: () => "text-green-700 dark:text-green-300",
      onlineDot: () => "bg-green-500",
      degraded: () => "text-yellow-700 dark:text-yellow-300",
      degradedDot: () => "bg-yellow-500",
      offline: () => "text-red-700 dark:text-red-300",
      offlineDot: () => "bg-red-500",
      // Animated indicators
      pulse: () => "animate-pulse",
      // Connection status
      connection: () => "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg",
      connectionLabel: () => "text-sm font-medium text-gray-900 dark:text-gray-100",
      connectionDescription: () => "text-xs text-gray-500 dark:text-gray-400",
      connectionStatus: () => "px-2 py-1 text-xs rounded-full font-medium"
    },
    // Notification badges
    badge: {
      container: () => "relative inline-block",
      badge: () => "absolute -top-1 -right-1 text-white text-xs rounded-full flex items-center justify-center font-medium",
      // Size variants
      small: () => "h-3 w-3 text-xs",
      medium: () => "h-4 w-4 text-xs",
      large: () => "h-5 w-5 text-xs",
      // Color variants
      primary: () => "bg-blue-500",
      success: () => "bg-green-500",
      error: () => "bg-red-500",
      warning: () => "bg-yellow-500",
      // Special states
      dot: () => "w-2 h-2 rounded-full animate-pulse",
      count: () => "min-w-[1rem] px-1",
      countOverflow: () => "min-w-[1.25rem] px-1"
      // for 99+
    },
    // Contextual feedback
    feedback: {
      container: () => "p-3 rounded-lg border",
      content: () => "flex items-start",
      icon: () => "flex-shrink-0 mr-2 mt-0.5",
      text: () => "flex-1 min-w-0",
      title: () => "text-sm font-medium",
      message: () => "text-sm mt-1",
      action: () => "ml-auto flex-shrink-0",
      // Feedback variants
      success: () => "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      successIcon: () => "h-4 w-4 text-green-600 dark:text-green-400",
      successTitle: () => "text-green-800 dark:text-green-200",
      successMessage: () => "text-green-700 dark:text-green-300",
      error: () => "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      errorIcon: () => "h-4 w-4 text-red-600 dark:text-red-400",
      errorTitle: () => "text-red-800 dark:text-red-200",
      errorMessage: () => "text-red-700 dark:text-red-300",
      warning: () => "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      warningIcon: () => "h-4 w-4 text-yellow-600 dark:text-yellow-400",
      warningTitle: () => "text-yellow-800 dark:text-yellow-200",
      warningMessage: () => "text-yellow-700 dark:text-yellow-300",
      info: () => "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      infoIcon: () => "h-4 w-4 text-blue-600 dark:text-blue-400",
      infoTitle: () => "text-blue-800 dark:text-blue-200",
      infoMessage: () => "text-blue-700 dark:text-blue-300",
      neutral: () => "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
      neutralIcon: () => "h-4 w-4 text-gray-600 dark:text-gray-400",
      neutralTitle: () => "text-gray-900 dark:text-gray-100",
      neutralMessage: () => "text-gray-600 dark:text-gray-400"
    },
    // Alert banners (different from alerts component)
    banner: {
      container: () => "border-l-4 p-4",
      content: () => "flex items-center justify-between",
      text: () => "flex items-center",
      icon: () => "flex-shrink-0 mr-3",
      message: () => "text-sm font-medium",
      action: () => "flex-shrink-0 ml-4",
      closeButton: () => "text-gray-400 hover:text-gray-500 dark:hover:text-gray-300",
      // Banner variants
      success: () => "bg-green-50 dark:bg-green-900/20 border-green-400",
      error: () => "bg-red-50 dark:bg-red-900/20 border-red-400",
      warning: () => "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400",
      info: () => "bg-blue-50 dark:bg-blue-900/20 border-blue-400"
    },
    // Loading states
    loading: {
      overlay: () => "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
      container: () => "bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-4",
      content: () => "text-center",
      spinner: () => "mx-auto mb-4",
      title: () => "text-lg font-medium text-gray-900 dark:text-gray-100 mb-2",
      message: () => "text-sm text-gray-500 dark:text-gray-400",
      // Inline loading
      inline: () => "flex items-center space-x-2",
      inlineSpinner: () => "flex-shrink-0",
      inlineText: () => "text-sm text-gray-600 dark:text-gray-400"
    }
  },
  // Layout & Spacing variants
  layout: {
    // Container variants
    container: {
      narrow: () => "max-w-2xl mx-auto px-4 sm:px-6",
      default: () => "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      wide: () => "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      full: () => "w-full px-4 sm:px-6 lg:px-8",
      fluid: () => "w-full"
    },
    // Grid layouts
    grid: {
      // Responsive columns
      responsive: {
        oneToTwo: () => "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
        oneToThree: () => "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        oneToFour: () => "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6",
        twoToFour: () => "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6",
        threeToSix: () => "grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6"
      },
      // Fixed columns with responsive gaps
      fixed: {
        one: () => "grid grid-cols-1 gap-4 md:gap-6",
        two: () => "grid grid-cols-2 gap-4 md:gap-6",
        three: () => "grid grid-cols-3 gap-4 md:gap-6",
        four: () => "grid grid-cols-4 gap-4 md:gap-6",
        five: () => "grid grid-cols-5 gap-4 md:gap-6",
        six: () => "grid grid-cols-6 gap-4 md:gap-6"
      },
      // Auto-fit patterns
      autoFit: {
        small: () => "grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 md:gap-6",
        medium: () => "grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 md:gap-6",
        large: () => "grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-4 md:gap-6"
      },
      // Dashboard layouts
      dashboard: {
        sidebar: () => "grid grid-cols-1 lg:grid-cols-4 gap-6",
        sidebarContent: () => "lg:col-span-3",
        sidebarAside: () => "lg:col-span-1",
        twoColumn: () => "grid grid-cols-1 lg:grid-cols-2 gap-6",
        threeColumn: () => "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        // Masonry-style layouts
        masonry: () => "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6",
        masonryItem: () => "break-inside-avoid mb-6"
      }
    },
    // Flexbox patterns
    flex: {
      // Basic layouts
      row: () => "flex flex-row",
      column: () => "flex flex-col",
      rowReverse: () => "flex flex-row-reverse",
      columnReverse: () => "flex flex-col-reverse",
      // Common patterns
      center: () => "flex items-center justify-center",
      centerVertical: () => "flex items-center",
      centerHorizontal: () => "flex justify-center",
      spaceBetween: () => "flex items-center justify-between",
      spaceAround: () => "flex items-center justify-around",
      spaceEvenly: () => "flex items-center justify-evenly",
      // Responsive flex direction
      responsiveColumn: () => "flex flex-col md:flex-row",
      responsiveRow: () => "flex flex-row md:flex-col",
      // Common component layouts
      header: () => "flex items-center justify-between w-full",
      toolbar: () => "flex items-center space-x-2",
      buttonGroup: () => "flex items-center space-x-2",
      iconText: () => "flex items-center space-x-2",
      // List layouts
      listItem: () => "flex items-start space-x-3",
      listItemCenter: () => "flex items-center space-x-3",
      listItemEnd: () => "flex items-end space-x-3",
      // Card content layouts
      cardContent: () => "flex flex-col space-y-4",
      cardActions: () => "flex items-center justify-end space-x-2 pt-4",
      cardHeader: () => "flex items-start justify-between",
      // Form layouts
      formRow: () => "flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0",
      formActions: () => "flex flex-col sm:flex-row-reverse sm:justify-start space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse",
      // Wrap variants
      wrap: () => "flex flex-wrap",
      nowrap: () => "flex flex-nowrap",
      wrapReverse: () => "flex flex-wrap-reverse",
      // Gap utilities (for flex layouts)
      gapSm: () => "gap-2",
      gapMd: () => "gap-4",
      gapLg: () => "gap-6",
      gapXl: () => "gap-8"
    },
    // Spacing utilities
    spacing: {
      // Margin utilities
      margin: {
        none: () => "m-0",
        xs: () => "m-1",
        sm: () => "m-2",
        md: () => "m-4",
        lg: () => "m-6",
        xl: () => "m-8",
        xxl: () => "m-12",
        // Directional margins
        top: {
          none: () => "mt-0",
          xs: () => "mt-1",
          sm: () => "mt-2",
          md: () => "mt-4",
          lg: () => "mt-6",
          xl: () => "mt-8",
          xxl: () => "mt-12"
        },
        bottom: {
          none: () => "mb-0",
          xs: () => "mb-1",
          sm: () => "mb-2",
          md: () => "mb-4",
          lg: () => "mb-6",
          xl: () => "mb-8",
          xxl: () => "mb-12"
        },
        left: {
          none: () => "ml-0",
          xs: () => "ml-1",
          sm: () => "ml-2",
          md: () => "ml-4",
          lg: () => "ml-6",
          xl: () => "ml-8",
          xxl: () => "ml-12"
        },
        right: {
          none: () => "mr-0",
          xs: () => "mr-1",
          sm: () => "mr-2",
          md: () => "mr-4",
          lg: () => "mr-6",
          xl: () => "mr-8",
          xxl: () => "mr-12"
        },
        horizontal: {
          none: () => "mx-0",
          xs: () => "mx-1",
          sm: () => "mx-2",
          md: () => "mx-4",
          lg: () => "mx-6",
          xl: () => "mx-8",
          xxl: () => "mx-12",
          auto: () => "mx-auto"
        },
        vertical: {
          none: () => "my-0",
          xs: () => "my-1",
          sm: () => "my-2",
          md: () => "my-4",
          lg: () => "my-6",
          xl: () => "my-8",
          xxl: () => "my-12"
        }
      },
      // Padding utilities
      padding: {
        none: () => "p-0",
        xs: () => "p-1",
        sm: () => "p-2",
        md: () => "p-4",
        lg: () => "p-6",
        xl: () => "p-8",
        xxl: () => "p-12",
        // Directional padding
        top: {
          none: () => "pt-0",
          xs: () => "pt-1",
          sm: () => "pt-2",
          md: () => "pt-4",
          lg: () => "pt-6",
          xl: () => "pt-8",
          xxl: () => "pt-12"
        },
        bottom: {
          none: () => "pb-0",
          xs: () => "pb-1",
          sm: () => "pb-2",
          md: () => "pb-4",
          lg: () => "pb-6",
          xl: () => "pb-8",
          xxl: () => "pb-12"
        },
        left: {
          none: () => "pl-0",
          xs: () => "pl-1",
          sm: () => "pl-2",
          md: () => "pl-4",
          lg: () => "pl-6",
          xl: () => "pl-8",
          xxl: () => "pl-12"
        },
        right: {
          none: () => "pr-0",
          xs: () => "pr-1",
          sm: () => "pr-2",
          md: () => "pr-4",
          lg: () => "pr-6",
          xl: () => "pr-8",
          xxl: () => "pr-12"
        },
        horizontal: {
          none: () => "px-0",
          xs: () => "px-1",
          sm: () => "px-2",
          md: () => "px-4",
          lg: () => "px-6",
          xl: () => "px-8",
          xxl: () => "px-12"
        },
        vertical: {
          none: () => "py-0",
          xs: () => "py-1",
          sm: () => "py-2",
          md: () => "py-4",
          lg: () => "py-6",
          xl: () => "py-8",
          xxl: () => "py-12"
        }
      },
      // Common spacing combinations
      section: () => "py-12 md:py-16 lg:py-20",
      subsection: () => "py-8 md:py-12",
      cardSpacing: () => "p-6 md:p-8",
      listSpacing: () => "space-y-4",
      buttonSpacing: () => "space-x-2"
    },
    // Web3-specific layouts
    web3: {
      // Wallet interface layouts
      wallet: {
        connect: () => "flex flex-col items-center space-y-4 p-6",
        connected: () => "flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg",
        balance: () => "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
        portfolio: () => "grid grid-cols-1 lg:grid-cols-3 gap-6"
      },
      // Transaction layouts
      transaction: {
        form: () => "space-y-6",
        preview: () => "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3",
        history: () => "space-y-2",
        historyItem: () => "flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700",
        details: () => "grid grid-cols-1 md:grid-cols-2 gap-4"
      },
      // NFT layouts
      nft: {
        gallery: () => "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6",
        card: () => "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden",
        cardContent: () => "p-4 space-y-3",
        cardActions: () => "flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700",
        // Collection view
        collection: () => "grid grid-cols-1 lg:grid-cols-4 gap-6",
        collectionSidebar: () => "lg:col-span-1 space-y-6",
        collectionGrid: () => "lg:col-span-3"
      },
      // DeFi layouts
      defi: {
        dashboard: () => "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        pool: () => "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6",
        poolStats: () => "grid grid-cols-2 md:grid-cols-4 gap-4",
        liquidity: () => "space-y-4",
        farming: () => "grid grid-cols-1 lg:grid-cols-2 gap-6"
      },
      // DAO layouts
      dao: {
        governance: () => "grid grid-cols-1 lg:grid-cols-3 gap-6",
        proposal: () => "bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6",
        proposalHeader: () => "flex items-start justify-between mb-6",
        proposalContent: () => "space-y-6",
        voting: () => "grid grid-cols-1 md:grid-cols-2 gap-4"
      }
    },
    // Positioning utilities
    position: {
      relative: () => "relative",
      absolute: () => "absolute",
      fixed: () => "fixed",
      sticky: () => "sticky",
      // Common absolute positions
      topLeft: () => "absolute top-0 left-0",
      topRight: () => "absolute top-0 right-0",
      bottomLeft: () => "absolute bottom-0 left-0",
      bottomRight: () => "absolute bottom-0 right-0",
      center: () => "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      // Overlay positions
      overlay: () => "fixed inset-0 z-50",
      backdrop: () => "fixed inset-0 bg-black bg-opacity-50 z-40"
    },
    // Overflow utilities
    overflow: {
      hidden: () => "overflow-hidden",
      auto: () => "overflow-auto",
      scroll: () => "overflow-scroll",
      xHidden: () => "overflow-x-hidden",
      yHidden: () => "overflow-y-hidden",
      xAuto: () => "overflow-x-auto",
      yAuto: () => "overflow-y-auto",
      xScroll: () => "overflow-x-scroll",
      yScroll: () => "overflow-y-scroll"
    },
    // Z-index utilities
    zIndex: {
      base: () => "z-0",
      dropdown: () => "z-10",
      sticky: () => "z-20",
      modal: () => "z-50",
      popover: () => "z-60",
      tooltip: () => "z-70"
    },
    // Display utilities
    display: {
      block: () => "block",
      inline: () => "inline",
      inlineBlock: () => "inline-block",
      flex: () => "flex",
      inlineFlex: () => "inline-flex",
      grid: () => "grid",
      inlineGrid: () => "inline-grid",
      hidden: () => "hidden",
      // Responsive display
      hiddenMobile: () => "hidden sm:block",
      hiddenTablet: () => "hidden md:block",
      hiddenDesktop: () => "block md:hidden",
      mobileOnly: () => "block sm:hidden",
      tabletOnly: () => "hidden sm:block md:hidden",
      desktopOnly: () => "hidden md:block"
    },
    // Common layout patterns
    patterns: {
      // Page layouts
      fullHeight: () => "min-h-screen flex flex-col",
      centeredPage: () => "min-h-screen flex items-center justify-center",
      // Header patterns
      header: () => "sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700",
      headerContent: () => "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
      // Sidebar patterns
      sidebarLayout: () => "flex h-screen bg-gray-100 dark:bg-gray-900",
      sidebar: () => "w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700",
      mainContent: () => "flex-1 flex flex-col overflow-hidden",
      // Modal patterns
      modalOverlay: () => "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
      modalContent: () => "bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden",
      // Card patterns
      cardGrid: () => "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
      cardStack: () => "space-y-6",
      // List patterns
      dividedList: () => "divide-y divide-gray-200 dark:divide-gray-700",
      spacedList: () => "space-y-4",
      // Form patterns
      formStack: () => "space-y-6",
      formGrid: () => "grid grid-cols-1 md:grid-cols-2 gap-6",
      fieldset: () => "space-y-4",
      // Loading patterns
      loadingOverlay: () => "absolute inset-0 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center",
      loadingInline: () => "flex items-center space-x-2",
      // Empty state patterns
      emptyState: () => "text-center py-12",
      emptyStateIcon: () => "mx-auto h-12 w-12 text-gray-400 mb-4"
    }
  },
  // Table variants
  table: {
    container: () => "overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
    table: () => "min-w-full divide-y divide-gray-200 dark:divide-gray-700",
    header: {
      row: () => "bg-gray-50 dark:bg-gray-900/50",
      cell: () => "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
      sortable: () => "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none group"
    },
    body: {
      row: () => "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200",
      rowSelected: () => "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200",
      rowClickable: () => "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer",
      cell: () => "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100",
      cellMuted: () => "px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
      cellAction: () => "px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
    },
    // Compact table variants
    compact: {
      header: {
        cell: () => "px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
        sortable: () => "px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 select-none group"
      },
      body: {
        cell: () => "px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100",
        cellMuted: () => "px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400",
        cellAction: () => "px-4 py-3 whitespace-nowrap text-right text-sm font-medium"
      }
    },
    // Table states
    states: {
      loading: () => "opacity-50 pointer-events-none",
      empty: () => "text-center py-12 text-gray-500 dark:text-gray-400",
      error: () => "text-center py-12 text-red-500 dark:text-red-400"
    },
    // Pagination styles
    pagination: {
      container: () => "bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6",
      info: () => "flex-1 flex justify-between sm:hidden text-sm text-gray-700 dark:text-gray-300",
      nav: () => "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between",
      button: () => "relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",
      buttonCurrent: () => "relative inline-flex items-center px-4 py-2 border border-blue-500 dark:border-blue-400 text-sm font-medium rounded-md text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
    },
    // Data grid specific variants
    grid: {
      container: () => "overflow-auto rounded-lg border border-gray-200 dark:border-gray-700",
      table: () => "min-w-full table-fixed",
      resizeHandle: () => "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 dark:hover:bg-blue-400 transition-colors duration-200",
      filterContainer: () => "border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-3",
      filterInput: () => "block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 focus:outline-none focus:ring-2"
    },
    // Sorting indicators
    sort: {
      indicator: () => "ml-2 h-4 w-4 flex-none rounded text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300",
      ascending: () => "ml-2 h-4 w-4 flex-none rounded text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transform rotate-0",
      descending: () => "ml-2 h-4 w-4 flex-none rounded text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300 transform rotate-180"
    }
  },
  // Icon variants
  icon: {
    // Size variants
    size: {
      xs: () => "h-3 w-3",
      sm: () => "h-4 w-4",
      md: () => "h-5 w-5",
      lg: () => "h-6 w-6",
      xl: () => "h-8 w-8",
      xxl: () => "h-10 w-10",
      xxxl: () => "h-12 w-12"
    },
    // Color variants
    color: {
      // Neutral colors
      default: () => "text-gray-500 dark:text-gray-400",
      muted: () => "text-gray-400 dark:text-gray-500",
      subtle: () => "text-gray-300 dark:text-gray-600",
      primary: () => "text-gray-900 dark:text-gray-100",
      // Brand colors
      brand: () => "text-blue-600 dark:text-blue-400",
      brandMuted: () => "text-blue-500 dark:text-blue-500",
      // Semantic colors
      success: () => "text-green-600 dark:text-green-400",
      warning: () => "text-amber-600 dark:text-amber-400",
      error: () => "text-red-600 dark:text-red-400",
      info: () => "text-blue-600 dark:text-blue-400",
      // Interactive colors
      interactive: () => "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200",
      interactiveSubtle: () => "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200",
      // Web3 specific colors
      ethereum: () => "text-blue-600 dark:text-blue-400",
      solana: () => "text-purple-600 dark:text-purple-400",
      bitcoin: () => "text-orange-600 dark:text-orange-400"
    },
    // Combined size and color variants
    variant: {
      // Default variants (most common combinations)
      default: {
        xs: () => "h-3 w-3 text-gray-500 dark:text-gray-400",
        sm: () => "h-4 w-4 text-gray-500 dark:text-gray-400",
        md: () => "h-5 w-5 text-gray-500 dark:text-gray-400",
        lg: () => "h-6 w-6 text-gray-500 dark:text-gray-400",
        xl: () => "h-8 w-8 text-gray-500 dark:text-gray-400"
      },
      // Interactive variants
      interactive: {
        xs: () => "h-3 w-3 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 cursor-pointer",
        sm: () => "h-4 w-4 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 cursor-pointer",
        md: () => "h-5 w-5 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 cursor-pointer",
        lg: () => "h-6 w-6 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 cursor-pointer",
        xl: () => "h-8 w-8 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 cursor-pointer"
      },
      // Success variants
      success: {
        xs: () => "h-3 w-3 text-green-600 dark:text-green-400",
        sm: () => "h-4 w-4 text-green-600 dark:text-green-400",
        md: () => "h-5 w-5 text-green-600 dark:text-green-400",
        lg: () => "h-6 w-6 text-green-600 dark:text-green-400",
        xl: () => "h-8 w-8 text-green-600 dark:text-green-400"
      },
      // Warning variants
      warning: {
        xs: () => "h-3 w-3 text-amber-600 dark:text-amber-400",
        sm: () => "h-4 w-4 text-amber-600 dark:text-amber-400",
        md: () => "h-5 w-5 text-amber-600 dark:text-amber-400",
        lg: () => "h-6 w-6 text-amber-600 dark:text-amber-400",
        xl: () => "h-8 w-8 text-amber-600 dark:text-amber-400"
      },
      // Error variants
      error: {
        xs: () => "h-3 w-3 text-red-600 dark:text-red-400",
        sm: () => "h-4 w-4 text-red-600 dark:text-red-400",
        md: () => "h-5 w-5 text-red-600 dark:text-red-400",
        lg: () => "h-6 w-6 text-red-600 dark:text-red-400",
        xl: () => "h-8 w-8 text-red-600 dark:text-red-400"
      },
      // Muted variants
      muted: {
        xs: () => "h-3 w-3 text-gray-400 dark:text-gray-500",
        sm: () => "h-4 w-4 text-gray-400 dark:text-gray-500",
        md: () => "h-5 w-5 text-gray-400 dark:text-gray-500",
        lg: () => "h-6 w-6 text-gray-400 dark:text-gray-500",
        xl: () => "h-8 w-8 text-gray-400 dark:text-gray-500"
      }
    },
    // Context-specific icon patterns
    context: {
      // Button icons
      button: {
        leading: () => "h-4 w-4 mr-2 flex-shrink-0",
        trailing: () => "h-4 w-4 ml-2 flex-shrink-0",
        only: () => "h-4 w-4",
        small: () => "h-3 w-3",
        large: () => "h-5 w-5"
      },
      // Input icons
      input: {
        leading: () => "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none",
        trailing: () => "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400",
        interactive: () => "absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-200"
      },
      // Navigation icons
      navigation: {
        menu: () => "h-5 w-5 text-gray-600 dark:text-gray-400",
        menuActive: () => "h-5 w-5 text-blue-600 dark:text-blue-400",
        breadcrumb: () => "h-4 w-4 text-gray-400 mx-2",
        tab: () => "h-4 w-4 mr-2"
      },
      // Status icons
      status: {
        success: () => "h-5 w-5 text-green-500 flex-shrink-0",
        warning: () => "h-5 w-5 text-amber-500 flex-shrink-0",
        error: () => "h-5 w-5 text-red-500 flex-shrink-0",
        info: () => "h-5 w-5 text-blue-500 flex-shrink-0",
        loading: () => "h-5 w-5 text-gray-400 animate-spin flex-shrink-0"
      },
      // Avatar/Profile icons
      avatar: {
        small: () => "h-6 w-6 text-gray-400",
        medium: () => "h-8 w-8 text-gray-400",
        large: () => "h-10 w-10 text-gray-400",
        fallback: () => "h-full w-full text-gray-300"
      },
      // Web3 context icons
      web3: {
        wallet: () => "h-5 w-5 text-gray-600 dark:text-gray-400",
        walletConnected: () => "h-5 w-5 text-green-600 dark:text-green-400",
        walletDisconnected: () => "h-5 w-5 text-gray-400 dark:text-gray-500",
        transaction: () => "h-4 w-4 text-blue-600 dark:text-blue-400",
        blockchain: {
          ethereum: () => "h-5 w-5 text-blue-600 dark:text-blue-400",
          solana: () => "h-5 w-5 text-purple-600 dark:text-purple-400",
          bitcoin: () => "h-5 w-5 text-orange-600 dark:text-orange-400"
        }
      },
      // Card and content icons
      card: {
        header: () => "h-5 w-5 text-gray-600 dark:text-gray-400 mr-2",
        action: () => "h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200",
        feature: () => "h-6 w-6 text-blue-600 dark:text-blue-400",
        featureLarge: () => "h-8 w-8 text-blue-600 dark:text-blue-400"
      },
      // List and table icons
      list: {
        item: () => "h-4 w-4 text-gray-500 dark:text-gray-400 mr-3 flex-shrink-0",
        action: () => "h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200",
        bullet: () => "h-1.5 w-1.5 text-gray-400 mt-2 mr-3 flex-shrink-0"
      }
    },
    // Decorative icon patterns
    decorative: {
      hero: {
        small: () => "h-12 w-12 text-blue-600 dark:text-blue-400",
        medium: () => "h-16 w-16 text-blue-600 dark:text-blue-400",
        large: () => "h-20 w-20 text-blue-600 dark:text-blue-400",
        xlarge: () => "h-24 w-24 text-blue-600 dark:text-blue-400"
      },
      feature: {
        small: () => "h-8 w-8 text-gray-600 dark:text-gray-400",
        medium: () => "h-10 w-10 text-gray-600 dark:text-gray-400",
        large: () => "h-12 w-12 text-gray-600 dark:text-gray-400"
      },
      background: {
        subtle: () => "h-32 w-32 text-gray-100 dark:text-gray-800 opacity-50",
        muted: () => "h-24 w-24 text-gray-200 dark:text-gray-700 opacity-30"
      },
      empty: {
        small: () => "h-8 w-8 text-gray-400 dark:text-gray-500 mb-2",
        medium: () => "h-12 w-12 text-gray-400 dark:text-gray-500 mb-4",
        large: () => "h-16 w-16 text-gray-400 dark:text-gray-500 mb-6"
      }
    }
  },
  // Overlays & Portals variants
  overlays: {
    // Modal/Dialog overlays
    modal: {
      backdrop: () => "fixed inset-0 z-40 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-all duration-300 ease-out",
      backdropEntering: () => "opacity-0",
      backdropEntered: () => "opacity-100",
      backdropExiting: () => "opacity-0",
      container: () => "fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out",
      containerEntering: () => "opacity-0 scale-95",
      containerEntered: () => "opacity-100 scale-100",
      containerExiting: () => "opacity-0 scale-95",
      content: () => "relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-[80vh] overflow-hidden",
      // Size variants
      small: () => "max-w-sm",
      medium: () => "max-w-lg",
      large: () => "max-w-2xl",
      extraLarge: () => "max-w-4xl",
      fullWidth: () => "max-w-[95vw]",
      // Header and content areas
      header: () => "flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700",
      title: () => "text-lg font-semibold text-gray-900 dark:text-gray-100",
      closeButton: () => "p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors",
      body: () => "p-4 sm:p-6 overflow-y-auto",
      footer: () => "flex items-center justify-end space-x-3 p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
    },
    // Tooltip overlays
    tooltip: {
      container: () => "absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-800 rounded shadow-lg transition-all duration-200 pointer-events-none",
      arrow: () => "absolute w-2 h-2 bg-gray-900 dark:bg-gray-800 transform rotate-45",
      // Position variants
      top: () => "-translate-x-1/2 -translate-y-full left-1/2 bottom-full mb-2",
      topArrow: () => "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
      bottom: () => "-translate-x-1/2 translate-y-full left-1/2 top-full mt-2",
      bottomArrow: () => "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
      left: () => "-translate-y-1/2 -translate-x-full top-1/2 right-full mr-2",
      leftArrow: () => "left-full top-1/2 -translate-y-1/2 -translate-x-1/2",
      right: () => "-translate-y-1/2 translate-x-full top-1/2 left-full ml-2",
      rightArrow: () => "right-full top-1/2 -translate-y-1/2 translate-x-1/2",
      // Content variants
      light: () => "text-gray-900 bg-white border border-gray-200 shadow-md",
      dark: () => "text-white bg-gray-900 dark:bg-gray-800",
      info: () => "text-blue-50 bg-blue-600",
      success: () => "text-green-50 bg-green-600",
      warning: () => "text-amber-50 bg-amber-600",
      error: () => "text-red-50 bg-red-600"
    },
    // Popover overlays (more complex than tooltips)
    popover: {
      backdrop: () => "fixed inset-0 z-30",
      container: () => "absolute z-40 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200",
      arrow: () => "absolute w-3 h-3 bg-white dark:bg-gray-800 border-l border-t border-gray-200 dark:border-gray-700 transform rotate-45",
      // Size variants
      small: () => "w-48",
      medium: () => "w-64",
      large: () => "w-80",
      auto: () => "w-auto min-w-48 max-w-xs",
      // Position variants (similar to tooltip but adjusted for larger content)
      top: () => "-translate-x-1/2 -translate-y-full left-1/2 bottom-full mb-3",
      topArrow: () => "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
      bottom: () => "-translate-x-1/2 translate-y-full left-1/2 top-full mt-3",
      bottomArrow: () => "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
      left: () => "-translate-y-1/2 -translate-x-full top-1/2 right-full mr-3",
      leftArrow: () => "left-full top-1/2 -translate-y-1/2 -translate-x-1/2",
      right: () => "-translate-y-1/2 translate-x-full top-1/2 left-full ml-3",
      rightArrow: () => "right-full top-1/2 -translate-y-1/2 translate-x-1/2",
      // Content areas
      header: () => "px-4 py-3 border-b border-gray-200 dark:border-gray-700",
      title: () => "text-sm font-medium text-gray-900 dark:text-gray-100",
      body: () => "px-4 py-3",
      footer: () => "px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50",
      // Animation states
      entering: () => "opacity-0 scale-95 transform",
      entered: () => "opacity-100 scale-100 transform",
      exiting: () => "opacity-0 scale-95 transform"
    },
    // Dropdown menus
    dropdown: {
      container: () => "relative inline-block",
      trigger: () => "inline-flex justify-center items-center",
      menu: () => "absolute z-50 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 focus:outline-none transition-all duration-200",
      menuSmall: () => "w-40",
      menuLarge: () => "w-72",
      menuAuto: () => "w-auto min-w-40",
      // Position variants
      menuTop: () => "bottom-full mb-1",
      menuBottom: () => "top-full mt-1",
      menuLeft: () => "right-0",
      menuRight: () => "left-0",
      // Animation states
      menuEntering: () => "opacity-0 scale-95 transform origin-top",
      menuEntered: () => "opacity-100 scale-100 transform origin-top",
      menuExiting: () => "opacity-0 scale-95 transform origin-top",
      // Menu items
      itemContainer: () => "py-1 px-1",
      item: () => "flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 cursor-pointer hover:shadow-sm rounded-sm",
      itemActive: () => "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 shadow-sm",
      itemDisabled: () => "text-gray-400 dark:text-gray-600 cursor-not-allowed hover:bg-transparent hover:text-gray-400 dark:hover:text-gray-600",
      // Special item types
      divider: () => "my-1 border-t border-gray-200 dark:border-gray-700",
      header: () => "px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide",
      // Icons in menu items
      itemIcon: () => "mr-3 h-4 w-4 flex-shrink-0",
      itemIconRight: () => "ml-auto h-4 w-4 flex-shrink-0"
    },
    // Drawer/Sidebar overlays
    drawer: {
      backdrop: () => "fixed inset-0 z-40 bg-black/50 dark:bg-black/70 transition-opacity duration-300",
      container: () => "fixed inset-y-0 z-50 flex w-full justify-end transition-transform duration-300 ease-in-out",
      // Position variants
      right: () => "right-0",
      left: () => "left-0 justify-start",
      // Size variants
      narrow: () => "max-w-xs",
      default: () => "max-w-md",
      wide: () => "max-w-lg",
      extraWide: () => "max-w-2xl",
      // Content
      content: () => "relative flex w-full flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 shadow-xl",
      contentLeft: () => "border-r border-l-0 border-gray-200 dark:border-gray-700",
      header: () => "flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700",
      title: () => "text-lg font-semibold text-gray-900 dark:text-gray-100",
      closeButton: () => "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors",
      body: () => "flex-1 px-4 sm:px-6 py-4 overflow-y-auto",
      footer: () => "flex items-center justify-end space-x-3 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50",
      // Animation states
      entering: () => "translate-x-full",
      enteringLeft: () => "-translate-x-full",
      entered: () => "translate-x-0",
      exiting: () => "translate-x-full",
      exitingLeft: () => "-translate-x-full"
    },
    // Sheet overlays (bottom sheets, action sheets)
    sheet: {
      backdrop: () => "fixed inset-0 z-40 bg-black/50 dark:bg-black/70 transition-opacity duration-300",
      container: () => "fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-out",
      content: () => "relative bg-white dark:bg-gray-900 rounded-t-lg shadow-xl border-t border-gray-200 dark:border-gray-700 max-h-[85vh] overflow-hidden",
      handle: () => "flex justify-center py-2",
      handleBar: () => "w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full",
      header: () => "flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700",
      title: () => "text-lg font-semibold text-gray-900 dark:text-gray-100",
      closeButton: () => "p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors",
      body: () => "px-4 sm:px-6 py-4 overflow-y-auto",
      footer: () => "flex items-center justify-center space-x-3 px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50",
      // Animation states
      entering: () => "translate-y-full",
      entered: () => "translate-y-0",
      exiting: () => "translate-y-full"
    },
    // Context menus (right-click menus)
    contextMenu: {
      backdrop: () => "fixed inset-0 z-30",
      container: () => "absolute z-50 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1 focus:outline-none transition-all duration-150",
      item: () => "flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer",
      itemDisabled: () => "text-gray-400 dark:text-gray-600 cursor-not-allowed hover:bg-transparent",
      itemDanger: () => "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300",
      divider: () => "my-1 border-t border-gray-200 dark:border-gray-700",
      icon: () => "mr-2 h-4 w-4 flex-shrink-0",
      shortcut: () => "ml-auto text-xs text-gray-400 dark:text-gray-500",
      // Nested menu indicators
      submenuIndicator: () => "ml-auto h-4 w-4 text-gray-400 dark:text-gray-500",
      submenu: () => "absolute left-full top-0 ml-1"
    },
    // Loading overlays
    loading: {
      backdrop: () => "fixed inset-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300",
      container: () => "flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700",
      spinner: () => "w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin",
      spinnerLarge: () => "w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin",
      text: () => "text-sm font-medium text-gray-900 dark:text-gray-100",
      subtext: () => "text-xs text-gray-500 dark:text-gray-400 text-center max-w-xs"
    },
    // Portal utilities for managing overlay z-index and positioning
    portal: {
      // Z-index layers (ensure proper stacking)
      backdrop: () => "z-40",
      dropdown: () => "z-50",
      tooltip: () => "z-50",
      popover: () => "z-40",
      modal: () => "z-50",
      drawer: () => "z-50",
      sheet: () => "z-50",
      contextMenu: () => "z-50",
      loading: () => "z-60",
      notification: () => "z-70",
      // Focus trap utilities
      focusTrap: () => "focus:outline-none",
      focusVisible: () => "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      // Screen reader utilities
      srOnly: () => "sr-only",
      ariaLabel: () => "aria-label"
    }
  },
  // Micro-Interactions & Animations variants
  animations: {
    // Hover effects
    hover: {
      // Card hover effects
      card: {
        subtle: () => "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        lift: () => "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        glow: () => "transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/25",
        scale: () => "transition-transform duration-200 hover:scale-105",
        border: () => "transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600",
        // Web3 specific card hovers
        nft: () => "transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02]",
        wallet: () => "transition-all duration-200 hover:shadow-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20",
        transaction: () => "transition-all duration-200 hover:shadow-md hover:border-green-300 dark:hover:border-green-600"
      },
      // Button hover effects
      button: {
        lift: () => "transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md",
        glow: () => "transition-all duration-200 hover:shadow-lg hover:shadow-current/25",
        scale: () => "transition-transform duration-150 hover:scale-105",
        shimmer: () => "relative overflow-hidden transition-all duration-200 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:translate-x-full",
        // Web3 button hovers
        connect: () => "transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]",
        transaction: () => "transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30",
        disconnect: () => "transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30"
      },
      // Icon hover effects  
      icon: {
        bounce: () => "transition-transform duration-200 hover:scale-110 hover:-translate-y-0.5",
        rotate: () => "transition-transform duration-200 hover:rotate-12",
        pulse: () => "transition-all duration-200 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400",
        glow: () => "transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:drop-shadow-sm"
      }
    },
    // Loading animations
    loading: {
      // Spinner variants
      spinner: {
        default: () => "animate-spin",
        slow: () => "animate-spin-slow",
        fast: () => "animate-spin-fast",
        bounce: () => "animate-bounce",
        pulse: () => "animate-pulse",
        ping: () => "animate-ping"
      },
      // Skeleton loaders
      skeleton: {
        base: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded",
        line: () => "animate-pulse bg-gray-200 dark:bg-gray-700 h-4 rounded",
        circle: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full",
        card: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32",
        // Shimmer effect
        shimmer: () => "relative overflow-hidden bg-gray-200 dark:bg-gray-700 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-gray-200 before:via-white before:to-gray-200 dark:before:from-gray-700 dark:before:via-gray-600 dark:before:to-gray-700",
        // Progressive loading
        progressive: () => "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer-bg"
      },
      // Progress indicators
      progress: {
        bar: () => "transition-all duration-300 ease-out",
        indeterminate: () => "animate-progress-indeterminate bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%]",
        // Web3 progress indicators
        transaction: () => "animate-progress-glow bg-gradient-to-r from-green-400 to-blue-500",
        minting: () => "animate-progress-rainbow bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
      }
    },
    // Transition animations
    transitions: {
      // Slide transitions
      slide: {
        up: () => "transition-transform duration-300 ease-out",
        upEnter: () => "translate-y-full",
        upEntered: () => "translate-y-0",
        upExit: () => "translate-y-full",
        down: () => "transition-transform duration-300 ease-out",
        downEnter: () => "-translate-y-full",
        downEntered: () => "translate-y-0",
        downExit: () => "-translate-y-full",
        left: () => "transition-transform duration-300 ease-out",
        leftEnter: () => "translate-x-full",
        leftEntered: () => "translate-x-0",
        leftExit: () => "translate-x-full",
        right: () => "transition-transform duration-300 ease-out",
        rightEnter: () => "-translate-x-full",
        rightEntered: () => "translate-x-0",
        rightExit: () => "-translate-x-full"
      },
      // Fade transitions
      fade: {
        default: () => "transition-opacity duration-300 ease-out",
        enter: () => "opacity-0",
        entered: () => "opacity-100",
        exit: () => "opacity-0",
        fast: () => "transition-opacity duration-150 ease-out",
        slow: () => "transition-opacity duration-500 ease-out",
        // Fade with scale
        scale: () => "transition-all duration-300 ease-out",
        scaleEnter: () => "opacity-0 scale-95",
        scaleEntered: () => "opacity-100 scale-100",
        scaleExit: () => "opacity-0 scale-95"
      },
      // Page transitions
      page: {
        slideLeft: () => "transition-transform duration-300 ease-in-out",
        slideRight: () => "transition-transform duration-300 ease-in-out",
        fadeScale: () => "transition-all duration-300 ease-in-out"
      }
    },
    // Gesture feedback
    feedback: {
      // Click/tap feedback
      tap: {
        ripple: () => "relative overflow-hidden transition-all duration-150 active:scale-95",
        scale: () => "transition-transform duration-100 active:scale-95",
        glow: () => "transition-all duration-150 active:shadow-lg active:shadow-current/30",
        // Material Design ripple effect
        materialRipple: () => "relative overflow-hidden after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:transition-opacity after:duration-300 after:opacity-0 active:after:opacity-100 active:after:bg-white/20"
      },
      // Focus feedback
      focus: {
        ring: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        glow: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:shadow-lg focus-visible:shadow-blue-500/25",
        scale: () => "focus-visible:outline-none focus-visible:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500",
        // Web3 focus styles
        wallet: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:bg-blue-50 dark:focus-visible:bg-blue-900/20"
      },
      // Drag feedback
      drag: {
        dragging: () => "opacity-50 scale-95 rotate-3 shadow-xl z-50",
        dropzone: () => "transition-all duration-200 border-2 border-dashed",
        dropzoneActive: () => "border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-105",
        dropzoneInactive: () => "border-gray-300 dark:border-gray-600"
      }
    },
    // Scroll animations
    scroll: {
      // Reveal animations
      reveal: {
        fadeUp: () => "opacity-0 translate-y-8 transition-all duration-700 ease-out",
        fadeUpVisible: () => "opacity-100 translate-y-0",
        fadeDown: () => "opacity-0 -translate-y-8 transition-all duration-700 ease-out",
        fadeDownVisible: () => "opacity-100 translate-y-0",
        fadeLeft: () => "opacity-0 translate-x-8 transition-all duration-700 ease-out",
        fadeLeftVisible: () => "opacity-100 translate-x-0",
        fadeRight: () => "opacity-0 -translate-x-8 transition-all duration-700 ease-out",
        fadeRightVisible: () => "opacity-100 translate-x-0",
        scale: () => "opacity-0 scale-90 transition-all duration-700 ease-out",
        scaleVisible: () => "opacity-100 scale-100"
      },
      // Parallax effects
      parallax: {
        slow: () => "transform transition-transform duration-75",
        medium: () => "transform transition-transform duration-100",
        fast: () => "transform transition-transform duration-150"
      },
      // Sticky animations
      sticky: {
        shrink: () => "transition-all duration-300 ease-out",
        shrinkActive: () => "py-2 shadow-lg backdrop-blur-md",
        shrinkInactive: () => "py-4"
      }
    },
    // Web3-specific animations
    web3: {
      // Wallet connection animations
      wallet: {
        connecting: () => "animate-pulse bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%] animate-shimmer-bg",
        connected: () => "animate-bounce-gentle bg-gradient-to-r from-green-400 to-blue-500",
        disconnected: () => "animate-fade-out opacity-50",
        error: () => "animate-shake bg-red-100 dark:bg-red-900/20"
      },
      // Transaction animations
      transaction: {
        pending: () => "animate-pulse border border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-900/20",
        confirming: () => "animate-progress-dots bg-gradient-to-r from-blue-500 to-purple-500",
        confirmed: () => "animate-success-pulse border border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/20",
        failed: () => "animate-error-flash border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
      },
      // Blockchain activity
      blockchain: {
        mining: () => "animate-mining-pulse bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-[length:200%_100%]",
        minting: () => "animate-rainbow bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 to-pink-500 bg-[length:300%_100%]",
        staking: () => "animate-glow-pulse bg-gradient-to-r from-green-400 to-emerald-500",
        burning: () => "animate-fire bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-[length:200%_100%]"
      }
    },
    // Utility animations
    utility: {
      // Attention grabbing
      attention: {
        bounce: () => "animate-bounce",
        pulse: () => "animate-pulse",
        ping: () => "animate-ping",
        shake: () => "animate-shake",
        wiggle: () => "animate-wiggle",
        heartbeat: () => "animate-heartbeat"
      },
      // State indicators
      state: {
        success: () => "animate-success-checkmark",
        error: () => "animate-error-x",
        warning: () => "animate-warning-triangle",
        info: () => "animate-info-circle"
      },
      // Performance considerations
      reduced: {
        // Reduced motion variants for accessibility
        fadeOnly: () => "transition-opacity duration-300 ease-out",
        scaleOnly: () => "transition-transform duration-200 ease-out",
        instant: () => "transition-none",
        respectPrefers: () => "motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none"
      }
    }
  },
  // Accessibility & A11Y variants
  accessibility: {
    // Screen reader and assistive technology support
    screenReader: {
      // Visually hidden but accessible to screen readers
      only: () => "sr-only",
      focusable: () => "sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-2 focus:bg-white focus:text-black focus:border focus:rounded",
      // Skip links for navigation
      skipLink: () => "sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:m-2 focus:no-underline"
    },
    // Focus management
    focus: {
      // Focus indicators
      ring: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      ringInset: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500",
      ringDark: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
      // High contrast focus for better visibility
      highContrast: () => "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:bg-yellow-50 dark:focus-visible:bg-yellow-900/20",
      // Web3 specific focus styles
      wallet: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:bg-blue-50 dark:focus-visible:bg-blue-900/20",
      transaction: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2",
      error: () => "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
    },
    // Color contrast and visibility
    contrast: {
      // High contrast text
      text: {
        high: () => "text-gray-900 dark:text-gray-100",
        medium: () => "text-gray-700 dark:text-gray-300",
        low: () => "text-gray-600 dark:text-gray-400",
        inverse: () => "text-white dark:text-gray-900"
      },
      // High contrast backgrounds
      background: {
        primary: () => "bg-blue-700 text-white dark:bg-blue-300 dark:text-gray-900",
        secondary: () => "bg-gray-700 text-white dark:bg-gray-300 dark:text-gray-900",
        success: () => "bg-green-700 text-white dark:bg-green-300 dark:text-gray-900",
        warning: () => "bg-yellow-700 text-white dark:bg-yellow-300 dark:text-gray-900",
        error: () => "bg-red-700 text-white dark:bg-red-300 dark:text-gray-900"
      },
      // Link contrast
      link: {
        default: () => "text-blue-700 dark:text-blue-300 underline hover:text-blue-900 dark:hover:text-blue-100",
        visited: () => "text-purple-700 dark:text-purple-300 underline hover:text-purple-900 dark:hover:text-purple-100"
      }
    },
    // Motion and animation preferences
    motion: {
      // Respect user's motion preferences
      respectPrefers: () => "motion-safe:transition-all motion-safe:duration-300 motion-reduce:transition-none",
      reduceMotion: () => "motion-reduce:transition-none motion-reduce:animate-none",
      // Safe animations that work with reduced motion
      safe: {
        fade: () => "motion-safe:transition-opacity motion-safe:duration-300 motion-reduce:transition-none",
        scale: () => "motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none",
        slide: () => "motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none"
      },
      // Loading animations that respect motion preferences
      loading: {
        spin: () => "motion-safe:animate-spin motion-reduce:animate-none",
        pulse: () => "motion-safe:animate-pulse motion-reduce:animate-none",
        bounce: () => "motion-safe:animate-bounce motion-reduce:animate-none"
      }
    },
    // Semantic HTML and roles
    semantic: {
      // Interactive roles
      interactive: {
        button: () => 'role="button" tabindex="0"',
        link: () => 'role="link"',
        menuitem: () => 'role="menuitem"',
        tab: () => 'role="tab"',
        tabpanel: () => 'role="tabpanel"',
        dialog: () => 'role="dialog"'
      },
      // State roles
      states: {
        selected: (i) => `aria-selected="${i}"`,
        checked: (i) => `aria-checked="${i}"`,
        pressed: (i) => `aria-pressed="${i}"`,
        expanded: (i) => `aria-expanded="${i}"`,
        disabled: (i) => i ? 'aria-disabled="true" tabindex="-1"' : ""
      },
      // Web3 specific semantic patterns
      web3: {
        wallet: () => 'role="button" aria-label="Connect Wallet"',
        transaction: () => 'role="status" aria-live="polite"',
        balance: () => 'role="text" aria-label="Account Balance"',
        address: () => 'role="text" aria-label="Wallet Address"'
      }
    },
    // Form accessibility
    form: {
      // Required field indicators
      required: {
        indicator: () => "text-red-500 dark:text-red-400",
        text: () => 'aria-required="true" required',
        visual: () => 'after:content-["*"] after:ml-1 after:text-red-500 dark:after:text-red-400'
      },
      // Validation states
      validation: {
        valid: () => "border-green-500 dark:border-green-400 focus:ring-green-500",
        invalid: () => 'border-red-500 dark:border-red-400 focus:ring-red-500 aria-invalid="true"',
        pending: () => "border-yellow-500 dark:border-yellow-400 focus:ring-yellow-500"
      }
    },
    // Interactive patterns
    interactive: {
      // Button patterns
      button: {
        primary: () => "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
        secondary: () => "inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
        // Icon buttons with proper labels
        icon: () => "inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      },
      // Link patterns
      link: {
        default: () => "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        external: () => 'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 after:content-["↗"] after:ml-1 after:text-xs'
      }
    },
    // Text and content accessibility
    content: {
      // Text sizing and scaling
      text: {
        minimum: () => "text-sm min-h-[44px] min-w-[44px]",
        // WCAG minimum touch target
        touch: () => "min-h-[44px] min-w-[44px] touch-manipulation"
      }
    },
    // Error handling and feedback
    feedback: {
      // Error messages
      error: {
        container: () => "border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-md p-4",
        title: () => "text-sm font-medium text-red-800 dark:text-red-200",
        message: () => "text-sm text-red-700 dark:text-red-300 mt-2"
      },
      // Success messages
      success: {
        container: () => "border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20 rounded-md p-4",
        title: () => "text-sm font-medium text-green-800 dark:text-green-200",
        message: () => "text-sm text-green-700 dark:text-green-300 mt-2"
      },
      // Live regions for dynamic content
      liveRegion: {
        polite: () => 'sr-only aria-live="polite"',
        assertive: () => 'sr-only aria-live="assertive"',
        status: () => 'sr-only role="status" aria-live="polite"',
        alert: () => 'sr-only role="alert" aria-live="assertive"'
      }
    }
  },
  // Performance & Optimization variants
  performance: {
    // Bundle optimization patterns
    bundle: {
      // Lazy loading utilities
      lazy: {
        component: () => "opacity-0 transition-opacity duration-300",
        componentLoaded: () => "opacity-100",
        image: () => "blur-sm transition-all duration-300",
        imageLoaded: () => "blur-none",
        skeleton: () => "animate-pulse bg-gray-200 dark:bg-gray-700 rounded"
      },
      // Code splitting indicators
      splitting: {
        loading: () => "flex items-center justify-center py-8",
        error: () => "text-red-600 dark:text-red-400 text-center py-8",
        fallback: () => "bg-gray-100 dark:bg-gray-800 animate-pulse rounded"
      }
    },
    // Rendering optimization
    rendering: {
      // GPU acceleration utilities
      gpu: {
        transform: () => "transform-gpu",
        layer: () => "will-change-transform transform translate3d-0",
        composite: () => "backface-hidden"
      },
      // Layout optimization
      layout: {
        // Prevent layout shifts
        stable: () => "aspect-square",
        containLayout: () => "contain-layout",
        containStyle: () => "contain-style",
        // Efficient positioning
        sticky: () => "sticky top-0 z-40",
        fixed: () => "fixed inset-0 z-50"
      },
      // Memory optimization
      memory: {
        // Efficient list rendering
        virtualList: () => "overflow-hidden",
        virtualItem: () => "absolute left-0 right-0",
        // Image optimization
        responsiveImage: () => "max-w-full h-auto object-cover",
        lazyImage: () => "object-cover transition-opacity duration-300 opacity-0",
        loadedImage: () => "opacity-100"
      }
    },
    // Network optimization
    network: {
      // Caching patterns
      cache: {
        // Service worker states
        cached: () => "border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20",
        updating: () => "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20",
        offline: () => "border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-900/20",
        error: () => "border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20",
        // Cache status indicators
        fresh: () => "text-green-600 dark:text-green-400",
        stale: () => "text-yellow-600 dark:text-yellow-400",
        expired: () => "text-red-600 dark:text-red-400"
      },
      // Connection quality
      connection: {
        fast: () => "border-green-500 bg-green-50 dark:bg-green-900/20",
        slow: () => "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
        offline: () => "border-red-500 bg-red-50 dark:bg-red-900/20"
      }
    },
    // Core Web Vitals optimization
    webVitals: {
      // Largest Contentful Paint (LCP)
      lcp: {
        optimize: () => "will-change-contents",
        hero: () => "contain-layout will-change-contents",
        image: () => "object-cover will-change-auto"
      },
      // First Input Delay (FID) / Interaction to Next Paint (INP)
      interactivity: {
        optimize: () => "touch-manipulation select-none",
        debounced: () => "transition-none",
        throttled: () => "pointer-events-none transition-opacity duration-100",
        ready: () => "pointer-events-auto opacity-100"
      },
      // Cumulative Layout Shift (CLS)
      layoutStability: {
        // Prevent layout shifts
        stable: () => "aspect-square contain-layout",
        placeholder: () => "min-h-[200px] bg-gray-100 dark:bg-gray-800",
        skeleton: () => "animate-pulse bg-gray-200 dark:bg-gray-700",
        // Image container stability
        imageContainer: () => "overflow-hidden relative",
        imageStable: () => "absolute inset-0 object-cover"
      }
    },
    // Web3 Performance optimization
    web3: {
      // Wallet connection optimization
      wallet: {
        cached: () => "opacity-100 transition-opacity duration-200",
        connecting: () => "opacity-75 cursor-wait",
        staleData: () => "opacity-75",
        freshData: () => "opacity-100"
      },
      // Transaction optimization
      transaction: {
        // Batching indicators
        batched: () => "border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20",
        individual: () => "border-l-4 border-gray-500 bg-gray-50 dark:bg-gray-900/20",
        // Gas optimization
        gasOptimal: () => "text-green-600 dark:text-green-400",
        gasHigh: () => "text-yellow-600 dark:text-yellow-400",
        gasVeryHigh: () => "text-red-600 dark:text-red-400"
      },
      // Blockchain data optimization
      blockchain: {
        // Data freshness
        realtime: () => "border-green-500 bg-green-50 dark:bg-green-900/20",
        cached: () => "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
        stale: () => "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
        // Query optimization
        optimistic: () => "opacity-75 transition-opacity duration-200",
        confirmed: () => "opacity-100",
        refetching: () => "animate-pulse"
      }
    },
    // Monitoring and debugging
    monitoring: {
      // Performance metrics
      metrics: {
        good: () => "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20",
        needsImprovement: () => "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20",
        poor: () => "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20"
      },
      // Error boundaries
      errorBoundary: {
        container: () => "border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20 rounded-lg p-4",
        title: () => "text-lg font-semibold text-red-800 dark:text-red-200",
        message: () => "text-red-700 dark:text-red-300 mt-2",
        retry: () => "mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500",
        fallback: () => "text-center text-gray-500 dark:text-gray-400 py-8"
      }
    },
    // Resource optimization
    resource: {
      // Image optimization
      image: {
        // Responsive images
        responsive: () => "w-full h-auto object-cover",
        hero: () => "w-full h-[50vh] object-cover",
        thumbnail: () => "w-16 h-16 object-cover rounded",
        avatar: () => "w-10 h-10 object-cover rounded-full",
        // Loading states
        placeholder: () => "bg-gray-200 dark:bg-gray-700 animate-pulse",
        blurred: () => "filter blur-sm",
        sharp: () => "filter blur-none transition-all duration-300"
      },
      // Critical resources
      critical: {
        // Above the fold
        aboveFold: () => "will-change-contents",
        belowFold: () => "will-change-auto"
      }
    },
    // Database and API optimization
    data: {
      // Query optimization
      query: {
        cached: () => "opacity-100",
        loading: () => "opacity-75 animate-pulse",
        error: () => "opacity-50 text-red-600 dark:text-red-400",
        // REST optimization
        fresh: () => "border-l-2 border-green-500",
        stale: () => "border-l-2 border-yellow-500",
        invalid: () => "border-l-2 border-red-500",
        // Optimistic updates
        optimistic: () => "opacity-75",
        confirmed: () => "opacity-100",
        reverted: () => "opacity-50 line-through"
      },
      // Real-time optimization
      realtime: {
        // WebSocket states
        connected: () => "border-green-500 bg-green-50 dark:bg-green-900/20",
        connecting: () => "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
        disconnected: () => "border-red-500 bg-red-50 dark:bg-red-900/20",
        // Update indicators
        live: () => "animate-pulse text-green-600 dark:text-green-400",
        delayed: () => "text-yellow-600 dark:text-yellow-400",
        offline: () => "text-gray-500 dark:text-gray-400"
      }
    }
  }
};
class s {
  constructor(t) {
    this.fallbacks = /* @__PURE__ */ new Map(), this.variants = t, this.setupDefaultFallbacks();
  }
  setupDefaultFallbacks() {
    this.fallbacks.set("button.primary", "bg-blue-600 text-white px-4 py-2 rounded"), this.fallbacks.set("button.secondary", "bg-gray-200 text-gray-900 px-4 py-2 rounded"), this.fallbacks.set("button.outline", "border border-gray-300 text-gray-700 px-4 py-2 rounded"), this.fallbacks.set("alert.default", "bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded"), this.fallbacks.set("alert.destructive", "bg-red-50 border border-red-200 text-red-800 p-4 rounded"), this.fallbacks.set("input.default", "border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"), this.fallbacks.set("badge.default", "bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm");
  }
  /**
   * Get variant classes - the main API
   * Usage: variants.get('button', 'primary') or variants.get('button.primary')
   */
  get(t, a) {
    if (!a && t.includes(".")) {
      const [o, d] = t.split(".", 2);
      return this.get(o, d);
    }
    a || (a = "default");
    try {
      const o = this.variants[t];
      if (!o)
        return this.getFallback(t, a);
      const d = o[a];
      if (typeof d == "function")
        return d();
      if (typeof d == "string")
        return d;
      if (d && typeof d == "object") {
        if (typeof d.default == "function")
          return d.default();
        if (typeof d.default == "string")
          return d.default;
      }
      return this.getFallback(t, a);
    } catch (o) {
      return console.warn(`Failed to get variant ${t}.${a}:`, o), this.getFallback(t, a);
    }
  }
  /**
   * Get sized variant
   * Usage: variants.sized('button', 'primary', 'sm')
   */
  sized(t, a, o) {
    try {
      const n = this.variants[t]?.[a];
      if (n && typeof n == "object" && n[o]) {
        const l = n[o];
        if (typeof l == "function")
          return l();
        if (typeof l == "string")
          return l;
      }
      return this.get(t, a);
    } catch (d) {
      return console.warn(`Failed to get sized variant ${t}.${a}.${o}:`, d), this.get(t, a);
    }
  }
  /**
   * Get nested variant (for complex paths)
   * Usage: variants.nested('button.gradient.primary')
   */
  nested(t) {
    try {
      const a = t.split(".");
      let o = this.variants;
      for (const d of a)
        if (o = o?.[d], !o) break;
      return typeof o == "function" ? o() : typeof o == "string" ? o : o && typeof o.default == "function" ? o.default() : o && typeof o.default == "string" ? o.default : this.getFallback(a[0], a.slice(1).join("."));
    } catch (a) {
      return console.warn(`Failed to get nested variant ${t}:`, a), this.getFallback(t.split(".")[0], t.split(".").slice(1).join("."));
    }
  }
  /**
   * Conditional variant selection
   * Usage: variants.when(isError, 'alert', 'destructive', 'alert', 'default')
   */
  when(t, a, o, d, n) {
    return t ? this.get(a, o) : d && n ? this.get(d, n) : "";
  }
  /**
   * Combine multiple variants
   * Usage: variants.combine('button.primary', 'animations.hover', 'custom-class')
   */
  combine(...t) {
    return t.map((a) => a.includes(".") ? this.nested(a) : a).filter(Boolean).join(" ");
  }
  getFallback(t, a) {
    const o = `${t}.${a}`;
    return this.fallbacks.get(o) || this.fallbacks.get(`${t}.default`) || "";
  }
  /**
   * Add custom fallback
   */
  addFallback(t, a) {
    this.fallbacks.set(t, a);
  }
  /**
   * Check if variant exists
   */
  has(t, a) {
    try {
      const o = this.variants[t];
      return !!(o && o[a]);
    } catch {
      return !1;
    }
  }
}
function v(i) {
  return new s(i);
}
function $(i) {
  const t = new s(i);
  return {
    // Direct access functions
    button: (a, o) => o ? t.sized("button", a, o) : t.get("button", a),
    alert: (a) => t.get("alert", a),
    input: (a) => t.get("input", a),
    badge: (a) => t.get("badge", a),
    // Generic access
    get: (a, o) => t.get(a, o),
    nested: (a) => t.nested(a),
    when: (a, o, d, n, l) => t.when(a, o, d, n, l),
    combine: (...a) => t.combine(...a)
  };
}
const j = {
  // Layout utilities
  layout: {
    container: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    containerSmall: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8",
    containerLarge: "mx-auto max-w-full px-4 sm:px-6 lg:px-8",
    section: "py-8 sm:py-12 lg:py-16",
    sectionSmall: "py-6 sm:py-8 lg:py-10",
    flex: "flex items-center justify-between",
    flexCenter: "flex items-center justify-center",
    flexCol: "flex flex-col",
    grid: "grid grid-cols-1 gap-6",
    gridMd: "grid grid-cols-1 md:grid-cols-2 gap-6",
    gridLg: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  },
  // Background utilities
  background: {
    surface: "bg-white dark:bg-gray-800",
    subtle: "bg-gray-50 dark:bg-gray-900",
    muted: "bg-gray-100 dark:bg-gray-700",
    overlay: "bg-black/50 dark:bg-black/70"
  },
  // Border utilities
  border: {
    default: "border-gray-200 dark:border-gray-700",
    subtle: "border-gray-100 dark:border-gray-800",
    radius: "rounded-lg",
    radiusSm: "rounded-md",
    radiusLg: "rounded-xl",
    radiusFull: "rounded-full"
  },
  // Shadow utilities
  shadow: {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  },
  // Spacing utilities
  spacing: {
    card: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    },
    section: {
      sm: "py-6 px-4",
      md: "py-8 px-6",
      lg: "py-12 px-8"
    }
  },
  // Typography utilities - Enhanced with design system
  text: {
    // Headings
    h1: "text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight",
    h2: "text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight",
    h3: "text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
    h4: "text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
    h5: "text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
    h6: "text-base font-semibold text-gray-900 dark:text-white leading-tight tracking-tight",
    // Display headings
    display: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 dark:text-white leading-none tracking-tight",
    hero: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 dark:text-white leading-none tracking-tight",
    // Body text
    body: "text-base font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    bodyLarge: "text-lg font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    bodySmall: "text-sm font-normal text-gray-600 dark:text-gray-400 leading-relaxed",
    // Lead text (introductory paragraphs)
    lead: "text-xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    leadLarge: "text-2xl font-normal text-gray-700 dark:text-gray-300 leading-relaxed",
    // Specialized text
    caption: "text-sm font-normal text-gray-500 dark:text-gray-500 leading-normal",
    label: "text-sm font-medium text-gray-700 dark:text-gray-300",
    helper: "text-sm font-normal text-gray-500 dark:text-gray-500",
    // Links
    link: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 decoration-blue-600 dark:decoration-blue-400 transition-colors duration-150",
    linkSubtle: "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 no-underline hover:underline hover:underline-offset-2 transition-all duration-150",
    linkMuted: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 underline underline-offset-2 decoration-gray-400 hover:decoration-gray-600 transition-colors duration-150",
    // Code text
    code: "font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded",
    codeBlock: "font-mono text-sm font-normal text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto leading-relaxed",
    // Status text
    success: "text-green-700 dark:text-green-300 font-medium",
    warning: "text-amber-700 dark:text-amber-300 font-medium",
    error: "text-red-700 dark:text-red-300 font-medium",
    info: "text-blue-700 dark:text-blue-300 font-medium",
    // Emphasis variants
    emphasis: "font-medium text-gray-900 dark:text-gray-100",
    strong: "font-semibold text-gray-900 dark:text-gray-100",
    muted: "text-gray-500 dark:text-gray-500",
    // Uppercase labels
    uppercase: "text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider"
  },
  // Transition utilities
  transition: {
    default: "transition-colors duration-200",
    all: "transition-all duration-200",
    fast: "transition-all duration-150",
    slow: "transition-all duration-300",
    transform: "transition-transform duration-200"
  },
  // Interactive states
  states: {
    hover: "hover:opacity-80 transition-opacity duration-200",
    focus: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    loading: "animate-pulse"
  },
  // Web3 specific utilities
  web3: {
    walletButton: "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium",
    chainBadge: (i) => i === "ethereum" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" : "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    addressText: "font-mono text-sm text-gray-600 dark:text-gray-400"
  }
};
export {
  p as Colors,
  s as SimpleVariants,
  e as Tokens,
  f as Typography,
  w as Variants,
  c as buildColorClass,
  p as colors,
  h as combineTextStyles,
  g as componentColors,
  $ as createQuickVariants,
  k as createResponsiveText,
  m as createTextStyle,
  v as createVariants,
  e as designTokens,
  x as getColorClasses,
  u as semanticColors,
  f as textVariants,
  j as ui,
  w as variants
};
