
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { tests } from '@/lib/questionnaire-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;

  const test = tests.find((t) => t.id === testId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    test ? new Array(test.questions.length).fill(null) : []
  );
  const [error, setError] = useState<string | null>(null);

  if (!test) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <AlertCircle className="size-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold">Test not found</h1>
        <p className="text-muted-foreground">The test you are looking for does not exist.</p>
        <Button onClick={() => router.push('/questionnaire')} className="mt-4">
          Back to Questionnaire
        </Button>
      </div>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  const handleNext = () => {
    if (selectedAnswers[currentQuestionIndex] === null) {
      setError("Please select an answer before proceeding.");
      return;
    }
    setError(null);
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Finish test
      const score = selectedAnswers.reduce((acc, answer, index) => {
        if (answer === test.questions[index].correctAnswerIndex) {
          return acc + 1;
        }
        return acc;
      }, 0);
      router.push(`/questionnaire/${testId}/results?score=${score}&total=${test.questions.length}`);
    }
  };

  const handleSelectAnswer = (selectedIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = selectedIndex;
    setSelectedAnswers(newAnswers);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">{test.title}</h1>
        <p className="text-muted-foreground">Question {currentQuestionIndex + 1} of {test.questions.length}</p>
      </div>

      <Progress value={progress} className="w-full" />

      <Card>
        <CardHeader>
          <CardTitle>
            {currentQuestion.questionText}
          </CardTitle>
          <CardDescription>Select the correct option below.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswers[currentQuestionIndex]?.toString()}
            onValueChange={(value) => handleSelectAnswer(parseInt(value))}
            className="space-y-4"
          >
            {currentQuestion.options.map((option, index) => (
              <Label
                key={index}
                className="flex items-center gap-4 p-4 border rounded-md cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <span>{option}</span>
              </Label>
            ))}
          </RadioGroup>
          {error && <p className="text-destructive text-sm font-medium mt-4">{error}</p>}
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleNext} size="lg">
          {currentQuestionIndex < test.questions.length - 1 ? 'Next Question' : 'Finish Test'}
        </Button>
      </div>
    </div>
  );
}
