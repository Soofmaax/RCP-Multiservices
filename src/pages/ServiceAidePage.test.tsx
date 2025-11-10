import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ServiceAidePage from './ServiceAidePage';

describe('ServiceAidePage', () => {
  it('renders heading and CTA', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ServiceAidePage />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { name: /Aide à domicile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Demander un devis/i })).toBeInTheDocument();
  });
});