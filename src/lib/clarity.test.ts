import { describe, it, expect, beforeEach, vi } from 'vitest';
import { withEnv } from '../test/env';
import { setConsent } from './consent';

function clearHeadScripts() {
  const scripts = Array.from(document.head.querySelectorAll('script'));
  scripts.forEach((s) => s.remove());
}

describe('initClarity', () => {
  beforeEach(() => {
    vi.resetModules();
    clearHeadScripts();
    localStorage.clear();
    // @ts-expect-error test cleanup
    window.clarity = undefined;
  });

  it('does nothing when no consent', async () => {
    await withEnv({ VITE_CLARITY_ID: 'CLARITY-TEST' }, async () => {
      const { initClarity } = await import('./clarity');
      initClarity();
      expect(document.head.querySelector('script[src*="clarity.ms/tag"]')).toBeNull();
      expect(window.clarity).toBeUndefined();
    });
  });

  it('does nothing when clarity id missing', async () => {
    setConsent({ necessary: true, analytics: true });
    const { initClarity } = await import('./clarity');
    initClarity();
    expect(document.head.querySelector('script[src*="clarity.ms/tag"]')).toBeNull();
    expect(window.clarity).toBeUndefined();
  });

  it('injects Clarity script and defines window.clarity when consent and id are present', async () => {
    await withEnv({ VITE_CLARITY_ID: 'CLARITY-TEST' }, async () => {
      setConsent({ necessary: true, analytics: true });
      const { initClarity } = await import('./clarity');
      initClarity();
      const script = document.head.querySelector('script[src*="clarity.ms/tag/CLARITY-TEST"]');
      expect(script).toBeTruthy();
      expect(typeof window.clarity).toBe('function');
    });
  });
});