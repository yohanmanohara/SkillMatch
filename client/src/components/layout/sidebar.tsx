'use client';
import React, { useEffect, useState } from 'react';
import { DashboardNav } from '@/components/ui/dashboard-nav';
import { navItem } from '@/constants/data';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import { Button } from '@/components/ui/button';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized } = useSidebar();
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
        `fixed hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
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
            <DashboardNav items={navItem} />

            <div className='pt-7 pl-6'>
            {showButton && (
              <Button variant="secondary" onClick={() => router.push('/employer/overview')}>Employer View</Button> // Update button text as needed
            )}
            </div>
           
          </div>
        </div>
      </div>
    </aside>
  );
}
