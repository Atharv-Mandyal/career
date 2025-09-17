"use client"

import * as React from "react"
import { Languages } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "next-intl/client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t("toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLocale("en")} disabled={locale === 'en'}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLocale("hi")} disabled={locale === 'hi'}>
          हिंदी
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
