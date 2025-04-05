"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Briefcase, Globe } from "lucide-react";
import Image from "next/image";

export const TeamSection = () => {
  const teamMembers = [
    {
      name: "Yohan Manohara",
      role: "CEO & Founder",
      description: "Visionary leader with 15+ years in tech innovation",
      image: "/hero/avatars/yohan.jpeg",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Charuka Karunarathna",
      role: "CTO",
      description: "Engineering expert specializing in scalable architectures",
      image: "/hero/avatars/charuka.jpeg",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
    {
      name: "Marcus Rivera",
      role: "Head of Partnerships",
      description: "Connector of people and opportunities across industries",
      image: "/hero/avatars/ranith.jpeg",
      social: {
        twitter: "#",
        linkedin: "#"
      }
    },
  ];

  const stats = [
    {
      icon: <Users className="h-4 w-4" />,
      value: "50+",
      label: "Team"
    },
    {
      icon: <Briefcase className="h-4 w-4" />,
      value: "12",
      label: "Years"
    },
    {
      icon: <Globe className="h-4 w-4" />,
      value: "8",
      label: "Countries"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            Meet <span className="text-primary">Our Team</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            The passionate people behind our success
          </p>
        </div>

        {/* Team Stats */}
        <div className="flex justify-center gap-4 mb-12 max-w-md mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-muted/30 px-4 py-3 rounded-lg text-center flex-1"
            >
              <div className="text-primary mx-auto mb-1 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-lg font-semibold">{stat.value}</h3>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-muted hover:border-primary/20 transition-all"
            >
              <div className="relative aspect-square">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2 px-4 pt-4">
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-primary text-sm">{member.role}</p>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </CardContent>
              <CardFooter className="flex gap-2 px-4 pb-4 pt-0">
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8" asChild>
                  <Link href={member.social.twitter} aria-label="Twitter">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </Link>
                </Button>
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8" asChild>
                  <Link href={member.social.linkedin} aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="ml-auto text-xs h-8 px-3 font-medium text-muted-foreground hover:text-primary"
                  asChild
                >
                  <Link href={`/team/${member.name.toLowerCase().replace(' ', '-')}`}>
                    View
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

      
      </div>
    </section>
  );
};