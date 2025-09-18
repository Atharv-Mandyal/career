'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, ClipboardList, LayoutDashboard, Map, User, Video, BookOpen, GraduationCap as CoursesIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app-logo';
import { ThemeToggle } from './theme-toggle';

export default function MobileSidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/assessment', label: 'Assessment', icon: ClipboardList },
    { href: '/careers', label: 'Careers', icon: Briefcase },
    { href: '/roadmap', label: 'Roadmap', icon: Map },
    { href: '/interviews', label: 'Interviews', icon: Video },
    { href: '/portfolio', label: 'Portfolio', icon: User },
    { href: '/courses', label: 'Courses', icon: CoursesIcon },
    { href: '/resources', label: 'Resources', icon: BookOpen },
  ];

  const getIsActive = (href: string) => {
    return href === '/dashboard' ? pathname === href : pathname.startsWith(href);
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={getIsActive(item.href)}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex-row gap-2">
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
