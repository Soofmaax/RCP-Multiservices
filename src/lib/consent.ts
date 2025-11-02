export type Consent = {
  necessary: true;
  analytics: boolean;
};

const STORAGE_KEY = 'rcp_consent';

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    const c = parsed as Partial<Consent>;
    if (!c || typeof c.analytics !== 'boolean') return null;
    return { necessary: true, analytics: c.analytics };
  } catch {
    return null;
  }
}

export function setConsent(consent: Consent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  // notify app
  const evt = new CustomEvent<Consent>('rcp:consent', { detail: consent });
  window.dispatchEvent(evt);
}

export function hasConsentForAnalytics(): boolean {
  const c = getConsent();
  return !!(c && c.analytics);
}

export function onConsentChange(handler: (c: Consent) => void): () => void {
  const listener = (e: Event) => {
    const ce = e as CustomEvent<Consent>;
    if (ce.detail) handler(ce.detail);
  };
  window.addEventListener('rcp:consent', listener);
  return () => window.removeEventListener('rcp:consent', listener);
}