import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { withEnv } from '../test/env';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('renders contact heading and coordinates', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/contact']}>
          <ContactPage />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument();
    expect(screen.getByText(/Devis gratuit sous 24h/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\+33 1 23 45 67 89/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact@rcp-multiservices.com/i })).toBeInTheDocument();
  });

  it('shows Google reviews badge in CTA row when VITE_GBP_URL is set', async () => {
    await withEnv({ VITE_GBP_URL: 'https://g.page/r/abc123' }, async () => {
      render(
        <HelmetProvider>
          <MemoryRouter initialEntries={['/contact']}>
            <ContactPage />
          </MemoryRouter>
        </HelmetProvider>,
      );

      const badge = screen.getByRole('link', { name: /voir nos avis google/i });
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('href', 'https://g.page/r/abc123');
    });
  });
});