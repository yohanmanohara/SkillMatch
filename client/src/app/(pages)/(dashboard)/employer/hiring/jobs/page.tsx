
import { UserClient } from '@/components/tables/employer-tables/client';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin/overview' },
  { title: 'User', link: '/admin/user' }
];


export default  async function UserPage() {
    
    const role = 'admin';
    const res = await  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getusers`, {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
      role:role,
        
      }),
    });
    const users = await res.json(); 
    console.log(users.message);
  return (

      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={users} /> 
      </div>
      
   
  );
}
