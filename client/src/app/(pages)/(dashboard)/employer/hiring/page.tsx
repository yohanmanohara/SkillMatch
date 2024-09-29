// page.tsx (Server Component)
import { UserClient } from '@/components/tables/user-tables/client';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin/overview' },
  { title: 'User', link: '/admin/user' }
];

export default async function UserPage() {
  // Fetch data from the API
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getusers`, {
      cache: 'no-store', 
     
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
