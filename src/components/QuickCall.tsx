export default function QuickCall() {
  const telHref = 'tel:+33743670815';
  const label = 'Appeler RCP Multiservices';

  return (
    <a
      href={telHref}
      aria-label={label}
      className="fixed bottom-4 right-4 sm:hidden z-50 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-blue-600 text-white shadow-lg transition-colors duration-150 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
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
      <span className="text-sm font-medium">Appeler</span>
      <span className="text-sm">07&nbsp;43&nbsp;67&nbsp;08&nbsp;15</span>
    </a>
  );
}