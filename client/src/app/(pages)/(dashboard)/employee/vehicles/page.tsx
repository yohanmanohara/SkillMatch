// UserVehicles.tsx (Client Component)
"use client";

import { useEffect, useState } from 'react';
import { UserClient } from '@/components/tables/vehicle-tables/client';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin/overview' },
  { title: 'User', link: '/admin/user' }
];

const UserVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const userId = sessionStorage.getItem('poop'); 
  const router = useRouter();
  useEffect(() => {
    const fetchVehicles = async () => {
      if (userId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vehicle/getvehicles?id=${userId}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        setVehicles(data);
      }
    };

    fetchVehicles();
    const interval = setInterval(fetchVehicles, 200); 
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="space-y-2">
      <Breadcrumbs items={breadcrumbItems} />
     
      <UserClient data={vehicles} />
    </div>
  );
};

export default UserVehicles;
