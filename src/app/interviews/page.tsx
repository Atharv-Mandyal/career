import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PlayCircle } from "lucide-react";

export default function InterviewsPage() {
  const interviews = PlaceHolderImages.filter(p => p.imageHint.includes("interview"));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Expert Interview Library</h1>
        <p className="text-muted-foreground">
          Real-world insights from professionals in diverse fields.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {interviews.map((interview) => (
          <Card key={interview.id} className="group overflow-hidden cursor-pointer">
            <div className="relative">
              <Image
                src={interview.imageUrl}
                alt={interview.description}
                width={600}
                height={400}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                data-ai-hint={interview.imageHint}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="size-16 text-white/70 group-hover:text-white transition-colors" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="group-hover:text-primary transition-colors">{interview.description.split(' - ')[0]}</CardTitle>
              <CardDescription>{interview.description.split(' - ')[1]}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
