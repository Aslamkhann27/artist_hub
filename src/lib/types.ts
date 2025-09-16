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

export type Order = {
  id: string;
  date: string;
  artwork: Artwork;
  status: 'Processing' | 'Shipped' | 'Delivered';
  total: number;
};

export type Customer = {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    orders: Order[];
};
