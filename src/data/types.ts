export type City = {
  slug: string;
  name: string;
};

export type Department = {
  key: string;
  name: string;
  cities: City[];
};

export type Region = {
  key: string;
  name: string;
  departments: Department[];
};

export type LocationsData = {
  regions: Region[];
};