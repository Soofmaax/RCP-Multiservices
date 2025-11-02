import { describe, it, expect } from 'vitest';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ServiceMenagePage from './ServiceMenagePage';

describe('ServiceMenagePage', () => {
  it('renders heading and CTA', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ServiceMenagePage />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByRole('heading', { name: /Ménage/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Demander un devis/i })).toBeInTheDocument();
  });
});