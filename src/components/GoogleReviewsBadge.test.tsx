import { render, screen } from '@testing-library/react';
import GoogleReviewsBadge from './GoogleReviewsBadge';

describe('GoogleReviewsBadge', () => {
  const originalEnv = { ...(import.meta as any).env };

  afterEach(() => {
    // Restore original env after each test
    (import.meta as any).env = { ...originalEnv };
  });

  it('renders badge when VITE_GBP_URL is defined', () => {
    (import.meta as any).env = { ...originalEnv, VITE_GBP_URL: 'https://g.page/r/abc123' };

    render(<GoogleReviewsBadge />);
    const link = screen.getByRole('link', { name: /voir nos avis google/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://g.page/r/abc123');
  });

  it('does not render when VITE_GBP_URL is missing', () => {
    (import.meta as any).env = { ...originalEnv };
    delete (import.meta as any).env.VITE_GBP_URL;

    const { container } = render(<GoogleReviewsBadge />);
    expect(container).toBeEmptyDOMElement();
  });

  it('supports inverted variant styling', () => {
    (import.meta as any).env = { ...originalEnv, VITE_GBP_URL: 'https://g.page/r/abc123' };

    render(<GoogleReviewsBadge variant="inverted" />);
    const link = screen.getByRole('link', { name: /voir nos avis google/i });
    // Basic class presence check to ensure variant applied
    expect(link.className).toMatch(/bg-gray-9/);
  });
});