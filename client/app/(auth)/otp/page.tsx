"use client";

import Image from 'next/image';
import InputOTPForm from '@/components/forms/InputOTPForm';



export default function AuthenticationPage() {
 

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          Logo
        </div>
        <Image
          src="/map2.jpg"
          alt="Map"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-9 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <InputOTPForm />
        </div>
      </div>
    </div>
  );
}
