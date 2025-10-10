import { render, screen, within } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { withEnv } from '../test/env';
import AppRoutes from './AppRoutes';

// Avoid act() warnings by stubbing Reviews in this test suite
vi.mock('../components', () => ({ Reviews: () => null }));

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  render(
    <HelmetProvider>
      <AppRoutes />
    </HelmetProvider>,
  );
}

describe('AppRoutes', () => {
  it('renders home page', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: /RCP Multiservices/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Voir nos zones d'intervention/i }),
    ).toBeInTheDocument();
  });

  it('renders zones index', () => {
    renderAt('/zones');
    expect(screen.getByRole('heading', { name: /Zones d'intervention/i })).toBeInTheDocument();
    // Be specific: regions are headings, not paragraph text
    expect(screen.getByRole('heading', { name: /Île-de-France/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Normandie/i })).toBeInTheDocument();
  });

  it('renders a city page (Paris)', () => {
    renderAt('/zones/ile-de-france/paris');
    expect(
      screen.getByRole('heading', { name: /Services à domicile à Paris/i }),
    ).toBeInTheDocument();
  });

  it('shows Google reviews badge in CTA row on home when VITE_GBP_URL is set', async () => {
    await withEnv({ VITE_GBP_URL: 'https://g.page/r/abc123' }, () => {
      renderAt('/');
      const main = screen.getByRole('main');
      const badges = within(main).getAllByRole('link', { name: /voir nos avis google/i });
      const badge = badges[0];
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('href', 'https://g.page/r/abc123');
    });
  });

  it('shows inverted Google reviews badge in footer when VITE_GBP_URL is set', async () => {
    await withEnv({ VITE_GBP_URL: 'https://g.page/r/abc123' }, () => {
      renderAt('/services');
      const footer = screen.getByRole('contentinfo');
      const badges = within(footer).getAllByRole('link', { name: /voir nos avis google/i });
      const badge = badges[0];
      // Footer renders after routes, ensure variant applied (dark style)
      expect(badge.className).toMatch(/text-white|bg-gray-9|bg-gray-900/);
    });
  });
});