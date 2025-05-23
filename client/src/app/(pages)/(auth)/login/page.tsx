"use client"
import * as React from 'react';
import { Suspense } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          redirect,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        sessionStorage.setItem("token", result.token);
        toast({ title: "Welcome back!", description: "Login successful" });
        if (result.redirectUrl) window.location.href = result.redirectUrl;
      } else {
        toast({
          title: "Access denied",
          description: result.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Couldn't reach the server",
        variant: "destructive",
      });
    } finally {
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
      {/* Visual Panel - Glass Morphism Effect */}
      <div
        className="lg:w-1/2 relative overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-green-800" />
        <div className={`absolute inset-0 transition-all duration-1000 ${isHovering ? 'opacity-20' : 'opacity-40'}`}>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-600/30 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-green-600/30 blur-3xl"></div>
        </div>
        <div className="relative z-10 h-full flex flex-col p-12 text-white">
          <Link href="/" className="flex items-center gap-2 mb-16 group">
            <Image
              src="/favicon.png"
              width={40}
              height={40}
              alt="Logo"
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-semibold">SkillMatch</span>
          </Link>
          <div className="mt-auto space-y-6">
            <h2 className="text-4xl font-bold leading-tight">Elevate your <br />experience</h2>
            <p className="text-white/80 max-w-md">
              Join thousands of satisfied Company managing their Reqruitment with our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Login Form - Neumorphic Design */}
      <div className="lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <div className="rounded-xl bg-background/50 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-sm border border-white/10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="you@example.com"
                              className="pl-10 bg-background/80 h-12 rounded-lg border-border/50 focus:ring-2 focus:ring-emerald-500/50"
                              {...field}
                            />
                            <svg
                              className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel className="text-sm font-medium">Password</FormLabel>
                          <Link
                            href="/forgot-password"
                            className="text-sm font-medium text-emerald-600 hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="pl-10 bg-background/80 h-12 rounded-lg border-border/50 focus:ring-2 focus:ring-emerald-500/50"
                              {...field}
                            />
                            <svg
                              className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg transition-all hover:shadow-emerald-500/20"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                      Signing in...
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </Form>

            {/* Continue with buttons */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-10 rounded-lg border-border/50 hover:bg-background/80"
                >
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-10 rounded-lg border-border/50 hover:bg-background/80"
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Main component that wraps LoginForm in Suspense boundary
export default function UltraModernLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
