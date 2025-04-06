import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface CardItem {
  href: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

const Page: React.FC = () => {
  const cardItems: CardItem[] = [
    {
      href: 'gettingStarted',
      src: '/puzzle.png',
      alt: 'Getting Started',
      title: 'Getting Started',
      description: 'Start off the right foot with our comprehensive guides',
    },
    {
      href: 'account',
      src: '/vector.png',
      alt: 'Account',
      title: 'Account Setup',
      description: 'Configure your profile and preferences',
    },
    {
      href: 'faq',
      src: '/message.png',
      alt: 'F.A.Q',
      title: 'Knowledge Base',
      description: 'Find answers to common questions',
    },
    {
      href: 'security',
      src: '/shield.png',
      alt: 'Security',
      title: 'Security',
      description: 'Protect your account and data',
    },
    {
      href: 'community',
      src: '/community.png',
      alt: 'Community',
      title: 'Community',
      description: 'Connect with other users',
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-16 md:mb-24 space-y-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          How can we help?
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover resources tailored to your needs with our help center
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {cardItems.map((item, index) => (
          <Link key={index} href={`/documentary?content=${item.href}&description=${encodeURIComponent(item.description)}`} passHref>
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary/20 group">
              <CardHeader className="items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    width={40} 
                    height={40} 
                    className="transition-transform group-hover:scale-110"
                    priority={index < 3}
                  />
                </div>
                <CardTitle className="text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-4">{item.description}</CardDescription>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-primary/80"
                >
                  Learn more
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 md:mt-24 text-center space-y-6">
        <p className="text-muted-foreground">
          Can't find what you're looking for?
        </p>
        
      </div>
    </div>
  );
};

export default Page;