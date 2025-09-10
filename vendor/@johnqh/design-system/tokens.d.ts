/**
 * Design Tokens
 *
 * Core design values that can be used across components.
 * These provide consistent spacing, typography, and other design properties.
 */
declare const designTokens: {
    readonly spacing: {
        readonly xs: "p-1";
        readonly sm: "p-2";
        readonly md: "p-4";
        readonly lg: "p-6";
        readonly xl: "p-8";
        readonly '2xl': "p-12";
        readonly '3xl': "p-16";
        readonly '4xl': "p-20";
        readonly '5xl': "p-24";
    };
    readonly margin: {
        readonly xs: "m-1";
        readonly sm: "m-2";
        readonly md: "m-4";
        readonly lg: "m-6";
        readonly xl: "m-8";
        readonly '2xl': "m-12";
        readonly '3xl': "m-16";
        readonly '4xl': "m-20";
        readonly '5xl': "m-24";
    };
    readonly padding: {
        readonly xs: "p-1";
        readonly sm: "p-2";
        readonly md: "p-4";
        readonly lg: "p-6";
        readonly xl: "p-8";
        readonly '2xl': "p-12";
        readonly '3xl': "p-16";
    };
    readonly gap: {
        readonly xs: "gap-1";
        readonly sm: "gap-2";
        readonly md: "gap-4";
        readonly lg: "gap-6";
        readonly xl: "gap-8";
        readonly '2xl': "gap-12";
        readonly '3xl': "gap-16";
    };
    readonly radius: {
        readonly none: "rounded-none";
        readonly sm: "rounded-sm";
        readonly md: "rounded-md";
        readonly lg: "rounded-lg";
        readonly xl: "rounded-xl";
        readonly '2xl': "rounded-2xl";
        readonly '3xl': "rounded-3xl";
        readonly full: "rounded-full";
    };
    readonly shadow: {
        readonly none: "shadow-none";
        readonly sm: "shadow-sm";
        readonly md: "shadow-md";
        readonly lg: "shadow-lg";
        readonly xl: "shadow-xl";
        readonly '2xl': "shadow-2xl";
    };
    readonly typography: {
        readonly family: {
            readonly sans: "font-sans";
            readonly serif: "font-serif";
            readonly mono: "font-mono";
            readonly display: "font-sans";
            readonly body: "font-sans";
        };
        readonly size: {
            readonly micro: "text-[10px]";
            readonly xs: "text-xs";
            readonly sm: "text-sm";
            readonly base: "text-base";
            readonly md: "text-base";
            readonly lg: "text-lg";
            readonly xl: "text-xl";
            readonly '2xl': "text-2xl";
            readonly '3xl': "text-3xl";
            readonly '4xl': "text-4xl";
            readonly '5xl': "text-5xl";
            readonly '6xl': "text-6xl";
            readonly '7xl': "text-7xl";
            readonly '8xl': "text-8xl";
            readonly '9xl': "text-9xl";
        };
        readonly semantic: {
            readonly caption: "text-xs";
            readonly small: "text-sm";
            readonly body: "text-base";
            readonly bodyLarge: "text-lg";
            readonly subheading: "text-xl";
            readonly h6: "text-base";
            readonly h5: "text-lg";
            readonly h4: "text-xl";
            readonly h3: "text-2xl";
            readonly h2: "text-3xl";
            readonly h1: "text-4xl";
            readonly display: "text-6xl";
            readonly hero: "text-8xl";
        };
        readonly weight: {
            readonly thin: "font-thin";
            readonly extralight: "font-extralight";
            readonly light: "font-light";
            readonly normal: "font-normal";
            readonly medium: "font-medium";
            readonly semibold: "font-semibold";
            readonly bold: "font-bold";
            readonly extrabold: "font-extrabold";
            readonly black: "font-black";
            readonly body: "font-normal";
            readonly emphasis: "font-medium";
            readonly strong: "font-semibold";
            readonly heading: "font-bold";
            readonly display: "font-extrabold";
        };
        readonly style: {
            readonly normal: "not-italic";
            readonly italic: "italic";
            readonly oblique: "italic";
        };
        readonly decoration: {
            readonly none: "no-underline";
            readonly underline: "underline";
            readonly overline: "overline";
            readonly lineThrough: "line-through";
        };
        readonly decorationStyle: {
            readonly solid: "decoration-solid";
            readonly double: "decoration-double";
            readonly dotted: "decoration-dotted";
            readonly dashed: "decoration-dashed";
            readonly wavy: "decoration-wavy";
        };
        readonly decorationThickness: {
            readonly auto: "decoration-auto";
            readonly fromFont: "decoration-from-font";
            readonly thin: "decoration-1";
            readonly medium: "decoration-2";
            readonly thick: "decoration-4";
        };
        readonly underlineOffset: {
            readonly auto: "underline-offset-auto";
            readonly small: "underline-offset-1";
            readonly medium: "underline-offset-2";
            readonly large: "underline-offset-4";
            readonly xl: "underline-offset-8";
        };
        readonly leading: {
            readonly none: "leading-none";
            readonly tight: "leading-tight";
            readonly snug: "leading-snug";
            readonly normal: "leading-normal";
            readonly relaxed: "leading-relaxed";
            readonly loose: "leading-loose";
            readonly heading: "leading-tight";
            readonly body: "leading-relaxed";
            readonly caption: "leading-normal";
            readonly display: "leading-none";
        };
        readonly tracking: {
            readonly tighter: "tracking-tighter";
            readonly tight: "tracking-tight";
            readonly normal: "tracking-normal";
            readonly wide: "tracking-wide";
            readonly wider: "tracking-wider";
            readonly widest: "tracking-widest";
            readonly heading: "tracking-tight";
            readonly body: "tracking-normal";
            readonly caption: "tracking-normal";
            readonly button: "tracking-wide";
            readonly uppercase: "tracking-wider";
        };
        readonly transform: {
            readonly none: "normal-case";
            readonly uppercase: "uppercase";
            readonly lowercase: "lowercase";
            readonly capitalize: "capitalize";
        };
        readonly align: {
            readonly left: "text-left";
            readonly center: "text-center";
            readonly right: "text-right";
            readonly justify: "text-justify";
            readonly start: "text-start";
            readonly end: "text-end";
        };
        readonly verticalAlign: {
            readonly baseline: "align-baseline";
            readonly top: "align-top";
            readonly middle: "align-middle";
            readonly bottom: "align-bottom";
            readonly textTop: "align-text-top";
            readonly textBottom: "align-text-bottom";
            readonly sub: "align-sub";
            readonly super: "align-super";
        };
        readonly whitespace: {
            readonly normal: "whitespace-normal";
            readonly nowrap: "whitespace-nowrap";
            readonly pre: "whitespace-pre";
            readonly preLine: "whitespace-pre-line";
            readonly preWrap: "whitespace-pre-wrap";
            readonly break: "whitespace-break-spaces";
        };
        readonly wordBreak: {
            readonly normal: "break-normal";
            readonly words: "break-words";
            readonly all: "break-all";
            readonly keep: "break-keep";
        };
        readonly overflow: {
            readonly clip: "text-clip";
            readonly ellipsis: "text-ellipsis";
        };
        readonly indent: {
            readonly none: "indent-0";
            readonly sm: "indent-1";
            readonly md: "indent-4";
            readonly lg: "indent-8";
        };
    };
    readonly animation: {
        readonly none: "duration-0";
        readonly fastest: "duration-75";
        readonly fast: "duration-150";
        readonly normal: "duration-200";
        readonly slow: "duration-300";
        readonly slower: "duration-500";
        readonly slowest: "duration-700";
    };
    readonly ease: {
        readonly linear: "ease-linear";
        readonly in: "ease-in";
        readonly out: "ease-out";
        readonly inOut: "ease-in-out";
    };
    readonly zIndex: {
        readonly auto: "z-auto";
        readonly base: "z-0";
        readonly docked: "z-10";
        readonly dropdown: "z-20";
        readonly sticky: "z-30";
        readonly banner: "z-40";
        readonly overlay: "z-50";
        readonly modal: "z-60";
        readonly popover: "z-70";
        readonly skipLink: "z-80";
        readonly toast: "z-90";
        readonly tooltip: "z-100";
    };
    readonly breakpoints: {
        readonly sm: "640px";
        readonly md: "768px";
        readonly lg: "1024px";
        readonly xl: "1280px";
        readonly '2xl': "1536px";
    };
    readonly grid: {
        readonly cols1: "grid-cols-1";
        readonly cols2: "grid-cols-2";
        readonly cols3: "grid-cols-3";
        readonly cols4: "grid-cols-4";
        readonly cols5: "grid-cols-5";
        readonly cols6: "grid-cols-6";
        readonly cols12: "grid-cols-12";
    };
    readonly gridResponsive: {
        readonly responsive2: "grid-cols-1 md:grid-cols-2";
        readonly responsive3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
        readonly responsive4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        readonly responsive6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
    };
    readonly flex: {
        readonly center: "flex items-center justify-center";
        readonly between: "flex items-center justify-between";
        readonly start: "flex items-center justify-start";
        readonly end: "flex items-center justify-end";
        readonly col: "flex flex-col";
        readonly colCenter: "flex flex-col items-center justify-center";
        readonly wrap: "flex flex-wrap";
    };
    readonly width: {
        readonly full: "w-full";
        readonly screen: "w-screen";
        readonly auto: "w-auto";
        readonly fit: "w-fit";
        readonly container: "w-full max-w-7xl mx-auto";
        readonly containerSm: "w-full max-w-3xl mx-auto";
        readonly containerLg: "w-full max-w-full mx-auto";
    };
    readonly height: {
        readonly full: "h-full";
        readonly screen: "h-screen";
        readonly auto: "h-auto";
        readonly fit: "h-fit";
        readonly min: "min-h-0";
        readonly minScreen: "min-h-screen";
    };
};
export { designTokens };
//# sourceMappingURL=tokens.d.ts.map