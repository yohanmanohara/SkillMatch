"use client";
import { UserClient } from '@/components/tables/user-tables/client';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin/overview' },
  { title: 'User', link: '/admin/user' }
];

export default function UserPage() {
  const [users, setUsers] = useState([]); // State for storing users data
  const role="admin";
  useEffect(() => {
    const fetchData = async () => {
      try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getusers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: role,
        }),
        
      });


        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }

        const users = await res.json(); ;
        setUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
   
  }, []);

  return (
    <div className="space-y-2">
      <Breadcrumbs items={breadcrumbItems} />
      <UserClient data={users} /> {/* Passing the users data to UserClient */}
    </div>
  );
}
