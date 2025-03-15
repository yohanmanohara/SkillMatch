'use client';
import React, { useRef, useState } from 'react';
import AlertDialogDemo from '@/components/common/rusumadd';
import { Button } from '@/components/ui/button';
import Dropzone, { DropzoneState } from 'shadcn-dropzone';

const Resume = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumload, setResumload] = useState<File | boolean>(false);
  const [error, setError] = useState(false);

  const handleCancel = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the selected file
    }
    setUploadedFile(null); // Clear the uploaded file state
    setError(false); // Reset error state
    setResumload(false); // Reset resume load state
  };

  const handleSubmit = () => {
    if (!uploadedFile) {
      setError(true);
      return;
    }

    setResumload(uploadedFile); // Set the state to show the PDF viewer
    setError(false); // Reset any error
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError(false);
    setResumload(false); // Reset PDF viewer state
  };

  return (
    <>
      <div>
        {resumload ? (
          <div className="w-full flex flex-col gap-4">
            <AlertDialogDemo />
            <div className="w-full  h-[80vh] overflow-auto flex items-center justify-center " >
              {uploadedFile && (
                <iframe
                  src={URL.createObjectURL(uploadedFile)} // Safely use createObjectURL
                  title="Resume"
                  width="100%"
                  height="100%"
                />
              )}
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
            {uploadedFile && (
              <div className="mt-4 w-full max-w-md">
                <ul>
                  <li className="flex justify-between items-center mb-2">
                    <span>{uploadedFile.name}</span>
                    <Button onClick={removeFile} variant="outline" size="sm">
                      Remove
                    </Button>
                  </li>
                </ul>
              </div>
            )}
            <div className="flex gap-4 mt-4">
              <Button onClick={handleSubmit} variant="secondary">
                Submit
              </Button>
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Resume;
