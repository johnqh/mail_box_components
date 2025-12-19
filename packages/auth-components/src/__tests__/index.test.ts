import { describe, it, expect } from 'vitest';
import {
  AuthProvider,
  useAuthStatus,
  createDefaultErrorTexts,
  AuthModal,
  AuthInline,
  AuthAction,
  Avatar,
} from '../index';

describe('auth-components exports', () => {
  it('exports AuthProvider', () => {
    expect(AuthProvider).toBeDefined();
  });

  it('exports useAuthStatus hook', () => {
    expect(useAuthStatus).toBeDefined();
  });

  it('exports createDefaultErrorTexts', () => {
    expect(createDefaultErrorTexts).toBeDefined();
    const texts = createDefaultErrorTexts();
    expect(texts['auth/user-not-found']).toBeDefined();
    expect(texts.default).toBeDefined();
  });

  it('exports AuthModal', () => {
    expect(AuthModal).toBeDefined();
  });

  it('exports AuthInline', () => {
    expect(AuthInline).toBeDefined();
  });

  it('exports AuthAction', () => {
    expect(AuthAction).toBeDefined();
  });

  it('exports Avatar', () => {
    expect(Avatar).toBeDefined();
  });
});
