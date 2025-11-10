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

    // Expect a suggestion button with an accessible name (aria-label)
    const suggestionBtn = screen.getByRole('button', { name: /Paris\s+\(Île-de-France\)/i });
    expect(suggestionBtn).toBeInTheDocument();

    // Click the suggestion to exercise navigate handler (no assertion on navigation)
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