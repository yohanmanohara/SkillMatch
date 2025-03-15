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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { X } from "lucide-react";
import { jobTitles } from "@/utils/jobTitles";
import { toast } from "@/components/ui/use-toast";

interface JobFormData {
  _id: number;
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
  

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
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
                  onChange={(e) => setFormData({ ...formData, companyname: e.target.value })}
                  required
                />

                <Label>Job Title</Label>
                <select
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                >
                  <option value="">Select Job Title</option>
                  {jobTitles.map((jobTitle, index) => (
                    <option key={index} value={jobTitle}>
                      {jobTitle}
                    </option>
                  ))}
                </select>

                <Label>Employment Types</Label>
                <div className="flex gap-2 text-sm font-light">
                  {["Full-Time", "Part-Time", "Remote", "Internship", "Contract"].map((type) => (
                    <label key={type}>
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

                <Label>Description</Label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />

                <Label>Location</Label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
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

            {step === 2 && (
              <>
                <Label>Requirements</Label>
                <textarea
                  name="requirements"
                  value={Array.isArray(formData.requirements) ? formData.requirements.join(", ") : formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value.split(", ") })}
                  required
                />

                <Label>Desirable Skills</Label>
                <textarea
                  name="desirable"
                  value={formData.desirable.join(", ")}
                  onChange={(e) => setFormData({ ...formData, desirable: e.target.value.split(", ") })}
                  required
                />

                <Label>Benefits</Label>
                <textarea
                  name="benefits"
                  value={formData.benefits.join(", ")}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value.split(", ") })}
                  required
                />
              </>
            )}

            {step === 3 && (
              <>
                <Label>Experience Duration (Years)</Label>
                <Input
                  type="number"
                  name="expirienceduration"
                  value={formData.expirienceduration}
                  onChange={(e) => setFormData({ ...formData, expirienceduration: parseInt(e.target.value) })}
                  required
                />

                <Label>Education Level</Label>
                <Input
                  type="text"
                  name="educationlevel"
                  value={formData.educationlevel}
                  onChange={(e) => setFormData({ ...formData, educationlevel: e.target.value })}
                  required
                />

                <Label>Expire Date</Label>
                <Input
                  type="date"
                  name="expiredate"
                  value={formData.expiredate}
                  onChange={(e) => setFormData({ ...formData, expiredate: e.target.value })}
                  required
                />
              </>
            )}

            {step === 4 && (
              <>
                <Label>Salary Range</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={(e) => setFormData({ ...formData, salaryMin: parseInt(e.target.value) })}
                    required
                  />
                  <Input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={(e) => setFormData({ ...formData, salaryMax: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <Label>Picture URL</Label>
                <Input
                  type="text"
                  name="pictureurl"
                  value={formData.pictureurl}
                  onChange={(e) => setFormData({ ...formData, pictureurl: e.target.value })}
                  required
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