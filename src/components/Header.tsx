import { Link } from 'react-router-dom';
import { openingStatusLabel } from '../utils/openingHours';

export default function Header() {
  const status = openingStatusLabel();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-lg font-semibold text-gray-900 hover:text-blue-700">
            RCP Multiservices
          </Link>
          <span className="text-xs rounded bg-blue-50 text-blue-700 px-2 py-1">{status}</span>
        </div>

        <nav className="hidden sm:flex items-center gap-3 text-sm">
          <Link to="/zones" className="text-gray-700 hover:text-blue-700">
            Zones
          </Link>
          <Link to="/services" className="text-gray-700 hover:text-blue-700">
            Services
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-700">
            Contact
          </Link>
          <a
            href="tel:+33743670815"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition-colors"
          >
            Appeler: 07&nbsp;43&nbsp;67&nbsp;08&nbsp;15
          </a>
        </nav>

        <a
          href="tel:+33743670815"
          className="sm:hidden inline-block text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded transition-colors"
          aria-label="Appeler RCP Multiservices"
        >
          Appeler
        </a>
      </div>
    </header>
  );
}