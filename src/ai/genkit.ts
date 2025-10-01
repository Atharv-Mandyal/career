import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
//import { memoryFlowStateStore } from 'genkit/flow';

export const ai = genkit({
  //flowStateStore: memoryFlowStateStore(),
  plugins: [googleAI()],
  // CHANGE: Use the fully qualified model identifier that includes the plugin prefix.
  model: 'googleai/gemini-2.5-flash',
});