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
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/use-toast";
import { use, useState } from "react";
import { jobTitles } from "@/utils/jobTitles";
import { useEffect } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Loader2 } from "lucide-react"; 
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input"
import { X } from "lucide-react";
import { useRef } from "react";
import { date, set } from "zod";
export default function JobForm() {
  const [companyname, setcompanyname] = useState("");
  const previewUrl = "/avatadefault.jpg";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [picture, setPicture] = useState("");
  const [values, setValues] = useState([15000, 100000]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([] as string[]);
  const [errorimage, setErrorimage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploaded, setuploaded] = useState(false);
  const [pictureurl, setpictureurl] =useState("");
  
  const userId = sessionStorage.getItem('poop')




  const getOrganizationpicture = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getorganizationspicture/?id=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
  
      if (data) {
       
        
        setpictureurl(data.pictureurl||""); 
        setcompanyname(data.companyName||"");
        setuploaded(true);
        setPicture(data.pictureurl);
       
        
        
        
       
      } else {
        console.warn("No picture data found in response");
      }
    } catch (error) {
      console.error("Error fetching organization picture:", error);
    }
  };


  
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      companyname: companyname,
      pictureurl: pictureurl,
    }));
  }, [companyname, pictureurl]);

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
    getOrganizationpicture();

    
    fetchLocations();

  }, []);
 

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
    setPicture(URL.createObjectURL(file));
  };

  
  
  const handleSubmit = async  (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting formData:", JSON.stringify(formData, null, 2)); 
    console.log(formData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/addjobs/?id=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  // ✅ Ensure correct header
          },
          body: JSON.stringify(formData), 
        }
      );
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Form submitted successfully:", data);
        window.location.reload();
      } else {
        console.error("Error submitting form:", data);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };


  const handleRemoveItem = (field: keyof typeof formData, index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: Array.isArray(prevData[field]) ? prevData[field].filter((_, i) => i !== index) : prevData[field],
    }));
  };

  const handleAddItem = (category: string, value: string) => {
    if (!value.trim()) return;

    if (category === "requirements") setFormData((prevData) => ({ ...prevData, requirements: [...prevData.requirements, value] }));
    if (category === "desirable") setFormData((prevData) => ({ ...prevData, desirable: [...prevData.desirable, value] }));
    if (category === "benefits") setFormData((prevData) => ({ ...prevData, benefits: [...prevData.benefits, value] }));
  };

    
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
        setFormData((prevData) => ({ ...prevData, pictureurl: data.url }));

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
  
  interface JobFormData {
  companyname: string;
  title: string;
  employmentTypes: string[];
  description: string;
  location: string;
  requirements: string[];
  desirable: string[];
  benefits: string[];
  expirienceduration: number;
  educationlevel: string;
  pictureurl: string;
  expiredate: string;
  salaryMin: number;
  salaryMax: number;
}


  
    const [formData, setFormData] = useState<JobFormData>({
      companyname: companyname,
      title: "",
      employmentTypes: [], 
      description: "",
      location: "",
      requirements: [] as string[],  
      desirable: [] as string[],     
      benefits: [] as string[], 
      expirienceduration: 0,
      educationlevel: "",
      pictureurl: pictureurl || '',
      expiredate: "",
      salaryMin: 15000,
      salaryMax: 100000,
    

    });


  const clearInputs = () => {
    setFormData({
      companyname:  "", // Default to empty string if undefined
      title: "",
      employmentTypes: [],
      description: "",
      location: "",
      requirements: [],
      desirable: [],
      benefits: [],
      expirienceduration: 0,
      educationlevel: "",
      pictureurl: "",
      expiredate: "",
      salaryMin: 15000,
      salaryMax: 100000,

    });
    setValues([15000, 100000]);
    setStep(1);
    setuploaded(false);
    setPicture("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    window.location.reload();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Only apply this for checkboxes
  
    if (!uploaded && !selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
  
    setFormData((prevData) => {
      // Handle checkbox case for employmentTypes
      if (type === "checkbox" && name === "employmentTypes") {
        const updatedEmploymentTypes = checked
          ? [...prevData.employmentTypes, value]
          : prevData.employmentTypes.filter((type: string) => type !== value);
  
        return { ...prevData, employmentTypes: updatedEmploymentTypes };
      }
  
      // Default case for other input types
      return { ...prevData, [name]: value };
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

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.title || formData.employmentTypes.length === 0|| uploaded === false || !formData.salaryMin || !formData.salaryMax) {
        setError("Please fill out all fields. and upload the logo");
        return;
      }
    
    }
    
    if (step === 2) {
      const wordCount = formData.description.trim().split(/\s+/).length;
      setError("");
      setError2("");
      if (wordCount < 0) {
        setError("Job description must be at least 200 words.");
        return;
    }
    if (!formData.location ) {
      setError2("Please fill out all fields.");
      return;
    }
   
    
       }

    if (step === 3) {
      setError("");
      setError2("");
      if (formData.requirements.length === 0) {
        setError2("Please add at least one requirement.");
        return;
      }
      if (formData.desirable.length === 0) {
        setError2("Please add at least one desirable skill.");
        return;
      }
      if (formData.benefits.length === 0) {
        setError2("Please add at least one benefit.");
        return;
    }
  }

      if(step === 4) {
          setError("");
          setError2("");
          if (!formData.expirienceduration ) {
            setError2("Please fill out all fields.");
            return;
          } 
          if (!formData.educationlevel ) {
            setError2("Please fill out all fields.");
            return;
          }
          if (!formData.expiredate ) {
            setError2("Please fill out all fields.");
            return;


           }
          }

   
    setError("");
    setError2("");
    setStep(step + 1);
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    setStep(step - 1);
  };


  
  
  return (
    <AlertDialog>

      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="w-40">
          Add Job
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>

          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div>
              <AlertDialogTitle></AlertDialogTitle>
            </div>
            <AlertDialogDescription>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4 p-4">
            {step === 1 && (
              <>
                      <p>{companyname}</p>    

       <Avatar className="rounded-full h-[120px] w-[120px] overflow-hidden">
      <AvatarImage src={picture ? picture : previewUrl} alt="User Avatar" />
      </Avatar>
      <Input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} />


      <div className="flex gap-5"> 
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
     
            

            {errorimage && <p className="text-red-500 text-sm">{errorimage}</p>}

                <label htmlFor="title" className="text-lg font-semibold">
                  Job Title
                </label>
                <select
                
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                 
                  className="border p-2 rounded  border-green-400 bg-transparent dark:text-white dark:bg-gray-700"
                >
                  <option className="text-black bg-transparent " value="">
                    Select Job Title
                  </option>
                  {jobTitles.map((jobTitle, index) => (
                    <option className="text-black  bg-transparent" key={`${jobTitle}-${index}`} value={jobTitle}>
                      {jobTitle}
                    </option>
                  ))}
                </select>
                



                <label htmlFor="employmentTypes" className="text-lg font-semibold">
           Type of Employment
          </label>
             <div className="flex flex-col gap-2">
            {["Full-Time", "Part-Time", "Remote", "Internship", "Contract"].map((type) => (
          <label key={type} className="flex items-center gap-2">
            <input
              type="checkbox"
              name="employmentTypes"
              value={type}
              checked={formData.employmentTypes.includes(type)} 
              onChange={handleChange} 
            />
            {type}
          </label>
        ))}
      </div>



                <div className="flex flex-col gap-4">
                  <label htmlFor="salary" className="text-lg font-semibold">
                    Min Salary
                  </label>
                  
           <input
            type="number"
            className="border  border-green-400 p-2 rounded w-full"
            id="minsalary"
            name="salaryMin"
            value={formData.salaryMin}
            onChange={handleChange}
            required
            placeholder="Enter a Min salary"
          />
            
            <label htmlFor="salary" className="text-lg font-semibold">
                    Max Salary
          </label>
          
          <input
            type="number"
            className="border  border-green-400 p-2 rounded w-full"
            id="salaryMax"
            name="salaryMax"
            value={formData.salaryMax}
            onChange={handleChange}
            required
            placeholder="Enter a Min salary"
          />
            


                    
                  
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </>
            )}



            {step === 2 && (
              <>
                <label htmlFor="description" className="text-sm">
                  Job Description
                </label>
                <textarea
  id="description"
  name="description"
  value={formData.description}
  onChange={handleChange}
  required
  className="border p-2 rounded w-full h-30  border-green-400" // Adjust height here
  placeholder="Enter job description here (at least 200 words)"
  rows={10} 
/>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <label htmlFor="location" className="text-sm">
                  Location
                </label>
               
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="border p-2  border-green-400 rounded bg-transparent dark:text-white dark:bg-gray-700"
                  disabled={loading}
                >
                  <option className="text-black" value="">Select a Location</option>
                  {locations.map((location, index) => (
                    <option className="text-black" key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              

                
              </>
            )}
                            {error2 && <p className="text-red-500 text-sm">{error2}</p>}




            {step === 3 && 
            
              (<>
              <div className="space-y-4">
      <div>
        <Label>Requirements</Label>
        <div className="flex gap-2">
          <input
            type="text"
            className="border  border-green-400 p-2 rounded w-full"
            id="requirementsInput"
            placeholder="Enter a requirement"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem("requirements", (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
              }
            }}
          />
        </div>
       
        <ol className="flex flex-wrap gap-2 list-disc">
    {formData.requirements.map((req, index) => (
    <li
      key={index}
      className="flex items-center bg-green-500 mt-3 dark:bg-green-800 text-sm dark:text-gray-300 px-2 py-1 rounded-lg gap-2"
    >
      {req}<X className="bg-red-600 rounded-full h-3 pl- w-3 cursor-pointer" onClick={() => handleRemoveItem("requirements", index)} />
      
    </li>
    

  ))}
</ol>
      </div>

      {/* Desirable */}
      <div>
        <Label>Desirable</Label>
        <div className="flex gap-2">
          <input
            type="text"
            id="desirableInput"
            placeholder="Enter a desirable skill"
            className="border  border-green-400 p-2 rounded w-full"

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem("desirable", (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
                
              }
            }}
          />
        </div>
        <ol className="flex flex-wrap gap-2 list-disc">
    {formData.desirable.map((des, index) => (
    <li
      key={index}
      className="flex items-center bg-green-500 mt-3 dark:bg-green-800 text-sm dark:text-gray-300 px-2 py-1 rounded-lg gap-2"
    >
      {des}<X className="bg-red-600 rounded-full h-3 pl- w-3 cursor-pointer" onClick={() => handleRemoveItem("desirable", index)} />
      
    </li>
    

  ))}
</ol>
        
      </div>

      {/* Benefits */}
      <div>
        <Label>Benefits</Label>
        <div className="flex gap-2">
          <input
            type="text"
            id="benefitsInput"
            placeholder="Enter a benefit" 
            className="border  border-green-400 p-2 rounded w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddItem("benefits", (e.target as HTMLInputElement).value);
                (e.target as HTMLInputElement).value = "";
                
              }
            }}
          />
        </div>
        
        
        <ol className="flex flex-wrap gap-2 list-disc">
  {formData.benefits.map((ben, index) => (
    <li
      key={index}
      className="flex items-center bg-green-500 mt-3 dark:bg-green-800 text-sm dark:text-gray-300 px-2 py-1 rounded-lg gap-2"
    >
      {ben}<X className="bg-red-600 rounded-full h-3 pl- w-3 cursor-pointer" onClick={() => handleRemoveItem("benefits", index)} />
      
    </li>
    

  ))}
</ol>





      </div>
    </div>

              
              </>

              )
            
            
            }

            {step === 4 && (
             
             <>
             
              <Label>Experience In Years</Label>
              <input
                  type="number"
                  id="experience"
                  name="expirienceduration"
                  value={formData.expirienceduration}
                  onChange={handleChange}
                  required
                  className="border  border-green-400 p-2 rounded"
                  placeholder="Experience in years" 
                />

              <Label>Education Level Degree or HND </Label>
              <input
                  type="text"
                  id="education"
                  name="educationlevel"
                  value={formData.educationlevel}
                  onChange={handleChange}
                  required
                  className="border  border-green-400 p-2 rounded"
                  placeholder="Graduate or Post Graduate/HND or Diploma" 
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Label> Job Expire Date </Label>
              <input
                  type="Date"
                  id="date"
                  name="expiredate"
                  value={formData.expiredate}
                  onChange={handleChange}
                  required
                  className="border  border-green-400 p-2 rounded"
                  placeholder="Graduate or Post Graduate/HND or Diploma" 
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}





             </>
            
            
            )}

          







          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={clearInputs}>
              Cancel
            </AlertDialogCancel>
            
          {step > 1 &&
            <Button type="button" onClick={handlePrevious}>
             Privew
           </Button>

          }
           <AlertDialogAction onClick={step < 5 ? handleNext : handleSubmit}>
            {step < 5 ? "Next" : "Submit"}
           </AlertDialogAction>

          </AlertDialogFooter>


        </form>
      
      </AlertDialogContent>
    </AlertDialog>
  );

}