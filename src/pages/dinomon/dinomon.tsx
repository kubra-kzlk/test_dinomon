import { GetStaticProps } from 'next';
import { useState } from 'react';
import { DinomonListPageProps } from '../../types';

export const getStaticProps: GetStaticProps<DinomonListPageProps> = async () => {
    const response = await fetch('https://raw.githubusercontent.com/kubra-kzlk/test_dinomon/heads/main/data.json');
  const jsonData = await response.json();

  return {
    props: {
      list: jsonData 
     },
  };
};

export default function DinomonListPage({ list }: DinomonListPageProps) {
  const [query, setSearch] = useState('');

  // Filter the list of dinomons based on the search input
  const filtered = list.filter(d =>
    d.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main  >
      <h1>All Dinomon </h1>
      < input
        type="text"
        placeholder="Search Dinomon…"
        value={query}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {
          filtered.map(function (dino) {
            return (
              <li key={dino.id} >
                <a href={`/dinomon/${dino.id}`}> {dino.name} </a>
              </li>
            );
          })
        }
      </ul>
    </main>
  );
}


