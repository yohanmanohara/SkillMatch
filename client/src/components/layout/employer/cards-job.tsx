"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Pencil, Trash2, Briefcase, MapPin, DollarSign, Clock, GraduationCap, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";  // Import DialogTitle for accessibility
import EditJobDialog from "@/components/layout/employer/edit-job-dialog";

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    companyname: string;
    salaryMin: number;
    salaryMax: number;
    location: string;
    posted: string;
    expirienceduration: number;
    expiredate: string;
    educationlevel: string;
    requirements: string[];
    benefits: string[];
    desirable: string[];
    description: string;
    employmentTypes: string[];
    pictureurl: string;
    organization: string;
  };
  onDelete: (jobId: string) => void;
  onEdit: (updatedJob: any) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const previewUrl = "/avatadefault.jpg";
  const picture = job.pictureurl || previewUrl;

  const toggleExpand = () => setExpanded(!expanded);

  const handleEdit = () => setIsEditDialogOpen(true);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/deletejob/?id=${job._id}`,
        {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!res.ok) throw new Error("Failed to delete the job");
      onDelete(job._id);
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSave = (updatedJob: any) => {
    onEdit(updatedJob);
    setIsEditDialogOpen(false);
  };

  const formatSalary = () => {
    if (job.salaryMin && job.salaryMax) {
      return `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`;
    }
    return job.salaryMin ? `$${job.salaryMin.toLocaleString()}` : "Negotiable";
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

  return (
    <Card className="w-full max-w-4xl mx-auto my-4 group hover:shadow-lg transition-all duration-300 border border-green-500 dark:border-gray-800 rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Company/Job Header - Mobile */}
        <div className="md:hidden p-4 flex items-center gap-3 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src={picture} alt="Company Logo" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {job.companyname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold line-clamp-1">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.companyname}</p>
          </div>
          <Badge variant="outline" className="ml-auto">
            {formatSalary()}
          </Badge>
        </div>

        {/* Left Section - Company Info */}
        <div className="hidden md:flex md:w-1/4 p-6 flex-col items-center border-r bg-gradient-to-b from-black-50 to-white dark:from-gray-900 dark:to-gray-800">
          <Avatar className="h-20 w-20 mb-4 ring-2 ring-white dark:ring-gray-800">
            <AvatarImage src={picture} alt="Company Logo" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium">
              {job.companyname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center space-y-1">
            <h3 className="text-lg font-semibold line-clamp-2">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.companyname}</p>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
          </div>

          <Badge variant="secondary" className="h-10">{formatSalary()}</Badge>
          
          <div className="mt-6 w-full space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>

        {/* Right Section - Job Details */}
        <div className="md:w-3/4 p-6">
          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.companyname}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{formatSalary()}</span>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              {getTimeRemaining(job.expiredate)}
            </Badge>
          </div>

          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
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
                    <Clock className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Posted</p>
                      <p className="font-medium">{formatDate(job.posted)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Expires</p>
                      <p className="font-medium">{formatDate(job.expiredate)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">{job.expirienceduration} years</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 mt-0.5 text-primary" />
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
                    <Check className="h-5 w-5 text-primary" />
                    Requirements
                  </h5>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">{req.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-3 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Benefits
                  </h5>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">{benefit.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold mb-3 flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Desirable Skills
                  </h5>
                  <ul className="space-y-2">
                    {job.desirable.map((des, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
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
            className="px-3 py-1 text-xs font-medium rounded-full"
          >
            {tag}
          </Badge>
        ))}
      </CardFooter>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {/* Ensure DialogTitle is present for accessibility */}
          <DialogTitle>Edit Job</DialogTitle>
          <EditJobDialog
            job={job}
            onSave={handleSave}
            onClose={() => setIsEditDialogOpen(false)} isOpen={false}          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the "{job.title}" position at {job.companyname}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
            >
              Delete Position
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default JobCard;
