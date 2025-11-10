import { describe, it, expect } from 'vitest';
import { btnPrimary, btnSecondary, ctaRow } from './styles';

describe('styles utils', () => {
  it('btnPrimary refers to the premium class name', () => {
    expect(btnPrimary).toBe('btn-primary');
  });

  it('btnSecondary refers to the premium class name', () => {
    expect(btnSecondary).toBe('btn-secondary');
  });

  it('ctaRow contains layout classes', () => {
    expect(ctaRow).toMatch(/flex/);
    expect(ctaRow).toMatch(/gap-2/);
  });
});