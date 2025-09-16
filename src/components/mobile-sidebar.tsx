'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, ClipboardList, LayoutDashboard, Map, User, Video, BookOpen } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app-logo';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/assessment', label: 'Assessment', icon: ClipboardList },
  { href: '/careers', label: 'Careers', icon: Briefcase },
  { href: '/roadmap', label: 'Roadmap', icon: Map },
  { href: '/interviews', label: 'Interviews', icon: Video },
  { href: '/portfolio', label: 'Portfolio', icon: User },
  { href: '/resources', label: 'Resources', icon: BookOpen },
];

export default function MobileSidebar() {
  const pathname = usePathname();

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
                isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
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
    </Sidebar>
  );
}
