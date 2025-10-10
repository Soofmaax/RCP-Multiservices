import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ZonesIndex from './ZonesIndex';

describe('ZonesIndex', () => {
  it('lists regions and sample city links (Île-de-France)', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ZonesIndex />
        </MemoryRouter>
      </HelmetProvider>,
    );

    // Regions present
    expect(screen.getByText(/Île-de-France/i)).toBeInTheDocument();
    expect(screen.getByText(/Normandie/i)).toBeInTheDocument();

    // Sample city links (from Seine-et-Marne 77 in Île-de-France)
    expect(screen.getByRole('link', { name: /Meaux/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Chelles/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Torcy/i })).toBeInTheDocument();
  });
});