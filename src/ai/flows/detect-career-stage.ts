'use server';

/**
 * @fileOverview An AI agent that detects the user's current career stage and provides relevant guidance and resources.
 *
 * - detectCareerStage - A function that handles the career stage detection process.
 * - DetectCareerStageInput - The input type for the detectCareerStage function.
 * - DetectCareerStageOutput - The return type for the detectCareerStage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectCareerStageInputSchema = z.object({
  studentProfile: z
    .string()
    .describe(
      'A detailed profile of the student, including their interests, skills, education, and career aspirations.'
    ),
  recentActivities: z
    .string()
    .describe(
      'A summary of the student\'s recent activities related to career planning, such as attending workshops, taking courses, or applying for internships.'
    ),
});
export type DetectCareerStageInput = z.infer<typeof DetectCareerStageInputSchema>;

const DetectCareerStageOutputSchema = z.object({
  careerStage: z
    .string()
    .describe(
      'The student\'s current career stage (e.g., Exploration, Preparation, Implementation, Establishment, Maintenance, or Transition).'
    ),
  guidance: z
    .string()
    .describe(
      'Personalized guidance and resources relevant to the student\'s current career stage.'
    ),
});
export type DetectCareerStageOutput = z.infer<typeof DetectCareerStageOutputSchema>;

export async function detectCareerStage(input: DetectCareerStageInput): Promise<DetectCareerStageOutput> {
  return detectCareerStageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectCareerStagePrompt',
  input: {schema: DetectCareerStageInputSchema},
  output: {schema: DetectCareerStageOutputSchema},
  prompt: `You are an AI career advisor specializing in identifying student\'s career stages.

  Based on the student profile and recent activities, determine the student\'s current career stage and provide relevant guidance and resources.

  The career stages are:
  - Exploration: Exploring different career options and learning about various industries.
  - Preparation: Gaining the necessary skills and education for a chosen career path.
  - Implementation: Actively seeking internships, entry-level positions, and other opportunities to gain experience.
  - Establishment: Building a solid foundation in a chosen career and advancing within the field.
  - Maintenance: Maintaining skills and knowledge while continuing to grow professionally.
  - Transition: Making a career change or exploring new opportunities.

  Student Profile: {{{studentProfile}}}
  Recent Activities: {{{recentActivities}}}

  Respond in the following format:
  {
    "careerStage": "[career stage]",
    "guidance": "[personalized guidance and resources]"
  }`,
});

const detectCareerStageFlow = ai.defineFlow(
  {
    name: 'detectCareerStageFlow',
    inputSchema: DetectCareerStageInputSchema,
    outputSchema: DetectCareerStageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
