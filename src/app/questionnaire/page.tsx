
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Languages, Variable, Code, PlayCircle } from "lucide-react";

export default function QuestionnairePage() {
  const tests = [
    {
      title: "Logical Reasoning",
      description: "Assess your problem-solving and critical thinking abilities through a series of puzzles and challenges.",
      icon: <BrainCircuit className="size-8 text-primary" />,
      action: "Start Test",
    },
    {
      title: "Verbal Ability",
      description: "Evaluate your language comprehension, vocabulary, and communication skills.",
      icon: <Languages className="size-8 text-primary" />,
      action: "Start Test",
    },
    {
      title: "Quantitative Aptitude",
      description: "Test your numerical ability and mathematical skills with our quantitative assessment.",
      icon: <Variable className="size-8 text-primary" />,
      action: "Start Test",
    },
    {
      title: "Technical Skills: Python",
      description: "Measure your proficiency in Python programming with practical coding challenges.",
      icon: <Code className="size-8 text-primary" />,
      action: "Start Test",
    },
  ];

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
          <Card key={test.title} className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4">
                {test.icon}
                <div className="flex-1">
                    <CardTitle>{test.title}</CardTitle>
                    <CardDescription>{test.description}</CardDescription>
                </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button className="w-full">
                <PlayCircle className="mr-2 size-4" /> {test.action}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
