import { hasConsentForAnalytics } from './consent';
import { getClarityId } from './env';

let initialized = false;

export function initClarity(): void {
  if (initialized) return;
  const allow = hasConsentForAnalytics();
  const clarityId = getClarityId();

  if (!allow || !clarityId) {
    return;
  }

  // Microsoft Clarity snippet
  (function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    const t = l.createElement(r);
    t.async = 1;
    (t as HTMLScriptElement).src = 'https://www.clarity.ms/tag/' + i;
    const y = l.getElementsByTagName(r)[0];
    y.parentNode?.insertBefore(t, y);
  })(window, document, 'clarity', 'script', clarityId);

  initialized = true;
}