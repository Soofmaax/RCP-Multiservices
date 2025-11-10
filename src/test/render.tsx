import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

export function renderWithProviders(
  ui: React.ReactElement,
  initialEntries: string[] = ['/'],
) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
    </HelmetProvider>,
  );
}