import type { Artwork } from '@/lib/types';
import ArtworkCard from './ArtworkCard';

type ArtworkGridProps = {
  artworks: Artwork[];
};

const ArtworkGrid = ({ artworks }: ArtworkGridProps) => {
  if (artworks.length === 0) {
    return <p className="text-center text-muted-foreground py-16">No artworks found. Try adjusting your search.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
};

export default ArtworkGrid;
