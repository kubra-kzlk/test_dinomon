
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { Dinomon, DinomonDetailPageProps } from '../../types';

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://raw.githubusercontent.com/kubra-kzlk/test_dinomon/main/data.json');
  const jsonData = await response.json();

  // Create paths for each dinomon by ID
  const paths = jsonData.dinomon.map((d: Dinomon) => ({ params: { id: String(d.id) } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<DinomonDetailPageProps, { id: string }> = async ({
  params,
}) => {
  if (!params?.id || Array.isArray(params.id)) return { notFound: true, revalidate: 60 };
  const id = Number(params.id);
  if (Number.isNaN(id)) return { notFound: true, revalidate: 60 };

  const res = await fetch('https://raw.githubusercontent.com/kubra-kzlk/test_dinomon/main/data.json');
  const { dinomon } = await res.json() as { dinomon: Dinomon[] }; // <-- read .dinomon

  const match = dinomon.find(d => d.id === id);
  if (!match) return { notFound: true };

  return { props: { dinomon: match } };
};

export default function DinomonDetailPage(props: DinomonDetailPageProps) {
  const dinomon = props.dinomon;

  return (
    <main>
      <h1>{dinomon.name}</h1>

      <h2>Description</h2>
      <p>{dinomon.description}</p>

      <h2>Type</h2>
      <p>{dinomon.type}</p>

      <h2>Region</h2>
      <p><strong>{dinomon.region.name}</strong></p>
      <p>{dinomon.region.description}</p>
    </main>
  );
}




