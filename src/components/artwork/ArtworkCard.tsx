import Link from 'next/link';
import Image from 'next/image';
import type { Artwork } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type ArtworkCardProps = {
  artwork: Artwork;
};

const ArtworkCard = ({ artwork }: ArtworkCardProps) => {
  const imageData = PlaceHolderImages.find(img => img.imageUrl === artwork.imageUrl);

  return (
    <Link href={`/artwork/${artwork.id}`} className="group block">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              width={600}
              height={800}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={imageData?.imageHint}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="font-headline text-lg leading-tight mb-2">{artwork.title}</CardTitle>
          <Badge variant="secondary">{artwork.style}</Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <p className="text-primary font-semibold text-lg">
            ₹{artwork.price.toLocaleString('en-IN')}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArtworkCard;
