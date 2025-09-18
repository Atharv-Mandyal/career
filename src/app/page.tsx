import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass } from 'lucide-react';
import AppLogo from '@/components/app-logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <AppLogo />
          <span className="sr-only">EduRes</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Navigate Your Future with EduRes
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover personalized career paths, gain essential skills, and build your portfolio. Your journey to a successful career starts here.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      Get Started <ArrowRight className="ml-2 size-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Compass className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square size-64 text-primary" />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} EduRes. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
