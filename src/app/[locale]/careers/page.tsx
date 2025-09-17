'use client';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb } from 'lucide-react';
import Link from 'next-intl/link';
import { Suspense } from 'react';

function CareerList() {
    const searchParams = useSearchParams();
    const suggestionsParam = searchParams.get('suggestions');
    const allCareers = [
        "Software Engineer", "Graphic Designer", "Data Scientist", 
        "Product Manager", "Mechanical Engineer", "Marine Biologist",
        "Architect", "Digital Marketer"
    ];
    
    const suggestedCareers = suggestionsParam ? decodeURIComponent(suggestionsParam).split(',') : [];

    const careersToShow = suggestedCareers.length > 0 && suggestedCareers[0] !== '' ? suggestedCareers : allCareers;
    const title = suggestedCareers.length > 0 && suggestedCareers[0] !== '' ? "Stella Suggested Career Paths" : "Explore Career Paths";
    const description = suggestedCareers.length > 0 && suggestedCareers[0] !== ''
      ? "Based on your assessment, here are some careers you might love."
      : "Browse through various career options to find your passion.";

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">{title}</h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            {suggestedCareers.length > 0 && suggestedCareers[0] !== '' && (
                 <Card className="bg-accent/50 border-accent">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <Lightbulb className="size-6 text-accent-foreground" />
                        <div>
                            <CardTitle>Just for you</CardTitle>
                            <CardDescription className="text-accent-foreground/80">These are personalized suggestions. Click any career to dive deeper.</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {careersToShow.map((career) => (
                    <Link href={`/careers/${career.toLowerCase().replace(/ /g, '-')}`} key={career}>
                        <Card className="h-full hover:border-primary/50 transition-colors group">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors">
                                    {career}
                                    <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">Explore the day-to-day tasks, required skills, and educational path for a {career}.</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function CareersPage() {
    return (
        <Suspense fallback={<div className="text-center p-8">Loading suggestions...</div>}>
            <CareerList />
        </Suspense>
    )
}
