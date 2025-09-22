type Props = {
  className?: string;
  label?: string;
  variant?: 'default' | 'inverted';
};

export default function GoogleReviewsBadge({
  className = '',
  label = 'Voir nos avis Google',
  variant = 'default',
}: Props) {
  const url = import.meta.env.VITE_GBP_URL as string | undefined;
  if (!url || !url.trim()) return null;

  const base =
    'inline-flex items-center gap-2 rounded px-3 py-2 text-sm border transition-colors';
  const styles =
    variant === 'inverted'
      ? 'bg-gray-900 text-white border-gray-700 hover:bg-gray-800'
      : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`${base} ${styles} ${className}`}
    >
      <GoogleIcon />
      <span className="font-medium">Avis Google</span>
    </a>
  );
}

function GoogleIcon() {
  // Simplified Google "G" multi-color mark (inline SVG)
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.94 0 7.5 1.41 10.3 3.74l7.7-7.7C37.9 1.9 31.37 0 24 0 14.62 0 6.42 4.99 2.04 12.3l8.97 6.96C13 13.74 18.04 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24c0-1.6-.16-3.14-.46-4.63H24v9.26h12.68c-.55 2.97-2.18 5.48-4.67 7.17l7.15 5.54C43.89 37.56 46.5 31.32 46.5 24z"/>
      <path fill="#FBBC05" d="M11.01 28.74A14.49 14.49 0 0 1 10 24c0-1.64.28-3.22.79-4.69l-8.97-6.96A24 24 0 0 0 0 24c0 3.84.9 7.47 2.5 10.69l8.51-5.95z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.14 15.9-5.8l-7.15-5.54c-2.03 1.36-4.64 2.16-8.75 2.16-5.96 0-11-4.24-12.99-9.76l-8.51 5.95C6.88 43.01 14.94 48 24 48z"/>
    </svg>
  );
}