"use server";
import { suggestArtworkStyle } from '@/ai/flows/artwork-style-suggestion';
import type { SuggestArtworkStyleOutput } from '@/ai/flows/artwork-style-suggestion';

export async function getStyleSuggestions(preferences: string): Promise<SuggestArtworkStyleOutput> {
  if (!preferences) {
    return { suggestions: [] };
  }
  return await suggestArtworkStyle(preferences);
}
