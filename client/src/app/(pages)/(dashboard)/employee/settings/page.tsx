"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmployeeSettings() {
  const userId = sessionStorage.getItem("userId"); // Retrieve user ID from session storage
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form

  // Handle form submission for updating employee details
  const handleEmployeeUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formRef.current) {
        throw new Error("Form reference is not available");
      }

      const formData = new FormData(formRef.current); // Use FormData to extract values
      const employeeData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        role: formData.get("role") as string,
        department: formData.get("department") as string,
        contactNumber: formData.get("contactNumber") as string,
        status: "Active", // Default status for employees
      };

      console.log(employeeData);

      // Simulate API call to update employee details
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/main_server/api/employee/update/?id=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error("Failed to update employee:", errorData);
          toast({
            title: "Failed to Update Employee Details",
            description: errorData.message || "Failed to update employee details. Please try again.",
          });
        } catch {
          throw new Error("Invalid response format");
        }
        return;
      }

      toast({
        title: "Employee details updated successfully",
        description: "Employee details have been successfully updated.",
      });

      router.push("/employee/settings"); // Redirect to employee settings or dashboard
    } catch (error) {
      console.error("An error occurred while updating employee details:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <Tabs defaultValue="account" className="w-[400px] md:w-[800px]">
        <TabsList className="grid grid-cols-1 text-4xl w-full h-max border-spacing-1">
          <TabsTrigger value="account" className="text-xl">
            Employee Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Update Your Employee Details</CardTitle>
              <CardDescription>
                Enter your employee details. Click &apos;Update&apos; when done.
              </CardDescription>
            </CardHeader>

            {/* Attach the ref to the form */}
            <form ref={formRef} onSubmit={handleEmployeeUpdate}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" name="role" placeholder="Software Engineer" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" name="department" placeholder="Engineering" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    placeholder="1234567890"
                    pattern="\d*"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? "Processing" : "Update Details"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}