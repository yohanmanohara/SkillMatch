
import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/authfromsignup';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  

  return (
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
          
         
          <UserAuthForm />
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
  );
}
