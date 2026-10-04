/**
 * Components follow a theme configured AFTER they were imported — the order
 * every app has, since its imports run before its own `configureTheme` call.
 * The design system's helpers answer fixed palette classes until a theme is
 * active; a component that read one at module scope kept them.
 */
import { render, screen } from '@testing-library/react';
import { configureTheme } from '@sudobility/design';
import { swissTheme } from '@sudobility/design/themes';
import { BodyText } from '../primitives/typography/typography';
import { Label } from '../forms/inputs/label';
import { KYCStatusBadge } from '../kyc/KYCStatusBadge';
import { StatusIndicator } from '../primitives/feedback/status-indicator';
import { BarChart } from '../charts/bar-chart';
import { LoginView } from '../core/auth/login-view';
import { TextLink } from '../primitives/typography/typography';
import { SmartLink } from '../ui/smart-link';
import { PageContainer } from '../ui/page-container';
import { StatCard } from '../ui/design-system-components';
import { Toast } from '../ui/toast/Toast';
import { FeatureGrid } from '../features/FeatureGrid';
import { seriesColors, themed } from '../lib/theme';

const PALETTE =
  /\b(bg|text|border)-(gray|slate|blue|green|red|orange|amber|purple)-\d{2,3}\b/;

describe('components follow a theme configured after import', () => {
  beforeAll(() => {
    configureTheme(swissTheme);
  });

  it('typography and label take semantic text colours', () => {
    render(
      <>
        <BodyText>body</BodyText>
        <Label>label</Label>
      </>
    );
    expect(screen.getByText('body').className).not.toMatch(PALETTE);
    expect(screen.getByText('label').className).not.toMatch(PALETTE);
  });

  it('KYC badge and status dot take semantic status colours', () => {
    const { container } = render(
      <>
        <KYCStatusBadge status='verified' level='basic' />
        <StatusIndicator status='success' />
      </>
    );
    expect(container.innerHTML).not.toMatch(PALETTE);
    expect(container.innerHTML).toContain('bg-success');
  });

  it("LoginView's fields and button take the theme's classes", () => {
    render(<LoginView onEmailSignIn={async () => {}} />);
    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button.className).toContain('bg-primary');
    for (const input of screen.getAllByRole('textbox')) {
      expect(input.className).not.toMatch(PALETTE);
    }
  });

  it('links, page, stat card, toast and feature cards take theme classes', () => {
    // Each of these built its classes at import, from the design system's
    // pre-theme palette (text-blue-600, bg-white, bg-green-50, bg-gray-50).
    const { container } = render(
      <PageContainer>
        <TextLink href='#'>text link</TextLink>
        <SmartLink href='https://example.com'>smart link</SmartLink>
        <StatCard label='Stat' value={1} trend='up' />
        <Toast
          toast={{ id: 't', type: 'success', message: 'saved' }}
          onDismiss={() => {}}
        />
        <FeatureGrid
          cardVariant='card'
          features={[{ icon: '*', title: 'F', description: 'd' }]}
        />
      </PageContainer>
    );
    expect(container.innerHTML).not.toMatch(PALETTE);
    expect(container.innerHTML).toContain('border-success');
  });

  it("a chart's default colour is the theme's primary", () => {
    const { container } = render(
      <BarChart data={[{ label: 'a', value: 1 }]} />
    );
    expect(container.innerHTML).toContain('var(--primary');
  });
});

describe('theme helpers', () => {
  it('themed() rebuilds when the active theme changes', () => {
    let builds = 0;
    const get = themed(() => ++builds);
    get();
    get();
    expect(builds).toBe(1);
    configureTheme({ ...swissTheme });
    get();
    expect(builds).toBe(2);
  });

  it('the first series colour follows the primary, with a fallback', () => {
    expect(seriesColors()[0]).toMatch(/^hsl\(var\(--chart-1, var\(--primary, /);
  });
});
