import { Region } from '@/types';
import type {  NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
    const response = await fetch('https://raw.githubusercontent.com/kubra-kzlk/test_dinomon/heads/main/data.json');
    const jsonData = await response.json();
    //derive regions by collecting the unique region objects from the dinomon list and return them deduped and sorted by id
     // Collect unique regions by id
    const byId = new Map<number, Region>();
    for (const d of jsonData.dinomon) {
      const r = d.region;
      if (r && !byId.has(r.id)) {
        byId.set(r.id, { id: r.id, name: r.name, description: r.description });
      }
    }

    // Return regions sorted by id
    const regions = Array.from(byId.values()).sort((a, b) => a.id - b.id);

    res.status(200).json(regions);
}