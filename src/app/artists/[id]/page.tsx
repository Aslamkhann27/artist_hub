import { getArtistById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function ArtistPage({ params }: { params: { id: string } }) {
  const artist = await getArtistById(params.id);

  if (!artist) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <Button variant="ghost" asChild className="">
        <Link href="/artists">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Artists
        </Link>
      </Button>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <Avatar className="h-32 w-32 md:h-48 md:w-48 flex-shrink-0">
          <AvatarImage src={artist.avatarUrl} alt={artist.name} />
          <AvatarFallback className="text-6xl">{artist.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-headline font-bold text-primary sm:text-5xl">{artist.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{artist.bio}</p>
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-headline font-semibold text-primary mb-6 pb-2 border-b-2 border-primary/20">
          Portfolio
        </h2>
        <ArtworkGrid artworks={artist.portfolio} />
      </div>
    </div>
  );
}
