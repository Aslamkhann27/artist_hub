export type Artist = {
  id: string;
  name: string;
  bio: string;
  avatarUrl: string;
  portfolio: Artwork[];
};

export type Artwork = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  artistId: string;
  style: string;
};
