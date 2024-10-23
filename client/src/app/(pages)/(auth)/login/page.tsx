"use client"
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';



const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),

});


export default function JoySignInSideTemplate() {
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
 
    },
  });
  


async function onSubmitLogin(data: z.infer<typeof FormSchema>) {

setLoading(true);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        
      }),
    });

    
   
    const result = await response.json();

    if (response.ok) {

      sessionStorage.setItem("token", result.token); 
      console.log(result);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });
      
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl; 
      }
     

    } else {
      toast({
        title: "Login Failed",
        description: result.message || "An error occurred during login.",
      });
     
      setLoading(false);
    }
  } catch (error) {
    toast({
      title: "Login Error",
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
   
   <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium cursor-pointer">
          
      
        <Image src="/favicon.png" width={30} height={40} alt="Logo" onClick={() => window.location.href = "/"} />
          
        </div>
        
        <Image
                src="/map.jpg"
                alt="Map"
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"

            />
          
        
      </div>
  
      
       
        
      <div className="flex h-full items-center p-9 lg:p-8 ">
    
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          
         
        <div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-4xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm">Enter your email and password below to login.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitLogin)} className="space-y-6">
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

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex items-center justify-center flex-col">
                <p>
                  Don't have an account?{" "}
                  <a href="/signup" className="text-blue-700 cursor-pointer">
                    Click here
                  </a>
                </p>
               
                <Button type="submit" disabled={loading}>{loading? "Processing..." : "login"}</Button>
               
                <p className='px-8 text-center text-sm text-muted-foreground'>
            Froget Password? {' '}
          <a href="/frogetpassword" className="text-blue-700 cursor-pointer">Click here </a>
          </p>
                
              </div>
            </form>
          </Form>
        </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
       
        
        </div>
      </div>
    </div>
    
    </>
  
  );
}

