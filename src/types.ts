export interface Dinomon {
    id:          number;
    name:        string;
    description?: string;
    type?:        string;
    image?:       string;
    region:      Region;
}

export interface Region {
    id:          number;
    name:        string;
    description: string;
}

// SSG: /dinomon (list)
export interface DinomonListPageProps {
  list: Dinomon[];
}
// SSG: /dinomon/[id] (detail)
export interface DinomonDetailPageProps {
  dinomon:Dinomon
}
// SSR: / (regions grouped with their dinomon)
export interface RegionWithDinomon extends Region {
  dinomon: Dinomon[];
}
// Props for each page
export interface HomePageProps {
  regions: RegionWithDinomon[];
}
/** Route params for /dinomon/[id] */
export interface DinomonRouteParams {
  id: string; // Next.js dynamic segment param is always a string
}