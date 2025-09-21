import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

describe('App', () => {
  it('renders the heading', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );
    expect(
      screen.getByRole('heading', { name: /RCP Multiservices/i }),
    ).toBeInTheDocument();
  });
});