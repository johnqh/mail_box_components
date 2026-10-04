/**
 * Each Button variant draws its own design-system classes, never primary's.
 * `destructive-outline` used to look up `v.button['destructive-outline']`,
 * which does not exist, and fell through to primary — so under a red-primary
 * theme a "cancel"-style outline was a solid primary button. Sizes the design
 * system lacks (`destructive.large`, `ghost.large`) fell through the same way.
 */
import { render, screen } from '@testing-library/react';
import { configureTheme, variants as v } from '@sudobility/design';
import { swissTheme } from '@sudobility/design/themes';
import { Button, type ButtonProps } from '../ui/button';

type Variant = NonNullable<ButtonProps['variant']>;

/** Colour classes that identify each variant's look. */
const EXPECTED: Array<[Variant, () => string, string[]]> = [
  ['primary', () => v.button.primary.default(), ['bg-primary']],
  ['default', () => v.button.primary.default(), ['bg-primary']],
  ['secondary', () => v.button.secondary.default(), ['bg-secondary']],
  ['outline', () => v.button.outline.default(), ['border-input']],
  ['ghost', () => v.button.ghost.default(), ['bg-transparent']],
  ['destructive', () => v.button.destructive.default(), ['bg-destructive']],
  [
    'destructive-outline',
    () => v.button.destructive.outline(),
    ['text-destructive', 'border-destructive/30'],
  ],
  ['success', () => '', ['bg-success', 'text-success-foreground']],
  ['link', () => v.button.link.default(), ['text-primary']],
  // The design system's gradients are fixed hues; Button restates them.
  ['gradient', () => '', ['from-primary', 'text-primary-foreground']],
  ['gradient-secondary', () => '', ['from-secondary']],
  ['gradient-success', () => '', ['from-success']],
  ['connect', () => '', ['from-primary']],
  ['disconnect', () => v.button.web3.disconnect(), ['text-destructive']],
];

const PALETTE =
  /^(hover:|focus-visible:)?(bg|text|border|ring|from|to|via)-(white|black|gray|blue|purple|green|emerald|red)(-\d+)?$/;

const classesOf = (variant: Variant, size?: ButtonProps['size']) => {
  const { unmount } = render(
    <Button variant={variant} size={size}>
      b
    </Button>
  );
  const className = screen.getByRole('button').className.split(/\s+/);
  unmount();
  return className;
};

describe('Button variants map to their own design classes', () => {
  beforeAll(() => configureTheme(swissTheme));

  it.each(EXPECTED)('%s', (variant, design, marks) => {
    for (const size of [undefined, 'sm', 'lg'] as const) {
      const classes = classesOf(variant, size);
      for (const mark of marks) expect(classes).toContain(mark);
      if (variant !== 'primary' && variant !== 'default') {
        expect(classes).not.toContain('bg-primary');
      }
      expect(classes.filter(c => PALETTE.test(c))).toEqual([]);
      // Sanity: the expectation itself comes from the design system.
      if (design()) {
        for (const mark of marks) expect(design().split(' ')).toContain(mark);
      }
    }
  });
});
