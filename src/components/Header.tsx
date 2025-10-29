import { Link } from 'react-router-dom';
import { openingStatusLabel } from '../utils/openingHours';

export default function Header() {
  const status = openingStatusLabel();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-lg font-semibold text-gray-900 hover:text-primary">
            RCP Multiservices
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
          <a href="tel:+33743670815" className="btn-primary">
            Appeler: 07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
          </a>
        </nav>

        <a
          href="tel:+33743670815"
          className="sm:hidden btn-primary"
          aria-label="Appeler RCP Multiservices"
        >
          Appeler
        </a>
      </div>
    </header>
  );
}