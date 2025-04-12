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
  const [resumeLoaded, setResumeLoaded] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [cvUrl, setCvUrl] = useState<string>('');
  const [userDetails, setUserDetails] = useState({
    id: '',
    email: '',
    username: ''
  });
  const [jobDetails, setJobDetails] = useState({
    id: '',
    title: '',
    company: ''
  });

  const searchParams = useSearchParams();
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('poop') : null;

  useEffect(() => {
    // Get user ID from session storage
    const userId = typeof window !== 'undefined' ? sessionStorage.getItem('poop') : null;
    
    // Set job details from URL params if they exist
    const jobId = searchParams.get("jobId");
    const title = searchParams.get("title");
    const company = searchParams.get("company");
    const email = searchParams.get("email");
    const username = searchParams.get("username");

    if (userId) {
      setUserDetails(prev => ({
        ...prev,
        id: userId,
        email: email || '',
        username: username || ''
      }));

      fetchUserData(userId);
    }

    if (jobId && title && company) {
      setJobDetails({
        id: jobId,
        title: title,
        company: company
      });
    }
  }, [searchParams]);

  const fetchUserData = async (userId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getsingleuser/?id=${userId}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.cvUrl) {
        setCvUrl(data.cvUrl);
        setResumeLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data');
    }
  };

  const handleCancel = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadedFile(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Only PDF files are accepted');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/file/cvupload/?id=${userId}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      await updateCvUrl(data.url);
      setCvUrl(data.url);
      setResumeLoaded(true);
      setError(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateCvUrl = async (url: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/updatecv/?id=${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update CV URL: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating CV URL:', error);
      throw error; // Re-throw to handle in calling function
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
  };

  const hasJobDetails = jobDetails.id && jobDetails.title && jobDetails.company;
  const hasUserDetails = userDetails.email || userDetails.username;

  return (
    <div className='flex flex-col gap-4'>
      <div>
        {hasJobDetails && (
          <>
            <div className="bg-green-100 shadow-lg p-4 rounded-lg text-black">
              <div className="text-xl font-bold">Job Details</div>
              <div><strong>Job Title:</strong> {jobDetails.title}</div>
              <div><strong>Company:</strong> {jobDetails.company}</div>
            </div>
          </>
        )}

        {hasUserDetails && (
          <div className="bg-green-100 shadow-lg p-4 rounded-lg mt-4 text-black">
            <div className="text-xl font-bold">User Details</div>
            {userDetails.username && <div><strong>Username:</strong> {userDetails.username}</div>}
            {userDetails.email && <div><strong>Email:</strong> {userDetails.email}</div>}
          </div>
        )}
      </div>

      <div>
        {resumeLoaded ? (
          <div className="w-full flex flex-col gap-4">
            <AlertDialogDemo />
            <div className="w-full h-[80vh] overflow-auto flex items-center justify-center">
              <iframe
                src={cvUrl}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="Resume Preview"
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center h-screen items-center flex-col gap-4">
            <div className="text-2xl">Upload Your CV Here</div>
            <Dropzone
              onDrop={(acceptedFiles: File[]) => {
                const pdfFile = acceptedFiles.find(file => file.type === 'application/pdf');
                if (pdfFile) {
                  setUploadedFile(pdfFile);
                  setError(null);
                } else {
                  setError('Only PDF files are accepted');
                }
              }}
              accept={{ 'application/pdf': ['.pdf'] }}
            >
              {(dropzone: DropzoneState) => (
                <div className="relative flex flex-col items-center gap-11 w-full">
                  <div
                    className={`flex items-center justify-center w-full lg:p-16 border-dashed rounded-2xl transition-colors 
                      ${error ? 'border-red-500 bg-red-50' : 
                        dropzone.isDragAccept ? 'border-green-500 bg-green-50' : 
                        'border-gray-950'}`}
                  >
                    {dropzone.isDragAccept ? (
                      <div className="text-sm font-medium text-green-600 animate-pulse">
                        Drop your PDF file here!
                      </div>
                    ) : error ? (
                      <div className="text-sm font-medium text-red-600">
                        {error}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm font-semibold">
                        Drag and drop a PDF file here, or click to select a file
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

            {error && !file && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="flex gap-4 mt-4">
              <Button 
                onClick={handleSubmit} 
                variant="secondary" 
                disabled={loading || !file}
              >
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
  );
};

export default Resume;