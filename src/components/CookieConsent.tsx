import { useEffect, useState } from 'react';
import { Consent, getConsent, setConsent } from '../lib/consent';

function ConsentPanel({
  onAcceptAll,
  onRejectAll,
  onSave,
  analytics,
  setAnalytics,
}: {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: () => void;
  analytics: boolean;
  setAnalytics: (v: boolean) => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-5xl m-3 p-4 rounded-[16px] shadow-lg bg-white border border-border">
        <div className="flex flex-col gap-2 text-neutral-900">
          <div className="font-semibold text-lg">Paramètres des cookies</div>
          <p className="text-neutral-600">
            Nous utilisons des cookies nécessaires au bon fonctionnement du site. Les cookies
            d’analyse (trafic/usage) sont activés uniquement avec votre consentement.
          </p>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-[12px] border border-border bg-surface.light">
              <div className="font-medium">Nécessaires</div>
              <div className="text-sm text-neutral-600">
                Indispensables au fonctionnement (ex: préférences, sécurité). Toujours activés.
              </div>
              <div className="mt-2">
                <span className="badge bg-primary/10 text-primary">Activés</span>
              </div>
            </div>
            <div className="p-3 rounded-[12px] border border-border bg-surface.light">
              <div className="font-medium">Analytics</div>
              <div className="text-sm text-neutral-600">
                Aide à améliorer le site (trafic, parcours). Désactivés par défaut.
              </div>
              <label className="mt-2 inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                Autoriser les cookies d’analyse
              </label>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" className="btn-primary" onClick={onAcceptAll}>
              Tout accepter
            </button>
            <button type="button" className="btn-secondary" onClick={onRejectAll}>
              Tout refuser
            </button>
            <button type="button" className="btn-outline" onClick={onSave}>
              Enregistrer
            </button>
          </div>
          <div className="text-xs text-neutral-600">
            Vous pouvez modifier vos préférences à tout moment via “Gérer les cookies” en bas de
            page.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setOpen(true);
    } else {
      setAnalytics(existing.analytics);
    }
    const onOpen = () => setOpen(true);
    window.addEventListener('openConsent', onOpen);
    return () => window.removeEventListener('openConsent', onOpen);
  }, []);

  const acceptAll = () => {
    const c: Consent = { necessary: true, analytics: true };
    setConsent(c);
    setAnalytics(true);
    setOpen(false);
  };

  const rejectAll = () => {
    const c: Consent = { necessary: true, analytics: false };
    setConsent(c);
    setAnalytics(false);
    setOpen(false);
  };

  const save = () => {
    const c: Consent = { necessary: true, analytics };
    setConsent(c);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <ConsentPanel
      onAcceptAll={acceptAll}
      onRejectAll={rejectAll}
      onSave={save}
      analytics={analytics}
      setAnalytics={setAnalytics}
    />
  );
}