import { hasConsentForAnalytics } from './consent';
import { getClarityId } from './env';

declare global {
  interface Window {
    // Clarity function with an internal queue
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

let initialized = false;

export function initClarity(): void {
  if (initialized) return;
  const allow = hasConsentForAnalytics();
  const clarityId = getClarityId();

  if (!allow || !clarityId) {
    return;
  }

  // Prepare a queued clarity function
  if (!window.clarity) {
    window.clarity = (...args: unknown[]) => {
      const fn = window.clarity!;
      fn.q = fn.q || [];
      fn.q.push(args);
    };
  }

  // Inject Clarity script
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.clarity.ms/tag/' + encodeURIComponent(clarityId);
  document.head.appendChild(s);

  initialized = true;
}