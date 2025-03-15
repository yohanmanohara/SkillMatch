"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { X } from "lucide-react";
import { jobTitles } from "@/utils/jobTitles";
import { toast } from "@/components/ui/use-toast";

interface JobFormData {
  _id: string;
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

interface EditJobDialogProps {
  job: JobFormData;
  onSave: (updatedJob: JobFormData) => void;
  onClose: () => void;
  isOpen: boolean;
}

const EditJobDialog: React.FC<EditJobDialogProps> = ({ job, onSave, onClose, isOpen }) => {
  const [formData, setFormData] = useState<JobFormData>(job);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const checkImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const isValid = img.width === 826 && img.height === 826;
        resolve(isValid);
      };
    });
  };

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
    reader.onloadend = () => {};
    reader.readAsDataURL(file);

    setSelectedFile(file);
    setFormData((prevData) => ({ ...prevData, pictureurl: URL.createObjectURL(file) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updatejobs/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Job updated successfully!",
        });
        window.location.reload();

        onSave(result.job); // Update UI with new job data
        onClose();
      } else {
        setError(result.message || "Failed to update job");
        toast({
          title: "Error",
          description: result.message || "Something went wrong!",
        });
      }
    } catch (error) {
      setError("Network error");
      toast({
        title: "Error",
        description: "Network error, please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (category: string, value: string) => {
    if (!value.trim()) return;

    if (category === "requirements") setFormData((prevData) => ({ ...prevData, requirements: [...prevData.requirements, value] }));
    if (category === "desirable") setFormData((prevData) => ({ ...prevData, desirable: [...prevData.desirable, value] }));
    if (category === "benefits") setFormData((prevData) => ({ ...prevData, benefits: [...prevData.benefits, value] }));
  };

  const handleRemoveItem = (field: keyof typeof formData, index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: Array.isArray(prevData[field]) ? prevData[field].filter((_, i) => i !== index) : prevData[field],
    }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
  
    if (step === 1) {
      if (!formData.title || formData.employmentTypes.length === 0 || !formData.salaryMin || !formData.salaryMax) {
        setError("Please fill out all fields and upload the logo.");
        hasError = true;
      }
    }
  
    if (step === 2) {
      const wordCount = formData.description.trim().split(/\s+/).length;
      setError("");
      setError2("");
  
      if (wordCount < 200) {
        setError("Job description must be at least 200 words.");
        hasError = true;
      }
      if (!formData.location) {
        setError2("Please select a location.");
        hasError = true;
      }
    }
  
    if (step === 3) {
      setError("");
      setError2("");
  
      if (formData.requirements.length === 0) {
        setError2("Please add at least one requirement.");
        hasError = true;
      }
      if (formData.desirable.length === 0) {
        setError2("Please add at least one desirable skill.");
        hasError = true;
      }
      if (formData.benefits.length === 0) {
        setError2("Please add at least one benefit.");
        hasError = true;
      }
    }
  
    if (step === 4) {
      setError("");
      setError2("");
  
      if (!formData.expirienceduration || formData.expirienceduration <= 0) {
        setError2("Experience duration must be greater than 0.");
        hasError = true;
      }
      if (!formData.educationlevel.trim()) {
        setError2("Education level cannot be empty.");
        hasError = true;
      }
      if (!formData.expiredate) {
        setError2("Expire date cannot be empty.");
        hasError = true;
      }
    }
  
    if (!hasError) {
      setStep((prevStep) => prevStep + 1);
    }
  };
  

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    setStep(step - 1);
  };

  const handleClear = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploaded(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <form onSubmit={handleSubmit}>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Job</AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to the job details below.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col gap-4 p-4">
            {step === 1 && (
              <>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="companyname"
                  value={formData.companyname}
                  readOnly
                   className="border p-2 rounded  border-green-400   dark:bg-gray-700"
                />

                <Label>Job Title</Label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="border p-2 rounded  border-green-400   dark:bg-gray-700"
                 
                >
                  <option className="text-black bg-transparent " value="">Select Job Title</option>
                  {jobTitles.map((jobTitle, index) => (
                  <option key={index} value={jobTitle}>
                    {jobTitle}
                  </option>
                  ))}
                </select>
                {!formData.title && (
                  <p className="text-red-500">Job title cannot be empty.</p>
                )}

                <Label>Employment Types</Label>
                <div className="flex flex-col gap-2">
                  {["Full-Time", "Part-Time", "Remote", "Internship", "Contract"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    name="employmentTypes"
                    value={type}
                    checked={formData.employmentTypes.includes(type)}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setFormData((prevData) => ({
                      ...prevData,
                      employmentTypes: checked
                        ? [...prevData.employmentTypes, value]
                        : prevData.employmentTypes.filter((t) => t !== value),
                      }));
                    }}
                    />
                    {type}
                  </label>
                  ))}
                </div>
                {formData.employmentTypes.length === 0 && (
                  <p className="text-red-500">Please select at least one employment type.</p>
                )}

                <Label>Salary Range</Label>
                <div className="flex gap-2">
                  <Input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={(e) => setFormData({ ...formData, salaryMin: parseInt(e.target.value) })}
                  required
                  className="border p-2 rounded  border-green-400   dark:bg-gray-700"
                  />
                  <Input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={(e) => setFormData({ ...formData, salaryMax: parseInt(e.target.value) })}
                  required
                  className="border p-2 rounded  border-green-400   dark:bg-gray-700"
                  />
                </div>
                {(!formData.salaryMin || !formData.salaryMax) && (
                  <p className="text-red-500">Salary range cannot be empty.</p>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <Label>Description</Label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="border p-2 rounded w-full h-60  border-green-400" // Adjust height here
                  placeholder="Enter job description here (at least 200 words)"
                />
                {formData.description.split(" ").filter(word => word !== "").length < 200 && (
                  <p className="text-red-500">Description must be at least 200 words.</p>
                )}

                <Label>Location</Label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                  className="border p-2  border-green-400 rounded  dark:bg-gray-700"
                >
                  <option value="">Select Location</option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <Label>Requirements</Label>
                  <div className="flex gap-2">
                  <input
                    type="text"
                    className="border border-green-400 p-2 rounded w-full"
                    id="requirementsInput"
                    placeholder="Enter a requirement"
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim() !== "") {
                      handleAddItem("requirements", (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                    }}
                  />
                  </div>
                  {formData.requirements.length === 0 && (
                  <p className="text-red-500">Please add at least one requirement.</p>
                  )}
                  <ol className="flex flex-wrap gap-2 list-disc">
                  {formData.requirements.map((req, index) => (
                    <li
                    key={index}
                    className="flex items-center bg-green-500 mt-3 dark:bg-green-800 text-sm dark:text-gray-300 px-2 py-1 rounded-lg gap-2"
                    >
                    {req}
                    <X className="bg-red-600 rounded-full h-3 pl- w-3 cursor-pointer" onClick={() => handleRemoveItem("requirements", index)} />
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
                    className="border border-green-400 p-2 rounded w-full"
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim() !== "") {
                      handleAddItem("desirable", (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                    }}
                  />
                  </div>
                  {formData.desirable.length === 0 && (
                  <p className="text-red-500">Please add at least one desirable skill.</p>
                  )}
                  <ol className="flex flex-wrap gap-2 list-disc">
                  {formData.desirable.map((des, index) => (
                    <li
                    key={index}
                    className="flex items-center bg-green-500 mt-3 dark:bg-green-800 text-sm dark:text-gray-300 px-2 py-1 rounded-lg gap-2"
                    >
                    {des}
                    <X className="bg-red-600 rounded-full h-3 pl- w-3 cursor-pointer" onClick={() => handleRemoveItem("desirable", index)} />
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
                    className="border border-green-400 p-2 rounded w-full"
                    onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim() !== "") {
                      handleAddItem("benefits", (e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                    }}
                  />
                  </div>
                  {formData.benefits.length === 0 && (
                  <p className="text-red-500">Please add at least one benefit.</p>
                  )}
                  <ol className="flex flex-wrap gap-2 list-disc">
                  {formData.benefits.map((ben, index) => (
                    <li
                    key={index}
                    className="flex items-center bg-green-500 mt-3 dark:bg-green-800 text-sm dark:text-gray-300 px-2 py-1 rounded-lg gap-2"
                    >
                    {ben}
                    <X className="bg-red-600 rounded-full h-3 pl- w-3 cursor-pointer" onClick={() => handleRemoveItem("benefits", index)} />
                    </li>
                  ))}
                  </ol>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <Label>Experience Duration (Years)</Label>
                <Input
                  type="number"
                  name="expirienceduration"
                  value={formData.expirienceduration}
                  onChange={(e) => setFormData({ ...formData, expirienceduration: parseInt(e.target.value) })}
                  required
                  className="border border-green-400 p-2 rounded"
                />
                {formData.expirienceduration <= 0 && (
                  <p className="text-red-500">Experience duration must be greater than 0.</p>
                )}

                <Label>Education Level</Label>
                <Input
                  type="text"
                  name="educationlevel"
                  value={formData.educationlevel}
                  onChange={(e) => setFormData({ ...formData, educationlevel: e.target.value })}
                  required
                  className="border border-green-400 p-2 rounded"
                />
                {!formData.educationlevel.trim() && (
                  <p className="text-red-500">Education level cannot be empty.</p>
                )}

                <Label>Expire Date</Label>
                {!formData.expiredate && (
                  <p className="text-red-500">Expire date cannot be empty.</p>
                )}
                <Input
                  type="date"
                  name="expiredate"
                  value={formData.expiredate}
                  onChange={(e) => setFormData({ ...formData, expiredate: e.target.value })}
                  required
                  className="border border-green-400 p-2 rounded"
                />
              </>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel type="button" onClick={onClose}>
              Cancel
            </AlertDialogCancel>

            {step > 1 && (
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
            )}

            <AlertDialogAction onClick={step < 4 ? handleNext : handleSubmit}>
              {step < 4 ? "Next" : "Submit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditJobDialog;