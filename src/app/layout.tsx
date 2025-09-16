import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AppLogo from '@/components/app-logo';

export const metadata: Metadata = {
  title: 'Future Compass',
  description: 'Your guide to a successful career.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
            <div className="relative flex min-h-screen">
                <AppSidebar />
                <div className='md:hidden'>
                  <Sheet>
                    <SheetContent side="left" className='p-0'>
                      <AppSidebar />
                    </SheetContent>
                  </Sheet>
                </div>
                <SidebarInset>
                  <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:hidden">
                    <Sheet>
                      <SidebarTrigger asChild>
                        <SheetContent side="left" className='p-0'>
                          <AppSidebar />
                        </SheetContent>
                      </SidebarTrigger>
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
      </body>
    </html>
  );
}
