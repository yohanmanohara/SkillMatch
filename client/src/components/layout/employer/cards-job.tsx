"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import EditJobDialog from "@/components/layout/employer/edit-job-dialog"; // Import the EditJobDialog component
import Image from "next/image";

interface JobCardProps {
  job: {
        _id: string;
        title: string;
        companyname: string;
        salaryMin: number;
        location: string;
        posted: string;
        expirienceduration: number;
        expiredate: string;
        educationlevel: string;
        requirements:  string[];
        benefits:   string[];
        desirable:  string[];
        description: string ;
        employmentTypes: string[];
        pictureurl: string;
        salaryMax: number;
        organization: string;
        
  };
  onDelete: (jobId: string) => void; // Callback to update state in parent component
  onEdit: (updatedJob: any) => void; 
}

const JobCard: React.FC<JobCardProps> = ({ job, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State to control dialog visibility
  const previewUrl = "/avatadefault.jpg";
  const picture = job.pictureurl || previewUrl;
  const router = useRouter();

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const getShortDescription = (text: string) => {
    const words = text.split(" ");
    return words.length > 100 ? words.slice(0, 100).join(" ") + "..." : text;
  };

  const fullDescription = Array.isArray(job.description)
    ? job.description.join(" ")
    : job.description;

  const handleEdit = () => {
    setIsEditDialogOpen(true); // Open the edit dialog
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;
  
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/deletejob/?id=${job._id}`,
        {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
        }
      );
  
      console.log(job._id);
      if (!res.ok) {
        const errorMessage = await res.text(); // Optionally capture server message
        throw new Error(errorMessage || "Failed to delete the job");
      }
      
        if (onDelete) {
        onDelete(job._id); // Remove job from UI
      }
  
      alert("Job deleted successfully!");
      
      

      // Optionally, you can reload the page if necessary
       window.location.reload();
    } catch (error) {
      console.error("Error deleting job:", error);
      alert(`Something went wrong:`);
    }
  };
  

  const handleSave = (updatedJob: any) => {
    onEdit(updatedJob); // Pass the updated job data to the parent component
    setIsEditDialogOpen(false); // Close the dialog
  };

  return (
    <div className="bg-green-100 rounded-lg shadow-lg p-2 flex flex-col lg:flex-row lg:space-x-6 relative w-min-content">
      <div className="flex flex-col items-center lg:w-1/4">
        <div className="bg-blue-500 rounded-full p-2">
          <Avatar className="rounded-full h-[120px] w-[120px] overflow-hidden">
            <AvatarImage src={picture} alt="Company Logo" className="w-[75px] h-[75px]" />
          </Avatar>
        </div>

        <div className="text-center mt-3">
          <div className="text-xl font-bold text-black cursor-pointer" onClick={toggleExpand}>
            {job.title}
          </div>

          <div className="flex justify-center items-center mt-2 space-x-2">
            <p className="text-black">{job.companyname}</p>
            <p className="text-black">{job.location}</p>
          </div>

          <p className="text-gray-500">Salary: {job.salaryMin}</p>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button variant="default" className="text-sm px-3 py-1" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="destructive" className="text-sm px-3 py-1" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="lg:w-3/4 flex flex-col text-center lg:text-left relative">
        {!expanded ? (
          <p className="text-gray-700 mb-4 text-center">{getShortDescription(fullDescription)}</p>
        ) : (
          <div className="text-gray-700 text-sm space-y-3">
            <p>{fullDescription}</p>

            <div className="grid grid-cols-2 gap-2">
              <p><strong>Expires:</strong> {job.expiredate}</p>
              <p><strong>Level:</strong> {job.educationlevel}</p>
              <p><strong>Education:</strong> {job.educationlevel}</p>
              <p><strong>Experience Duration:</strong> {job.expirienceduration}</p>
            </div>

            <div>
              <div className="font-semibold">Requirements:</div>
              <ul className="list-disc list-inside">
                {Array.isArray(job.requirements)
                  ? job.requirements.map((req, index) => <li key={index}>{req.trim()}</li>)
                  : (job.requirements as string || "").split(",").map((req: string, index: number) => <li key={index}>{req.trim()}</li>)}
              </ul>
            </div>

            <div>
              <div className="font-semibold">Benefits:</div>
              <ul className="list-disc list-inside">
                {Array.isArray(job.benefits)
                  ? job.benefits.map((benefit, index) => <li key={index}>{benefit.trim()}</li>)
                  : (job.benefits as string).split(",").map((benefit, index) => (
                      <li key={index}>{benefit.trim()}</li>
                    ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold">Desirable Skills:</div>
              <ul className="list-disc list-inside">
                {Array.isArray(job.desirable)
                  ? job.desirable.map((des: string, index: number) => <li key={index}>{des.trim()}</li>)
                  : (job.desirable as string || "").split(",").map((des: string, index: number) => (
                      <li key={index}>{des.trim()}</li>
                    ))}
              </ul>
            </div>
          </div>
        )}

        <div className="absolute bottom-2 right-2">
          <Button variant="outline" onClick={toggleExpand} className="flex items-center hover:bg-green-200 border-none">
            <span className="ml-1">
                {expanded ? (
                <Image src="/upload.png" alt="icon" width={20} height={20} style={{ marginRight: "8px" }} />
                ) : (
                <Image src="/arrow.png" alt="icon" width={20} height={20} style={{ marginRight: "8px" }} />
                )}
            </span>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {job.employmentTypes.map((tag, tagIndex) => (
          <span key={tagIndex} className="text-xs font-semibold bg-green-200 text-green-800 py-1 px-2 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Render the EditJobDialog */}
      <EditJobDialog
        job={job}
        onSave={handleSave}
        onClose={() => setIsEditDialogOpen(false)}
        isOpen={isEditDialogOpen}
      />
    </div>
  );
};

export default JobCard;
