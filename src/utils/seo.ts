/**
 * Small helpers to build JSON-LD structures consistently.
 * Keep these functions synchronous and pure.
 */

export type FaqItem = { q: string; a: string };

export function buildFaqLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.a,
      },
    })),
  };
}

export function buildServiceLd(cityName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Services à domicile à ${cityName}`,
    provider: {
      '@type': 'LocalBusiness',
      name: 'RCP Multiservices',
    },
    areaServed: {
      '@type': 'Place',
      name: cityName,
    },
  };
}

export function buildBreadcrumbsLd(args: {
  siteUrl: string;
  regionKey: string;
  regionName: string;
  citySlug: string;
  cityName: string;
}) {
  const { siteUrl, regionKey, regionName, citySlug, cityName } = args;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: siteUrl + '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Zones',
        item: siteUrl + '/zones',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: regionName,
        item: `${siteUrl}/zones/${regionKey}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: cityName,
        item: `${siteUrl}/zones/${regionKey}/${citySlug}`,
      },
    ],
  };
}

export function buildLocalBusinessLd(args: {
  siteUrl: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  openingHours: string[];
}) {
  const { siteUrl, telephone, email, address, openingHours } = args;
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RCP Multiservices',
    url: siteUrl,
    telephone,
    email,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    openingHours,
  };
}