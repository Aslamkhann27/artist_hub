import { getArtworks, getArtStyles } from '@/lib/data';
import HomePage from '@/components/pages/HomePage';

export default async function Home({
  searchParams,
}: {
  searchParams?: { style?: string };
}) {
  const artworks = await getArtworks();
  const styles = await getArtStyles();
  const initialStyle = searchParams?.style || 'all';

  return (
    <HomePage artworks={artworks} styles={styles} initialStyle={initialStyle} />
  );
}
