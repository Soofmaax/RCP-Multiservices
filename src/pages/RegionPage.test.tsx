import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import RegionPage from './RegionPage';

// Keep full components; no need to mock Reviews/Badge here

describe('RegionPage', () => {
  it('renders Île-de-France region heading', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/zones/ile-de-france']}>
          <Routes>
            <Route path="/zones/:region" element={<RegionPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Île-de-France/i })).toBeInTheDocument();
  });

  it('lists at least one city link for the region', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/zones/ile-de-france']}>
          <Routes>
            <Route path="/zones/:region" element={<RegionPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    const cityLinks = screen.getAllByRole('link').filter((a) =>
      a.getAttribute('href')?.startsWith('/zones/ile-de-france/'),
    );
    expect(cityLinks.length).toBeGreaterThan(0);
  });
});