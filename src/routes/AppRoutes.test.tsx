import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
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
});