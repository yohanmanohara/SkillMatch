'use client';
import React, { useState } from 'react';
import { DashboardNav } from '@/components/ui/dashboard-nav';
import { navItemadmin } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const router = useRouter();
  const handleToggle = () => {
    toggle();
  };

  return (
      <aside
      className={cn(
        `fixed  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block `,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className

      )}
    >
      <div className="hidden pl-5 pt-10 lg:flex items-center cursor-pointer">
      <Image src="/favicon.png" width={20} height={30} alt="Logo" onClick={() => router.push("/")} />
      <p className="ml-2 font-open-sans font-extrabold">SkillMatch</p> {/* Replace 'Your Text Here' with the actual text you want */}
  </div>
 
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2 ">
          <div className="mt-3 space-y-1 ">
            <DashboardNav items={navItemadmin} />
          </div>
        </div>
      </div>
    </aside>
  );
}
