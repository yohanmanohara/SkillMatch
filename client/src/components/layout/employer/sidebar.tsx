'use client';
import React, { useState } from 'react';
import { DashboardNav } from '@/components/layout/employer/dashboard-nav';
import {  navItem, navItemempy } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const roleData = sessionStorage.getItem('role');
    const role = roleData ? JSON.parse(roleData).role : null;
    
    if (role === 'Employer') {
      setShowButton(true);
    } 
  }, []); 

 

  return (
    <aside
      className={cn(
        `fixed  hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block `,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className

      )}
    >

  <div className="hidden pl-5 pt-10 lg:flex items-center">
     <Image src="/favicon.png" width={20} height={30} alt="Logo" />
     <p className="ml-2 font-open-sans font-extrabold">SkillMatch</p> {/* Replace 'Your Text Here' with the actual text you want */}
  </div>
 
      <div className="space-y-4 py-4 ">
        <div className="px-3 py-2 ">
          <div className="mt-3 space-y-1 ">
            <DashboardNav items={navItemempy} />
            <div className='pt-7 pl-4 '>
            {showButton && (
              <Button variant="secondary" onClick={() => router.push('/employee/overview')}>Employee View</Button> // Update button text as needed
            )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
