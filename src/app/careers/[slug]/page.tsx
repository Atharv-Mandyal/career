import { simulateDayInLife } from '@/ai/flows/simulate-day-in-life';
import { outlineEducationalPaths } from '@/ai/flows/outline-educational-paths';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Briefcase, GraduationCap, Telescope } from 'lucide-react';
import React from 'react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

function formatCareerName(slug: string) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function DayInLifeSimulation({ careerPath }: { careerPath: string }) {
  const { simulation } = await simulateDayInLife({ careerPath });
  const dayParts = simulation.split(/(Morning:|Afternoon:|Evening:|Key Responsibilities:)/).filter(Boolean);
  
  const groupedParts: { title: string, content: string }[] = [];
  for (let i = 0; i < dayParts.length; i += 2) {
    if (dayParts[i] && dayParts[i+1]) {
      groupedParts.push({ title: dayParts[i].trim(), content: dayParts[i+1].trim() });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Telescope className="size-5" />A Day in the Life of a {careerPath}
        </CardTitle>
        <CardDescription>An AI-powered simulation of a typical day.</CardDescription>
      </CardHeader>
      <CardContent>
        {groupedParts.length > 0 ? (
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
            {groupedParts.map((part, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{part.title}</AccordionTrigger>
                <AccordionContent>
                    <p className="whitespace-pre-wrap text-muted-foreground">{part.content}</p>
                </AccordionContent>
                </AccordionItem>
            ))}
            </Accordion>
        ) : <p className="text-muted-foreground whitespace-pre-wrap">{simulation}</p>}
      </CardContent>
    </Card>
  );
}

async function EducationalPath({ careerPath }: { careerPath: string }) {
    const { educationalPath } = await outlineEducationalPaths({ career: careerPath });
    const steps = educationalPath.split('\n').filter(line => line.trim().startsWith('- '));
  
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <GraduationCap className="size-5" />
            Educational Roadmap
          </CardTitle>
          <CardDescription>Key qualifications and steps to become a {careerPath}.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">{index + 1}</div>
                    <span className="flex-1 text-sm">{step.replace('- ', '')}</span>
                </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
}

const SKILL_DATA: { [key: string]: { name: string; required: number; user: number }[] } = {
  'software-engineer': [ { name: 'Problem Solving', required: 9, user: 7 }, { name: 'Python/JS', required: 8, user: 8 }, { name: 'Databases', required: 7, user: 5 }, { name: 'Communication', required: 7, user: 6 }, { name: 'System Design', required: 8, user: 4 }, { name: 'Testing', required: 6, user: 5 }, ],
  'graphic-designer': [ { name: 'Creativity', required: 9, user: 8 }, { name: 'Adobe Suite', required: 9, user: 7 }, { name: 'Typography', required: 8, user: 6 }, { name: 'Communication', required: 7, user: 8 }, { name: 'UI/UX Principles', required: 7, user: 5 }, { name: 'Branding', required: 8, user: 6 }, ],
};

const chartConfig = { required: { label: "Required", color: "hsl(var(--primary))" }, user: { label: "Your Skill", color: "hsl(var(--accent))" } } satisfies ChartConfig;

function SkillGapRadar({ careerSlug }: { careerSlug: string }) {
    const skills = SKILL_DATA[careerSlug] || SKILL_DATA['software-engineer'];
    const requiredSkills = skills.map(s => s.name);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Skill Gap Radar</CardTitle>
                <CardDescription>Comparing your skills to those required for a {formatCareerName(careerSlug)}.</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                    <RadarChart data={skills}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <PolarAngleAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <PolarGrid />
                        <Radar name="Required" dataKey="required" fill="var(--color-required)" fillOpacity={0.6} stroke="var(--color-required)" />
                        <Radar name="Your Skill" dataKey="user" fill="var(--color-user)" fillOpacity={0.7} stroke="var(--color-user)" />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm pt-4">
                <div className="font-medium leading-none">Required Skills</div>
                <div className="flex flex-wrap gap-1">
                    {requiredSkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
            </CardFooter>
        </Card>
    )
}

function LoadingCard({ title, description }: { title: string, description: string }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
}

export default function CareerDetailPage({ params }: { params: { slug: string } }) {
  const careerPath = formatCareerName(params.slug);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
          <Briefcase />
          {careerPath}
        </h1>
        <p className="text-muted-foreground">An in-depth look into the world of a {careerPath}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <React.Suspense fallback={<LoadingCard title="Loading Simulation..." description="Please wait..." />}>
              <DayInLifeSimulation careerPath={careerPath} />
            </React.Suspense>
        </div>
        <div className="space-y-6">
            <React.Suspense fallback={<LoadingCard title="Loading Roadmap..." description="Please wait..." />}>
                <EducationalPath careerPath={careerPath} />
            </React.Suspense>
            <SkillGapRadar careerSlug={params.slug} />
        </div>
      </div>
    </div>
  );
}
