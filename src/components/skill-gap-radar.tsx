'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { Badge } from '@/components/ui/badge';

function formatCareerName(slug: string) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const SKILL_DATA: { [key: string]: { name: string; required: number; user: number }[] } = {
  'software-engineer': [ { name: 'Problem Solving', required: 9, user: 7 }, { name: 'Python/JS', required: 8, user: 8 }, { name: 'Databases', required: 7, user: 5 }, { name: 'Communication', required: 7, user: 6 }, { name: 'System Design', required: 8, user: 4 }, { name: 'Testing', required: 6, user: 5 }, ],
  'graphic-designer': [ { name: 'Creativity', required: 9, user: 8 }, { name: 'Adobe Suite', required: 9, user: 7 }, { name: 'Typography', required: 8, user: 6 }, { name: 'Communication', required: 7, user: 8 }, { name: 'UI/UX Principles', required: 7, user: 5 }, { name: 'Branding', required: 8, user: 6 }, ],
};

const chartConfig = { required: { label: "Required", color: "hsl(var(--primary))" }, user: { label: "Your Skill", color: "hsl(var(--accent))" } } satisfies ChartConfig;

export default function SkillGapRadar({ careerSlug }: { careerSlug: string }) {
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
