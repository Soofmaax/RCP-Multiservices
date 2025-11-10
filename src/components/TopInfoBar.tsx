import { openingStatusLabel } from '../utils/openingHours';

export default function TopInfoBar() {
  const hours =
    'Horaires: Lun–Ven 08:00–20:00 • Sam 09:00–18:00 • Dim & hors horaires: sur RDV';
  const status = openingStatusLabel();

  return (
    <div className="bg-accent text-white">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        <div className="text-sm">
          <span className="opacity-90">{hours}</span>
        </div>
        <a href="tel:+33743670815" className="btn-white" aria-label="Appeler RCP Multiservices">
          <svg
            aria-hidden="true"
            focusable="false"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className="opacity-90"
          >
            <path
              fill="currentColor"
              d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21a11.72 11.72 0 003.64.58a1 1 0 011 1v3.25a1 1 0 01-.9 1A19 19 0 013 5.9a1 1 0 011-1h3.26a1 1 0 011 1a11.72 11.72 0 00.58 3.64a1 1 0 01-.21 1.11z"
            />
          </svg>
          <span className="ml-2 text-sm font-medium">{status}</span>
        </a>
      </div>
    </div>
  );
}