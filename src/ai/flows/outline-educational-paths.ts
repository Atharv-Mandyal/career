'use server';

/**
 * @fileOverview Provides educational path guidance for various careers.
 *
 * - outlineEducationalPaths - A function that outlines the educational qualifications and institutions required for a career.
 * - OutlineEducationalPathsInput - The input type for the outlineEducationalPaths function.
 * - OutlineEducationalPathsOutput - The return type for the outlineEducationalPaths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OutlineEducationalPathsInputSchema = z.object({
  career: z.string().describe('The name of the career to get educational path information for.'),
});
export type OutlineEducationalPathsInput = z.infer<typeof OutlineEducationalPathsInputSchema>;

const OutlineEducationalPathsOutputSchema = z.object({
  educationalPath: z.string().describe('A detailed outline of the educational qualifications, institutions, and steps required for the specified career.'),
});
export type OutlineEducationalPathsOutput = z.infer<typeof OutlineEducationalPathsOutputSchema>;

export async function outlineEducationalPaths(input: OutlineEducationalPathsInput): Promise<OutlineEducationalPathsOutput> {
  return outlineEducationalPathsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'outlineEducationalPathsPrompt',
  input: {schema: OutlineEducationalPathsInputSchema},
  output: {schema: OutlineEducationalPathsOutputSchema},
  prompt: `You are Stella, an AI assistant specialized in providing educational guidance for various careers.

  Based on the career provided, outline the educational qualifications, institutions, and steps required to pursue that career.

  Career: {{{career}}}
  `,
});

const outlineEducationalPathsFlow = ai.defineFlow(
  {
    name: 'outlineEducationalPathsFlow',
    inputSchema: OutlineEducationalPathsInputSchema,
    outputSchema: OutlineEducationalPathsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
