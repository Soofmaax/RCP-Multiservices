import raw from './locations.json';
import type { LocationsData, Region, Department, City } from './types';

// Type guards for runtime validation
function isCity(x: unknown): x is City {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return typeof o.slug === 'string' && typeof o.name === 'string';
}

function isDepartment(x: unknown): x is Department {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  const cities = o.cities as unknown;
  return (
    typeof o.key === 'string' &&
    typeof o.name === 'string' &&
    Array.isArray(cities) &&
    (cities as unknown[]).every(isCity)
  );
}

function isRegion(x: unknown): x is Region {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  const departments = o.departments as unknown;
  return (
    typeof o.key === 'string' &&
    typeof o.name === 'string' &&
    Array.isArray(departments) &&
    (departments as unknown[]).every(isDepartment)
  );
}

function isLocationsData(x: unknown): x is LocationsData {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  const regions = o.regions as unknown;
  return Array.isArray(regions) && (regions as unknown[]).every(isRegion);
}

const dataUnknown: unknown = raw;

export const LOCATIONS: LocationsData = isLocationsData(dataUnknown)
  ? (dataUnknown as LocationsData)
  : { regions: [] };

export function findCity(regionKey: string, citySlug: string) {
  const region = LOCATIONS.regions.find((r) => r.key === regionKey);
  if (!region) return null;
  for (const dept of region.departments) {
    const city = dept.cities.find((c) => c.slug === citySlug);
    if (city) {
      return { region, department: dept, city };
    }
  }
  return null;
}