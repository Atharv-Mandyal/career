
import data from './exam-resources.json';

export type ExamResource = {
  id: string;
  name: string;
  logoUrl: string;
  badge?: string;
};

export const examResources: ExamResource[] = data.examResources;
