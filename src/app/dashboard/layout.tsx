import AppSidebar from '@/components/app-sidebar';
import MobileSidebar from '@/components/mobile-sidebar';
import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PanelLeft } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
