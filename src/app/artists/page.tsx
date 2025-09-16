import { getArtists } from '@/lib/data';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl">Our Talented Artists</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Meet the creative minds behind the masterpieces. Explore their portfolios and discover their stories.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map(artist => (
          <Card key={artist.id} className="text-center flex flex-col">
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={artist.avatarUrl} alt={artist.name} />
                <AvatarFallback className="text-3xl">{artist.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline">{artist.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-4">{artist.bio}</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild>
                <Link href={`/artists/${artist.id}`}>View Portfolio</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
