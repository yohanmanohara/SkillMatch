  "use client";
  import { useEffect, useState } from 'react';
  import Header from '@/components/layout/header';
  import Sidebarcustom from '@/components/layout/sidebar';


  export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [data, setData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const token = sessionStorage.getItem('token'); 
    
        if (!token) {
          setError('No token found');
          window.location.href = '/login'; 
          return;
        }
    
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/protected`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.ok) {
            const result = await response.json();
            setData(result.message);
            sessionStorage.setItem('role', JSON.stringify(result.role));
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("Email", result.email);
            sessionStorage.setItem("poop", result.id.toString());

            
            const role = result.role.role; 
            console.log('User Role:', result.role.role);
            

            if (role == 'admin') {
              setError('Access denied');
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('poop');
              sessionStorage.removeItem('role');
              sessionStorage.removeItem('Email');
              window.location.href = '/login'; 
            }
            
            setTimeout(() => {
              sessionStorage.removeItem('token');
              sessionStorage.removeItem('poop');

              sessionStorage.removeItem('role');
              sessionStorage.removeItem('Email');
              window.location.href = '/login'; 
            },86400000);
           

          } else {
            setError('Access denied');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('poop');

              sessionStorage.removeItem('role');
              sessionStorage.removeItem('Email');
              window.location.href = '/login'; 
          }
        } catch (error) {
          setError('Access denied');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('poop');

          sessionStorage.removeItem('role');
          sessionStorage.removeItem('Email');
          window.location.href = '/login'; 
        } 

        setLoading(false);
      }
    
      fetchData();
    }, []);

    if (loading) {
     
      return (
        <div>
          <div className="flex items-center justify-center min-h-screen">
         <span className="loader"></span>
        </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen flex-col">
              <span className="loader"></span>
              <p className=' text-2xl'>{error}</p>
            </div>
        );
    }

    return (
      <div className="flex flex-wrap min-h-screen  pr-2 md:pr-8">
        <Sidebarcustom />
        <main className="flex-1 flex flex-col w-full">
          <Header />
          <div className="pl-0 md:pl-[310px] ">
            <div>{children}</div> 
          </div>
        </main>
      </div>
    );
  }
