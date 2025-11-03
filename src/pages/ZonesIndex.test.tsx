import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ZonesIndex from './ZonesIndex';

describe('ZonesIndex', () => {
  it('renders the zones index heading', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ZonesIndex />
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /Zones d'intervention/i }),
    ).toBeInTheDocument();
  });

  it('shows suggestions when typing in the city search', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ZonesIndex />
        </MemoryRouter>
      </HelmetProvider>,
    );

    const input = screen.getByLabelText(/Rechercher une ville/i);
    fireEvent.change(input, { target: { value: 'Paris' } });

    // Expect a suggestion to appear for Paris (Île-de-France)
    expect(screen.getByText(/Paris\s+\(Île-de-France\)/i)).toBeInTheDocument();

    // Click the suggestion to exercise navigate handler (no assertion on navigation)
    const suggestionBtn = screen.getByRole('button', { name: /Paris\s+\(Île-de-France\)/i });
    fireEvent.click(suggestionBtn);
  });

  it('filters regions when clicking filter buttons', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ZonesIndex />
        </MemoryRouter>
      </HelmetProvider>,
    );

    const btnIdf = screen.getByRole('button', { name: /Île-de-France/i });
    const btnNorm = screen.getByRole('button', { name: /Normandie/i });
    fireEvent.click(btnIdf);
    fireEvent.click(btnNorm);

    // MapZones is stubbed in test env with a placeholder
    expect(screen.getByText(/Carte des zones \(désactivée en tests\)/i)).toBeInTheDocument();
  });
});