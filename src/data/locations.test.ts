import { describe, it, expect } from 'vitest';
import { LOCATIONS, findCity } from './locations';

describe('locations data', () => {
  it('LOCATIONS has regions and departments', () => {
    expect(Array.isArray(LOCATIONS.regions)).toBe(true);
    const idf = LOCATIONS.regions.find((r) => r.key === 'ile-de-france');
    expect(idf?.departments.length).toBeGreaterThan(0);
  });

  it('findCity returns match for ile-de-france/paris', () => {
    const match = findCity('ile-de-france', 'paris');
    expect(match?.region.key).toBe('ile-de-france');
    expect(match?.city.slug).toBe('paris');
    expect(match?.city.name).toBe('Paris');
  });

  it('findCity returns null for unknown city', () => {
    const match = findCity('ile-de-france', 'ville-inconnue');
    expect(match).toBeNull();
  });
});