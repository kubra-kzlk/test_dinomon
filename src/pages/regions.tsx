import { useEffect, useState } from 'react';                                                                                                                                                                                               
import { Region } from '../types';

export default function RegionsPage() {
  // Set up state for regions
  const [regions, setRegions] = useState<Region[] | null>(null);

  // Load data from our own API when the page loads
  useEffect( () =>{
    fetch('/api/regions') // Fetch from our own API endpoint
      .then( res => res.json()) // Parse the JSON response
      .then(data =>{setRegions(data);// Set the regions state with the fetched data
      }) 
  }, []);

  // While loading
  if (regions === null) {
    return <p>Loading...</p>;
  }

  // When loaded successfully
  return (
    <div>
      <h1>Regions</h1>
      <ul>
        {regions.map(region =>( 
            <li key={region.id} >
              <strong>{region.name}</strong>
              <p>{region.description}</p>
            </li>
         ))}
      </ul>
    </div>
  );
}
