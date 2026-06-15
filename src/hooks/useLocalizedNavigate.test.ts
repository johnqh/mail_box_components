import { describe, it, expect } from 'vitest';
import {
  addLanguageToPath,
  removeLanguageFromPath,
} from './useLocalizedNavigate';

describe('addLanguageToPath trailing-slash normalization', () => {
  it('adds the language prefix and no trailing slash to a bare path', () => {
    expect(addLanguageToPath('/techniques', 'en')).toBe('/en/techniques');
  });

  it('keeps nested paths slash-free', () => {
    expect(addLanguageToPath('/techniques/x-wing', 'en')).toBe(
      '/en/techniques/x-wing'
    );
  });

  it('strips a trailing slash from the path', () => {
    expect(addLanguageToPath('/techniques/', 'en')).toBe('/en/techniques');
  });

  it('keeps the language root slash-free (/en, not /en/)', () => {
    expect(addLanguageToPath('/', 'en')).toBe('/en');
  });

  it('strips the slash before a query string', () => {
    expect(addLanguageToPath('/login/?redirect=/en/play', 'en')).toBe(
      '/en/login?redirect=/en/play'
    );
  });

  it('strips the slash before a hash fragment', () => {
    expect(addLanguageToPath('/techniques/#fish', 'en')).toBe(
      '/en/techniques#fish'
    );
  });

  it('strips an existing language prefix before re-adding the target one', () => {
    expect(addLanguageToPath('/de/strategies', 'fr')).toBe('/fr/strategies');
  });

  it('handles a path with no leading slash', () => {
    expect(addLanguageToPath('techniques', 'ja')).toBe('/ja/techniques');
  });
});

describe('removeLanguageFromPath (unchanged behavior)', () => {
  it('removes a leading language segment', () => {
    expect(removeLanguageFromPath('/en/techniques')).toBe('/techniques');
  });

  it('leaves a non-language path intact', () => {
    expect(removeLanguageFromPath('/techniques')).toBe('/techniques');
  });
});
