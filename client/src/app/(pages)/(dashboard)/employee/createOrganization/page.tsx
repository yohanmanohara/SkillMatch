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
import { Loader2 } from "lucide-react"; 
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
import { useEffect, useState, useRef } from "react"
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
  const previewUrl = "/avatadefault.jpg";
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userId = sessionStorage.getItem('poop'); 

  const [companyType,setcompanyType]=useState("");
  const [states,setStates]=useState("");
  const [cityies,setCityies]=useState("");
  const router = useRouter();  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploaded, setuploaded] = useState(false);
  const [picture, setPicture] = useState("");
  const role = sessionStorage.getItem('role');

  useEffect(() => {

    if (role == 'Employer') {
      router.push("/employee/overview");
    }

  }, []);

  const handleFileUpload = async () => {
    setLoading(true);
  
    if (!selectedFile) {
      toast({
        title: "File requirements",
        description: "select file to upload",
      });
      setLoading(false);
      return;
    }
  
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: "File requirements",
        description: "Only JPG and PNG files are allowed.",
      });
      setLoading(false);
      return;
    }
  
    // Check image dimensions
    const isValidSize = await checkImageDimensions(selectedFile);
    if (!isValidSize) {
      setError("Image must be exactly 826×826 pixels.");
      toast({
        title: "File requirements",
        description: "Image must be exactly 826×826 pixels..",
      });
      setLoading(false);
      return;
    }
  
    const formDataUpload = new FormData();
    formDataUpload.append("file", selectedFile);
  
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/file/fileupload/?id=${userId}`,
        {
          method: "POST",
          body: formDataUpload,
        }
      );
      const data = await response.json();
  
      if (response.ok) {
        setPicture(data.url);
        setuploaded(true);
        setLoading(false);
  
        toast({
          title: "File uploaded",
          description: "File uploaded successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to upload file.",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file.",
      });
      setLoading(false);
    }
  };
  
  const checkImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(img.width === 826 && img.height === 826);
      };
      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  };
  
  const handleClear = () => { 

    setPicture("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setuploaded(false);
  }


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const validTypes = ["image/png", "image/jpeg"];

  if (!validTypes.includes(file.type)) {
    toast({
      title: "Error",
      description: "Only PNG and JPEG files are allowed.",
    });

    setSelectedFile(null);
    handleClear();
    return;
  }

  const isValidSize = await checkImageDimensions(file);
  if (!isValidSize) {
    setError("Image must be exactly 826×826 pixels.");
    toast({
      title: "File requirements",
      description: "Image must be exactly 826×826 pixels.",
    });
    
    handleClear();
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
  };
  reader.readAsDataURL(file);

  setSelectedFile(file);
  setPicture(URL.createObjectURL(file));
};




  
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

    if(!picture)
    {
      toast({
        title: "Please Upload Company Image",
        description: "Please Upload Company Image",
      });
      return
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
  
      const organizationData = {
        
        companyPicUrl: picture,
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

        console.log(organizationData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/createorganizations/?id=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organizationData),
      });
  
    
      const responseData = await response.json(); // Parse the response body as JSON

    if (!response.ok) {
      toast({
        title: "Failed to Create Organization",
        description: responseData.message || "Something went wrong. Please try again.",
      });


      return;
    }
      else{

  
  
      
      toast({
        title: "updated successfully",
        description: "Organization updated successfully Ans Plz log Again",
      });}
      sessionStorage.removeItem('token');

      window.location.reload();

      
    } catch (error) {
     
      console.error("An error occurred while creating the organization:", error);
      toast({ title: "Error", description: "Something went wrong. Please try again." });
      
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
      <AvatarImage src={picture ? picture : previewUrl} alt="User Avatar" />
      </Avatar>
      <Input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
      <div className="flex gap-5"> 
        <Button variant="secondary" onClick={handleFileUpload} >
        {loading ? (
        <Loader2 className="animate-spin w-5 h-5" />
      ) : uploaded ? (
        "Uploaded"
      ) : (
        "Upload"
      )}
      </Button> 
      <Button onClick={handleClear} variant="outline">
          Clear
        </Button>
      </div>
     
      
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

      <Input id="contactNumber" name="contactNumber" type="tel" placeholder="+94 772143651" required />

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
