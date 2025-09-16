'use server';

/**
 * @fileOverview Simulates a day in the life for a given career path using Stella.
 *
 * - simulateDayInLife - A function that simulates a day in the life for a given career.
 * - SimulateDayInLifeInput - The input type for the simulateDayInLife function.
 * - SimulateDayInLifeOutput - The return type for the simulateDayInLife function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateDayInLifeInputSchema = z.object({
  careerPath: z.string().describe('The career path to simulate a day in the life for.'),
});
export type SimulateDayInLifeInput = z.infer<typeof SimulateDayInLifeInputSchema>;

const SimulateDayInLifeOutputSchema = z.object({
  simulation: z.string().describe('A realistic simulation of a day in the life for the given career path.'),
});
export type SimulateDayInLifeOutput = z.infer<typeof SimulateDayInLifeOutputSchema>;

export async function simulateDayInLife(input: SimulateDayInLifeInput): Promise<SimulateDayInLifeOutput> {
  return simulateDayInLifeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateDayInLifePrompt',
  input: {schema: SimulateDayInLifeInputSchema},
  output: {schema: SimulateDayInLifeOutputSchema},
  prompt: `You are Stella, a tool that provides realistic simulations of a 'day in the life' for different careers.

  Provide a detailed simulation of a day in the life for the following career path:

  {{careerPath}}

  Include specific tasks, challenges, and interactions that someone in this career might experience. The simulation should be engaging and informative, giving the user a clear understanding of what the career entails.`,
});

const simulateDayInLifeFlow = ai.defineFlow(
  {
    name: 'simulateDayInLifeFlow',
    inputSchema: SimulateDayInLifeInputSchema,
    outputSchema: SimulateDayInLifeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
