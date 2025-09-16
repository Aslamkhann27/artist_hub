import type { Artist, Artwork } from './types';
import { PlaceHolderImages } from './placeholder-images';

const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

const artworks: Artwork[] = [
  { id: '1', title: 'Cosmic Dance', description: 'A vibrant explosion of colors on a canvas, representing the chaotic beauty of the universe.', price: 450, imageUrl: imageMap.get('artwork-1')!.imageUrl, artistId: '1', style: 'Abstract' },
  { id: '2', title: 'City in Bloom', description: 'An abstract take on a bustling metropolis, where buildings are replaced by blooming flowers.', price: 620, imageUrl: imageMap.get('artwork-2')!.imageUrl, artistId: '1', style: 'Abstract' },
  { id: '3', title: 'The Old Library', description: 'A hyper-realistic painting of a quiet, sunlit library corner, filled with ancient books.', price: 850, imageUrl: imageMap.get('artwork-3')!.imageUrl, artistId: '2', style: 'Realism' },
  { id: '4', title: 'Morning Dew', description: 'A close-up view of a spider web covered in morning dew, glistening in the first light.', price: 300, imageUrl: imageMap.get('artwork-4')!.imageUrl, artistId: '2', style: 'Realism' },
  { id: '5', title: 'Sunset on the Water', description: 'An impressionistic piece capturing the fleeting moments of a sunset over a calm lake.', price: 550, imageUrl: imageMap.get('artwork-5')!.imageUrl, artistId: '3', style: 'Impressionism' },
  { id: '6', title: 'Cafe Terrace', description: 'A lively cafe scene, captured with bold brushstrokes and a rich color palette.', price: 710, imageUrl: imageMap.get('artwork-6')!.imageUrl, artistId: '3', style: 'Impressionism' },
  { id: '7', title: 'Still Life with Fruit', description: 'A classic still life that plays with light and shadow on a bowl of fruit.', price: 400, imageUrl: imageMap.get('artwork-7')!.imageUrl, artistId: '2', style: 'Realism' },
  { id: '8', title: 'Ethereal Dreams', description: 'A soft, dreamlike abstract piece with flowing shapes and pastel colors.', price: 380, imageUrl: imageMap.get('artwork-8')!.imageUrl, artistId: '1', style: 'Abstract' },
];

const artists: Omit<Artist, 'portfolio'>[] = [
    { id: '1', name: 'Elena Vance', bio: 'Elena Vance is a contemporary abstract artist known for her dynamic use of color and texture. Her work explores themes of chaos and harmony in the natural world.', avatarUrl: imageMap.get('artist-1')!.imageUrl },
    { id: '2', name: 'Marcus Cole', bio: 'Marcus Cole is a master of realism. With a keen eye for detail, he captures everyday moments and objects with breathtaking precision, inviting viewers to see the beauty in the mundane.', avatarUrl: imageMap.get('artist-2')!.imageUrl },
    { id: '3', name: 'Sofia Reyes', bio: 'Sofia Reyes brings emotion to life with her impressionistic style. Her paintings are characterized by vibrant brushwork and a focus on light, capturing fleeting moments with energy and passion.', avatarUrl: imageMap.get('artist-3')!.imageUrl },
];

// In a real app, you would fetch this data from a database
export const getArtworks = async (): Promise<Artwork[]> => {
    return artworks;
};

export const getArtworkById = async (id: string): Promise<Artwork | undefined> => {
    return artworks.find(art => art.id === id);
};

export const getArtists = async (): Promise<Artist[]> => {
    return artists.map(artist => ({
        ...artist,
        portfolio: artworks.filter(art => art.artistId === artist.id),
    }));
};

export const getArtistById = async (id: string): Promise<Artist | undefined> => {
    const artist = artists.find(a => a.id === id);
    if (!artist) return undefined;
    return {
        ...artist,
        portfolio: artworks.filter(art => art.artistId === artist.id),
    };
};

export const getArtStyles = async (): Promise<string[]> => {
    const styles = new Set(artworks.map(art => art.style));
    return Array.from(styles);
}
