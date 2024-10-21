
import { UserClient } from '@/components/tables/employer-tables-hiring/client';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useEffect, useState } from 'react';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin/overview' },
  { title: 'User', link: '/admin/user' }
];


export default  async function UserPage() {
    
   
  return (

      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient  /> 
      </div>
      
   
  );
}
