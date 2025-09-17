import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AppLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-1">
      <Compass className="size-8 text-primary" />
      <h1 className="text-xl font-bold font-headline tracking-tighter text-foreground group-data-[collapsible=icon]:hidden">
        EduRes
      </h1>
    </div>
  );
}
