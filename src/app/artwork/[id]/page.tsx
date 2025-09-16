import { getArtworkById, getArtistById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default async function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = await getArtworkById(params.id);
  if (!artwork) {
    notFound();
  }
  const artist = await getArtistById(artwork.artistId);
  const imageData = PlaceHolderImages.find(img => img.imageUrl === artwork.imageUrl);

  return (
    <div className="max-w-6xl mx-auto">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Link>
      </Button>
      <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
        <div className="md:col-span-3">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover"
              data-ai-hint={imageData?.imageHint}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-col h-full">
            <h1 className="text-4xl font-headline font-bold text-primary">{artwork.title}</h1>
            <Badge variant="secondary" className="mt-2 w-fit">{artwork.style}</Badge>
            <p className="text-muted-foreground mt-4 text-lg">{artwork.description}</p>
            
            {artist && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm font-semibold mb-2">Artist</p>
                <Link href={`/artists/${artist.id}`} className="flex items-center gap-4 group">
                  <Avatar>
                    <AvatarImage src={artist.avatarUrl} alt={artist.name} />
                    <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">{artist.name}</h3>
                    <p className="text-sm text-accent group-hover:underline">View Portfolio</p>
                  </div>
                </Link>
              </div>
            )}
            
            <div className="mt-auto pt-6">
              <p className="text-3xl font-bold text-primary mb-4">${artwork.price.toFixed(2)}</p>
              <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Buy Now
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">Secure checkout with Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
