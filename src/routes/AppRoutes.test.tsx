import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
  const originalEnv = { ...(import.meta as any).env };

  afterEach(() => {
    (import.meta as any).env = { ...originalEnv };
  });

  it('renders home page', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /RCP Multiservices/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Voir nos zones d'intervention/i }),
    ).toBeInTheDocument();
  });

  it('renders zones index', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/zones']}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Zones d'intervention/i })).toBeInTheDocument();
    expect(screen.getByText(/Île-de-France/i)).toBeInTheDocument();
    expect(screen.getByText(/Normandie/i)).toBeInTheDocument();
  });

  it('renders a city page (Paris)', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/zones/ile-de-france/paris']}>
          {/* Wrap AppRoutes in an extra Routes to avoid basename issues */}
          <Routes>
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(
      screen.getByRole('heading', { name: /Services à domicile à Paris/i }),
    ).toBeInTheDocument();
  });

  it('shows Google reviews badge in CTA row on home when VITE_GBP_URL is set', () => {
    (import.meta as any).env = { ...originalEnv, VITE_GBP_URL: 'https://g.page/r/abc123' };

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>,
    );

    const badge = screen.getByRole('link', { name: /voir nos avis google/i });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('href', 'https://g.page/r/abc123');
  });

  it('shows inverted Google reviews badge in footer when VITE_GBP_URL is set', () => {
    (import.meta as any).env = { ...originalEnv, VITE_GBP_URL: 'https://g.page/r/abc123' };

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/services']}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>,
    );

    const badge = screen.getByRole('link', { name: /voir nos avis google/i });
    // Footer renders after routes, ensure variant applied (dark style)
    expect(badge.className).toMatch(/text-white|bg-gray-9/);
  });
});