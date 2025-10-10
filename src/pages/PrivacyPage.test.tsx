import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PrivacyPage from './PrivacyPage';

describe('PrivacyPage', () => {
  it('renders privacy heading', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/confidentialite']}>
          <Routes>
            <Route path="/confidentialite" element={<PrivacyPage />} />
          </Routes>
        </MemoryRouter>
      </HelmetProvider>,
    );

    expect(screen.getByRole('heading', { name: /Politique de confidentialité/i })).toBeInTheDocument();
  });
});