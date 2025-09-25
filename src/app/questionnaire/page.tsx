
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Languages, Variable, Code, PlayCircle } from "lucide-react";
import Link from "next/link";
import { tests } from "@/lib/questionnaire-data";

export default function QuestionnairePage() {
  const testIcons: { [key: string]: React.ReactNode } = {
    'logical-reasoning': <BrainCircuit className="size-8 text-primary" />,
    'verbal-ability': <Languages className="size-8 text-primary" />,
    'quantitative-aptitude': <Variable className="size-8 text-primary" />,
    'technical-skills-python': <Code className="size-8 text-primary" />,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Skill Questionnaire</h1>
        <p className="text-muted-foreground">
          Select a test to assess your skills and identify areas for improvement.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tests.map((test) => (
          <Card key={test.id} className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4">
                {testIcons[test.id] || <BrainCircuit className="size-8 text-primary" />}
                <div className="flex-1">
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild className="w-full">
                <Link href={`/questionnaire/${test.id}`}>
                  <PlayCircle className="mr-2 size-4" /> Start Test
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
