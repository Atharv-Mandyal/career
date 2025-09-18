import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function LandingPage() {
  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'About' },
    { href: '#', label: 'Services' },
    { href: '#', label: 'Contact' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <AppLogo />
          <span className="sr-only">EduRes</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
          <ThemeToggle />
        </nav>
        <div className="ml-auto lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col gap-4 p-4">
                        <AppLogo />
                        <nav className="grid gap-4">
                            {navLinks.map((link) => (
                                <Link key={link.label} href={link.href} className="font-medium">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-col gap-2">
                           <Button variant="ghost">Login</Button>
                           <Button>Sign Up</Button>
                        </div>
                        <div className="pt-4">
                            <ThemeToggle />
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="space-y-6">
          <div className="p-2 inline-block">
             <Image 
                src="/Stella-character.png" 
                alt="Stella AI Character"
                width={400}
                height={400}
                className="rounded-xl"
                data-ai-hint="character illustration"
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
