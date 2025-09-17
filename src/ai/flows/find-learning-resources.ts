'use server';

/**
 * @fileOverview A Stella agent that finds relevant learning resources for a given career.
 *
 * - findLearningResources - A function that returns a list of learning resources.
 * - FindLearningResourcesInput - The input type for the findLearningResources function.
 * - FindLearningResourcesOutput - The return type for the findLearningResources function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const FindLearningResourcesInputSchema = z.object({
  career: z.string().describe('The career for which to find learning resources.'),
});
export type FindLearningResourcesInput = z.infer<typeof FindLearningResourcesInputSchema>;

const ResourceSchema = z.object({
  title: z.string().describe('The title of the learning resource.'),
  url: z.string().url().describe('The URL to access the resource.'),
  type: z.enum(['course', 'article', 'video', 'book', 'documentation']).describe('The type of the learning resource.'),
  description: z.string().describe('A brief description of what the resource covers.'),
});

export const FindLearningResourcesOutputSchema = z.object({
  resources: z.array(ResourceSchema).describe('A list of curated learning resources.'),
});
export type FindLearningResourcesOutput = z.infer<typeof FindLearningResourcesOutputSchema>;

export async function findLearningResources(
  input: FindLearningResourcesInput
): Promise<FindLearningResourcesOutput> {
  return findLearningResourcesFlow(input);
}

const prompt = ai.definePrompt({
    name: 'findLearningResourcesPrompt',
    input: { schema: FindLearningResourcesInputSchema },
    output: { schema: FindLearningResourcesOutputSchema },
    prompt: `You are Stella, a career development assistant. Your task is to find and curate a list of high-quality, relevant learning resources for a user interested in a specific career.

    For the career of "{{career}}", provide a list of 5-7 learning resources. The resources should be diverse, including a mix of online courses, insightful articles, videos, and official documentation where applicable. For each resource, provide a title, a direct URL, its type, and a concise description.

    The output must be a JSON object that strictly follows this format:
    {
      "resources": [
        {
          "title": "Resource Title",
          "url": "https://example.com/resource",
          "type": "course",
          "description": "A brief but informative description of the resource."
        }
      ]
    }

    Generate learning resources for: {{career}}`,
});

const findLearningResourcesFlow = ai.defineFlow(
  {
    name: 'findLearningResourcesFlow',
    inputSchema: FindLearningResourcesInputSchema,
    outputSchema: FindLearningResourcesOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("Failed to find learning resources.");
    }
    return output;
  }
);
