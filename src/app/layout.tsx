
'use client';

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';

import AppSidebar from '@/components/app-sidebar';
import MobileSidebar from '@/components/mobile-sidebar';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PanelLeft } from 'lucide-react';

// Metadata cannot be defined in a client component.
// We can either move it to a server component or define it statically.
// export const metadata: Metadata = {
//   title: 'EduRes',
//   description: 'Your guide to a successful career.',
// };

function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="relative flex min-h-screen">
                <AppSidebar />
                <SidebarInset>
                    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className='h-7 w-7'>
                                    <PanelLeft />
                                    <span className="sr-only">Toggle Sidebar</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className='p-0'>
                                <MobileSidebar />
                            </SheetContent>
                        </Sheet>
                        <AppLogo />
                    </header>
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noLayoutPages = ['/', '/signup'];
  const isLayoutPage = !noLayoutPages.includes(pathname);


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>EduRes</title>
        <meta name="description" content="Your guide to a successful career." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {isLayoutPage ? <AppLayout>{children}</AppLayout> : children}
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
