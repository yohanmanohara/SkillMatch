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
import { Loader2 } from "lucide-react"; 
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
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
    userPicUrl: string;
    calUsername: string;
  }
  const [user, setUser] = useState<User | null>(null);
  const userId = sessionStorage.getItem('poop'); 
  const [error,setError]=useState("");
  const [uploaded, setuploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userpicture, setuserPicture] = useState("");
  const previewUrl = "/avatadefault.jpg";
  // const [pictureurl, setpictureurl] =useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
        setuserPicture(data.url);
        setuploaded(true);
        setLoading(false);
        
        // // setFormData((prevData) => ({ ...prevData, pictureurl: data.url }));
        // setpictureurl(data.url);
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
  

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getsingleuser/?id=${userId}`, {
            cache: 'no-store',
          });
          const data = await res.json();
          setUser(data);
          console.log(data)
          setuserPicture(data.userPicUrl);
         
         
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
        userPicUrl: userpicture,
        calUsername: formData.get('calUsername'),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updateuser/?id=${userId}`, {
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
  
  console.log("dw",userpicture);

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

  const  handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setuserPicture(URL.createObjectURL(file));
  };



  const handleClear = () => { 

    setuserPicture("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setuploaded(false);
  }



  const haddlepasswordupdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const formData = new FormData(e.currentTarget);
  
      const updatedPassword = {
        currentPassword: formData.get('currentPassword') as string,
        newPassword: formData.get('newPassword') as string,
        confirmPassword: formData.get('confirmPassword') as string,
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updatpassword/?id=${userId}`, {
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
              <Avatar className="rounded-full h-[120px] w-[120px] overflow-hidden">
                <AvatarImage src={userpicture ? user?.userPicUrl || previewUrl : previewUrl} alt="User Avatar" />
               </Avatar>
               <Input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <div className="flex pl-10 gap-5"> 
        <Button variant="secondary" onClick={handleFileUpload} >
        {loading ? (
        <Loader2 className="animate-spin w-5 h-5" />
      ) : uploaded ? (
        "Need Tochage Uploaded picture"
      ) : (
        "Upload"
      )}
      </Button> 
      <Button onClick={handleClear} variant="outline">
          Clear
        </Button>
      </div>
     
            

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
                <div className="space-y-1">
                  <Label htmlFor="status">calUsername</Label>
                  <Input id="calUsername" name="calUsername" defaultValue={user?.calUsername}  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" variant="secondary">Save Changes</Button>
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
              <Button type="submit" variant="secondary">Save Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        </form>


         
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Edit Your Compaby Details</CardTitle>
              <Avatar className="rounded-full h-[120px] w-[120px] overflow-hidden">
                <AvatarImage src="/avatadefault.jpg" alt="User Avatar" />
              </Avatar>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re done.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleProfile}>
  <CardContent className="space-y-5">
    {/* Company Name */}
    <div className="space-y-1">
      <Label htmlFor="orgName">Company Name</Label>
      <Input id="orgName" name="orgName" placeholder="Enter Company Name" required />
    </div>
    
    {/* Company Email */}
    <div className="space-y-1">
      <Label htmlFor="orgEmail">Company Type</Label>
      <Input id="orgEmail" name="orgType"  readOnly />
    </div>
    <div className="space-y-1">
      <Label htmlFor="orgEmail">Company Email</Label>
      <Input id="orgEmail" name="orgEmail"  readOnly />
    </div>
    
    {/* Contact Number */}
    <div className="space-y-1">
      <Label htmlFor="orgPhone">Contact Number</Label>
      <Input id="orgPhone" name="orgPhone"  placeholder="0772243631" required />
    </div>
    
    {/* Website URL */}
    <div className="space-y-1">
      <Label htmlFor="website">Website URL</Label>
      <Input id="website" name="website"  placeholder="websitelink" />
    </div>
    
    {/* Address Fields */}
    <div className="space-y-1">
      <Label htmlFor="street">Street Address</Label>
      <Input id="street" name="street"  placeholder="Enter Street Address" />
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
      <Label htmlFor="description">Description</Label>
      <Textarea placeholder="Type your message here."  className="h-60"/>
  
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
