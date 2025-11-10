import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ServiceJardinagePage from './ServiceJardinagePage';

describe('ServiceJardinagePage', () => {
  it('renders heading and CTA', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ServiceJardinagePage />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { name: /Jardinage/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Demander un devis/i })).toBeInTheDocument();
  });
});