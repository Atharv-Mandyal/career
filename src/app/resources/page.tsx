
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { findLearningResources, FindLearningResourcesOutput } from '@/ai/flows/find-learning-resources';
import { Loader2, Search, BookOpen, Film, Newspaper, AlertTriangle, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { examResources } from '@/lib/exam-resources';
import Image from 'next/image';

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

    const handleSearch = async (searchTerm: string) => {
        if (!searchTerm.trim()) return;

        setIsLoading(true);
        setResources(null);
        setError(null);
        setCareer(searchTerm);

        try {
            const result = await findLearningResources({ career: searchTerm });
            setResources(result);
        } catch (e) {
            console.error(e);
            setError('Stella could not find resources for this topic. Please try another one.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(career);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Find Your Learning Path</h1>
                <p className="text-muted-foreground">
                    Search for any career, skill, or topic, or select a popular exam below.
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
                            {isLoading && !resources ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Search className="mr-2 h-5 w-5" />
                            )}
                            Search
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <h2 className="text-xl font-bold font-headline">Popular Exams</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {examResources.map((exam) => (
                        <button key={exam.id} onClick={() => handleSearch(exam.name)} className="group relative aspect-[4/3] flex flex-col justify-between rounded-lg bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg border">
                            <div className="flex-1">
                                <h3 className="font-bold text-sm sm:text-base group-hover:text-primary transition-colors">{exam.name}</h3>
                            </div>
                            <div className="relative h-12 w-full mt-2">
                                <Image
                                    src={exam.logoUrl}
                                    alt={`${exam.name} logo`}
                                    width={40}
                                    height={40}
                                    className="absolute bottom-0 right-0 rounded-full"
                                    data-ai-hint="logo"
                                />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
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
