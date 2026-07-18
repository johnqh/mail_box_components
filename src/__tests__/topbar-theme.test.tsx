import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { configureTheme, themes } from '@sudobility/design/themes';
import { Topbar } from '../layout/Topbar/Topbar';

// Reproduces the app bootstrap order: modules (and any module-level class
// strings) are evaluated on import, and configureTheme() only runs afterwards.
// The rendered background must still resolve to semantic theme classes.

describe('Topbar theming', () => {
  it('default variant uses semantic theme background when a theme is configured after import', () => {
    configureTheme(themes.cyberpunk);
    render(<Topbar variant='default'>content</Topbar>);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-card');
    expect(header.className).not.toContain('bg-white');
  });

  it('app variant uses semantic theme background when a theme is configured after import', () => {
    configureTheme(themes.cyberpunk);
    render(<Topbar variant='app'>content</Topbar>);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-card');
    expect(header.className).not.toContain('bg-white');
  });
});
