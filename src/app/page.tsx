import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <AppLogo />
          <span className="sr-only">EduRes</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="space-y-6">
          <div className="p-2 bg-gradient-to-br from-primary/50 to-background rounded-2xl inline-block">
             <Image 
                src="https://picsum.photos/seed/stella/400/400" 
                alt="Stella AI placeholder"
                width={400}
                height={400}
                className="rounded-xl"
                data-ai-hint="abstract gradient"
              />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline tracking-tighter">
              Hello. I'm Stella.
            </h1>
            <p className="max-w-md mx-auto text-lg text-muted-foreground">
              Your personal career navigator. Let's find your star.
            </p>
          </div>
          <Button asChild size="lg">
            <Link href="/dashboard">Begin Your Journey</Link>
          </Button>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} EduRes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
