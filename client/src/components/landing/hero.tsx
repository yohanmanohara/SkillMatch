"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "../common/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchQuery.trim()) queryParams.append("search", searchQuery);
    if (location.trim()) queryParams.append("location", location);
    
    router.push(`/jobs?${queryParams.toString()}`);
  };

  return (
    <Container>
      <div className="relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-green-100/20 blur-[100px] animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-100/15 blur-[100px] animate-float delay-1000" />
          <div className="absolute top-1/3 left-2/3 w-96 h-96 rounded-full bg-purple-100/10 blur-[100px] animate-float delay-1500" />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-16 gap-12 lg:gap-8">
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-8 z-10 w-full lg:w-1/2">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                <span className="block">Discover Your</span>
                <span className="block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
                    Dream Career
                  </span>{" "}
                  Path
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                AI-powered job matching connects you with opportunities that align with your skills and aspirations.
              </p>
            </div>

            {/* Search Form */}
            <form 
              onSubmit={handleSearch} 
              className="w-full max-w-2xl "
            >
              <div className="bg-background/80 backdrop-blur-lg rounded-xl shadow-xl p-6 space-y-4 border border-border/50">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="opacity-70"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <Input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    className="flex-1 border-0 bg-transparent placeholder:text-muted-foreground text-base focus-visible:ring-0 h-12 px-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="opacity-70"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <Input
                    type="text"
                    placeholder="City, state, or remote"
                    className="flex-1 border-0 bg-transparent placeholder:text-muted-foreground text-base focus-visible:ring-0 h-12 px-0"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-green-500 hover:from-green-500 hover:to-green-500 text-white font-medium text-lg py-6 rounded-xl transition-all duration-300 hover:shadow-lg group"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Find Your Perfect Match
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-4 pt-4 animate-fade-in">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="relative h-10 w-10">
                    <Image 
                      src={`/hero/avatars/avatar-${item}.jpg`}
                      alt="User"
                      fill
                      className="rounded-full border-2 border-background object-cover"
                    />
                    {item === 4 && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-500 border-2 border-background">
                        <span className="text-xs font-bold text-white">+2k</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">10,000+</span> professionals found jobs last month
              </div>
            </div>
          </div>

          <div className="hidden lg:flex relative w-1/2 h-full items-center justify-center animate-fade-in">
  <div className="relative w-full h-[80vh] max-h-[500px] min-h-[500px]">
    <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-border/20">
      <Image
        src="/hero/hero2.jpg"
        alt="Happy professionals at work"
        width={500}  // Set explicit width
        height={500} // Set explicit height
        quality={100} // Increase quality (default is 75)
        priority
        className="object-cover object-center w-full h-full"
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
     
    </div>
  </div>
</div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;