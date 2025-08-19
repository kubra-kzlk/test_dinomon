import { GetServerSideProps } from 'next';
import { Dinomon, Region, RegionWithDinomon } from '../types';
import { HomePageProps } from '../types';

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  const response = await fetch('https://raw.githubusercontent.com/kubra-kzlk/test_dinomon/heads/main/data.json');
  const data = await response.json();
  const dinomonList = data.dinomon as Dinomon[];
  // Group by region.id and build RegionWithDinomon[]
  const byRegion = new Map<number, RegionWithDinomon>();

  for (const d of dinomonList) {
    const r = d.region;
    let bucket = byRegion.get(r.id);
    if (!bucket) {
      bucket = { id: r.id, name: r.name, description: r.description, dinomon: [] };
      byRegion.set(r.id, bucket);
    }
    bucket.dinomon.push(d);
  }

  const regions = Array.from(byRegion.values()).sort((a, b) => a.id - b.id);

  return { props: { regions } };
};

export default function HomePage(props: HomePageProps) {
  const regions = props.regions;

  return (
    <div>
      <h1>Regions</h1>
      {regions.map(function (region) {
        return (
          <section key={region.id}>
            <h2>{region.name}</h2>
            <p>{region.description}</p>

            <ul>
              {region.dinomon.map(function (dino) {
                return (
                  <li key={dino.id}>
                    <a href={`/dinomon/${dino.id}`}>{dino.name}</a>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}


