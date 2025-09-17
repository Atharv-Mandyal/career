'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findLearningResources, FindLearningResourcesOutput } from '@/ai/flows/find-learning-resources';
import { Loader2, Search, BookOpen, Film, Newspaper, AlertTriangle, Link as LinkIcon, PackageSearch } from 'lucide-react';
import Link from 'next/link';

function ResourceIcon({ type }: { type: string }) {
    switch (type) {
        case 'course': return <BookOpen className="size-5 text-accent-foreground" />;
        case 'video': return <Film className="size-5 text-accent-foreground" />;
        case 'article': return <Newspaper className="size-5 text-accent-foreground" />;
        default: return <LinkIcon className="size-5 text-accent-foreground" />;
    }
}

function ResourcesList({ data }: { data: FindLearningResourcesOutput }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.resources.map((resource, index) => (
                <Link href={resource.url} target="_blank" rel="noopener noreferrer" key={index}>
                    <Card className="h-full hover:border-primary/50 transition-colors group flex flex-col">
                        <CardHeader className="flex-row items-start gap-4 space-y-0">
                           <span className="flex size-10 items-center justify-center rounded-lg bg-accent">
                             <ResourceIcon type={resource.type} />
                           </span>
                           <div>
                                <CardTitle className="group-hover:text-primary transition-colors text-lg leading-snug">{resource.title}</CardTitle>
                           </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

function ResourcesSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
            <Card key={i}>
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-muted animate-pulse" />
                    <div className="space-y-2 flex-1">
                        <div className="h-5 w-full rounded-md bg-muted animate-pulse" />
                        <div className="h-5 w-2/3 rounded-md bg-muted animate-pulse" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-4 w-full rounded-md bg-muted animate-pulse mb-1" />
                    <div className="h-4 w-full rounded-md bg-muted animate-pulse mb-1" />
                    <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse" />
                </CardContent>
            </Card>
        ))}
        </div>
    );
}

export default function ResourcesPage() {
    const [career, setCareer] = useState('');
    const [resources, setResources] = useState<FindLearningResourcesOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!career.trim()) return;

        setIsLoading(true);
        setResources(null);
        setError(null);

        try {
            const result = await findLearningResources({ career });
            setResources(result);
        } catch (e) {
            console.error(e);
            setError('Stella could not find resources for this career. Please try another one.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Learning Resources</h1>
                <p className="text-muted-foreground">
                    Enter a career to find study materials, courses, and more, curated by Stella.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={career}
                    onChange={(e) => setCareer(e.target.value)}
                    placeholder="e.g., Data Scientist, UX Designer..."
                    className="flex-grow"
                    aria-label="Career"
                />
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                        <Search className="mr-2 h-5 w-5" />
                    )}
                    Find Resources
                </Button>
            </form>

            {isLoading && <ResourcesSkeleton />}
            
            {error && (
                <Card className="border-destructive/50">
                    <CardHeader className="flex-row items-center gap-4 space-y-0">
                        <AlertTriangle className="size-6 text-destructive" />
                        <div>
                            <CardTitle className="text-destructive">An Error Occurred</CardTitle>
                            <CardDescription className="text-destructive/80">{error}</CardDescription>
                        </div>
                    </CardHeader>
                </Card>
            )}

            {resources && resources.resources.length > 0 && <ResourcesList data={resources} />}
            
            {!isLoading && !resources && !error && (
                 <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
                    <PackageSearch className="size-16 text-muted-foreground mb-4" />
                    <CardTitle>Find Your Learning Path</CardTitle>
                    <CardDescription className="mt-2 max-w-md mx-auto">
                        Enter a career above to get a list of recommended learning materials from Stella.
                    </CardDescription>
                </Card>
            )}
        </div>
    );
}
