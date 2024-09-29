"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

const FormeSchema = z.object({
  otp: z.string(),
  newPassword: z.string(),
  confirmPassword: z.string(),
});

export default function UserAuthForm() {
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const[isLoading2, setIsLoading2] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const router = useRouter(); 
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const forme = useForm<z.infer<typeof FormeSchema>>({
    resolver: zodResolver(FormeSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

 
  useEffect(() => {
    if (otpSent) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      if (timeLeft <= 0) {
        clearInterval(timer);
        router.push("/login"); 
        }
      return () => clearInterval(timer);
    }
  }, [otpSent, timeLeft, router]);

  async function handleSubmit(data: { email: string }) {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/otpfroget`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();
      sessionStorage.setItem("email", data.email);

      if (response.ok) {
        toast({
          title: "OTP Sent",
          description: "An OTP has been sent to your email.",
        });
        setOtpSent(true); 
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send OTP.",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while sending OTP:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
      });
      setIsLoading(false);
    }
  }

  const handlePasswordReset = async (data: z.infer<typeof FormeSchema>) => {
    const email = sessionStorage.getItem("email");
    setIsLoading2(true);
    if (!email) {
      setOtpSent(false);
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
          otp: data.otp,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Password Reset Successful",
          description: "Your password has been reset successfully.",
        });
        sessionStorage.removeItem("email");
        router.push("/login"); 
      } else {
        toast({
          title: "Reset Failed",
          description: result.message || "Failed to reset password.",
        });
        setIsLoading2(false);
      }
    } catch (error) {
      console.error("An error occurred while resetting password:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
      });
      setIsLoading2(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  
  return (
    <div>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">Forget Password</h1>
      </div>
      
      {!otpSent ? (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-2">
            <div className="space-y-1 gap-14">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...form.register("email")} />
              <Button type="submit" className="w-13 bg-red-600" disabled={isLoading}>
                {isLoading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          </CardContent>
        </form>
      ) : (
        <form onSubmit={forme.handleSubmit(handlePasswordReset)}>
          <CardContent className="space-y-2">
            <p></p>
            <div className="space-y-1">
              <Label htmlFor="otp">OTP</Label>
              <Input id="otp" {...forme.register("otp")} type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" {...forme.register("newPassword")} type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" {...forme.register("confirmPassword")} type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading2}> {isLoading2 ? "Processing..." : "Submit"}</Button>
           
          </CardFooter>
          <div className="text-center mt-4">
            <p>Time remaining to use the OTP: <strong>{formatTime(timeLeft)}</strong></p>
          </div>
        </form>
      )}
      <p className="px-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <a href="/login" className="text-blue-700 cursor-pointer">
          Click here
        </a>
      </p>
    </div>
  );
}
