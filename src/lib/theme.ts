import { getActiveTheme } from '@sudobility/design';

/*
  `@sudobility/design`'s class helpers (`colors.component.*`, `ui.*`,
  `textVariants.*`, `variants.*`) are getters: they answer the active theme's
  semantic classes (`bg-primary`, `text-muted-foreground`) once a host has
  called `configureTheme`, and a fixed gray/blue palette before that. Reading
  one at module scope therefore freezes whatever was true when this module was
  imported — which in an app is before its own `configureTheme` call runs,
  since imports are evaluated first. These helpers defer the read to render
  time and rebuild only when the active theme changes.
*/

const UNBUILT = Symbol('unbuilt');

/**
 * A value built from the design system's theme-dependent helpers, read on use
 * rather than at import. Rebuilt whenever the active theme changes.
 */
export function themed<T>(build: () => T): () => T {
  let builtFor: unknown = UNBUILT;
  let value: T;
  return () => {
    const theme = getActiveTheme();
    if (builtFor !== theme) {
      value = build();
      builtFor = theme;
    }
    return value;
  };
}

/**
 * A `cva` (or any class-name function) whose definition reads the design
 * system's helpers. Same signature as the function `build` returns, so
 * `VariantProps<typeof x>` still works.
 */
export function themedCva<F extends (...args: never[]) => string>(
  build: () => F
): F {
  const get = themed(build);
  return ((...args: Parameters<F>) => get()(...args)) as F;
}

/** A semantic colour token the theme CSS defines as `--<token>: H S% L%`. */
export type ThemeColorToken =
  | 'primary'
  | 'primary-foreground'
  | 'secondary'
  | 'accent'
  | 'muted'
  | 'muted-foreground'
  | 'foreground'
  | 'background'
  | 'card'
  | 'border'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info';

/**
 * A CSS colour for an SVG attribute or inline style that follows the theme:
 * `hsl(var(--primary, <fallback>))`. The fallback, in the same `H S% L%` form,
 * is used when no theme CSS is on the page.
 */
export function themeColor(
  token: ThemeColorToken,
  fallbackHsl: string
): string {
  return `hsl(var(--${token}, ${fallbackHsl}))`;
}

/*
  Categorical series — charts, confetti — need hues that stay apart from one
  another, which the theme's semantic colours do not promise: Swiss's
  destructive is its primary, and its accent is near-white. So the first
  series follows the theme (`--chart-1`, else `--primary`) and the rest keep
  a fixed, distinct palette (green, amber, purple, orange, cyan at 500 —
  skipping blue and red, the two primaries most themes use). A theme can
  replace any of them by defining `--chart-N`, the shadcn convention.
*/
const SERIES_FALLBACKS = [
  '142.1 70.6% 45.3%',
  '37.7 92.1% 50.2%',
  '270.7 91% 65.1%',
  '24.6 95% 53.1%',
  '188.7 94.5% 42.7%',
];

/** The theme's primary, as `H S% L%`, when no theme CSS is on the page (blue-500). */
export const PRIMARY_FALLBACK = '217.2 91.2% 59.8%';

/** The series palette as CSS colours, for SVG attributes and inline styles. */
export function seriesColors(): string[] {
  return [
    `hsl(var(--chart-1, var(--primary, ${PRIMARY_FALLBACK})))`,
    ...SERIES_FALLBACKS.map((f, i) => `hsl(var(--chart-${i + 2}, ${f}))`),
  ];
}

/*
  Status colours as the theme's semantic classes. The design system's
  `getStatusIndicatorColor` and `SEMANTIC_COLOR_MAP` answer fixed palette
  classes (`bg-green-500`, `text-blue-600`) whatever the theme. Written out in
  full, never assembled, so a consuming app's Tailwind scan finds them.
*/
export type StatusTone =
  | 'success'
  | 'error'
  | 'warning'
  | 'attention'
  | 'info'
  | 'neutral';

/** A solid status fill: a dot, a bar, a filled badge. */
export const STATUS_BG: Record<StatusTone, string> = {
  success: 'bg-success',
  error: 'bg-destructive',
  warning: 'bg-warning',
  attention: 'bg-warning',
  info: 'bg-info',
  neutral: 'bg-muted-foreground',
};

/** Text or an icon in the status colour. */
export const STATUS_TEXT: Record<StatusTone, string> = {
  success: 'text-success',
  error: 'text-destructive',
  warning: 'text-warning',
  attention: 'text-warning',
  info: 'text-info',
  neutral: 'text-muted-foreground',
};

/** A border in the status colour. */
export const STATUS_BORDER: Record<StatusTone, string> = {
  success: 'border-success',
  error: 'border-destructive',
  warning: 'border-warning',
  attention: 'border-warning',
  info: 'border-info',
  neutral: 'border-muted-foreground',
};

/** Text or an icon drawn on a {@link STATUS_BG} fill. */
export const STATUS_ON_BG: Record<StatusTone, string> = {
  success: 'text-success-foreground',
  error: 'text-destructive-foreground',
  warning: 'text-warning-foreground',
  attention: 'text-warning-foreground',
  info: 'text-info-foreground',
  neutral: 'text-background',
};

/*
  Progress stripes. Tailwind has no stripe utility and this library ships no
  CSS, so a `bg-stripe` class resolved to nothing: the stripes are an inline
  gradient instead, drawn in the theme's background at a quarter strength so
  they lighten a fill in light mode and darken it in dark, on any fill colour.
*/
const STRIPE_INK = 'hsl(var(--background, 0 0% 100%) / 0.25)';

/** Inline style for a striped progress fill. */
export const STRIPE_STYLE: { backgroundImage: string; backgroundSize: string } =
  {
    backgroundImage: `linear-gradient(45deg, ${STRIPE_INK} 25%, transparent 25%, transparent 50%, ${STRIPE_INK} 50%, ${STRIPE_INK} 75%, transparent 75%, transparent)`,
    backgroundSize: '1rem 1rem',
  };

/**
 * Moves an element's stripes along, through the Web Animations API rather
 * than a keyframes class a consuming app would have to define. A no-op where
 * the API is missing (jsdom, very old browsers) or the user prefers reduced
 * motion.
 */
export function animateStripes(element: HTMLElement | null): () => void {
  if (!element || typeof element.animate !== 'function') return () => {};
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return () => {};
  }
  const animation = element.animate(
    [{ backgroundPosition: '1rem 0' }, { backgroundPosition: '0 0' }],
    { duration: 1000, iterations: Infinity, easing: 'linear' }
  );
  return () => animation.cancel();
}

/**
 * A theme colour resolved to a literal `hsl(...)` now, for places a CSS
 * variable cannot reach — a data-URI image is its own document and sees none
 * of the page's custom properties. Reads `--<token>` from the root element;
 * the fallback (`H S% L%`) where there is no document or no theme CSS.
 */
export function resolveThemeColor(
  token: ThemeColorToken,
  fallbackHsl: string
): string {
  let value = '';
  if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    value = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue(`--${token}`)
      .trim();
  }
  return `hsl(${value || fallbackHsl})`;
}
