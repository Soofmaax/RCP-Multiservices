/**
 * Extra SEO helpers for service pages and listings.
 * Keep these functions synchronous and pure for easy SSR integration.
 */

export function buildServicePageLd(serviceName: string, serviceDescription: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'RCP Multiservices',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Île-de-France' },
      { '@type': 'AdministrativeArea', name: 'Normandie' },
    ],
  };
}

export function buildServiceBreadcrumbsLd(siteUrl: string, serviceSlug: string, serviceName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${siteUrl}/services` },
      { '@type': 'ListItem', position: 3, name: serviceName, item: `${siteUrl}/services/${serviceSlug}` },
    ],
  };
}

export function buildServicesItemListLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: `${siteUrl}/services/aide-a-domicile`,
        name: 'Aide à domicile',
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: `${siteUrl}/services/menage-repassage`,
        name: 'Ménage & repassage',
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: `${siteUrl}/services/jardinage`,
        name: 'Jardinage',
      },
    ],
  };
}