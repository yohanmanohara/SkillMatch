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
import { useState } from "react";
import { jobTitles } from "@/utils/jobTitles";
import { useEffect } from "react";
import { Loader2 } from "lucide-react"; 
import { Label } from "@radix-ui/react-dropdown-menu";
import { X } from "lucide-react";
import { set } from "zod";
export default function JobForm() {
  const [values, setValues] = useState([15000, 100000]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([] as string[]);
  const [logo, setLogo] = useState<string | null>(null);
  const [errorimage, setErrorimage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploaded, setuploaded] = useState(false);
  
  const userId = sessionStorage.getItem('poop')

  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const validTypes = ["image/png", "image/jpeg"];
      
      if (!validTypes.includes(file.type)) {
        setErrorimage("Only PNG and JPEG files are allowed.");
        setLogo(null);
        return;
      }

      setErrorimage(""); 
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string); 
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);  
      setError("");

    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", formData);
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
        setError("Please select a file to upload.");
        setLoading(false);
        return;
      }
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Only JPG and PNG files are allowed.");
        setLoading(false);
        return;
      }
    
      const formDataUpload = new FormData();
      formDataUpload.append('file', selectedFile);
    
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/jobs/fileupload/?id=${userId}`, {
          method: "POST",
          body: formDataUpload,
        });
        const data = await response.json();
        if (response.ok) {
          setFormData((prevData) => ({ ...prevData, logoId: data.url }));
          setuploaded(true);
          setLoading(false);
        } else {
          setError(data.error || "Failed to upload file.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setError("Failed to upload file.");
        setLoading(false);
      }
    };
  
  
  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    employmentTypes: [] as string[], 
    description: "",
    location: "",
    company: "",
    requirements: [] as string[],  
    desirable: [] as string[],     
    benefits: [] as string[], 
    expirienceduration: 0,
    educationlevel: "",
    logoId: "",
    expiredate: "",

  });




  const clearInputs = () => {
    setFormData({
      title: "",
      benefits: [],
      requirements: [],
      desirable: [],
      salary: "",
      employmentTypes: [],
      description: "",
      location: "",
      company: "",
      expirienceduration: 0,
      educationlevel: "",
      logoId: "",
      expiredate: "",

    });
    setValues([15000, 100000]);
    setStep(1);
    setError("");
    setError2("");
    setuploaded(false);
    setLogo(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement; // Assert as HTMLInputElement
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }
    if (type === "checkbox" && name === "employmentTypes") {
      setFormData((prevData) => {
        let updatedEmploymentTypes = [...prevData.employmentTypes];
  
        if (checked) {
          updatedEmploymentTypes.push(value);
        } else {
          updatedEmploymentTypes = updatedEmploymentTypes.filter((type) => type !== value);
        }
  
        return { ...prevData, employmentTypes: updatedEmploymentTypes };
      });
    } 
      // Handle other types of inputs (text, select, textarea)
      setFormData({
        ...formData,
        [name]: value,
      });
    
  };
  

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Check if job title or employment types are missing
      if (!formData.title || formData.employmentTypes.length === 0|| uploaded === false) {
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
    if (!formData.company ) {
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
              <AlertDialogTitle>Add Jobs Here</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              Please fill out the form to add your job details.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4 p-4">
            {step === 1 && (
              <>
              <label htmlFor="companyLogo" className="text-lg font-semibold" >
                Upload Company Logo
              </label>

              <div className="flex flex-row gap-2">
              {logo && (
          <div >
          
            <img src={logo} alt="Company Logo" className="w-16 h-16 object-cover rounded-full border" />
          </div>
           )}

              <input
                type="file"
                id="companyLogo"
                accept="image/*"
                className=" block w-full h-11 border border-green-400 rounded-md shadow-sm p-2"
                onChange={handleFileChange}
              />
              </div>

            {logo && (
              <div className="flex flex-row gap-3">
              <Button
                type="button"
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setLogo(null);
                  setSelectedFile(null);
                }}
                
              >
                Remove Logo
              </Button>

              <Button
      type="button"
      className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
      onClick={handleFileUpload}
      disabled={loading}
      
      
    >
     {loading ? (
        <Loader2 className="animate-spin w-5 h-5" />
      ) : uploaded ? (
        "Uploaded"
      ) : (
        "Upload"
      )}
    </Button>
              </div>
            )
            }


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

                <div>
                  <label htmlFor="salary" className="text-lg font-semibold">
                    Salary
                  </label>
                  <div style={{ width: "300px", margin: "20px auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <input
                        type="text"
                        value={`Rs. ${values[0].toLocaleString()}`}
                        readOnly
                        style={{ border: "none", width: "80px", textAlign: "center", background: "transparent" }}
                      />
                      <span>to</span>
                      <input
                        type="text"
                        value={`Rs. ${values[1].toLocaleString()}`}
                        readOnly
                        style={{ border: "none", width: "80px", textAlign: "center", background: "transparent" }}
                      />
                    </div>
                    <Slider
                      value={values}
                      onValueChange={(newValue: number[]) => setValues(newValue)}
                      min={15000}
                      max={2000000}
                      style={{ color: "#5F3FF3" }}
                    />
                  </div>
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
  rows={10} // Adjust number of rows
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
              

                <label htmlFor="company" className="text-sm">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="border  border-green-400 p-2 rounded"
                  placeholder="Enter company name with pvt ltd or inc." 
                />
              </>
            )}
                            {error2 && <p className="text-red-500 text-sm">{error2}</p>}




            {step === 3 && 
            
              (<>
              <div className="space-y-4">
      {/* Requirements */}
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
            <AlertDialogAction onClick={handleNext}>
              {step < 5 ? "Next" : "Submit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      
      </AlertDialogContent>
    </AlertDialog>
  );

}