export type RegionKey = 'ile-de-france' | 'normandie';
export type LatLng = readonly [number, number];

export const REGIONS_POLYGONS: Record<RegionKey, LatLng[]> = {
  // Rectangles approximant les frontières pour une délimitation nette sans débordement
  'ile-de-france': [
    [48.0, 1.5],  // SW
    [49.2, 1.5],  // NW
    [49.2, 3.5],  // NE
    [48.0, 3.5],  // SE
  ],
  normandie: [
    [48.8, -1.7], // SW
    [50.0, -1.7], // NW
    [50.0, 2.0],  // NE
    [48.8, 2.0],  // SE
  ],
};