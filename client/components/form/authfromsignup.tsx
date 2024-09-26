"use client";
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
import React, { use } from "react";
import { format } from "path";
import { useState } from "react";
import { useEffect } from "react";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters." }).optional(),
});

export default function UserAuthForm() {
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
    
    
    setIsLoading(true);


    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Password and Confirm Password must match.",
      });
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/signup`, {
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
        router.push(`/otp?email=${encodeURIComponent(data.email)}`);
        sessionStorage.setItem("otp",data.email);

      } else {
        toast({
          title: "Signup Failed",
          description: result.message || "An error occurred during signup.",
        });
        sessionStorage.removeItem("otp");
        setIsLoading(false);
      }
    } catch (error) {
      toast({
        title: "Signup Error",
        description: "An unexpected error occurred.",
      });
      setIsLoading(false);
    }
  }

  return (
    <>
      
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
     
    </>
  );
}