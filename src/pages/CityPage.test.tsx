import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { withEnv } from '../test/env';
import CityPage from './CityPage';

describe('CityPage', () => {
  it('renders city heading and content for Paris (Île-de-France)', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/zones/ile-de-france/paris']}>
          <Routes>
            <Route path="/zones/:region/:city" element={<CityPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(
      screen.getByRole('heading', { name: /Services à domicile à Paris/i }),
    ).toBeInTheDocument();

    // Check a piece of body content
    expect(
      screen.getByText(/Aide à domicile, ménage, jardinage et accompagnement/i),
    ).toBeInTheDocument();

    // Check breadcrumb presence
    expect(screen.getByText('Zones')).toBeInTheDocument();
  });

  it('shows Google reviews badge in CTA row when VITE_GBP_URL is set', async () => {
    await withEnv({ VITE_GBP_URL: 'https://g.page/r/abc123' }, () => {
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/zones/ile-de-france/paris']}>
            <Routes>
              <Route path="/zones/:region/:city" element={<CityPage />} />
            </Routes>
          </MemoryRouter>
        </HelmetProvider>,
      );

      const badge = screen.getByRole('link', { name: /voir nos avis google/i });
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('href', 'https://g.page/r/abc123');
    });
  });

  it('shows not found for an unknown city', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/zones/ile-de-france/ville-inconnue']}>
          <Routes>
            <Route path="/zones/:region/:city" element={<CityPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByText(/Zone non trouvée/i)).toBeInTheDocument();
  });
});