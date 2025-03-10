"use client"; // ✅ Mark this file as a Client Component

import { useEffect, useState } from "react";
import Navbar from "../components/landing/navbar";
import Hero from "@/components/landing/hero";
import Footer from "@/components/layout/footer";
import Buttonfilter from "@/components/landing/buttonfilter";
import Container from "@/components/common/container";
import Customerfeedback from "@/components/landing/customerfeedback";
import Contactus from "@/components/landing/Getintouch";
import JobDescription from "@/components/JobDescription/JobDescription";
import LatestJobs from "@/components/LatestJobs/LatestJobs";

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
      <Buttonfilter />

      <Container>
        {loading ? <p>Loading jobs...</p> : <LatestJobs jobs={jobs} />}
      </Container>

      <Container>
        <Customerfeedback />
      </Container>

      <Container>
        <Contactus />
      </Container>

      <Container>
        <JobDescription />
      </Container>

      <Footer />
    </>
  );
};

export default Page;
