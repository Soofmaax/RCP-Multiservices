import { hasConsentForAnalytics } from './consent';
import { getGtagId } from './env';

let initialized = false;

export function initAnalytics(): void {
  if (initialized) return;
  const allow = hasConsentForAnalytics();
  const gtagId = getGtagId();

  if (!allow || !gtagId) {
    // Analytics disabled (no consent or no tag ID)
    return;
  }

  // Note: CSP must allow https://www.googletagmanager.com to load GA
  // Current CSP has script-src 'self' — update netlify.toml if you enable GA.
  const src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gtagId)}`;
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', gtagId, { anonymize_ip: true });

  initialized = true;
}