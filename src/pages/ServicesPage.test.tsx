import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { withEnv } from '../test/env';
import ServicesPage from './ServicesPage';

describe('ServicesPage', () => {
  it('renders services heading and sections', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ServicesPage />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Nos services à domicile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Aide à domicile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Ménage et repassage/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Jardinage/i })).toBeInTheDocument();
  });

  it('shows Google reviews badge in CTA row when VITE_GBP_URL is set', async () => {
    await withEnv({ VITE_GBP_URL: 'https://g.page/r/abc123' }, () => {
      render(
        <HelmetProvider>
          <MemoryRouter>
            <ServicesPage />
          </MemoryRouter>
        </HelmetProvider>,
      );

      const badge = screen.getByRole('link', { name: /voir nos avis google/i });
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('href', 'https://g.page/r/abc123');
    });
  });
});