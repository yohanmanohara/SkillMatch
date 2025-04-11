"use client"; // ✅ Mark this file as a Client Component

import { useEffect, useState } from "react";
import Navbar from "../components/landing/navbar";
import Hero from "@/components/landing/hero";
import Footer from "@/components/layout/footer";

import Container from "@/components/common/container";
import Customerfeedback from "@/components/landing/customerfeedback";
import {Contactus} from "@/components/landing/Getintouch";
import LatestJobs from "@/components/LatestJobs/LatestJobs";

import {TeamSection} from "@/components/common/CollaborationCard";
import ChatbotPage from "@/components/landing/chatbot";

const Page = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/fetchjobs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (

    <>
      <Navbar />  
      <Hero />
      

      <Container>
      <h2 className="text-2xl font-bold text-center mb-4">Top 5 Job Listings</h2>
        {loading ? <p>Loading jobs...</p> : <LatestJobs jobs={jobs} />}
      </Container>

      <Container>
        <Customerfeedback />
      </Container>

      <Container>
        <Contactus />
      </Container>
      <div className="p-12">

      </div>

      <ChatbotPage />
      
      <Footer />

    </>
  );
};

export default Page;
