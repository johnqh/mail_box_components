import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageRedirect } from './LanguageRedirect';

const isLanguageSupported = (lang: string) => /^[a-z]{2}(-[a-z]+)?$/.test(lang);

/** Renders the full path (pathname + search + hash) it currently sits at. */
function LocationProbe() {
  const loc = useLocation();
  return (
    <span data-testid='loc'>{`${loc.pathname}${loc.search}${loc.hash}`}</span>
  );
}

/** Renders LanguageRedirect at `entry` and returns the post-redirect full path. */
function redirectedTo(entry: string) {
  const redirect = (
    <LanguageRedirect
      isLanguageSupported={isLanguageSupported}
      defaultLanguage='en'
    />
  );
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path='/' element={redirect} />
        {/* Only the redirected /en/... target matches here, so the probe never
            swallows an unprefixed path as if "techniques" were the language. */}
        <Route path='/en/*' element={<LocationProbe />} />
        <Route path='*' element={redirect} />
      </Routes>
    </MemoryRouter>
  );
  return screen.getByTestId('loc').textContent ?? '';
}

describe('LanguageRedirect trailing-slash normalization', () => {
  beforeEach(() => {
    // Force the default-language path deterministically.
    localStorage.setItem('language', 'en');
  });

  it('redirects the root "/" to "/en" (no trailing slash)', () => {
    expect(redirectedTo('/')).toBe('/en');
  });

  it('redirects an unprefixed path to "/en/<path>" (no trailing slash)', () => {
    expect(redirectedTo('/techniques')).toBe('/en/techniques');
  });

  it('strips a trailing slash from the redirect target', () => {
    expect(redirectedTo('/techniques/')).toBe('/en/techniques');
  });

  it('preserves query strings (no trailing slash)', () => {
    expect(redirectedTo('/play?level=3')).toBe('/en/play?level=3');
  });

  it('preserves hash fragments (no trailing slash)', () => {
    expect(redirectedTo('/techniques#fish')).toBe('/en/techniques#fish');
  });
});
