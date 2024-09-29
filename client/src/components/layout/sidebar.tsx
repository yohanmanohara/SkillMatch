'use client';
import React, { useState } from 'react';
import { DashboardNav } from '@/components/ui/dashboard-nav';
import {  navItem } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

 

  return (
    <aside
      className={cn(
        `fixed  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block `,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className

      )}
    >
      <div className="hidden p-5  pt-10 lg:block">
      LoGO
      </div>
 
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2 ">
          <div className="mt-3 space-y-1 ">
            <DashboardNav items={navItem} />
          </div>
        </div>
      </div>
    </aside>
  );
}
