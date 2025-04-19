"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Briefcase, MapPin, DollarSign, Clock, GraduationCap, Check, Pencil, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";


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
  } | null>(null);
  const [isApplying, setIsApplying] = useState(false);
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
            console.log("User data:", data);
            setUserData({
              id: data.id,
              email: data.email,
              username: data.username,
              appliedjobs: data.appliedjobs || []
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    
  }, [userType, userId]);

  const toggleExpand = () => setExpanded(!expanded);
  
  const handleApply = async () => {
    if (!userId) {
      toast({
        title: "Login Required",
        description: "You need to login to apply for this job",
        variant: "destructive",
      });
      router.push(`/login`);
      return;
    }
  
    setIsApplying(true);
    try {
      // Check if already applied
      if (userData?.appliedjobs?.includes(job._id)) {
        toast({
          title: "Already Applied",
          description: "You have already applied for this job",
        });
        return;
      }
  
      // Make API call to apply
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
          }),
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        // Update local state
        if (userData) {
          setUserData({
            ...userData,
            appliedjobs: [...(userData.appliedjobs || []), job._id]
          });
        }
        
        toast({
          title: "Application Successful",
          description: "Your job application was submitted!",
        });
        
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
      return `Rs .${job.salaryMin.toLocaleString()} - Rs .${job.salaryMax.toLocaleString()}`;
    }
    return job.salaryMin ? `Rs .${job.salaryMin.toLocaleString()}` : "Negotiable";
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
      ? "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-500" 
      : ""
  }`}
  onClick={handleApply}
  disabled={isApplying || hasApplied}
>
  {isApplying ? (
    "Applying..."
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
  );
};

export default JobCard;