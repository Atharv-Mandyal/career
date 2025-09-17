import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Pencil } from "lucide-react";

export default function PortfolioPage() {
  const projects = PlaceHolderImages.filter(p => p.imageHint.includes("website") || p.imageHint.includes("app") || p.imageHint.includes("model"));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">My Portfolio</h1>
          <p className="text-muted-foreground">Showcase your skills and projects to the world.</p>
        </div>
        <Button>
          <Pencil className="mr-2 size-4" /> Edit Portfolio
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6 text-center">
                <Image src="https://picsum.photos/seed/user1/200/200" alt="User profile" width={120} height={120} className="rounded-full mx-auto mb-4 border-2 border-primary/50 p-1" data-ai-hint="profile picture" />
                <h2 className="text-2xl font-bold font-headline">Alex Doe</h2>
                <p className="text-muted-foreground">Aspiring Software Engineer</p>
                <div className="flex justify-center gap-2 mt-4">
                  <Button variant="outline" size="icon"><Github className="size-4" /></Button>
                  <Button variant="outline" size="icon"><Linkedin className="size-4" /></Button>
                  <Button variant="outline" size="icon"><Mail className="size-4" /></Button>
                </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>My Skills</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'TypeScript', 'Figma', 'Problem Solving', 'Teamwork', 'Agile'].map(skill => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
              <CardHeader><CardTitle>Featured Projects</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                {projects.map(project => (
                  <div key={project.id} className="flex flex-col sm:flex-row gap-6 group">
                    <Image src={project.imageUrl} alt={project.description} width={200} height={125} className="rounded-lg object-cover sm:w-[200px] aspect-video transition-transform group-hover:scale-105" data-ai-hint={project.imageHint}/>
                    <div className="flex-1">
                      <h3 className="font-bold font-headline group-hover:text-primary transition-colors">{project.description}</h3>
                      <p className="text-sm text-muted-foreground mt-1">A project showcasing modern UI/UX principles and responsive design, built with a focus on accessibility and performance.</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary">UI/UX</Badge>
                        <Badge variant="secondary">Web Design</Badge>
                        <Badge variant="secondary">React</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
