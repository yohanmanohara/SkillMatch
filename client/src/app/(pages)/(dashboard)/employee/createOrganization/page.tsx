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
import { Textarea } from "@/components/ui/textarea"
export default function TabsDemo() {

  interface User {
    companuPicUrl: string;
    comapnyName: string;
    companyType: string;
    companyEmail: string;
    contactnumber: string;
    ContactNumber: number;
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    companyDescription: string;

  }

  const [user, setUser] = useState<User | null>(null);
  const userId = sessionStorage.getItem('poop'); // Replace 'poop' with the correct session key.

  const router = useRouter();  

  const handleProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  
    try {
      const formData = new FormData(e.currentTarget);
  
      const createOrganization = {
        companuPicUrl: formData.get('companuPicUrl') as string,
        comapnyName: formData.get('comapnyName'),
        companyType: formData.get('companyType'),
        companyEmail: formData.get('companyEmail'),
        ContactNumber: formData.get('ContactNumber'),
        contactnumber: formData.get('contactnumber'),
        websiteUrl: formData.get('websiteUrl'),
        streetAddress: formData.get('streetAddress'),
        city: formData.get('city'),
        state: formData.get('state'),
        postalCode: formData.get('postalCode'),
        country: formData.get('country'),
        companyDescription: formData.get('companyDescription'),

      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updateusser/?id=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createOrganization),   
      });
  
    
      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Faild to Create  Organization",
          description:errorData.error || "Failed  Please try again..",
        });
      }
  
  
      router.refresh();
      window.location.reload();
      toast({
        title: "updated successfully",
        description: "Organization updated successfully",
      });
      
      
    } catch (error) {
     
      console.error("An error occurred while creating the organization:", error);
      
    }
  };




  

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <Tabs defaultValue="company" className="w-[300px] md:w-[800px]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="company">Company</TabsTrigger>
          
        </TabsList>

        
         
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Fill the Form to Create A organiztion</CardTitle>
              <Avatar className="rounded-full h-[120px] w-[120px] overflow-hidden">
                <AvatarImage src="/avatadefault.jpg" alt="User Avatar" />
              </Avatar>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re done.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleProfile}>
  <CardContent className="space-y-5">

    <div className="space-y-1">
      <Label htmlFor="companyName">Company Name</Label>
      <Input id="companyName" name="companyName" placeholder="Enter Company Name" required />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="companyType">Company Type</Label>
      <Input id="companyType" name="companyType"  required />
    </div>

    <div className="space-y-1">
      <Label htmlFor="companyEmail">Company Email</Label>
      <Input id="companyEmail" name="companyEmail"  required />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="ContactNumber">Contact Number</Label>
      <Input id="ContactNumber" name="ContactNumber"  placeholder="+94 772143651" required />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="websiteUrl">Website URL</Label>
      <Input id="websiteUrl" name="websiteUrl"  placeholder="websitelink" />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="streetAddress">Street Address</Label>
      <Input id="streetAddress" name="streetAddress"  placeholder="121 / 04 , western street" required/>
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="city">City</Label>
      <Input id="city" name="city" placeholder="Enter Your Living City" />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="state">State</Label>
      <Input id="state" name="state" placeholder="Enter Your State" />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="postalCode">Postal Code</Label>
      <Input id="postalCode" name="postalCode" placeholder="Enter Your Postal Code" />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="country">Country</Label>
      <Input id="country" name="country"  placeholder="Enter Your Country" />
    </div>

    <div>
      <Label htmlFor="companyDescription">Description</Label>
      <Textarea id="companyDescription" name="companyDescription" placeholder="Type your message here."  className="h-60"/>
  
    </div>
    
    
    
  </CardContent>
  
  <CardFooter>
    <Button type="submit" variant="secondary">Save Changes</Button>
  </CardFooter>
</form>

          </Card>
        </TabsContent>






      </Tabs>
    </div>
  );
}
