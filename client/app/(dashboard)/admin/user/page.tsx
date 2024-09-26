// page.tsx (Server Component)
import PageContainer from '@/components/layout/page-container';
import { UserClient } from '@/components/tables/user-tables/client';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/admin/overview' },
  { title: 'User', link: '/admin/user' }
];

export default async function UserPage() {
  // Fetch data from the API
  const res = await fetch('http://localhost:4000/api/user/getusers', {
    cache: 'no-store', // Ensure data is fetched on every request (optional)
    
  });
  const users = await res.json(); // Replace with appropriate response structure
  
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <UserClient data={users} /> {/* Pass the fetched data to the client component */}
      </div>
    </PageContainer>
  );
}
