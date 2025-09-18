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
        case 'course': return <BookOpen className="size-5 text-muted-foreground" />;
        case 'video': return <Film className="size-5 text-muted-foreground" />;
        case 'article': return <Newspaper className="size-5 text-muted-foreground" />;
        default: return <LinkIcon className="size-5 text-muted-foreground" />;
    }
}

function ResourcesList({ data }: { data: FindLearningResourcesOutput }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.resources.map((resource, index) => (
                <Link href={resource.url} target="_blank" rel="noopener noreferrer" key={index}>
                    <Card className="h-full hover:border-primary/50 transition-colors group flex flex-col justify-between">
                        <CardHeader>
                           <span className="flex size-12 items-center justify-center rounded-lg bg-accent mb-4">
                             <ResourceIcon type={resource.type} />
                           </span>
                           <CardTitle className="group-hover:text-primary transition-colors text-lg leading-snug">{resource.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    );
}

function ResourcesSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
            <Card key={i} className="flex flex-col justify-between">
                <CardHeader>
                    <div className="flex size-12 items-center justify-center rounded-lg bg-muted animate-pulse mb-4" />
                    <div className="space-y-2 flex-1">
                        <div className="h-5 w-full rounded-md bg-muted animate-pulse" />
                        <div className="h-5 w-2/3 rounded-md bg-muted animate-pulse" />
                    </div>
                </CardHeader>
                <CardContent>
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
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold font-headline">Resources Hub</h1>
                <p className="text-muted-foreground mt-2">
                    Explore a wealth of resources to guide your career journey. Search for books, courses, jobs, or careers to find exactly what you need.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        value={career}
                        onChange={(e) => setCareer(e.target.value)}
                        placeholder="Search for books, courses, jobs, or careers..."
                        className="pl-10 h-12"
                        aria-label="Search Resources"
                    />
                </div>
            </form>
            
            <div className="space-y-8">
                {isLoading && <ResourcesSkeleton />}
                
                {error && (
                    <Card className="border-destructive/50 max-w-xl mx-auto">
                        <CardHeader className="flex-row items-center gap-4 space-y-0">
                            <AlertTriangle className="size-6 text-destructive" />
                            <div>
                                <CardTitle className="text-destructive">An Error Occurred</CardTitle>
                                <CardDescription className="text-destructive/80">{error}</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                )}

                {resources && resources.resources.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Search Results for "{career}"</h2>
                        <ResourcesList data={resources} />
                    </div>
                )}
                
                {!isLoading && !resources && !error && (
                    <div className="text-center">
                        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed max-w-xl mx-auto">
                            <PackageSearch className="size-16 text-muted-foreground mb-4" />
                            <CardTitle>Find Your Learning Path</CardTitle>
                            <CardDescription className="mt-2 max-w-md mx-auto">
                                Enter a topic above to get a list of recommended learning materials from Stella.
                            </CardDescription>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
