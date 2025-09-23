import { render, screen } from '@testing-library/react';
import { withEnv } from '../test/env';
import GoogleReviewsBadge from './GoogleReviewsBadge';

describe('GoogleReviewsBadge', () => {
  it('renders badge when VITE_GBP_URL is defined', async () => {
    await withEnv({ VITE_GBP_URL: 'https://g.page/r/abc123' }, () => {
      render(<GoogleReviewsBadge />);
      const link = screen.getByRole('link', { name: /voir nos avis google/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://g.page/r/abc123');
    });
  });

  it('does not render when VITE_GBP_URL is missing', async () => {
    await withEnv({ VITE_GBP_URL: '' }, () => {
      const { container } = render(<GoogleReviewsBadge />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  it('supports inverted variant styling', async () => {
    await withEnv({ VITE_GBP_URL: 'https://g.page/r/abc123' }, () => {
      render(<GoogleReviewsBadge variant="inverted" />);
      const link = screen.getByRole('link', { name: /voir nos avis google/i });
      // Basic class presence check to ensure variant applied
      expect(link.className).toMatch(/bg-gray-9|bg-gray-90|bg-gray-900/);
    });
  });
});