import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ZonesIndex from './ZonesIndex';

describe('ZonesIndex', () => {
  it('lists regions and some cities links', () => {
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

    // Some city links present (sample from data)
    expect(screen.getByRole('link', { name: /Paris/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Versailles/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Rouen/i })).toBeInTheDocument();
  });
});