'use client'
import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import OtpFroget from '@/components/froms/otpfroget';

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

export default function JoySignInSideTemplate() {
  const [loading, setLoading] = React.useState(false);
  const [issentotp, setissentotp] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmitSignup(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/otpfroget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();
      sessionStorage.setItem("email", result.email);

      if (response.ok) {
        toast({
          title: "OTP Sent",
          description: "An OTP has been sent to your email.",
        });
        setissentotp(true);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send OTP.",
        });
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
      });
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Visual Panel - Glass Effect */}
      <div className="lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-green-800" />
        <div className="absolute inset-0 transition-all duration-1000 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-600/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-green-600/30 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col p-12 text-white">
          <Link href="/" className="flex items-center gap-2 mb-16 group">
            <Image src="/favicon.png" width={40} height={40} alt="Logo" className="transition-transform group-hover:scale-110" />
            <span className="text-xl font-semibold">SkillMatch</span>
          </Link>
          
          <div className="mt-auto space-y-6">
            <h2 className="text-4xl font-bold leading-tight">Welcome back</h2>
            <p className="text-white/80 max-w-md">
              Join thousands of satisfied Company managing their Recruitment with our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Login Form - Neumorphic Design */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Froget Password</h1>
            <p className="mt-2 text-muted-foreground">
              Enter your email to receive the OTP.
            </p>
          </div>

          <div className="rounded-xl bg-background/50 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-sm border border-white/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitSignup)} className="space-y-6">
                {/* Email Field */}
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
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Processing..." : "Send OTP"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p>
                Have an account?{" "}
                <Link href="/login" className="font-semibold text-emerald-600 hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
