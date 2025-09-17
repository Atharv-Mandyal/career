import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Zap, IndianRupee } from "lucide-react";

export default function CoursesPage() {
  const courses = PlaceHolderImages.filter(p => p.imageHint.includes("course"));

  // Manually add pricing info for demonstration
  const coursesWithPricing = courses.map((course, index) => {
    if (index % 2 === 0) {
      return { ...course, price: '799', isPaid: true };
    }
    return { ...course, price: 'Free', isPaid: false };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Explore Courses</h1>
        <p className="text-muted-foreground">
          Upskill with our collection of free and paid courses on trendy topics.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coursesWithPricing.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <div className="relative">
              <Image
                src={course.imageUrl}
                alt={course.description}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                data-ai-hint={course.imageHint}
              />
              <Badge className="absolute top-2 right-2" variant={course.isPaid ? "default" : "secondary"}>
                {course.isPaid ? <><IndianRupee className="size-4 mr-1"/>{course.price}</> : course.price}
              </Badge>
            </div>
            <CardHeader className="flex-1">
              <CardTitle>{course.description}</CardTitle>
              <CardDescription>A comprehensive course covering the latest trends and technologies.</CardDescription>
            </CardHeader>
            <CardFooter>
              {course.isPaid ? (
                <Button className="w-full">
                  <Zap className="mr-2 size-4" /> Buy Now
                </Button>
              ) : (
                <Button variant="secondary" className="w-full">
                  Start Learning
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
