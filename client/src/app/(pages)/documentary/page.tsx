"use client";
import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Menu, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/landing/navbar";
import { Skeleton } from "@/components/ui/skeleton";

type ContentKey = keyof typeof documentaryContent;

const documentaryContent = {
  'getting-started': {
    title: 'Getting Started',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">1. Creating an Account</h2>
          <p className="mt-4 text-muted-foreground">
            To access the full features of our platform, you need to create an account.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>Click on the <strong>Sign Up</strong> button at the top-right corner of the homepage.</li>
            <li>Enter your <strong>name, email, and a strong password</strong>.</li>
            <li>Verify your email by clicking the link sent to your inbox.</li>
            <li>Once verified, log in and complete your profile.</li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            A well-filled profile increases your chances of networking and job opportunities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. Setting Up Your Profile</h2>
          <p className="mt-4 text-muted-foreground">
            After signing up, update your profile to make the most of the platform.
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li><strong>Profile Picture:</strong> Upload a 872x872 px image.</li>
            <li><strong>Personal Information:</strong> Add your location, skills, and professional summary.</li>
            <li><strong>Resume Upload:</strong> Ensure your resume is in PDF format for better compatibility.</li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            A complete profile helps you stand out to employers and recruiters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">3. Navigating the Dashboard</h2>
          <p className="mt-4 text-muted-foreground">
            Once logged in, you will land on your <strong>Dashboard</strong>:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>Browse job listings relevant to your skills.</li>
            <li>Apply for jobs with a single click.</li>
            <li>Manage applications and track your submissions.</li>
            <li>Update your job postings (if you are an employer).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">4. Searching & Applying for Jobs</h2>
          <p className="mt-4 text-muted-foreground">
            Finding the right job is easy with the search feature:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>Use keywords, job titles, or company names to filter results.</li>
            <li>Apply directly by clicking the Apply Now button.</li>
            <li>Upload your resume and submit your application in seconds.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">5. Connecting with the Community</h2>
          <p className="mt-4 text-muted-foreground">
            Engage with other professionals:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>Join discussions in community forums.</li>
            <li>Engage with employers and recruiters via messaging.</li>
            <li>Attend webinars and workshops to improve your skills.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6. Need Help?</h2>
          <p className="mt-4 text-muted-foreground">
            If you encounter any issues:
          </p>
          <ul className="mt-4 space-y-2 list-disc pl-6">
            <li>Check the FAQs for quick solutions.</li>
            <li>Contact support for personalized assistance.</li>
            <li>Visit the Help Center for detailed guides.</li>
          </ul>
        </section>
      </div>
    ),
  },
  'account': {
    title: 'Account Setup',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Account Setup Guide</h2>
          <p className="mt-4 text-muted-foreground">
            Setting up your account is the first step to getting the most out of our platform.
          </p>
          
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">Sign Up Process</h3>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Click the "Sign Up" button</li>
                <li>Provide your email address and a secure password</li>
                <li>Fill in basic details like your name</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Email Verification</h3>
              <p className="mt-2 text-muted-foreground">
                Check your inbox for a verification email and click the provided link.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Profile Completion</h3>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Add your skills and professional summary</li>
                <li>Include your location</li>
                <li>Upload a profile picture</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Notification Settings</h3>
              <p className="mt-2 text-muted-foreground">
                Choose which notifications you'd like to receive in your account settings.
              </p>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  'faq': {
    title: 'Frequently Asked Questions',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Common Questions</h2>
          
          <div className="mt-6 space-y-8">
            <div>
              <h3 className="text-xl font-semibold">1. Why can't I upload my photo?</h3>
              <p className="mt-2 text-muted-foreground">
                The platform requires profile images to be 872x872 pixels in size. Please resize your image before uploading.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">2. Why can't I submit my application?</h3>
              <p className="mt-2 text-muted-foreground">
                Check these requirements:
              </p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>All required fields must be completed</li>
                <li>Resume must be in PDF format</li>
                <li>Try clearing your browser cache if issues persist</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">3. How do I reset my password?</h3>
              <p className="mt-2 text-muted-foreground">
                Password reset steps:
              </p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Go to the login page</li>
                <li>Click "Forgot Password"</li>
                <li>Enter your registered email</li>
                <li>Follow the instructions sent to your email</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">4. Why am I not receiving email notifications?</h3>
              <p className="mt-2 text-muted-foreground">
                Possible solutions:
              </p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Check your spam/junk folder</li>
                <li>Verify notifications are enabled in settings</li>
                <li>Contact support if issues continue</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  'security': {
    title: 'Security Settings',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Account Security</h2>
          
          <div className="mt-6 space-y-8">
            <div>
              <h3 className="text-xl font-semibold">1. Changing Your Password</h3>
              <p className="mt-2 text-muted-foreground">
                To change your password:
              </p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Log in to your account</li>
                <li>Go to account settings</li>
                <li>Click "Change Password"</li>
                <li>Enter current and new password</li>
                <li>Click "Save" to confirm</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">2. Two-Factor Authentication</h3>
              <p className="mt-2 text-muted-foreground">
                Enable 2FA for extra security:
              </p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Go to account settings</li>
                <li>Navigate to "Security" section</li>
                <li>Click "Enable 2FA"</li>
                <li>Set up with an authentication app</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  'community': {
    title: 'Community Guidelines',
    content: (
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold">Community Standards</h2>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold">1. Be Respectful</h3>
              <p className="mt-2 text-muted-foreground">
                Treat all community members with respect. Harassment or discrimination will not be tolerated.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">2. Share Knowledge</h3>
              <p className="mt-2 text-muted-foreground">
                We encourage sharing ideas and insights while avoiding spamming.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">3. Protect Privacy</h3>
              <p className="mt-2 text-muted-foreground">
                Do not share personal information of others without consent.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">4. Report Issues</h3>
              <p className="mt-2 text-muted-foreground">
                Please report inappropriate content to moderators or support.
              </p>
            </div>
          </div>
        </section>
      </div>
    ),
  },
};

const SidebarItem = ({
  itemKey,
  activeKey,
  onClick,
}: {
  itemKey: ContentKey;
  activeKey: ContentKey;
  onClick: () => void;
}) => {
  const isActive = itemKey === activeKey;
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start text-left h-14 px-6",
        isActive && "bg-accent text-accent-foreground"
      )}
      onClick={onClick}
    >
      <span className="truncate">{documentaryContent[itemKey].title}</span>
      {isActive && <ChevronRight className="ml-auto h-4 w-4 flex-shrink-0" />}
    </Button>
  );
};

const DocumentationLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="container py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight scroll-m-20">{title}</h1>
        <div className="mt-8 prose prose-sm sm:prose dark:prose-invert prose-headings:font-semibold prose-li:marker:text-muted-foreground">
          {children}
        </div>
      </article>
    </div>
  );
};

const DocumentaryPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const content = (searchParams.get("content") as ContentKey) || "getting-started";
  const activeContent = documentaryContent[content] || documentaryContent["getting-started"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (section: ContentKey) => {
    router.push(`?content=${section}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex flex-col pt-20 md:flex-row">
        {/* Mobile Header */}
        <header className={cn(
          "md:hidden sticky top-20 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all",
          isScrolled && "shadow-sm"
        )}>
          <div className="container flex h-16 items-center justify-between px-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="px-0">
                <div className="flex items-center px-6 py-4 border-b">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => router.push("/")}
                    className="text-muted-foreground"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </div>
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <nav className="space-y-1 p-2">
                    {Object.keys(documentaryContent).map((key) => (
                      <SheetClose key={key} asChild>
                        <SidebarItem
                          itemKey={key as ContentKey}
                          activeKey={content}
                          onClick={() => handleNavigation(key as ContentKey)}
                        />
                      </SheetClose>
                    ))}
                  </nav>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <h1 className="text-lg font-semibold truncate max-w-[180px]">
              {activeContent.title}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        {/* Desktop Sidebar */}
        <aside className="hidden md:block fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 border-r bg-muted/40">
          <div className="flex items-center px-6 py-4 border-b">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push("/")}
              className="text-muted-foreground"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <nav className="space-y-1 p-2">
              {Object.keys(documentaryContent).map((key) => (
                <SidebarItem
                  key={key}
                  itemKey={key as ContentKey}
                  activeKey={content}
                  onClick={() => handleNavigation(key as ContentKey)}
                />
              ))}
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="md:ml-64 flex-1">
          <DocumentationLayout title={activeContent.title}>
            {activeContent.content}
          </DocumentationLayout>
        </main>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col pt-20 md:flex-row">
        <aside className="hidden md:block fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 border-r bg-muted/40 p-6">
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-md" />
            ))}
          </div>
        </aside>
        <main className="md:ml-64 flex-1">
          <div className="container py-8 md:py-12 px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-64 mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-2/3" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SuspenseWrapper = () => (
  <Suspense fallback={<LoadingSkeleton />}>
    <DocumentaryPage />
  </Suspense>
);

export default SuspenseWrapper;