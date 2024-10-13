'use client'
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import OtpForm from '@/components/froms/otpfrom';
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


const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }).optional(),
});



export default function JoySignInSideTemplate() {

const [issentotp, setissentotp] = useState(false);
const [loading, setLoading] = React.useState(false);


const form = useForm<z.infer<typeof FormSchema>>({
  resolver: zodResolver(FormSchema),
  defaultValues: {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  },
});



const router = useRouter();
const [isLoading, setIsLoading] = useState(false);

async function onSubmitSignup(data: z.infer<typeof FormSchema>) {

  setLoading(true);


  if (data.password !== data.confirmPassword) {
    
    toast({
      title: "Password Mismatch",
      description: "Password and Confirm Password must match.",
    });

    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        username: data.username,
        password: data.password,
      }),

      
    });


   
    const result = await response.json();

    if (response.ok) {
      setissentotp(true);
      sessionStorage.setItem("email",data.email);
      

    } else {
     
      toast({
        title: "Signup Failed",
        description: result.message || "An error occurred during signup.",
      });
      sessionStorage.removeItem("email");
      setIsLoading(false);
      setLoading(false);

    }
  } catch (error) {
    
    toast({
      title: "Signup Error",
      description: "An unexpected error occurred.",
    });
    }
    setIsLoading(false);
    setLoading(false);

  }



 






  return (
    <>
     { issentotp ? (
       <OtpForm setIsSentOtp={setissentotp} setLoadings={setLoading} />
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
            <h1 className="text-4xl font-semibold tracking-tight">Create A New Account</h1>
            <p className="text-sm">Enter your details below to create an account.</p>
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

              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="ronaldo" {...field} required />
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
                      <Input type="password" placeholder="********" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex items-center justify-center flex-col">
                <p>
                  Already have an account?{" "}
                  <a href="/login"  className="text-blue-700 cursor-pointer">
                    Click here
                  </a>
                </p>
                <Button type="submit" disabled={isLoading}>{isLoading? "Processing..." : "Signup"}</Button>
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
  )
}

   
    </>
 
  );

}

