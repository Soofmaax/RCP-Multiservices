type Props = {
  className?: string;
  label?: string;
};

export default function GoogleReviewsBadge({
  className = '',
  label = 'Voir nos avis Google',
}: Props) {
  const url = import.meta.env.VITE_GBP_URL as string | undefined;
  if (!url || !url.trim()) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`inline-flex items-center gap-2 rounded border px-3 py-1.5 text-sm bg-white hover:bg-gray-50 shadow-sm ${className}`}
    >
      <span aria-hidden="true">★</span>
      <span className="font-medium">Avis Google</span>
    </a>
  );
}