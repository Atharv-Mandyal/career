import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Rocket, History } from "lucide-react";
import Link from "next/link";
import React from 'react';
import { detectCareerStage } from "@/ai/flows/detect-career-stage";
import { Skeleton } from "@/components/ui/skeleton";

async function CareerStageCard() {
  const aiInput = {
    studentProfile: "High school student interested in technology and arts, good at math.",
    recentActivities: "Completed an online coding bootcamp, attended a design workshop.",
  };
  const { careerStage, guidance } = await detectCareerStage(aiInput);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="size-5" />
          Your Career Stage
        </CardTitle>
        <CardDescription>{careerStage}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{guidance}</p>
      </CardContent>
    </Card>
  );
}

function ProgressTracker() {
  const progressItems = [
    { title: "Initial Assessment Completed", date: "August 15, 2024" },
    { title: "Viewed 'Software Engineer' Career", date: "August 16, 2024" },
    { title: "Saved 3 expert interviews", date: "August 18, 2024" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="size-5" />
          Your Journey
        </CardTitle>
        <CardDescription>A timeline of your progress so far.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {progressItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-4" />
                </div>
                {index < progressItems.length - 1 && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PersonalizedChecklist() {
  const checklistItems = [
    "Complete your profile information",
    "Take the full aptitude test",
    "Explore 5 suggested career paths",
    "Build your initial portfolio",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Steps</CardTitle>
        <CardDescription>Your personalized checklist to stay on track.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {checklistItems.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-primary/50" />
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome to Your Dashboard</h1>
        <p className="text-muted-foreground">Let's shape your future, one step at a time.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-primary/80 to-accent/60 p-6 flex flex-col justify-between text-primary-foreground lg:col-span-2">
          <div>
            <h2 className="text-2xl font-bold font-headline">Ready to discover your path?</h2>
            <p className="mt-2 max-w-prose text-primary-foreground/80">
              Our career assessment is the perfect starting point. It helps you understand your strengths and suggests careers that match your profile.
            </p>
          </div>
          <div className="mt-6">
            <Button asChild variant="secondary" size="lg">
              <Link href="/assessment">Start Assessment</Link>
            </Button>
          </div>
        </div>
        
        <React.Suspense fallback={
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-2" />
              </CardContent>
            </Card>
        }>
            <CareerStageCard />
        </React.Suspense>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ProgressTracker />
        <PersonalizedChecklist />
      </div>
    </div>
  );
}
