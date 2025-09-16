'use server';

/**
 * @fileOverview Stella-driven career path suggestion flow based on user interests and aptitudes.
 *
 * - suggestCareerPaths - A function that suggests potential career paths.
 * - SuggestCareerPathsInput - The input type for the suggestCareerPaths function.
 * - SuggestCareerPathsOutput - The return type for the suggestCareerPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCareerPathsInputSchema = z.object({
  interests: z
    .string()
    .describe('A comma-separated list of the user\u0027s interests.'),
  aptitudes: z
    .string()
    .describe('A comma-separated list of the user\u0027s aptitudes.'),
});
export type SuggestCareerPathsInput = z.infer<typeof SuggestCareerPathsInputSchema>;

const SuggestCareerPathsOutputSchema = z.object({
  careerSuggestions: z
    .string()
    .describe(
      'A comma-separated list of suggested career paths based on the user\u0027s interests and aptitudes.'
    ),
});
export type SuggestCareerPathsOutput = z.infer<typeof SuggestCareerPathsOutputSchema>;

export async function suggestCareerPaths(
  input: SuggestCareerPathsInput
): Promise<SuggestCareerPathsOutput> {
  return suggestCareerPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCareerPathsPrompt',
  input: {schema: SuggestCareerPathsInputSchema},
  output: {schema: SuggestCareerPathsOutputSchema},
  prompt: `Based on the following interests and aptitudes, suggest potential career paths.

Interests: {{{interests}}}
Aptitudes: {{{aptitudes}}}

Suggested Career Paths:`, // Prompt is left generic, so it can be extended.
});

const suggestCareerPathsFlow = ai.defineFlow(
  {
    name: 'suggestCareerPathsFlow',
    inputSchema: SuggestCareerPathsInputSchema,
    outputSchema: SuggestCareerPathsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
