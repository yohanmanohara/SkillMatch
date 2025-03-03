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

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchQuery.trim()) queryParams.append("search", searchQuery);
    if (location.trim()) queryParams.append("location", location);
    
    router.push(`/jobs?${queryParams.toString()}`);
  };

  return (
    <Container>
      <div className="flex align-top items-start justify-center">
        <div className="hero min-h-screen flex flex-col justify-evenly items-center">
          <div className="flex flex-col-reverse p-10 sm:flex-row md:flex-row">
            <div className="flex flex-col justify-around">
              <div className="font-poppins text-[50px] font-semibold leading-normal tracking-[-1.4px] h-full w-full flex justify-end items-end pl-10 sm:text-[70px]">
                <div className="flex flex-col">
                  <div>Signup & Discover</div>
                  <div>
                    your next{" "}
                    <span className="text-[#21c452] font-semibold text-[50px] leading-[normal] sm:text-[70px]">
                      job
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-start h-full">
                <div className="w-full h-auto flex-shrink-0 bg-[#E9FBEF] backdrop-blur-sm p-10 rounded-md justify-between sm:w-auto mt-5">
                  <div className="flex flex-col gap-5">
                    {/* Search Input */}
                    <div className="flex font-poppins items-center gap-2">
                      <Image src="/searchIcon.png" alt="searchIcon" width={25} height={25} />
                      <Input
                        type="text"
                        placeholder="Job title or keyword"
                        className="w-full border-none text-gray-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Location Input */}
                    <div className="flex font-poppins items-center gap-2">
                      <Image src="/location.png" alt="locationIcon" width={18} height={16} />
                      <Input
                        type="text"
                        placeholder="Location"
                        className="w-full border-none text-gray-600"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    {/* Search Button */}
                    <div>
                      <Button
                        variant="default"
                        className="w-full lg:w-[436px] h-10 lg:h-[42px] flex-shrink-0 bg-[#3BDE6C]"
                        onClick={handleSearch}
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex justify-end">
              <Image src="/hero_new.png" alt="Hero" width={800} height={800} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Hero;