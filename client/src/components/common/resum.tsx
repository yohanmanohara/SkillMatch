'use client';
import React from 'react';
import AlertDialogDemo from '@/components/common/rusumadd';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRouter } from 'next/navigation';
import { useRef } from "react";
import { Button } from '@/components/ui/button';

const Resume = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCancel = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the selected file
      }
    };
    const router = useRouter();
    const[resumload, setResumload] = React.useState(false);
    return (
    <>
    
            <div>



            {resumload ?(

                <div className='w-full flex justify-end pt-5'>
                 <AlertDialogDemo/>

                 </div>

                ):(
                    <div className="flex justify-center h-full flex-col">
                    <Label htmlFor="picture">Picture</Label>
                    <Input ref={fileInputRef} id="picture" type="file" />
                    <Button onClick={handleCancel} type="button">
                      Cancel
                    </Button>

                    
                  </div>
              
              
                          

                )}
</div>

        





           
    </>
        
        
    );
};

export default Resume;
