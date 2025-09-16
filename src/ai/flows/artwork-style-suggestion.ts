'use server';

/**
 * @fileOverview Provides artwork style suggestions based on user preferences.
 *
 * - suggestArtworkStyle - A function that takes a description of aesthetic preferences and returns artwork style suggestions.
 * - SuggestArtworkStyleInput - The input type for the suggestArtworkStyle function.
 * - SuggestArtworkStyleOutput - The return type for the suggestArtworkStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestArtworkStyleInputSchema = z.string().describe('A description of the desired aesthetic preferences for artwork.');
export type SuggestArtworkStyleInput = z.infer<typeof SuggestArtworkStyleInputSchema>;

const SuggestArtworkStyleOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('A list of artwork style suggestions based on the input description.'),
});
export type SuggestArtworkStyleOutput = z.infer<typeof SuggestArtworkStyleOutputSchema>;

export async function suggestArtworkStyle(input: SuggestArtworkStyleInput): Promise<SuggestArtworkStyleOutput> {
  return suggestArtworkStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestArtworkStylePrompt',
  input: {schema: SuggestArtworkStyleInputSchema},
  output: {schema: SuggestArtworkStyleOutputSchema},
  prompt: `You are an AI art expert. A user will provide a description of their aesthetic preferences. Generate a list of artwork styles that match their preferences. Limit your response to 5 suggestions.

User Preferences: {{{$input}}}

Suggestions:`,
});

const suggestArtworkStyleFlow = ai.defineFlow(
  {
    name: 'suggestArtworkStyleFlow',
    inputSchema: SuggestArtworkStyleInputSchema,
    outputSchema: SuggestArtworkStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
