import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AppLogo from '@/components/app-logo';
import { PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileSidebar from '@/components/mobile-sidebar';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'EduRes',
  description: 'Your guide to a successful career.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
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
                <Toaster />
            </SidebarProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
