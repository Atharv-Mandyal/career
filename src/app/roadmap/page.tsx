import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Career Roadmaps</h1>
        <p className="text-muted-foreground">
          Visual guides to help you navigate your career path.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
        <Construction className="size-16 text-muted-foreground mb-4" />
        <CardTitle>Coming Soon!</CardTitle>
        <CardDescription className="mt-2 max-w-md mx-auto">
          We're building detailed, interactive roadmaps for various careers. This feature will provide step-by-step guides, milestones, and resources for your chosen path. Stay tuned!
        </CardDescription>
      </Card>
    </div>
  );
}
