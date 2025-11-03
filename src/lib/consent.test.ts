import { describe, it, expect, beforeEach } from 'vitest';
import { getConsent, setConsent, hasConsentForAnalytics, onConsentChange } from './consent';

describe('consent helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getConsent returns null when nothing is stored', () => {
    expect(getConsent()).toBeNull();
    expect(hasConsentForAnalytics()).toBe(false);
  });

  it('setConsent stores in localStorage and getConsent returns it', () => {
    setConsent({ necessary: true, analytics: true });
    const c = getConsent();
    expect(c).toEqual({ necessary: true, analytics: true });
    expect(hasConsentForAnalytics()).toBe(true);
  });

  it('onConsentChange listens and unsubscribes', () => {
    let received = false;
    const unsubscribe = onConsentChange(() => {
      received = true;
    });
    setConsent({ necessary: true, analytics: false });
    expect(received).toBe(true);
    unsubscribe();
    received = false;
    setConsent({ necessary: true, analytics: true });
    expect(received).toBe(false);
  });
});