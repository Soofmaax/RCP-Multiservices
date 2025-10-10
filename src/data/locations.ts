import raw from './locations.json';
import type { LocationsData, Region, Department, City } from './types';

// Type guards for runtime validation
function isCity(x: unknown): x is City {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return typeof o.slug === 'string' && typeof o.name === 'string';
}

function isUnknownArray(x: unknown): x is unknown[] {
  return Array.isArray(x);
}

function isDepartment(x: unknown): x is Department {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  const cities = o.cities;
  return (
    typeof o.key === 'string' &&
    typeof o.name === 'string' &&
    isUnknownArray(cities) &&
    cities.every(isCity)
  );
}

function isRegion(x: unknown): x is Region {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  const departments = o.departments;
  return (
    typeof o.key === 'string' &&
    typeof o.name === 'string' &&
    isUnknownArray(departments) &&
    departments.every(isDepartment)
  );
}

function isLocationsData(x: unknown): x is LocationsData {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  const regions = o.regions;
  return isUnknownArray(regions) && regions.every(isRegion);
}

const dataUnknown: unknown = raw;

export const LOCATIONS: LocationsData = isLocationsData(dataUnknown)
  ? dataUnknown
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