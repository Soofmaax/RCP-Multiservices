import { describe, it, expect } from 'vitest';
import { btnPrimary, btnSecondary, ctaRow } from './styles';

describe('styles utils', () => {
  it('btnPrimary contains expected Tailwind classes', () => {
    expect(btnPrimary).toMatch(/bg-blue-600/);
    expect(btnPrimary).toMatch(/hover:bg-blue-700/);
    expect(btnPrimary).toMatch(/rounded/);
  });

  it('btnSecondary contains expected Tailwind classes', () => {
    expect(btnSecondary).toMatch(/bg-blue-50/);
    expect(btnSecondary).toMatch(/text-blue-700/);
  });

  it('ctaRow contains layout classes', () => {
    expect(ctaRow).toMatch(/flex/);
    expect(ctaRow).toMatch(/gap-2/);
  });
});