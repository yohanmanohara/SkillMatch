"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function InterviewForm() {
  interface Interviewee {
    fullName: string;
    email: string;
    phoneNumber: string;
    jobTitle: string;
    experience: string;
    interviewDate: string;
    interviewTime: string;
    status: string;
  }

  const [interviewee, setInterviewee] = useState<Interviewee | null>(null);
  const interviewId = sessionStorage.getItem('interviewId'); // Replace with the correct session key.

  useEffect(() => {
    const fetchInterviewee = async () => {
      if (interviewId) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/main_server/api/interview/getsingle/?id=${interviewId}`, {
            cache: 'no-store',
          });
          const data = await res.json();
          setInterviewee(data);
        } catch (error) {
          console.error("Failed to fetch interviewee:", error);
        }
      }
    };
    fetchInterviewee();
  }, [interviewId]);

  const router = useRouter();  

  const handleInterviewForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const formData = new FormData(e.currentTarget);
  
      const updatedInterviewee = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phoneNumber: formData.get('phoneNumber'),
        jobTitle: formData.get('jobTitle'),
        experience: formData.get('experience'),
        interviewDate: formData.get('interviewDate'),
        interviewTime: formData.get('interviewTime'),
        status: formData.get('status'),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/main_server/api/interview/update/?id=${interviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInterviewee),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Failed to update interview information",
          description: errorData.error || "Please try again.",
        });
      }

      router.refresh();
      window.location.reload();
      toast({
        title: "Interview information updated successfully",
        description: "Changes saved successfully.",
      });
      
    } catch (error) {
      console.error("An error occurred while updating the interview information:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <Tabs defaultValue="interview" className="w-[300px] md:w-[800px]">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="interview">Interview Details</TabsTrigger>
        </TabsList>

        <TabsContent value="interview">
          <Card>
            <CardHeader>
              <CardTitle>Edit Interview Details</CardTitle>
              <Avatar className="rounded-full h-[100px] w-[100px] overflow-hidden">
                <AvatarImage src="/avatadefault.jpg" alt="Interviewee Avatar" />
              </Avatar>
              <CardDescription>
                Update the interview information here. Click save when you're done.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleInterviewForm}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" defaultValue={interviewee?.fullName} placeholder="Enter Full Name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" defaultValue={interviewee?.email} placeholder="Enter Email" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" name="phoneNumber" defaultValue={interviewee?.phoneNumber} placeholder="Enter Phone Number" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input id="jobTitle" name="jobTitle" defaultValue={interviewee?.jobTitle} placeholder="Enter Job Title" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input id="experience" name="experience" defaultValue={interviewee?.experience} placeholder="Enter Experience in Years" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="interviewDate">Interview Date</Label>
                  <Input id="interviewDate" name="interviewDate" type="date" defaultValue={interviewee?.interviewDate} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="interviewTime">Interview Time</Label>
                  <Input id="interviewTime" name="interviewTime" type="time" defaultValue={interviewee?.interviewTime} />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" name="status" defaultValue={interviewee?.status} placeholder="Enter Status (e.g., Pending, Confirmed)" />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
