
'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Award, Target, TrendingUp } from 'lucide-react';
import { tests } from '@/lib/questionnaire-data';

export default function ResultsPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const testId = params.testId as string;

  const test = tests.find((t) => t.id === testId);
  const score = searchParams.get('score');
  const total = searchParams.get('total');

  const scoreValue = score ? parseInt(score, 10) : 0;
  const totalValue = total ? parseInt(total, 10) : 0;
  const percentage = totalValue > 0 ? (scoreValue / totalValue) * 100 : 0;
  
  let feedback = {
    title: "Good Effort!",
    description: "You're on the right track. Keep practicing to improve your score.",
    icon: <TrendingUp className="size-12 text-blue-500" />
  };

  if (percentage >= 80) {
    feedback = {
        title: "Excellent!",
        description: "You have a strong grasp of the concepts. Great job!",
        icon: <Award className="size-12 text-green-500" />
    };
  } else if (percentage >= 50) {
    feedback = {
        title: "Well Done!",
        description: "You have a good understanding. A little more practice will make you an expert.",
        icon: <Target className="size-12 text-yellow-500" />
    };
  }

  return (
    <div className="flex items-center justify-center min-h-full py-12">
        <Card className="w-full max-w-lg text-center">
            <CardHeader className="items-center">
                {feedback.icon}
                <CardTitle className="text-3xl font-headline mt-4">{feedback.title}</CardTitle>
                <CardDescription className="text-base">{test?.title}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-5xl font-bold">
                    {scoreValue} / {totalValue}
                </div>
                <p className="text-muted-foreground">{feedback.description}</p>
                <div className="flex items-center justify-center gap-2 font-semibold">
                    <CheckCircle className="size-5 text-green-500" />
                    <span>You've completed the test successfully.</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" onClick={() => router.push('/questionnaire')}>Take Another Test</Button>
                <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
            </CardFooter>
        </Card>
    </div>
  );
}
