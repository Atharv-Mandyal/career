'use server';

/**
 * @fileOverview A Stella agent that generates a detailed career roadmap.
 *
 * - generateCareerRoadmap - A function that creates a step-by-step roadmap for a given career.
 * - GenerateCareerRoadmapInput - The input type for the generateCareerRoadmap function.
 * - GenerateCareerRoadmapOutput - The return type for the generateCareerRoadmap function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCareerRoadmapInputSchema = z.object({
  career: z.string().describe('The career for which to generate a roadmap.'),
});
export type GenerateCareerRoadmapInput = z.infer<typeof GenerateCareerRoadmapInputSchema>;

const RoadmapStageSchema = z.object({
    stage: z.string().describe('The title of the roadmap stage (e.g., "High School Foundations", "Higher Education").'),
    description: z.string().describe('A detailed description of what to focus on during this stage.'),
    steps: z.array(z.string()).describe('A list of actionable steps or milestones for this stage.'),
});

const GenerateCareerRoadmapOutputSchema = z.object({
  career: z.string(),
  roadmap: z.array(RoadmapStageSchema),
});
export type GenerateCareerRoadmapOutput = z.infer<typeof GenerateCareerRoadmapOutputSchema>;


export async function generateCareerRoadmap(
  input: GenerateCareerRoadmapInput
): Promise<GenerateCareerRoadmapOutput> {
  return generateCareerRoadmapFlow(input);
}

const prompt = ai.definePrompt({
    name: 'generateCareerRoadmapPrompt',
    input: { schema: GenerateCareerRoadmapInputSchema },
    output: { schema: GenerateCareerRoadmapOutputSchema },
    prompt: `You are Stella, an expert career counselor. Generate a detailed, stage-by-stage career roadmap for a user interested in becoming a {{career}}.

    The roadmap should be broken down into logical stages (e.g., High School, Higher Education, Early Career, Mid-Career).
    For each stage, provide a clear description and a list of specific, actionable steps the user should take.
    
    The output must be a JSON object that strictly follows this format:
    {
      "career": "{{career}}",
      "roadmap": [
        {
          "stage": "Stage 1 Title",
          "description": "Description of what to focus on in stage 1.",
          "steps": ["Actionable step 1.1", "Actionable step 1.2"]
        },
        {
          "stage": "Stage 2 Title",
          "description": "Description of what to focus on in stage 2.",
          "steps": ["Actionable step 2.1", "Actionable step 2.2"]
        }
      ]
    }
    
    Generate the roadmap for: {{career}}`,
});

const generateCareerRoadmapFlow = ai.defineFlow(
  {
    name: 'generateCareerRoadmapFlow',
    inputSchema: GenerateCareerRoadmapInputSchema,
    outputSchema: GenerateCareerRoadmapOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("Failed to generate career roadmap.");
    }
    return output;
  }
);
