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

    // Regions present (target headings to avoid duplicate matches with body text)
    expect(screen.getByRole('heading', { name: /Île-de-France/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Normandie/i })).toBeInTheDocument();

    // Some city links present (sample from data)
    expect(screen.getByRole('link', { name: /Paris/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Versailles/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Rouen/i })).toBeInTheDocument();
  });
});