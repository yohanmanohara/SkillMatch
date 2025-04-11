import { useEffect } from 'react';

export const useMyEffect = () => {
  useEffect(() => {
    console.log("Effect ran from custom hook");

   
    return () => {
      console.log("Cleanup from custom hook");
    };
  }, []); 
};


export const applyJob = async (jobData: {
    jobId: string;
    userId: string;
    message?: string;
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/applyjob`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobData),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to apply: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Apply Job Error:', error);
      throw error;
    }
  };