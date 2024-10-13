'use client'
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import OtpFroget from '@/components/froms/otpfroget';


const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  
});



export default function JoySignInSideTemplate() {


const [issentotp, setissentotp] = useState(false);
const [loading, setLoading] = React.useState(false);
const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    email: "",
    
  },
});

async function onSubmitSignup(data: z.infer<typeof FormSchema>) {
    setLoading(true);
  

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/otpfroget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();
      sessionStorage.setItem("email",result.email);

      if (response.ok) {
        toast({
          title: "OTP Sent",
          description: "An OTP has been sent to your email.",
        });
        console.log("otp sent");
        setissentotp(true);
       
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send OTP.",
        });
        alert(result.message);
        console.log("erro",result.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while sending OTP:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
      });
      setLoading(false);
    }
  }

 
  if (loading) {
    return (
      <div>
      <div className="flex items-center justify-center min-h-screen">
     <span className="loader"></span>
    </div>
    </div>
    );
  }





  return (
    <>
     { issentotp ? (
       <OtpFroget setIsSentOtp={setissentotp} setLoadings={setLoading} />
      ) : (
    
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            
        
            Logo
          </div>
          <Image
                  src="/map.jpg"
                  alt="Map"
                  layout="fill"
                  objectFit="cover"
                  className="absolute inset-0"
              />
            
          
        </div>
    
        
        <div className="flex h-full items-center p-9 lg:p-8  ">
      
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            
           
          <div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-4xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm">Enter your email and password below to login.</p>
            </div>
  
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitSignup)} className="space-y-6">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="ronaldo@example.com" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
               
  
                <div className="w-full flex items-center justify-center flex-col">
                  <p>
                     Have an account?{" "}
                    <a href="/login" className="text-blue-700 cursor-pointer">
                      Click here
                    </a>
                  </p>
                 
                  <Button type="submit" disabled={loading}>{loading? "Processing..." : "login"}</Button>
                 
                 
                  
                </div>
              </form>
            </Form>
          </div>
           
         
          
          </div>
        </div>
      </div>
  )
}

   
    </>
 
  );

}

