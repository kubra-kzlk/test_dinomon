- herex 1 object (ipv array objecten)
    
    it works with a **single array** (no separate `region` array).
    
    ## Dataset (one array only)
    
    Use this JSON (each Dinomon **embeds** its region instead of referencing it by id):
    
    ```json
    {
      "dinomon": [
        {
          "id": 1,
          "name": "Raptorix",
          "description": "A swift and agile Dinomon with a feathery crest.",
          "type": "Ice",
          "image": "https://raw.githubusercontent.com/similonap/json/refs/heads/master/raptorix.png",
          "region": { "id": 1, "name": "Glacius Plains", "description": "A snowy region known for its icy plains and frosty Dinomon." }
        },
        {
          "id": 2,
          "name": "Terrasaur",
          "description": "A sturdy Dinomon that harnesses the power of earth and rocks.",
          "type": "Ground",
          "image": "https://raw.githubusercontent.com/similonap/json/refs/heads/master/terrasaur.png",
          "region": { "id": 2, "name": "Verdantia Forest", "description": "A lush and green forest teeming with life and many Dinomon species." }
        },
        {
          "id": 3,
          "name": "Blazewing",
          "description": "Flames dance around this Dinomon, as it flies through the skies.",
          "type": "Fire",
          "image": "https://raw.githubusercontent.com/similonap/json/refs/heads/master/blazewing.png",
          "region": { "id": 3, "name": "Ember Highlands", "description": "A mountainous area filled with molten lava and fiery Dinomon." }
        }
        // ...continue the rest in the same shape
      ]
    }
    
    ```
    
    ### API routes
    
    Use fetch to load the single JSON. Build these routes:
    
    1. **GET `/dinomon`** Returns the **raw list** (no transformations).
    
    **Expected response (excerpt):**
    
    ```json
    [
      {
        "id": 1,
        "name": "Raptorix",
        "description": "A swift and agile Dinomon with a feathery crest.",
        "type": "Ice",
        "image": "https://raw.githubusercontent.com/similonap/json/refs/heads/master/raptorix.png",
        "region": {
          "id": 1,
          "name": "Glacius Plains",
          "description": "A snowy region known for its icy plains and frosty Dinomon."
        }
      }
    ]
    
    ```
    
    1. **GET `/regions`** Since there’s no separate regions array anymore, **derive** regions by collecting the unique `region` objects from the dinomon list and return them **deduped** and **sorted by id**.
    
    **Expected response:**
    
    ```json
    [
      { "id": 1, "name": "Glacius Plains", "description": "A snowy region known for its icy plains and frosty Dinomon." },
      { "id": 2, "name": "Verdantia Forest", "description": "A lush and green forest teeming with life and many Dinomon species." },
      { "id": 3, "name": "Ember Highlands", "description": "A mountainous area filled with molten lava and fiery Dinomon." }
    ]
    
    ```
    
    ### Client-Side Rendering (CSR)
    
    /**regions**
    
    Render a page that fetches **your own** API route `GET /regions` on the client.
    
    - Show “Loading…” while fetching.
    - Then show **name** and **description** of each region. (This mirrors the regions page from the original brief. )
    
    ### Static Site Generation (SSG)
    
    /**dinomon**
    
    - Build a static page listing **all Dinomon names** as links to their detail pages.
    - Include a search input that filters by name, case-insensitive, matching substrings.
    - Fetch directly from the **source JSON** at build time (not via your API), same as in the original task.
    
    /**dinomon/[id]**
    
    - Generate a static page for each Dinomon that shows: **name, description, type, image, plus region name & description** (already embedded).
    - Fetch from the **source JSON** at build time. Use routes like `/dinomon/1`, `/dinomon/2`, … (same pattern as the PDF).
    
    ### Server-Side Rendering (SSR)
    
    / (home)
    
    - Render the **Regions with their Dinomon**.
    - For each region, list the Dinomon that belong to it, linking to the Dinomon detail page.
    - Fetch from the **source JSON** on the server per request
    
    ## `types.ts`
    
    ```tsx
    // types.ts
    export interface Region {
      id: number;
      name: string;
      description: string;
    }
    
    export interface Dinomon {
      id: number;
      name: string;
      description: string;
      type: string;
      image: string;
      region: Region; // embedded
    }
    
    // API responses
    export type GetDinomonResponse = Dinomon[];
    export type GetRegionsResponse = Region[];
    
    ```
    
    - For **/regions** API, map `dinomon.map(d => d.region)`, then dedupe by `id` using a `Map<number, Region>()`, then return `Array.from(map.values()).sort((a,b)=>a.id-b.id)`.
    - For the **SSR home**, group by `region.id`; a simple `reduce` works great.
    - For **SSG**, `generateStaticParams` (or `getStaticPaths` if you’re on pages router) should read the single JSON and return `{ id: string }[]` for all items.
    ---------------------------------------------------------------------------------------------------------------------
    
- uitleg SSR SSG CSR
    
    the three modes mostly differ in **where** the HTML is produced and **when** the data is fetched.  (using Next.js “app router” style. same idea in the old “pages/” router
    
    - **CSR:** normal React + `useEffect` in component.
    - **SSR:** `export async function getServerSideProps(ctx) { /* fetch */ return { props } }`
    - **SSG:** `export async function getStaticProps() { /* fetch at build */ return { props} }`
                                     `getStaticPaths()` to declare which `[id]` pages to build.