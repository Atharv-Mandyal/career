'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next-intl/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateCareerRoadmap, GenerateCareerRoadmapOutput } from '@/ai/flows/generate-career-roadmap';
import { Loader2, Search, Map, Milestone, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  career: string;
};

function RoadmapTimeline({ data }: { data: GenerateCareerRoadmapOutput }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Map className="size-6 text-primary" />
          Roadmap for a {data.career}
        </CardTitle>
        <CardDescription>
          A step-by-step guide to help you navigate your career path, powered by Stella.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {data.roadmap.map((stage, stageIndex) => (
            <div key={stageIndex} className="relative pl-8">
              <div className="absolute left-0 top-1 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Milestone className="size-4" />
              </div>
              {stageIndex < data.roadmap.length - 1 && (
                <div className="absolute left-[11px] top-8 h-full w-0.5 bg-border" />
              )}
              <h3 className="text-xl font-semibold font-headline">{stage.stage}</h3>
              <p className="mt-1 text-muted-foreground">{stage.description}</p>
              <ul className="mt-4 space-y-3">
                {stage.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-green-500" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RoadmapSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-8 w-3/4 rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-1/2 rounded-md bg-muted animate-pulse mt-2" />
      </CardHeader>
      <CardContent className="space-y-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="relative pl-8">
            <div className="absolute left-0 top-1 flex size-6 items-center justify-center rounded-full bg-muted animate-pulse" />
            <div className="h-6 w-1/3 rounded-md bg-muted animate-pulse" />
            <div className="h-4 w-4/5 rounded-md bg-muted animate-pulse mt-2" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
              <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function RoadmapPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCareer = searchParams.get('career') || '';

  const [roadmap, setRoadmap] = useState<GenerateCareerRoadmapOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: { career: initialCareer },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.career.trim()) return;

    setIsLoading(true);
    setRoadmap(null);
    setError(null);
    router.push(`/roadmap?career=${encodeURIComponent(data.career)}`);

    try {
      const result = await generateCareerRoadmap({ career: data.career });
      setRoadmap(result);
    } catch (e) {
      console.error(e);
      setError('Stella could not generate a roadmap for this career. Please try another one.');
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically trigger search if career is in URL
  useState(() => {
    if (initialCareer) {
      setValue('career', initialCareer);
      onSubmit({ career: initialCareer });
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Career Roadmaps</h1>
        <p className="text-muted-foreground">
          Enter a career to generate a visual guide for your professional journey.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Input
          {...register('career')}
          placeholder="e.g., Software Engineer, Graphic Designer..."
          className="flex-grow"
          aria-label="Career"
        />
        <Button type="submit" disabled={isLoading} size="lg">
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Search className="mr-2 h-5 w-5" />
          )}
          Generate Roadmap
        </Button>
      </form>

      {isLoading && <RoadmapSkeleton />}
      {error && (
        <Card className="border-destructive/50">
          <CardHeader className="flex-row items-center gap-4 space-y-0">
             <AlertTriangle className="size-6 text-destructive" />
             <div>
                <CardTitle className="text-destructive">An Error Occurred</CardTitle>
                <CardDescription className="text-destructive/80">{error}</CardDescription>
             </div>
          </CardHeader>
        </Card>
      )}
      {roadmap && <RoadmapTimeline data={roadmap} />}
    </div>
  );
}
