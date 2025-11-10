import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders heading and CTAs', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/unknown']}>
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Page non trouvée/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Revenir à l'accueil/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Voir nos zones/i })).toBeInTheDocument();
  });

  it('redirects to home after timeout', async () => {
    vi.useFakeTimers();
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/unknown']}>
          <Routes>
            <Route path="/" element={<div data-testid="home">Home</div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    // Initially shows 404
    expect(screen.getByRole('heading', { name: /Page non trouvée/i })).toBeInTheDocument();

    // Advance timers to trigger redirect
    await vi.advanceTimersByTimeAsync(5000);

    // Should have navigated to home
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });
});