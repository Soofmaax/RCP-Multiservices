import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ZonesIndex from './ZonesIndex';

describe('ZonesIndex', () => {
  it('lists regions and has city links for each region', () => {
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

    // Ensure at least one city link exists for each region (robust, data-agnostic)
    const links = screen.getAllByRole('link');
    const idfLinks = links.filter((a) => a.getAttribute('href')?.startsWith('/zones/ile-de-france/'));
    const normLinks = links.filter((a) => a.getAttribute('href')?.startsWith('/zones/normandie/'));

    expect(idfLinks.length).toBeGreaterThan(0);
    expect(normLinks.length).toBeGreaterThan(0);
  });
});