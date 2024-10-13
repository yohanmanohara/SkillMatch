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
export default function TabsDemo() {

  // User interface for type-checking
  interface User {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    contactnumber: string;
    country: string;
    city: string;
    status: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const userId = sessionStorage.getItem('poop'); // Replace 'poop' with the correct session key.

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getsingleuser/?id=${userId}`, {
            cache: 'no-store',
          });
          const data = await res.json();
          setUser(data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };
    fetchUser();
  }, [userId]);
  const router = useRouter();  

  const handleProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  
    try {
      const formData = new FormData(e.currentTarget);
  
      const updatedUser = {
        username: formData.get('username'),
        email: formData.get('email'),
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        contactnumber: formData.get('contactnumber'),
        country: formData.get('country'),
        city: formData.get('city'),
        status: formData.get('status'),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/updateuser/?id=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
    
      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Faild to update user",
          description:errorData.error || "Failed to update user. Please try again..",
        });
      }
  
  
      router.refresh();
      window.location.reload();
      toast({
        title: "updated successfully",
        description: "User updated successfully",
      });
      
      
    } catch (error) {
     
      console.error("An error occurred while updating the profile:", error);
      
    }
  };




  const haddlepasswordupdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const formData = new FormData(e.currentTarget);
  
      const updatedPassword = {
        currentPassword: formData.get('currentPassword') as string,
        newPassword: formData.get('newPassword') as string,
        confirmPassword: formData.get('confirmPassword') as string,
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/updatpassword/?id=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPassword),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Failed to change password",
          description: errorData.error || "Please try again.",
        });
        return; // Exit early on error
      }
  
      toast({
        title: "Password changed successfully",
        description: "Your password has been updated.",
      });
  
      window.location.reload();
    } catch (error) {
      console.error("An error occurred while changing password:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };
  

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <Tabs defaultValue="account" className="w-[300px] md:w-[800px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          
        </TabsList>

        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Edit Your User Details</CardTitle>
              <Avatar className="rounded-full h-[100px] w-[100px] overflow-hidden">
                <AvatarImage src="/avatadefault.jpg" alt="User Avatar" />
              </Avatar>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re done.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleProfile}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Username</Label>
                  <Input id="username" name="username" defaultValue={user?.username} placeholder="Enter Username" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" defaultValue={user?.email} readOnly />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" name="firstname" defaultValue={user?.firstname } placeholder="Enter First Name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" name="lastname" defaultValue={user?.lastname} placeholder="Enter Last Name"  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contactnumber">Contact Number</Label>
                  <Input id="contactnumber" name="contactnumber" defaultValue={user?.contactnumber} placeholder="0772243631"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" defaultValue={user?.country} placeholder="Enter Your Living Country" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" defaultValue={user?.city } placeholder="Enter Your Living City" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" name="status" defaultValue={user?.status} readOnly />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>


        <form onSubmit={haddlepasswordupdate}>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="currentPassword" name="currentPassword" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="newPassword" name="newPassword" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Save Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        </form>


         
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Edit Your Compaby Details</CardTitle>
              <Avatar className="rounded-full h-[120px] w-[120px] overflow-hidden">
                <AvatarImage src="/company.jpg" alt="User Avatar" />
              </Avatar>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re done.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleProfile}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Company Name</Label>
                  <Input id="username" name="companyname" defaultValue={user?.username} placeholder="Enter Company Name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Company Email</Label>
                  <Input id="email" name="companyemail" defaultValue={user?.email} readOnly />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" name="firstname" defaultValue={user?.firstname } placeholder="Enter First Name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" name="lastname" defaultValue={user?.lastname} placeholder="Enter Last Name"  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="contactnumber">Contact Number</Label>
                  <Input id="contactnumber" name="contactnumber" defaultValue={user?.contactnumber} placeholder="0772243631"/>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" defaultValue={user?.country} placeholder="Enter Your Living Country" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" defaultValue={user?.city } placeholder="Enter Your Living City" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" name="status" defaultValue={user?.status} readOnly />
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
