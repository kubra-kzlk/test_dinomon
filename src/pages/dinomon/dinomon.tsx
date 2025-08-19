import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { DinomonListPageProps } from '../../types';
import Link from 'next/link';

export const getStaticProps: GetStaticProps<DinomonListPageProps> = async () => {
  const response = await fetch('https://raw.githubusercontent.com/kubra-kzlk/test_dinomon/main/data.json');
  const jsonData = await response.json();

  return {
    props: {
      list: Array.isArray(jsonData?.dinomon) ? jsonData.dinomon : [],
    },
  };
};

export default function DinomonListPage({ list }: DinomonListPageProps) {
  const [query, setSearch] = useState('');
  // Filter list on the client; same HTML is rendered on server
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
      {filtered.length === 0 ? (
        <p>No Dinomon found.</p>
      ) : (
        <ul>
          {filtered.map(d => (
            <li key={d.id}>
              <Link href={`/dinomon/${d.id}`}>{d.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}


