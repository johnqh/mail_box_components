/**
 * 0xmail.box Design System - Color Foundations
 *
 * This file defines the complete color system for the application with:
 * - Semantic color tokens that map to specific use cases
 * - Light and dark mode support
 * - Component-specific color variants
 * - Consistent color roles and hierarchy
 *
 * Usage:
 * import { colors } from '@/design-system/colors'
 * className={colors.button.primary}
 */
/**
 * Semantic color tokens - organized by purpose and context
 * These provide consistent theming across light and dark modes
 */
declare const semanticColors: {
    readonly text: {
        readonly primary: {
            readonly light: "#111827";
            readonly dark: "#ffffff";
        };
        readonly secondary: {
            readonly light: "#4b5563";
            readonly dark: "#9ca3af";
        };
        readonly tertiary: {
            readonly light: "#6b7280";
            readonly dark: "#6b7280";
        };
        readonly disabled: {
            readonly light: "#9ca3af";
            readonly dark: "#4b5563";
        };
        readonly inverse: {
            readonly light: "#ffffff";
            readonly dark: "#111827";
        };
        readonly link: {
            readonly light: "#2563eb";
            readonly dark: "#60a5fa";
        };
        readonly linkHover: {
            readonly light: "#1d4ed8";
            readonly dark: "#93c5fd";
        };
    };
    readonly background: {
        readonly primary: {
            readonly light: "#ffffff";
            readonly dark: "#111827";
        };
        readonly secondary: {
            readonly light: "#f9fafb";
            readonly dark: "#1f2937";
        };
        readonly tertiary: {
            readonly light: "#f3f4f6";
            readonly dark: "#374151";
        };
        readonly elevated: {
            readonly light: "#ffffff";
            readonly dark: "#1f2937";
        };
        readonly overlay: {
            readonly light: "rgba(0, 0, 0, 0.5)";
            readonly dark: "rgba(0, 0, 0, 0.7)";
        };
        readonly page: {
            readonly light: "#f9fafb";
            readonly dark: "#030712";
        };
    };
    readonly border: {
        readonly primary: {
            readonly light: "#e5e7eb";
            readonly dark: "#374151";
        };
        readonly secondary: {
            readonly light: "#f3f4f6";
            readonly dark: "#1f2937";
        };
        readonly focus: {
            readonly light: "#3b82f6";
            readonly dark: "#60a5fa";
        };
        readonly error: {
            readonly light: "#fca5a5";
            readonly dark: "#b91c1c";
        };
    };
    readonly brand: {
        readonly primary: {
            readonly light: "#2563eb";
            readonly dark: "#3b82f6";
        };
        readonly primaryHover: {
            readonly light: "#1d4ed8";
            readonly dark: "#60a5fa";
        };
        readonly secondary: {
            readonly light: "#9333ea";
            readonly dark: "#a855f7";
        };
        readonly secondaryHover: {
            readonly light: "#7c3aed";
            readonly dark: "#c084fc";
        };
    };
    readonly state: {
        readonly success: {
            readonly light: "#16a34a";
            readonly dark: "#22c55e";
        };
        readonly successBg: {
            readonly light: "#dcfce7";
            readonly dark: "#14532d/30";
        };
        readonly successText: {
            readonly light: "#15803d";
            readonly dark: "#86efac";
        };
        readonly warning: {
            readonly light: "#f59e0b";
            readonly dark: "#fbbf24";
        };
        readonly warningBg: {
            readonly light: "#fef3c7";
            readonly dark: "#78350f/30";
        };
        readonly warningText: {
            readonly light: "#b45309";
            readonly dark: "#fcd34d";
        };
        readonly error: {
            readonly light: "#dc2626";
            readonly dark: "#ef4444";
        };
        readonly errorBg: {
            readonly light: "#fee2e2";
            readonly dark: "#7f1d1d/30";
        };
        readonly errorText: {
            readonly light: "#b91c1c";
            readonly dark: "#fca5a5";
        };
        readonly info: {
            readonly light: "#2563eb";
            readonly dark: "#3b82f6";
        };
        readonly infoBg: {
            readonly light: "#dbeafe";
            readonly dark: "#1e3a8a/30";
        };
        readonly infoText: {
            readonly light: "#1d4ed8";
            readonly dark: "#93c5fd";
        };
        readonly selected: {
            readonly light: "#dbeafe";
            readonly dark: "#1e3a8a/30";
        };
    };
    readonly action: {
        readonly primary: {
            readonly light: "#2563eb";
            readonly dark: "#2563eb";
        };
        readonly primaryHover: {
            readonly light: "#1d4ed8";
            readonly dark: "#1d4ed8";
        };
        readonly secondary: {
            readonly light: "#f3f4f6";
            readonly dark: "#1f2937";
        };
        readonly danger: {
            readonly light: "#dc2626";
            readonly dark: "#dc2626";
        };
    };
    readonly web3: {
        readonly ethereum: {
            readonly light: "#627eea";
            readonly dark: "#4c63d2";
        };
        readonly ethereumBg: {
            readonly light: "#dbeafe";
            readonly dark: "#1e3a8a/30";
        };
        readonly solana: {
            readonly light: "#9945ff";
            readonly dark: "#7d37d9";
        };
        readonly solanaBg: {
            readonly light: "#f3e8ff";
            readonly dark: "#581c87/30";
        };
        readonly polygon: {
            readonly light: "#8247e5";
            readonly dark: "#6a3bc0";
        };
        readonly polygonBg: {
            readonly light: "#faf5ff";
            readonly dark: "#581c87/20";
        };
        readonly bitcoin: {
            readonly light: "#f7931a";
            readonly dark: "#e07f00";
        };
        readonly bitcoinBg: {
            readonly light: "#ffedd5";
            readonly dark: "#7c2d12/30";
        };
        readonly binance: {
            readonly light: "#f3ba2f";
            readonly dark: "#d4a423";
        };
        readonly binanceBg: {
            readonly light: "#fef3c7";
            readonly dark: "#78350f/30";
        };
        readonly cardano: {
            readonly light: "#0033ad";
            readonly dark: "#002488";
        };
        readonly cardanoBg: {
            readonly light: "#eff6ff";
            readonly dark: "#1e3a8a/20";
        };
        readonly avalanche: {
            readonly light: "#e84142";
            readonly dark: "#d1383a";
        };
        readonly avalancheBg: {
            readonly light: "#fee2e2";
            readonly dark: "#7f1d1d/30";
        };
        readonly arbitrum: {
            readonly light: "#2d374b";
            readonly dark: "#1e2532";
        };
        readonly arbitrumBg: {
            readonly light: "#f3f4f6";
            readonly dark: "#1f2937/50";
        };
        readonly optimism: {
            readonly light: "#ff0420";
            readonly dark: "#e6031c";
        };
        readonly optimismBg: {
            readonly light: "#fef2f2";
            readonly dark: "#7f1d1d/20";
        };
    };
};
/**
 * Component-specific color configurations
 * These provide ready-to-use Tailwind classes for components
 */
declare const componentColors: {
    readonly button: {
        readonly primary: {
            readonly base: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-transparent";
            readonly dark: "dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:text-white";
            readonly focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400";
            readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600";
        };
        readonly secondary: {
            readonly base: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 border-transparent";
            readonly dark: "dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 dark:text-gray-50";
            readonly focus: "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2";
            readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
        };
        readonly outline: {
            readonly base: "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-900 border-gray-300";
            readonly dark: "dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-50 dark:border-gray-600";
            readonly focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
            readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
        };
        readonly ghost: {
            readonly base: "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent";
            readonly dark: "dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300";
            readonly focus: "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2";
            readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
        };
        readonly destructive: {
            readonly base: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-transparent";
            readonly dark: "dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800 dark:text-white";
            readonly focus: "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";
            readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
        };
        readonly success: {
            readonly base: "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-transparent";
            readonly dark: "dark:bg-green-600 dark:hover:bg-green-700 dark:active:bg-green-800 dark:text-white";
            readonly focus: "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2";
            readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
        };
        readonly link: {
            readonly base: "bg-transparent hover:bg-transparent active:bg-transparent text-blue-600 border-transparent underline-offset-4 hover:underline";
            readonly dark: "dark:text-blue-400";
            readonly focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
            readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline";
        };
        readonly gradient: {
            readonly primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-transparent shadow-lg hover:shadow-xl";
            readonly secondary: "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border-transparent";
            readonly success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-transparent";
        };
    };
    readonly card: {
        readonly default: {
            readonly base: "bg-white border-gray-200";
            readonly dark: "dark:bg-gray-800 dark:border-gray-700";
            readonly hover: "hover:shadow-md transition-shadow duration-200";
        };
        readonly elevated: {
            readonly base: "bg-white shadow-sm border-gray-200";
            readonly dark: "dark:bg-gray-800 dark:border-gray-700";
            readonly hover: "hover:shadow-lg transition-shadow duration-200";
        };
        readonly interactive: {
            readonly base: "bg-white border-gray-200 cursor-pointer";
            readonly dark: "dark:bg-gray-800 dark:border-gray-700";
            readonly hover: "hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-700 transition-all duration-200";
            readonly focus: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
        };
        readonly success: {
            readonly base: "bg-green-50 border-green-200";
            readonly dark: "dark:bg-green-900/20 dark:border-green-800";
            readonly text: "text-green-800 dark:text-green-200";
        };
        readonly warning: {
            readonly base: "bg-amber-50 border-amber-200";
            readonly dark: "dark:bg-amber-900/20 dark:border-amber-800";
            readonly text: "text-amber-800 dark:text-amber-200";
        };
        readonly error: {
            readonly base: "bg-red-50 border-red-200";
            readonly dark: "dark:bg-red-900/20 dark:border-red-800";
            readonly text: "text-red-800 dark:text-red-200";
        };
    };
    readonly badge: {
        readonly default: {
            readonly base: "bg-gray-100 text-gray-800";
            readonly dark: "dark:bg-gray-800 dark:text-gray-300";
        };
        readonly primary: {
            readonly base: "bg-blue-100 text-blue-800";
            readonly dark: "dark:bg-blue-900/30 dark:text-blue-300";
        };
        readonly success: {
            readonly base: "bg-green-100 text-green-800";
            readonly dark: "dark:bg-green-900/30 dark:text-green-300";
        };
        readonly warning: {
            readonly base: "bg-amber-100 text-amber-800";
            readonly dark: "dark:bg-amber-900/30 dark:text-amber-300";
        };
        readonly error: {
            readonly base: "bg-red-100 text-red-800";
            readonly dark: "dark:bg-red-900/30 dark:text-red-300";
        };
        readonly ethereum: {
            readonly base: "bg-blue-100 text-blue-800";
            readonly dark: "dark:bg-blue-900/30 dark:text-blue-300";
        };
        readonly solana: {
            readonly base: "bg-purple-100 text-purple-800";
            readonly dark: "dark:bg-purple-900/30 dark:text-purple-300";
        };
        readonly polygon: {
            readonly base: "bg-purple-50 text-purple-800";
            readonly dark: "dark:bg-purple-900/20 dark:text-purple-300";
        };
        readonly bitcoin: {
            readonly base: "bg-orange-100 text-orange-800";
            readonly dark: "dark:bg-orange-900/30 dark:text-orange-300";
        };
        readonly binance: {
            readonly base: "bg-amber-100 text-amber-800";
            readonly dark: "dark:bg-amber-900/30 dark:text-amber-300";
        };
        readonly cardano: {
            readonly base: "bg-blue-50 text-blue-900";
            readonly dark: "dark:bg-blue-900/20 dark:text-blue-200";
        };
        readonly avalanche: {
            readonly base: "bg-red-100 text-red-800";
            readonly dark: "dark:bg-red-900/30 dark:text-red-300";
        };
        readonly arbitrum: {
            readonly base: "bg-gray-100 text-gray-800";
            readonly dark: "dark:bg-gray-800/50 dark:text-gray-300";
        };
        readonly optimism: {
            readonly base: "bg-red-50 text-red-900";
            readonly dark: "dark:bg-red-900/20 dark:text-red-200";
        };
    };
    readonly input: {
        readonly default: {
            readonly base: "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500";
            readonly dark: "dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400";
            readonly focus: "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400";
            readonly error: "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700";
        };
        readonly search: {
            readonly base: "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500";
            readonly dark: "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400";
            readonly focus: "focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:bg-gray-900";
        };
    };
    readonly alert: {
        readonly info: {
            readonly base: "bg-blue-50 border-blue-200 text-blue-800";
            readonly dark: "dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200";
            readonly icon: "text-blue-600 dark:text-blue-400";
        };
        readonly success: {
            readonly base: "bg-green-50 border-green-200 text-green-800";
            readonly dark: "dark:bg-green-900/20 dark:border-green-800 dark:text-green-200";
            readonly icon: "text-green-600 dark:text-green-400";
        };
        readonly warning: {
            readonly base: "bg-amber-50 border-amber-200 text-amber-800";
            readonly dark: "dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200";
            readonly icon: "text-amber-600 dark:text-amber-400";
        };
        readonly error: {
            readonly base: "bg-red-50 border-red-200 text-red-800";
            readonly dark: "dark:bg-red-900/20 dark:border-red-800 dark:text-red-200";
            readonly icon: "text-red-600 dark:text-red-400";
        };
    };
};
/**
 * Utility function to get complete color class string for a component variant
 * Combines base, dark, focus, and other states into a single string
 */
declare const getColorClasses: (component: keyof typeof componentColors, variant: string, states?: ("focus" | "hover" | "disabled" | "active")[]) => string;
/**
 * Utility to build custom color combinations
 */
declare const buildColorClass: (background: string, text: string, border?: string, states?: {
    hover?: {
        background?: string;
        text?: string;
        border?: string;
    };
    focus?: {
        ring?: string;
    };
    dark?: {
        background?: string;
        text?: string;
        border?: string;
    };
}) => string;
/**
 * Main colors export with organized structure
 */
declare const colors: {
    readonly raw: {
        readonly blue: {
            readonly 50: "#eff6ff";
            readonly 100: "#dbeafe";
            readonly 200: "#bfdbfe";
            readonly 300: "#93c5fd";
            readonly 400: "#60a5fa";
            readonly 500: "#3b82f6";
            readonly 600: "#2563eb";
            readonly 700: "#1d4ed8";
            readonly 800: "#1e40af";
            readonly 900: "#1e3a8a";
            readonly 950: "#172554";
        };
        readonly purple: {
            readonly 50: "#faf5ff";
            readonly 100: "#f3e8ff";
            readonly 200: "#e9d5ff";
            readonly 300: "#d8b4fe";
            readonly 400: "#c084fc";
            readonly 500: "#a855f7";
            readonly 600: "#9333ea";
            readonly 700: "#7c3aed";
            readonly 800: "#6b21a8";
            readonly 900: "#581c87";
            readonly 950: "#3b0764";
        };
        readonly neutral: {
            readonly 0: "#ffffff";
            readonly 50: "#f9fafb";
            readonly 100: "#f3f4f6";
            readonly 200: "#e5e7eb";
            readonly 300: "#d1d5db";
            readonly 400: "#9ca3af";
            readonly 500: "#6b7280";
            readonly 600: "#4b5563";
            readonly 700: "#374151";
            readonly 800: "#1f2937";
            readonly 900: "#111827";
            readonly 950: "#030712";
        };
        readonly red: {
            readonly 50: "#fef2f2";
            readonly 100: "#fee2e2";
            readonly 200: "#fecaca";
            readonly 300: "#fca5a5";
            readonly 400: "#f87171";
            readonly 500: "#ef4444";
            readonly 600: "#dc2626";
            readonly 700: "#b91c1c";
            readonly 800: "#991b1b";
            readonly 900: "#7f1d1d";
            readonly 950: "#450a0a";
        };
        readonly orange: {
            readonly 50: "#fff7ed";
            readonly 100: "#ffedd5";
            readonly 200: "#fed7aa";
            readonly 300: "#fdba74";
            readonly 400: "#fb923c";
            readonly 500: "#f97316";
            readonly 600: "#ea580c";
            readonly 700: "#c2410c";
            readonly 800: "#9a3412";
            readonly 900: "#7c2d12";
            readonly 950: "#431407";
        };
        readonly amber: {
            readonly 50: "#fffbeb";
            readonly 100: "#fef3c7";
            readonly 200: "#fde68a";
            readonly 300: "#fcd34d";
            readonly 400: "#fbbf24";
            readonly 500: "#f59e0b";
            readonly 600: "#d97706";
            readonly 700: "#b45309";
            readonly 800: "#92400e";
            readonly 900: "#78350f";
            readonly 950: "#451a03";
        };
        readonly green: {
            readonly 50: "#f0fdf4";
            readonly 100: "#dcfce7";
            readonly 200: "#bbf7d0";
            readonly 300: "#86efac";
            readonly 400: "#4ade80";
            readonly 500: "#22c55e";
            readonly 600: "#16a34a";
            readonly 700: "#15803d";
            readonly 800: "#166534";
            readonly 900: "#14532d";
            readonly 950: "#052e16";
        };
        readonly web3: {
            readonly ethereum: {
                readonly light: "#627eea";
                readonly DEFAULT: "#627eea";
                readonly dark: "#4c63d2";
            };
            readonly solana: {
                readonly light: "#9945ff";
                readonly DEFAULT: "#9945ff";
                readonly dark: "#7d37d9";
            };
            readonly polygon: {
                readonly light: "#8247e5";
                readonly DEFAULT: "#8247e5";
                readonly dark: "#6a3bc0";
            };
            readonly bitcoin: {
                readonly light: "#f7931a";
                readonly DEFAULT: "#f7931a";
                readonly dark: "#e07f00";
            };
            readonly binance: {
                readonly light: "#f3ba2f";
                readonly DEFAULT: "#f3ba2f";
                readonly dark: "#d4a423";
            };
            readonly cardano: {
                readonly light: "#0033ad";
                readonly DEFAULT: "#0033ad";
                readonly dark: "#002488";
            };
            readonly avalanche: {
                readonly light: "#e84142";
                readonly DEFAULT: "#e84142";
                readonly dark: "#d1383a";
            };
            readonly fantom: {
                readonly light: "#1969ff";
                readonly DEFAULT: "#1969ff";
                readonly dark: "#0052ff";
            };
            readonly arbitrum: {
                readonly light: "#2d374b";
                readonly DEFAULT: "#2d374b";
                readonly dark: "#1e2532";
            };
            readonly optimism: {
                readonly light: "#ff0420";
                readonly DEFAULT: "#ff0420";
                readonly dark: "#e6031c";
            };
            readonly chainlink: {
                readonly light: "#375bd2";
                readonly DEFAULT: "#375bd2";
                readonly dark: "#2d4bb5";
            };
            readonly cosmos: {
                readonly light: "#2e3148";
                readonly DEFAULT: "#2e3148";
                readonly dark: "#1f2030";
            };
            readonly polkadot: {
                readonly light: "#e6007a";
                readonly DEFAULT: "#e6007a";
                readonly dark: "#cc006e";
            };
        };
    };
    readonly semantic: {
        readonly text: {
            readonly primary: {
                readonly light: "#111827";
                readonly dark: "#ffffff";
            };
            readonly secondary: {
                readonly light: "#4b5563";
                readonly dark: "#9ca3af";
            };
            readonly tertiary: {
                readonly light: "#6b7280";
                readonly dark: "#6b7280";
            };
            readonly disabled: {
                readonly light: "#9ca3af";
                readonly dark: "#4b5563";
            };
            readonly inverse: {
                readonly light: "#ffffff";
                readonly dark: "#111827";
            };
            readonly link: {
                readonly light: "#2563eb";
                readonly dark: "#60a5fa";
            };
            readonly linkHover: {
                readonly light: "#1d4ed8";
                readonly dark: "#93c5fd";
            };
        };
        readonly background: {
            readonly primary: {
                readonly light: "#ffffff";
                readonly dark: "#111827";
            };
            readonly secondary: {
                readonly light: "#f9fafb";
                readonly dark: "#1f2937";
            };
            readonly tertiary: {
                readonly light: "#f3f4f6";
                readonly dark: "#374151";
            };
            readonly elevated: {
                readonly light: "#ffffff";
                readonly dark: "#1f2937";
            };
            readonly overlay: {
                readonly light: "rgba(0, 0, 0, 0.5)";
                readonly dark: "rgba(0, 0, 0, 0.7)";
            };
            readonly page: {
                readonly light: "#f9fafb";
                readonly dark: "#030712";
            };
        };
        readonly border: {
            readonly primary: {
                readonly light: "#e5e7eb";
                readonly dark: "#374151";
            };
            readonly secondary: {
                readonly light: "#f3f4f6";
                readonly dark: "#1f2937";
            };
            readonly focus: {
                readonly light: "#3b82f6";
                readonly dark: "#60a5fa";
            };
            readonly error: {
                readonly light: "#fca5a5";
                readonly dark: "#b91c1c";
            };
        };
        readonly brand: {
            readonly primary: {
                readonly light: "#2563eb";
                readonly dark: "#3b82f6";
            };
            readonly primaryHover: {
                readonly light: "#1d4ed8";
                readonly dark: "#60a5fa";
            };
            readonly secondary: {
                readonly light: "#9333ea";
                readonly dark: "#a855f7";
            };
            readonly secondaryHover: {
                readonly light: "#7c3aed";
                readonly dark: "#c084fc";
            };
        };
        readonly state: {
            readonly success: {
                readonly light: "#16a34a";
                readonly dark: "#22c55e";
            };
            readonly successBg: {
                readonly light: "#dcfce7";
                readonly dark: "#14532d/30";
            };
            readonly successText: {
                readonly light: "#15803d";
                readonly dark: "#86efac";
            };
            readonly warning: {
                readonly light: "#f59e0b";
                readonly dark: "#fbbf24";
            };
            readonly warningBg: {
                readonly light: "#fef3c7";
                readonly dark: "#78350f/30";
            };
            readonly warningText: {
                readonly light: "#b45309";
                readonly dark: "#fcd34d";
            };
            readonly error: {
                readonly light: "#dc2626";
                readonly dark: "#ef4444";
            };
            readonly errorBg: {
                readonly light: "#fee2e2";
                readonly dark: "#7f1d1d/30";
            };
            readonly errorText: {
                readonly light: "#b91c1c";
                readonly dark: "#fca5a5";
            };
            readonly info: {
                readonly light: "#2563eb";
                readonly dark: "#3b82f6";
            };
            readonly infoBg: {
                readonly light: "#dbeafe";
                readonly dark: "#1e3a8a/30";
            };
            readonly infoText: {
                readonly light: "#1d4ed8";
                readonly dark: "#93c5fd";
            };
            readonly selected: {
                readonly light: "#dbeafe";
                readonly dark: "#1e3a8a/30";
            };
        };
        readonly action: {
            readonly primary: {
                readonly light: "#2563eb";
                readonly dark: "#2563eb";
            };
            readonly primaryHover: {
                readonly light: "#1d4ed8";
                readonly dark: "#1d4ed8";
            };
            readonly secondary: {
                readonly light: "#f3f4f6";
                readonly dark: "#1f2937";
            };
            readonly danger: {
                readonly light: "#dc2626";
                readonly dark: "#dc2626";
            };
        };
        readonly web3: {
            readonly ethereum: {
                readonly light: "#627eea";
                readonly dark: "#4c63d2";
            };
            readonly ethereumBg: {
                readonly light: "#dbeafe";
                readonly dark: "#1e3a8a/30";
            };
            readonly solana: {
                readonly light: "#9945ff";
                readonly dark: "#7d37d9";
            };
            readonly solanaBg: {
                readonly light: "#f3e8ff";
                readonly dark: "#581c87/30";
            };
            readonly polygon: {
                readonly light: "#8247e5";
                readonly dark: "#6a3bc0";
            };
            readonly polygonBg: {
                readonly light: "#faf5ff";
                readonly dark: "#581c87/20";
            };
            readonly bitcoin: {
                readonly light: "#f7931a";
                readonly dark: "#e07f00";
            };
            readonly bitcoinBg: {
                readonly light: "#ffedd5";
                readonly dark: "#7c2d12/30";
            };
            readonly binance: {
                readonly light: "#f3ba2f";
                readonly dark: "#d4a423";
            };
            readonly binanceBg: {
                readonly light: "#fef3c7";
                readonly dark: "#78350f/30";
            };
            readonly cardano: {
                readonly light: "#0033ad";
                readonly dark: "#002488";
            };
            readonly cardanoBg: {
                readonly light: "#eff6ff";
                readonly dark: "#1e3a8a/20";
            };
            readonly avalanche: {
                readonly light: "#e84142";
                readonly dark: "#d1383a";
            };
            readonly avalancheBg: {
                readonly light: "#fee2e2";
                readonly dark: "#7f1d1d/30";
            };
            readonly arbitrum: {
                readonly light: "#2d374b";
                readonly dark: "#1e2532";
            };
            readonly arbitrumBg: {
                readonly light: "#f3f4f6";
                readonly dark: "#1f2937/50";
            };
            readonly optimism: {
                readonly light: "#ff0420";
                readonly dark: "#e6031c";
            };
            readonly optimismBg: {
                readonly light: "#fef2f2";
                readonly dark: "#7f1d1d/20";
            };
        };
    };
    readonly component: {
        readonly button: {
            readonly primary: {
                readonly base: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-transparent";
                readonly dark: "dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:text-white";
                readonly focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400";
                readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600";
            };
            readonly secondary: {
                readonly base: "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 border-transparent";
                readonly dark: "dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 dark:text-gray-50";
                readonly focus: "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2";
                readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
            };
            readonly outline: {
                readonly base: "bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-900 border-gray-300";
                readonly dark: "dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-50 dark:border-gray-600";
                readonly focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
                readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
            };
            readonly ghost: {
                readonly base: "bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border-transparent";
                readonly dark: "dark:bg-transparent dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300";
                readonly focus: "focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2";
                readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
            };
            readonly destructive: {
                readonly base: "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border-transparent";
                readonly dark: "dark:bg-red-600 dark:hover:bg-red-700 dark:active:bg-red-800 dark:text-white";
                readonly focus: "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2";
                readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
            };
            readonly success: {
                readonly base: "bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border-transparent";
                readonly dark: "dark:bg-green-600 dark:hover:bg-green-700 dark:active:bg-green-800 dark:text-white";
                readonly focus: "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2";
                readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed";
            };
            readonly link: {
                readonly base: "bg-transparent hover:bg-transparent active:bg-transparent text-blue-600 border-transparent underline-offset-4 hover:underline";
                readonly dark: "dark:text-blue-400";
                readonly focus: "focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
                readonly disabled: "disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline";
            };
            readonly gradient: {
                readonly primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-transparent shadow-lg hover:shadow-xl";
                readonly secondary: "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-900 border-transparent";
                readonly success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-transparent";
            };
        };
        readonly card: {
            readonly default: {
                readonly base: "bg-white border-gray-200";
                readonly dark: "dark:bg-gray-800 dark:border-gray-700";
                readonly hover: "hover:shadow-md transition-shadow duration-200";
            };
            readonly elevated: {
                readonly base: "bg-white shadow-sm border-gray-200";
                readonly dark: "dark:bg-gray-800 dark:border-gray-700";
                readonly hover: "hover:shadow-lg transition-shadow duration-200";
            };
            readonly interactive: {
                readonly base: "bg-white border-gray-200 cursor-pointer";
                readonly dark: "dark:bg-gray-800 dark:border-gray-700";
                readonly hover: "hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-700 transition-all duration-200";
                readonly focus: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
            };
            readonly success: {
                readonly base: "bg-green-50 border-green-200";
                readonly dark: "dark:bg-green-900/20 dark:border-green-800";
                readonly text: "text-green-800 dark:text-green-200";
            };
            readonly warning: {
                readonly base: "bg-amber-50 border-amber-200";
                readonly dark: "dark:bg-amber-900/20 dark:border-amber-800";
                readonly text: "text-amber-800 dark:text-amber-200";
            };
            readonly error: {
                readonly base: "bg-red-50 border-red-200";
                readonly dark: "dark:bg-red-900/20 dark:border-red-800";
                readonly text: "text-red-800 dark:text-red-200";
            };
        };
        readonly badge: {
            readonly default: {
                readonly base: "bg-gray-100 text-gray-800";
                readonly dark: "dark:bg-gray-800 dark:text-gray-300";
            };
            readonly primary: {
                readonly base: "bg-blue-100 text-blue-800";
                readonly dark: "dark:bg-blue-900/30 dark:text-blue-300";
            };
            readonly success: {
                readonly base: "bg-green-100 text-green-800";
                readonly dark: "dark:bg-green-900/30 dark:text-green-300";
            };
            readonly warning: {
                readonly base: "bg-amber-100 text-amber-800";
                readonly dark: "dark:bg-amber-900/30 dark:text-amber-300";
            };
            readonly error: {
                readonly base: "bg-red-100 text-red-800";
                readonly dark: "dark:bg-red-900/30 dark:text-red-300";
            };
            readonly ethereum: {
                readonly base: "bg-blue-100 text-blue-800";
                readonly dark: "dark:bg-blue-900/30 dark:text-blue-300";
            };
            readonly solana: {
                readonly base: "bg-purple-100 text-purple-800";
                readonly dark: "dark:bg-purple-900/30 dark:text-purple-300";
            };
            readonly polygon: {
                readonly base: "bg-purple-50 text-purple-800";
                readonly dark: "dark:bg-purple-900/20 dark:text-purple-300";
            };
            readonly bitcoin: {
                readonly base: "bg-orange-100 text-orange-800";
                readonly dark: "dark:bg-orange-900/30 dark:text-orange-300";
            };
            readonly binance: {
                readonly base: "bg-amber-100 text-amber-800";
                readonly dark: "dark:bg-amber-900/30 dark:text-amber-300";
            };
            readonly cardano: {
                readonly base: "bg-blue-50 text-blue-900";
                readonly dark: "dark:bg-blue-900/20 dark:text-blue-200";
            };
            readonly avalanche: {
                readonly base: "bg-red-100 text-red-800";
                readonly dark: "dark:bg-red-900/30 dark:text-red-300";
            };
            readonly arbitrum: {
                readonly base: "bg-gray-100 text-gray-800";
                readonly dark: "dark:bg-gray-800/50 dark:text-gray-300";
            };
            readonly optimism: {
                readonly base: "bg-red-50 text-red-900";
                readonly dark: "dark:bg-red-900/20 dark:text-red-200";
            };
        };
        readonly input: {
            readonly default: {
                readonly base: "bg-white border-gray-300 text-gray-900 placeholder:text-gray-500";
                readonly dark: "dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-400";
                readonly focus: "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400";
                readonly error: "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-700";
            };
            readonly search: {
                readonly base: "bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-500";
                readonly dark: "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400";
                readonly focus: "focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:bg-gray-900";
            };
        };
        readonly alert: {
            readonly info: {
                readonly base: "bg-blue-50 border-blue-200 text-blue-800";
                readonly dark: "dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200";
                readonly icon: "text-blue-600 dark:text-blue-400";
            };
            readonly success: {
                readonly base: "bg-green-50 border-green-200 text-green-800";
                readonly dark: "dark:bg-green-900/20 dark:border-green-800 dark:text-green-200";
                readonly icon: "text-green-600 dark:text-green-400";
            };
            readonly warning: {
                readonly base: "bg-amber-50 border-amber-200 text-amber-800";
                readonly dark: "dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-200";
                readonly icon: "text-amber-600 dark:text-amber-400";
            };
            readonly error: {
                readonly base: "bg-red-50 border-red-200 text-red-800";
                readonly dark: "dark:bg-red-900/20 dark:border-red-800 dark:text-red-200";
                readonly icon: "text-red-600 dark:text-red-400";
            };
        };
    };
    readonly utils: {
        readonly getColorClasses: (component: keyof typeof componentColors, variant: string, states?: ("focus" | "hover" | "disabled" | "active")[]) => string;
        readonly buildColorClass: (background: string, text: string, border?: string, states?: {
            hover?: {
                background?: string;
                text?: string;
                border?: string;
            };
            focus?: {
                ring?: string;
            };
            dark?: {
                background?: string;
                text?: string;
                border?: string;
            };
        }) => string;
    };
};
export { colors, semanticColors, componentColors, getColorClasses, buildColorClass };
//# sourceMappingURL=colors.d.ts.map