'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, ClipboardList, LayoutDashboard, Map, User, Video, BookOpen, GraduationCap as CoursesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
import { LanguageSwitcher } from './language-switcher';

export default function MobileSidebar() {
  const pathname = usePathname();
  const t = useTranslations('AppSidebar');

  const navItems = [
    { href: '/', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/assessment', label: t('assessment'), icon: ClipboardList },
    { href: '/careers', label: t('careers'), icon: Briefcase },
    { href: '/roadmap', label: t('roadmap'), icon: Map },
    { href: '/interviews', label: t('interviews'), icon: Video },
    { href: '/portfolio', label: t('portfolio'), icon: User },
    { href: '/courses', label: t('courses'), icon: CoursesIcon },
    { href: '/resources', label: t('resources'), icon: BookOpen },
  ];

  const getIsActive = (href: string) => {
    // Remove locale from pathname
    const cleanedPathname = pathname.replace(/^\/[a-z]{2}\//, '/').replace(/^\/[a-z]{2}$/, '/');
    return href === '/' ? cleanedPathname === href : cleanedPathname.startsWith(href);
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
        <LanguageSwitcher />
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
