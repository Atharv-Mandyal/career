'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from 'next-intl/client';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { suggestCareerPaths } from '@/ai/flows/suggest-career-paths';
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  interests: z.string().min(10, {
    message: "Please describe your interests in a bit more detail.",
  }),
  aptitudes: z.string().min(10, {
    message: "Please describe your aptitudes or what you're good at.",
  }),
});

export default function AssessmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      aptitudes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await suggestCareerPaths(values);
      const suggestions = result.careerSuggestions.split(',').map(s => s.trim()).join(',');
      router.push(`/careers?suggestions=${encodeURIComponent(suggestions)}`);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Failed to get career suggestions. Please try again.",
      });
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Career Interest Assessment</h1>
        <p className="text-muted-foreground">
          Answer a few questions to discover career paths tailored to you.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tell us about yourself</CardTitle>
          <CardDescription>Your answers will help our Stella find the best matches for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your interests?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Playing video games, building things, creative writing, science experiments..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      List a few things you enjoy doing in your free time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aptitudes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your strengths or aptitudes?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Good with numbers, problem-solving, public speaking, artistic skills..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      What subjects or activities do you excel at?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Get Career Suggestions
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
