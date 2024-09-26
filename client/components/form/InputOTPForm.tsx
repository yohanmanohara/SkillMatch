"use client";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React, { useEffect, useState, Suspense } from "react";

const FormSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be exactly 6 digits." }),
});

function InputOTPForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otpSet, setOtpSet] = useState<boolean | null>(null);
  const [timer, setTimer] = useState<number>(300); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const otp = sessionStorage.getItem("otp");
      setOtpSet(!!otp);

      const timerInterval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setIsTimerActive(false);
            sessionStorage.removeItem("otp");
            setOtpSet(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update every second

      return () => clearInterval(timerInterval);
    }
  }, []);

  useEffect(() => {
    if (otpSet === false) {
      window.location.href = "/signup";
    }
  }, [otpSet]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!email) {
      return toast({
        title: "Email missing",
        description: "Email not found. Please retry the signup process.",
      });
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: data.otp,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "OTP Verified",
          description: "You have successfully verified your account.",
        });
        sessionStorage.removeItem("otp");
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        }
      } else {
        toast({
          title: "OTP Verification Failed",
          description: result.message || "An error occurred during OTP verification.",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "An unexpected error occurred.",
      });
    }
  }

  if (otpSet === null) {
    return <div>Loading...</div>;
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} className="w-auto">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your Email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-red-600">
          {isTimerActive ? (
            <span>
              Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          ) : (
            <span>OTP has expired. Please request a new one.</span>
          )}
        </div>

        <div className="flex gap-12">
          <Button type="submit" disabled={!isTimerActive}>Submit</Button>
          <Button disabled={!isTimerActive} className="bg-red-600 hover:bg-red-900" onClick={() => {
            sessionStorage.removeItem("otp");
            window.location.href = "/signup";
          }}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}

export default function OTPPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InputOTPForm />
    </Suspense>
  );
}
