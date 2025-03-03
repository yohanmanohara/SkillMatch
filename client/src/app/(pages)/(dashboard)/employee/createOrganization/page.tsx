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
import  state  from "@/data/state";
import companyTypes from "@/data/companytypes";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
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

  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userId = sessionStorage.getItem('poop'); // Replace 'poop' with the correct session key.
  const [companyType,setcompanyType]=useState("");
  const [states,setStates]=useState("");
  const [cityies,setCityies]=useState("");
  const router = useRouter();  

  const craeteCompany= async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!companyType)
    {
      toast({
        title: "Please Select Company Type",
        description: "Please Select Company Type",
      });
      return;
    }
    if(!states)
    {
      toast({
        title: "Please Select State",
        description: "Please Select State",
      });
      return;
    }

    if(!cityies)
    {
      toast({
        title: "Please Select City",
        description: "Please Select City",
      });
      return;
    }

  
    try {
      const formData = new FormData(e.currentTarget);
  
      const createOrganization = {
        
        companuPicUrl: formData.get('companyPicUrl') as string,
        comapnyName: formData.get('companyName'),
        companyType: companyType,
        companyEmail: formData.get('companyEmail'),
        contactnumber: formData.get('contactNumber'),
        websiteUrl: formData.get('websiteUrl'),
        streetAddress: formData.get('streetAddress'),
        city: cityies,
        state: states,
        postalCode: formData.get('postalCode'),
        companyDescription: formData.get('companyDescription'),

      };

        console.log(createOrganization);
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updateusser/?id=${userId}`, {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(createOrganization),   
    //   });
  
    
    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     toast({
    //       title: "Faild to Create  Organization",
    //       description:errorData.error || "Failed  Please try again..",
    //     });
    //   }
  
  
    //   router.refresh();
    //   window.location.reload();
    //   toast({
    //     title: "updated successfully",
    //     description: "Organization updated successfully",
    //   });
      
      
    } catch (error) {
     
      console.error("An error occurred while creating the organization:", error);
      
    }
  };



  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ country: "Sri Lanka" }),
          }
        );
        
        const data = await response.json();
  
        if (data && data.data) {
          setLocations(data.data);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };


  
    fetchLocations();
  }, []);



  

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

            <form onSubmit={craeteCompany}>
  <CardContent className="space-y-5">

    <div className="space-y-1">
      <Label htmlFor="companyName">Company Name</Label>
      <Input id="companyName" name="companyName" placeholder="Enter Company Name" required />
    </div>
    

    <div className="space-y-1">
      <Label htmlFor="companyType">Company Type</Label>
      
      <Select name="companyType" onValueChange={(value) => setcompanyType(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Company Types" />
  </SelectTrigger>
  <SelectContent className="max-h-60 overflow-y-auto">
    {companyTypes.map((type, index) => (
      <SelectItem className="dark:text-white" key={index} value={type.label}>
        {type.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

    </div>



    <div className="space-y-1">
      <Label htmlFor="companyEmail">Company Email</Label>
      <Input id="companyEmail" name="companyEmail" type="email" placeholder="index@gmail.com" required />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="ContactNumber">Contact Number</Label>
      <Input id="contactNumber" name="contactNumber" type="number" placeholder="+94 772143651" required />
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="websiteUrl">Website URL</Label>
      <Input id="websiteUrl" name="websiteUrl"  placeholder="websitelink" required/>
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="streetAddress">Street Address</Label>
      <Input id="streetAddress" name="streetAddress"  placeholder="121 / 04 , western street" required/>
    </div>
    
    <div className="space-y-1">
      <Label htmlFor="city">City</Label>
      
      <Select  name="cityies" onValueChange={(value) => setCityies(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="City" />
  </SelectTrigger>
  <SelectContent className="max-h-60 overflow-y-auto">
    {locations.map((location, index) => (
      <SelectItem className="dark:text-white" key={index} value={location}>
        {location}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

    </div>
    
    <div className="space-y-1">
      <Label htmlFor="state">State</Label>

  <Select  name="state" onValueChange={(value) => setStates(value)}>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="State" />
  </SelectTrigger>
  <SelectContent className="max-h-60 overflow-y-auto"  >
    {state.map((state, index) => (
      <SelectItem className="dark:text-white" id="state" key={index} value={state.label}>
        {state.label}
      </SelectItem>
    ))}
  </SelectContent>
  </Select>


    </div>


    
    <div className="space-y-1">
      <Label htmlFor="postalCode">Postal Code</Label>
      <Input id="postalCode" name="postalCode" placeholder="Enter Your Postal Code" required/>
    </div>
    
    

    <div>
      <Label htmlFor="companyDescription">Description</Label>
      <Textarea id="companyDescription" name="companyDescription" placeholder="Type your message here."  className="h-60"required/>
  
    </div>
    
  </CardContent>
  
  <CardFooter>
    <Button type="submit" variant="secondary">Create Organization</Button>
  </CardFooter>
</form>

          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
