"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Briefcase, MapPin, DollarSign, Clock, GraduationCap, Check, Pencil, Trash2, Loader2, Eye, UploadCloud } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    companyname: string;
    salaryMin: number | string;
    salaryMax?: number | string;
    location: string;
    posted: string;
    expirienceduration: number | string;
    expiredate: string;
    educationlevel: string;
    requirements: string[];
    benefits: string[];
    desirable: string[];
    description: string;
    employmentTypes: string[];
    pictureurl: string;
    organization?: string;
  };
  userType: 'employer' | 'employee';
  onDelete?: (jobId: string) => void;
  onEdit?: (updatedJob: any) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, userType, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState<{ 
    id: string; 
    email: string; 
    username: string;
    appliedjobs?: string[];
    cvUrl?: string[];
  } | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCVUrl, setSelectedCVUrl] = useState<string | null>(null);
  const router = useRouter();
  const previewUrl = "/avatadefault.jpg";
  const picture = job.pictureurl || previewUrl;
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem("poop") : null;

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getsingleuser/?id=${userId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        if (response.ok) {
          const data = await response.json();
          setUserData({
            id: data.id,
            email: data.email,
            username: data.username,
            appliedjobs: data.appliedjobs || [],
            cvUrl: data.cvUrl || []
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId, userType]);

  const toggleExpand = () => setExpanded(!expanded);
  
  const resetApplyForm = () => {
    setSelectedFile(null);
    setSelectedCVUrl(null);
    setIsUploading(false);
    setIsApplying(false);
  };

  const handleApplyClick = () => {
    if (!userId) {
      toast({
        title: "Login Required",
        description: "You need to login to apply for this job",
        variant: "destructive",
      });
      router.push(`/login`);
      return;
    }
    
    setShowApplyDialog(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setSelectedCVUrl(null); 
    }
  };

  const uploadCV = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/file/cvupload/?id=${userId}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Failed to upload CV');
      }

      
      const uploadData = await response.json();
     

      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updatecv/?id=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: uploadData.url }),
        }
      );
      const updateData = await updateResponse.json();


      if (!updateResponse.ok) {
        throw new Error("Failed to update user record");
      }

        return uploadData.url;

    } catch (error) {
      console.error('Error uploading CV:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleApply = async () => {
    if (!userId) return;

    setIsApplying(true);
    
    try {
     
      if (userData?.appliedjobs?.includes(job._id)) {
        toast({
          title: "Already Applied",
          description: "You have already applied for this job",
        });
        return;
      }

      let cvUrlToUse = selectedCVUrl;
      
     
      if (selectedFile) {
        const uploadedUrl = await uploadCV(selectedFile);
        cvUrlToUse = uploadedUrl;
      }

      console.log("CV URL to use:", cvUrlToUse);
    
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/appliedjobs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            jobId: job._id,
            cvUrl: cvUrlToUse 
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        if (userData) {
          setUserData({
            ...userData,
            appliedjobs: [...(userData.appliedjobs || []), job._id],
            cvUrl: cvUrlToUse ? [...(userData.cvUrl || []), cvUrlToUse] : userData.cvUrl
          });
        }
        
        toast({
          title: "Application Successful",
          description: "Your job application was submitted!",
        });
        resetApplyForm();
        setShowApplyDialog(false);
        window.location.reload();

      } else {
        throw new Error(result.message || "Failed to apply for job");
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      toast({
        title: "Application Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsApplying(false);
    }
  };

  const formatSalary = () => {
    if (job.salaryMin && job.salaryMax) {
      return `Rs.${job.salaryMin.toLocaleString()} - Rs.${job.salaryMax.toLocaleString()}`;
    }
    return job.salaryMin ? `Rs.${job.salaryMin.toLocaleString()}` : "Negotiable";
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTimeRemaining = (expireDate: string) => {
    const today = new Date();
    const expire = new Date(expireDate);
    const diffTime = expire.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Expires today";
    if (diffDays === 1) return "Expires tomorrow";
    return `Expires in ${diffDays} days`;
  };

  const hasApplied = userData?.appliedjobs?.includes(job._id);

  return (
    <>
      <Card className="w-full max-w-6xl mx-auto my-4 group hover:shadow-lg transition-all duration-300 border border-green-500 dark:border-gray-800 rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Company/Job Header - Mobile */}
          <div className="md:hidden p-4 flex items-center gap-3 border-b">
            <Avatar className="h-12 w-12">
              <AvatarImage src={picture} alt="Company Logo" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {job.companyname.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold line-clamp-1 truncate">{job.title}</h3>
              <p className="text-sm text-muted-foreground truncate">{job.companyname}</p>
            </div>
            <Badge variant="outline" className="ml-auto whitespace-nowrap">
              {formatSalary()}
            </Badge>
          </div>

          {/* Left Section - Company Info (Desktop) */}
          <div className="hidden md:flex md:w-[280px] lg:w-[320px] xl:w-[350px] p-6 flex-col items-center border-r bg-gradient-to-b from-black-50 to-white dark:from-gray-900 dark:to-gray-800 shrink-0">
            <Avatar className="h-20 w-20 mb-4 ring-2 ring-white dark:ring-gray-800">
              <AvatarImage src={picture} alt="Company Logo" />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
                {job.companyname.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-center space-y-1 w-full">
              <h3 className="text-lg font-semibold line-clamp-2">{job.title}</h3>
              <p className="text-sm text-muted-foreground truncate w-full">{job.companyname}</p>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
            </div>

            <Badge variant="secondary" className="h-10 mt-3 px-4 whitespace-nowrap">
              {formatSalary()}
            </Badge>

            {userType === 'employer' && onEdit && onDelete ? (
              <div className="mt-6 w-full space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={() => onEdit(job)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  onClick={() => onDelete(job._id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline"
                size="sm"
                className={`mt-6 w-full gap-2 ${
                  hasApplied 
                    ? "text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 border-green-500" 
                    : ""
                }`}
                onClick={handleApplyClick}
                disabled={isApplying || hasApplied}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : hasApplied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Applied
                  </>
                ) : (
                  "Apply Now"
                )}
              </Button>
            )}
          </div>

          {/* Right Section - Job Details */}
          <div className="flex-1 p-4 md:p-6 min-w-0">
            {/* Desktop Header */}
            <div className="hidden md:flex justify-between items-start mb-4 gap-4">
              <div className="min-w-0">
                <h3 className="text-xl font-semibold truncate">{job.title}</h3>
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Briefcase className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{job.companyname}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span className="truncate">{formatSalary()}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="px-3 py-1 whitespace-nowrap flex-shrink-0">
                {getTimeRemaining(job.expiredate)}
              </Badge>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary flex-shrink-0" />
                Job Description
              </h4>
              <p className={`text-muted-foreground ${expanded ? '' : 'line-clamp-3'}`}>
                {job.description}
              </p>
              
              <button 
                onClick={toggleExpand}
                className="text-primary text-sm font-medium flex items-center mt-2 hover:underline"
              >
                {expanded ? (
                  <>
                    Show less <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </button>
            </div>

            {expanded && (
              <>
                <Separator className="my-4" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Posted</p>
                        <p className="font-medium">{formatDate(job.posted)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Expires</p>
                        <p className="font-medium">{formatDate(job.expiredate)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Briefcase className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Experience</p>
                        <p className="font-medium">{job.expirienceduration} years</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <GraduationCap className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Education</p>
                        <p className="font-medium">{job.educationlevel}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      Requirements
                    </h5>
                    <ul className="space-y-2">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                          <span className="text-muted-foreground">{req.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      Benefits
                    </h5>
                    <ul className="space-y-2">
                      {job.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                          <span className="text-muted-foreground">{benefit.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold mb-3 flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      Desirable Skills
                    </h5>
                    <ul className="space-y-2">
                      {job.desirable.map((des, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                          <span className="text-muted-foreground">{des.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer with Employment Types */}
        <CardFooter className="p-4 bg-green-400 dark:bg-gray-800/50 flex flex-wrap gap-2">
          {job.employmentTypes.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary"
              className="px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>

      {/* Apply Job Dialog */}
      <Dialog 
        open={showApplyDialog} 
        onOpenChange={(open) => {
          if (!open) {
            resetApplyForm();
          }
          setShowApplyDialog(open);
        }}
      >
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-30" />
            <DialogHeader className="relative px-6 pt-6">
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                Apply for {job.title}
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Submit your application for this position at{" "}
                <span className="font-medium text-primary">{job.companyname}</span>
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6 pb-6 space-y-6">
            <div className="space-y-4">
              {/* File Upload Card */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 transition-all hover:border-primary/50 focus-within:border-primary/50">
                <Label htmlFor="cv" className="block mb-2 font-medium text-gray-900 dark:text-white">
                  Upload CV (PDF)
                </Label>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Input
                    id="cv"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    disabled={isUploading || isApplying}
                    className="sr-only"
                  />
                  <label
                    htmlFor="cv"
                    className={`flex flex-col items-center justify-center w-full py-4 px-4 rounded-md cursor-pointer ${isUploading || isApplying ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50 dark:hover:bg-gray-900"}`}
                  >
                    <UploadCloud className="w-8 h-8 mb-2 text-primary" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-primary">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      PDF only (max. 5MB)
                    </p>
                  </label>
                </div>
                <p className={`mt-2 text-sm ${selectedFile ? "text-primary" : "text-muted-foreground"}`}>
                  {selectedFile
                    ? `Selected: ${selectedFile.name}`
                    : "No file selected. You can also choose an existing CV below."}
                </p>
              </div>

  
              {userData?.cvUrl && userData.cvUrl.length > 0 && (
                <div className="space-y-3">
                  <Label className="block font-medium text-gray-900 dark:text-white">
                    Select an existing CV
                  </Label>
                  <div className="space-y-2">
                    {userData.cvUrl.map((url, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 rounded-lg border ${selectedCVUrl === url ? "border-primary bg-primary/5" : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"}`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`cv-${index}`}
                              name="cvSelection"
                              value={url}
                              checked={selectedCVUrl === url}
                              onChange={() => {
                                setSelectedFile(null);
                                setSelectedCVUrl(url);
                              }}
                              disabled={isApplying || isUploading}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600"
                            />
                          </div>
                          <label
                            htmlFor={`cv-${index}`}
                            className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                          >
                            CV {index + 1}
                          </label>
                        </div>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t">
            <div className="flex w-full justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  resetApplyForm();
                  setShowApplyDialog(false);
                }}
                disabled={isApplying || isUploading}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={isApplying || isUploading || (!selectedFile && !selectedCVUrl)}
                className="px-6 shadow-sm hover:shadow-md transition-shadow bg-green-500" 
              >
                {isUploading ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </span>
                ) : isApplying ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;