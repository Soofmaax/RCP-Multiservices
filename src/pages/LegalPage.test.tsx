import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LegalPage from './LegalPage';

describe('LegalPage', () => {
  it('renders legal heading', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/mentions-legales']}>
          <Routes>
            <Route path="/mentions-legales" element={<LegalPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Mentions légales/i })).toBeInTheDocument();
  });
});