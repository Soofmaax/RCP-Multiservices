import { describe, it, expect } from 'vitest';
import {
  buildFaqLd,
  buildServiceLd,
  buildBreadcrumbsLd,
  buildLocalBusinessLd,
} from './seo';

describe('seo utils', () => {
  it('buildFaqLd creates FAQPage structure', () => {
    const faq = buildFaqLd([
      { q: 'Question 1', a: 'Réponse 1' },
      { q: 'Question 2', a: 'Réponse 2' },
    ]);

    expect(faq['@type']).toBe('FAQPage');
    expect(faq.mainEntity).toHaveLength(2);
    expect(faq.mainEntity[0].name).toBe('Question 1');
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe('Réponse 1');
  });

  it('buildServiceLd creates Service structure', () => {
    const service = buildServiceLd('Paris');
    expect(service['@type']).toBe('Service');
    expect(service.name).toMatch(/Paris/);
    expect(service.provider?.name).toBe('RCP Multiservices');
  });

  it('buildBreadcrumbsLd creates BreadcrumbList structure', () => {
    const breadcrumbs = buildBreadcrumbsLd({
      siteUrl: 'https://example.com',
      regionKey: 'ile-de-france',
      regionName: 'Île-de-France',
      citySlug: 'paris',
      cityName: 'Paris',
    });

    expect(breadcrumbs['@type']).toBe('BreadcrumbList');
    expect(breadcrumbs.itemListElement).toHaveLength(4);
    expect(breadcrumbs.itemListElement[3].item).toBe(
      'https://example.com/zones/ile-de-france/paris',
    );
  });

  it('buildLocalBusinessLd creates LocalBusiness structure', () => {
    const lb = buildLocalBusinessLd({
      siteUrl: 'https://example.com',
      telephone: '+33123456789',
      email: 'contact@example.com',
      address: {
        streetAddress: '123 Rue',
        addressLocality: 'Paris',
        postalCode: '75001',
        addressCountry: 'FR',
      },
      openingHours: ['Mo-Fr 08:00-20:00'],
    });

    expect(lb['@type']).toBe('LocalBusiness');
    expect(lb.url).toBe('https://example.com');
    expect(lb.address?.postalCode).toBe('75001');
    expect(lb.openingHours).toContain('Mo-Fr 08:00-20:00');
  });
});