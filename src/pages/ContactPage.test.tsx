import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('renders contact heading and coordinates', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument();
    expect(screen.getByText(/Devis gratuit sous 24h/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /\+33 1 23 45 67 89/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact@rcp-multiservices.com/i })).toBeInTheDocument();
  });
});