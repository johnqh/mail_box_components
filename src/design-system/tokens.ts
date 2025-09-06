/**
 * Design Tokens
 * 
 * Core design values that can be used across components.
 * These provide consistent spacing, typography, and other design properties.
 */

const designTokens = {
  // Spacing scale (based on 4px grid)
  spacing: {
    xs: 'p-1',      // 4px
    sm: 'p-2',      // 8px
    md: 'p-4',      // 16px
    lg: 'p-6',      // 24px
    xl: 'p-8',      // 32px
    '2xl': 'p-12',  // 48px
    '3xl': 'p-16',  // 64px
    '4xl': 'p-20',  // 80px
    '5xl': 'p-24',  // 96px
  },

  // Margin utilities
  margin: {
    xs: 'm-1',
    sm: 'm-2', 
    md: 'm-4',
    lg: 'm-6',
    xl: 'm-8',
    '2xl': 'm-12',
    '3xl': 'm-16',
    '4xl': 'm-20',
    '5xl': 'm-24',
  },

  // Padding utilities  
  padding: {
    xs: 'p-1',
    sm: 'p-2',
    md: 'p-4', 
    lg: 'p-6',
    xl: 'p-8',
    '2xl': 'p-12',
    '3xl': 'p-16',
  },

  // Gap utilities for flex/grid
  gap: {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4', 
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12',
    '3xl': 'gap-16',
  },

  // Border radius scale
  radius: {
    none: 'rounded-none',
    sm: 'rounded-sm',      // 2px
    md: 'rounded-md',      // 6px
    lg: 'rounded-lg',      // 8px
    xl: 'rounded-xl',      // 12px
    '2xl': 'rounded-2xl',  // 16px
    '3xl': 'rounded-3xl',  // 24px
    full: 'rounded-full',
  },

  // Shadow scale
  shadow: {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
  },

  // Typography scale
  typography: {
    // Font families
    family: {
      // Sans-serif fonts (default for UI)
      sans: 'font-sans',              // Inter, system-ui, sans-serif
      // Serif fonts (for editorial content)
      serif: 'font-serif',            // ui-serif, Georgia, serif
      // Monospace fonts (for code)
      mono: 'font-mono',              // ui-monospace, Menlo, Monaco, Consolas
      // Display fonts (for headings)
      display: 'font-sans',           // Same as sans for consistency
      // Body text font
      body: 'font-sans',              // Same as sans for consistency
    },

    // Font sizes with semantic names
    size: {
      // Micro text (10px)
      micro: 'text-[10px]',
      // Extra small (12px) 
      xs: 'text-xs',
      // Small (14px)
      sm: 'text-sm',
      // Base/Body (16px) - Default browser size
      base: 'text-base',
      md: 'text-base',                // Alias for base
      // Large (18px)
      lg: 'text-lg',
      // Extra large (20px)
      xl: 'text-xl',
      // 2X large (24px)
      '2xl': 'text-2xl',
      // 3X large (30px) 
      '3xl': 'text-3xl',
      // 4X large (36px)
      '4xl': 'text-4xl',
      // 5X large (48px)
      '5xl': 'text-5xl',
      // 6X large (60px)
      '6xl': 'text-6xl',
      // 7X large (72px)
      '7xl': 'text-7xl',
      // 8X large (96px)
      '8xl': 'text-8xl',
      // 9X large (128px)
      '9xl': 'text-9xl',
    },

    // Semantic font sizes for specific use cases
    semantic: {
      // Caption text
      caption: 'text-xs',             // 12px
      // Small body text
      small: 'text-sm',               // 14px
      // Regular body text
      body: 'text-base',              // 16px
      // Large body text
      bodyLarge: 'text-lg',           // 18px
      // Subheading text
      subheading: 'text-xl',          // 20px
      // Heading 6
      h6: 'text-base',                // 16px
      // Heading 5
      h5: 'text-lg',                  // 18px
      // Heading 4
      h4: 'text-xl',                  // 20px
      // Heading 3
      h3: 'text-2xl',                 // 24px
      // Heading 2
      h2: 'text-3xl',                 // 30px
      // Heading 1
      h1: 'text-4xl',                 // 36px
      // Display text (hero headings)
      display: 'text-6xl',            // 60px
      // Giant display text
      hero: 'text-8xl',               // 96px
    },
    
    // Font weights with semantic names
    weight: {
      // Numeric weights
      thin: 'font-thin',              // 100
      extralight: 'font-extralight',  // 200
      light: 'font-light',            // 300
      normal: 'font-normal',          // 400
      medium: 'font-medium',          // 500
      semibold: 'font-semibold',      // 600
      bold: 'font-bold',              // 700
      extrabold: 'font-extrabold',    // 800
      black: 'font-black',            // 900
      
      // Semantic weights
      body: 'font-normal',            // For body text
      emphasis: 'font-medium',        // For emphasized text
      strong: 'font-semibold',        // For strong text
      heading: 'font-bold',           // For headings
      display: 'font-extrabold',      // For display text
    },

    // Font styles
    style: {
      normal: 'not-italic',
      italic: 'italic',
      oblique: 'italic',              // Maps to italic (closest approximation)
    },

    // Text decoration
    decoration: {
      none: 'no-underline',
      underline: 'underline',
      overline: 'overline',
      lineThrough: 'line-through',
    },

    // Text decoration style
    decorationStyle: {
      solid: 'decoration-solid',
      double: 'decoration-double',
      dotted: 'decoration-dotted',
      dashed: 'decoration-dashed',
      wavy: 'decoration-wavy',
    },

    // Text decoration thickness
    decorationThickness: {
      auto: 'decoration-auto',
      fromFont: 'decoration-from-font',
      thin: 'decoration-1',
      medium: 'decoration-2',
      thick: 'decoration-4',
    },

    // Text underline offset
    underlineOffset: {
      auto: 'underline-offset-auto',
      small: 'underline-offset-1',
      medium: 'underline-offset-2',
      large: 'underline-offset-4',
      xl: 'underline-offset-8',
    },

    // Line heights with semantic names
    leading: {
      // Numeric values
      none: 'leading-none',           // 1
      tight: 'leading-tight',         // 1.25
      snug: 'leading-snug',           // 1.375
      normal: 'leading-normal',       // 1.5
      relaxed: 'leading-relaxed',     // 1.625
      loose: 'leading-loose',         // 2
      
      // Semantic values
      heading: 'leading-tight',       // For headings
      body: 'leading-relaxed',        // For body text
      caption: 'leading-normal',      // For captions
      display: 'leading-none',        // For display text
    },

    // Letter spacing with semantic names
    tracking: {
      // Numeric values
      tighter: 'tracking-tighter',    // -0.05em
      tight: 'tracking-tight',        // -0.025em
      normal: 'tracking-normal',      // 0em
      wide: 'tracking-wide',          // 0.025em
      wider: 'tracking-wider',        // 0.05em
      widest: 'tracking-widest',      // 0.1em
      
      // Semantic values
      heading: 'tracking-tight',      // For headings
      body: 'tracking-normal',        // For body text
      caption: 'tracking-normal',     // For captions
      button: 'tracking-wide',        // For button text
      uppercase: 'tracking-wider',    // For uppercase text
    },

    // Text transform
    transform: {
      none: 'normal-case',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    },

    // Text alignment
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
      start: 'text-start',
      end: 'text-end',
    },

    // Vertical alignment
    verticalAlign: {
      baseline: 'align-baseline',
      top: 'align-top',
      middle: 'align-middle',
      bottom: 'align-bottom',
      textTop: 'align-text-top',
      textBottom: 'align-text-bottom',
      sub: 'align-sub',
      super: 'align-super',
    },

    // White space handling
    whitespace: {
      normal: 'whitespace-normal',
      nowrap: 'whitespace-nowrap',
      pre: 'whitespace-pre',
      preLine: 'whitespace-pre-line',
      preWrap: 'whitespace-pre-wrap',
      break: 'whitespace-break-spaces',
    },

    // Word breaking
    wordBreak: {
      normal: 'break-normal',
      words: 'break-words',
      all: 'break-all',
      keep: 'break-keep',
    },

    // Text overflow
    overflow: {
      clip: 'text-clip',
      ellipsis: 'text-ellipsis',
    },

    // Text indent
    indent: {
      none: 'indent-0',
      sm: 'indent-1',
      md: 'indent-4',
      lg: 'indent-8',
    },
  },

  // Animation durations
  animation: {
    none: 'duration-0',
    fastest: 'duration-75',
    fast: 'duration-150',
    normal: 'duration-200',
    slow: 'duration-300',
    slower: 'duration-500',
    slowest: 'duration-700',
  },

  // Animation easing
  ease: {
    linear: 'ease-linear',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },

  // Z-index scale
  zIndex: {
    auto: 'z-auto',
    base: 'z-0',
    docked: 'z-10',
    dropdown: 'z-20',
    sticky: 'z-30',
    banner: 'z-40',
    overlay: 'z-50',
    modal: 'z-60',
    popover: 'z-70',
    skipLink: 'z-80',
    toast: 'z-90',
    tooltip: 'z-100',
  },

  // Breakpoints (for reference - these are handled by Tailwind)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Grid columns
  grid: {
    cols1: 'grid-cols-1',
    cols2: 'grid-cols-2',
    cols3: 'grid-cols-3',
    cols4: 'grid-cols-4',
    cols5: 'grid-cols-5',
    cols6: 'grid-cols-6',
    cols12: 'grid-cols-12',
  },

  // Responsive grid patterns
  gridResponsive: {
    responsive2: 'grid-cols-1 md:grid-cols-2',
    responsive3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    responsive4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    responsive6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  },

  // Flex utilities
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
    col: 'flex flex-col',
    colCenter: 'flex flex-col items-center justify-center',
    wrap: 'flex flex-wrap',
  },

  // Common width utilities
  width: {
    full: 'w-full',
    screen: 'w-screen',
    auto: 'w-auto',
    fit: 'w-fit',
    container: 'w-full max-w-7xl mx-auto',
    containerSm: 'w-full max-w-3xl mx-auto',
    containerLg: 'w-full max-w-full mx-auto',
  },

  // Common height utilities
  height: {
    full: 'h-full',
    screen: 'h-screen',
    auto: 'h-auto',
    fit: 'h-fit',
    min: 'min-h-0',
    minScreen: 'min-h-screen',
  },
} as const;

export { designTokens };