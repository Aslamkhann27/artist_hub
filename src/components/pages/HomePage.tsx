"use client";

import { useState, useMemo } from 'react';
import type { Artwork } from '@/lib/types';
import ArtworkGrid from '@/components/artwork/ArtworkGrid';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type HomePageProps = {
  artworks: Artwork[];
  styles: string[];
  initialStyle?: string;
};

export default function HomePage({ artworks, styles, initialStyle = 'all' }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);

  const filteredArtworks = useMemo(() => {
    return artworks.filter(artwork => {
      const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artwork.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStyle = selectedStyle === 'all' || artwork.style === selectedStyle;
      return matchesSearch && matchesStyle;
    });
  }, [artworks, searchTerm, selectedStyle]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl">Welcome to the Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore a curated collection of unique creations from talented artists. Find the piece that speaks to you.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-card rounded-lg shadow-sm">
        <div className="w-full md:w-2/3">
          <Input
            type="text"
            placeholder="Search by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={selectedStyle} onValueChange={setSelectedStyle}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Styles</SelectItem>
              {styles.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <ArtworkGrid artworks={filteredArtworks} />
    </div>
  );
}
