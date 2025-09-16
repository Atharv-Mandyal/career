import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PackageSearch } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Learning Resources</h1>
        <p className="text-muted-foreground">
          Find study materials, bootcamps, online courses, and local study groups.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
        <PackageSearch className="size-16 text-muted-foreground mb-4" />
        <CardTitle>Coming Soon!</CardTitle>
        <CardDescription className="mt-2 max-w-md mx-auto">
          A curated collection of bootcamps, courses, and study materials is on its way. We're also working on a feature to help you connect with local study groups.
        </CardDescription>
      </Card>
    </div>
  );
}
