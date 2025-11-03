import { describe, it, expect, beforeEach, vi } from 'vitest';
import { withEnv } from '../test/env';
import { setConsent } from './consent';

function clearHeadScripts() {
  const scripts = Array.from(document.head.querySelectorAll('script'));
  scripts.forEach((s) => s.remove());
}

describe('initAnalytics', () => {
  beforeEach(() => {
    vi.resetModules();
    clearHeadScripts();
    localStorage.clear();
    // @ts-expect-error test cleanup
    window.dataLayer = undefined;
    // @ts-expect-error test cleanup
    window.gtag = undefined;
  });

  it('does nothing when no consent', async () => {
    await withEnv({ VITE_GTAG_ID: 'G-TEST' }, async () => {
      const { initAnalytics } = await import('./analytics');
      initAnalytics();
      expect(document.head.querySelector('script[src*="googletagmanager.com/gtag/js"]')).toBeNull();
      expect(window.gtag).toBeUndefined();
    });
  });

  it('does nothing when tag id missing', async () => {
    setConsent({ necessary: true, analytics: true });
    const { initAnalytics } = await import('./analytics');
    initAnalytics();
    expect(document.head.querySelector('script[src*="googletagmanager.com/gtag/js"]')).toBeNull();
    expect(window.gtag).toBeUndefined();
  });

  it('injects GA script and sets gtag when consent and id are present', async () => {
    await withEnv({ VITE_GTAG_ID: 'G-TEST' }, async () => {
      setConsent({ necessary: true, analytics: true });
      const { initAnalytics } = await import('./analytics');
      initAnalytics();
      const script = document.head.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-TEST"]');
      expect(script).toBeTruthy();
      expect(Array.isArray(window.dataLayer)).toBe(true);
      expect(typeof window.gtag).toBe('function');
      // first calls queued
      expect(window.dataLayer!.length).toBeGreaterThan(0);
    });
  });
});