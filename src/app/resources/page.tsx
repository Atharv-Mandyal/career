
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findLearningResources, FindLearningResourcesOutput } from '@/ai/flows/find-learning-resources';
import { Loader2, Search, BookOpen, Film, Newspaper, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

function ResourceIcon({ type }: { type: string }) {
    switch (type) {
        case 'course': return <BookOpen className="size-5 text-primary" />;
        case 'video': return <Film className="size-5 text-primary" />;
        case 'article': return <Newspaper className="size-5 text-primary" />;
        default: return <LinkIcon className="size-5 text-primary" />;
    }
}

function ResourcesList({ data }: { data: FindLearningResourcesOutput }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.resources.map((resource, index) => (
                <Link href={resource.url} target="_blank" rel="noopener noreferrer" key={index}>
                    <Card className="h-full hover:border-primary/50 transition-colors group">
                        <CardHeader className="flex-row items-start gap-4 space-y-0">
                           <span className="flex size-12 items-center justify-center rounded-lg bg-accent">
                             <ResourceIcon type={resource.type} />
                           </span>
                           <div className="flex-1">
                            <CardTitle className="group-hover:text-primary transition-colors text-base">{resource.title}</CardTitle>
                           </div>
                        </CardHeader>
                        <CardContent>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
            <Card key={i}>
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-muted animate-pulse" />
                    <div className="space-y-2 flex-1">
                        <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
                        <div className="h-4 w-2/3 rounded-md bg-muted animate-pulse" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-1">
                        <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
                        <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse" />
                    </div>
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
                <h1 className="text-3xl font-bold font-headline">Find Your Learning Path</h1>
                <p className="text-muted-foreground">
                    Enter a career, skill, or topic to find curated learning resources.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Search for Resources</CardTitle>
                    <CardDescription>Get a list of courses, articles, and videos from Stella.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            value={career}
                            onChange={(e) => setCareer(e.target.value)}
                            placeholder="e.g., Data Science, Public Speaking..."
                            className="flex-grow"
                            aria-label="Career"
                        />
                        <Button type="submit" disabled={isLoading} size="lg">
                            {isLoading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Search className="mr-2 h-5 w-5" />
                            )}
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>
            
            <div className="space-y-4">
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

                {resources && resources.resources.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">Learning Resources for "{career}"</h2>
                        <ResourcesList data={resources} />
                    </div>
                )}
            </div>
        </div>
    );
}
