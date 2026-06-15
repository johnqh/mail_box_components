import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { LocalizedLink } from './LocalizedLink';

/**
 * Renders a LocalizedLink at a given current URL and returns the rendered
 * anchor's href. The route is `/:lang/*` so useParams() picks up `lang`.
 */
function hrefFor(to: string, currentUrl = '/en/home', language?: string) {
  render(
    <MemoryRouter initialEntries={[currentUrl]}>
      <Routes>
        <Route
          path='/:lang/*'
          element={
            <LocalizedLink to={to} language={language}>
              link
            </LocalizedLink>
          }
        />
      </Routes>
    </MemoryRouter>
  );
  return screen.getByRole('link').getAttribute('href');
}

describe('LocalizedLink trailing-slash normalization', () => {
  it('adds the language prefix and no trailing slash to a bare path', () => {
    expect(hrefFor('/techniques')).toBe('/en/techniques');
  });

  it('keeps nested paths slash-free', () => {
    expect(hrefFor('/techniques/x-wing')).toBe('/en/techniques/x-wing');
  });

  it('strips a trailing slash from the path', () => {
    expect(hrefFor('/techniques/')).toBe('/en/techniques');
  });

  it('keeps the language root slash-free (/en, not /en/)', () => {
    expect(hrefFor('/')).toBe('/en');
  });

  it('strips the slash before a query string', () => {
    expect(hrefFor('/login/?redirect=/en/play')).toBe(
      '/en/login?redirect=/en/play'
    );
  });

  it('strips the slash before a hash fragment', () => {
    expect(hrefFor('/techniques/#fish')).toBe('/en/techniques#fish');
  });

  it('respects a language override', () => {
    expect(hrefFor('/strategies', '/en/home', 'de')).toBe('/de/strategies');
  });

  it('does not double-prefix a path that already includes the language', () => {
    expect(hrefFor('/en/techniques/')).toBe('/en/techniques');
  });

  it('derives the language from the current URL', () => {
    expect(hrefFor('/techniques', '/ja/home')).toBe('/ja/techniques');
  });
});
