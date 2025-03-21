'use client';
import React, { useRef, useState, useEffect } from 'react';
import AlertDialogDemo from '@/components/common/rusumadd';
import { Button } from '@/components/ui/button';
import Dropzone, { DropzoneState } from 'shadcn-dropzone';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';



const Resume = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setUploadedFile] = useState<File | null>(null);
  const [resumload, setResumload] = useState<File | boolean>(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [URL, setURL] = useState('');
  const userid = sessionStorage.getItem('poop');
  const [showDetails, setShowDetails] = useState(false);

  const handleCancel = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the selected file
    }
    setUploadedFile(null); // Clear the uploaded file state
    setError(false); // Reset error state
    setResumload(false); // Reset resume load state
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getsingleuser/?id=${userid}`);
        const data = await response.json();
        if (data.cvUrl) {
          setURL(data.cvUrl);
          setResumload(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchUserData();
  }, [userid]);

  
  const handleSubmit = async () => {
    if (!file) {
      setError(true);
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/file/cvupload/?id=${userid}`, {
        method: 'POST',
        body: formDataUpload,
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error('Error response:', responseText);
        throw new Error(`Failed to upload file: ${response.status} ${response.statusText}`);
      }

      const data = JSON.parse(responseText);
      updatemono(data.url);
      setURL(data.url);
      setError(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError(true);
      setLoading(false);
    }
  };

  const updatemono = async (url: string) => {
    try {
      const formdataurl = { url };

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updatecv/?id=${userid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Sending JSON data
        },
        body: JSON.stringify({ formdataurl }) // Convert the object to a JSON string
      });

      const data = await response.json();
      setLoading(false);
      window.location.reload(); // Reload after updating
    } catch (error) {
      console.error('Error updating data:', error);
      setLoading(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError(false);
    setResumload(false); // Reset PDF viewer state
  };
const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const title = searchParams.get("title");
  const company = searchParams.get("company");
  const email = searchParams.get("email");
  const username = searchParams.get("username");

  console.log("User Email:", email);
  console.log("User Name:", username)
  console.log("Job ID:", jobId);
  console.log("Job Title:", title);
  console.log("Company:", company);

  useEffect(() => {
    if (jobId && title && company) {
      setShowDetails(true);
    }
  }, [jobId, title, company]);

  return (
    <>
    <div className='flex flex-col gap-4'>
      <div>
        {/* Show job and user details only when redirected from Apply Now */}
        {showDetails && (
          <>
            {/* Job Details Section */}
            <div className="bg-green-100 shadow-lg p-4 rounded-lg text-black">
              <div className="text-xl font-bold">Job Details</div>
              <div><strong>Job Title:</strong> {title}</div>
              <div><strong>Company:</strong> {company}</div>
            </div>

            {/* User Details Section */}
            <div className="bg-green-100 shadow-lg p-4 rounded-lg mt-4 text-black">
              <div className="text-xl font-bold">User Details</div>
              <div><strong>Username:</strong> {username}</div>
              <div><strong>Email:</strong> {email}</div>
            </div>
          </>
        )}
      </div>
      <div>
      {resumload ? (
        <div className="w-full flex flex-col gap-4">
        <AlertDialogDemo />
        <div className="w-full h-[80vh] overflow-auto flex items-center justify-center">
          <iframe
          src={URL}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          />
        </div>
        </div>
      ) : (
        <div className="flex justify-center h-screen items-center flex-col gap-4">
        <div className="text-2xl">Upload Your CV Here</div>
        <Dropzone
          onDrop={(acceptedFiles: File[]) => {
          const pdfFiles = acceptedFiles.filter((file) => file.type === 'application/pdf');
          if (pdfFiles.length > 0) {
            setUploadedFile(pdfFiles[0]);
            setError(false); // Clear error state if valid file
          } else {
            setError(true); // Show error if file is not PDF
          }
          }}
        >
          {(dropzone: DropzoneState) => (
          <div className="relative flex flex-col items-center gap-11 w-full">
            <div
            className={`flex items-center justify-center w-full lg:p-16 border-dashed rounded-2xl transition-colors 
              ${error ? 'border-red-500 bg-red-50' : dropzone.isDragAccept ? 'border-green-500 bg-green-50' : 'border-gray-950'}
              ${dropzone.isDragReject ? 'border-red-500 bg-red-50' : ''}`}
            >
            {dropzone.isDragAccept ? (
              <div className="text-sm font-medium text-green-600 animate-pulse">
              Drop your file here!
              </div>
            ) : dropzone.isDragReject || error ? (
              <div className="text-sm font-medium text-red-600">
              Only PDF files are accepted!
              </div>
            ) : (
              <div className="text-gray-500 text-sm font-semibold">
              Drag drop a file here, or click to select a file
              </div>
            )}
            </div>
          </div>
          )}
        </Dropzone>
        {file && (
          <div className="mt-4 w-full max-w-md">
          <ul>
            <li className="flex justify-between items-center mb-2">
            <span>{file.name}</span>
            <Button onClick={removeFile} variant="outline" size="sm">
              Remove
            </Button>
            </li>
          </ul>
          </div>
        )}
        <div className="flex gap-4 mt-4">
          <Button onClick={handleSubmit} variant="secondary" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
          </Button>
          <Button onClick={handleCancel} variant="outline">
          Cancel
          </Button>
        </div>
        </div>
      )}
      </div>
    </div>
    </>
  );
};

export default Resume;
