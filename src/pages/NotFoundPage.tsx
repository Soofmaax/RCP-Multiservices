import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SITE_URL = 'https://www.rcp-multiservices.com';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  const title = 'Page non trouvée — RCP Multiservices';
  const description = "La page demandée n'a pas été trouvée. Vous allez être redirigé vers l'accueil.";
  const canonical = `${SITE_URL}/404`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="max-w-3xl mx-auto p-6">
        <div className="rounded-xl border bg-white shadow-sm p-6">
          <h1 className="text-2xl font-semibold">Page non trouvée</h1>
          <p className="mt-2 text-gray-700">
            La page que vous cherchez n&apos;existe pas ou a été déplacée.
          </p>
          <p className="mt-2 text-gray-600">
            Redirection automatique vers l&apos;accueil dans{' '}
            <span className="font-medium">{seconds}s</span>.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link to="/" className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Revenir à l&apos;accueil
            </Link>
            <Link to="/zones" className="inline-block text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded">
              Voir nos zones
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}