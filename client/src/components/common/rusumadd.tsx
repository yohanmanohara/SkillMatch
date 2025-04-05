"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SignUpDialog() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add sign-up logic here, e.g., send formData to an API
    console.log("Sign-up form submitted", formData);
  };
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");



  const applyForJob = async () => {
    const userId = sessionStorage.getItem("poop"); // Retrieve user ID from sessionStorage
    const jobId = searchParams.get("jobId"); // Get jobId from URL parameters

    if (!userId || !jobId) {
        console.error("Missing userId or jobId");
        alert("Error: User ID or Job ID is missing.");
        return;
    }

    console.log("User ID:", userId, "Job ID:", jobId); // Log both IDs for debugging

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/appliedjobs`, // Updated endpoint
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, jobId }), // Send userId and jobId in request body
            }
        );

        const data = await response.json();

        if (response.ok) {
            console.log("Job applied successfully:", data);
            alert("You have successfully applied for this job!");
        } else {
            console.error("Failed to apply for job:", data);
            alert(data.error || "Failed to apply. Please try again.");
        }
    } catch (error) {
        console.error("Error applying for job:", error);
        alert("An error occurred. Please try again later.");
    }
};


 
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="w-40 ">Update CV </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Add jobs Here</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill out the form to add your jobs.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4 p-4">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />

            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />

            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" >Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit" onClick={applyForJob}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
