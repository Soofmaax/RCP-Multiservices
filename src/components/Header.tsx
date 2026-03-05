import { Link } from 'react-router-dom';
import { openingStatusLabel } from '../utils/openingHours';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, SITE_NAME } from '../config/site';

export default function Header() {
  const status = openingStatusLabel();

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only">
        Aller au contenu
      </a>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.svg"
                alt={SITE_NAME}
                className="h-20 w-auto sm:h-24 md:h-28"
                width={160}
                height={40}
                decoding="async"
              />
            </Link>
            <span className="badge">{status}</span>
          </div>

          <nav className="hidden sm:flex items-center gap-3 text-sm">
            <Link to="/zones" className="nav-link">
              Zones
            </Link>
            <Link to="/services" className="nav-link">
              Services
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <a href={CONTACT_PHONE_TEL} className="btn-primary">
              Appeler: {CONTACT_PHONE_DISPLAY}
            </a>
          </nav>

          <a
            href={CONTACT_PHONE_TEL}
            className="sm:hidden btn-primary"
            aria-label={`Appeler ${SITE_NAME}`}
          >
            Appeler
          </a>
        </div>
      </header>
    </>
  );
}