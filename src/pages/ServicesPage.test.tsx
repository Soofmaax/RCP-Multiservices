import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import ServicesPage from './ServicesPage';

describe('ServicesPage', () => {
  it('renders services heading and sections', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ServicesPage />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Nos services à domicile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Aide à domicile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Ménage et repassage/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Jardinage/i })).toBeInTheDocument();
  });
});