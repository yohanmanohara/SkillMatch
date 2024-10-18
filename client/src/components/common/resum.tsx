'use client';
import React from 'react';
import AlertDialogDemo from '@/components/common/rusumadd';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Dropzone, { DropzoneState } from 'shadcn-dropzone';
import { useRouter } from 'next/navigation';
import { useRef } from "react";
import { Button } from '@/components/ui/button';

const Resume = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);
    const [resumload, setResumload] = React.useState(false);
    const router = useRouter();

    const handleCancel = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear the selected file
      }
      setUploadedFiles([]); // Clear the uploaded files state
    };

    const handleSubmit = () => {
        if (uploadedFiles.length === 0) {
            alert('Please upload at least one file before submitting.');
            return;
        }

        // Handle file submission logic here, such as uploading files to a server
        console.log('Submitting files:', uploadedFiles);

        // Optionally, you can reset the form after submission
        setUploadedFiles([]);
        setResumload(true);
    };

    return (
        <>
            <div>
                {resumload ? (
                    <div className='w-full flex justify-end '>
                        <AlertDialogDemo />
                    </div>
                ) : (
                    <div className="flex justify-center h-screen items-center flex-col gap-4">
                        <div className='text-2xl'>Upload Your CV Here</div>
                        <Dropzone
                            onDrop={(acceptedFiles: File[]) => {
                                setUploadedFiles(acceptedFiles);
                            }}
                        >
                            {(dropzone: DropzoneState) => (
                                <div className='flex gap-11 flex-col h-full'>
                                    <div
                                        className={`flex items-center justify-center w-full   h-full p-28 lg:p-64 border-dashed rounded-md transition-colors 
                                          ${dropzone.isDragAccept ? 'border-green-500 bg-green-50' : 'border-gray-950'}
                                          ${dropzone.isDragReject ? 'border-red-500 bg-red-50' : ''}`}
                                    >
                                        {dropzone.isDragAccept ? (
                                            <div className="text-sm font-medium text-green-600 animate-pulse">
                                                Drop your files here!
                                            </div>
                                        ) : dropzone.isDragReject ? (
                                            <div className="text-sm font-medium text-red-600">
                                                File type not accepted, try again!
                                            </div>
                                        ) : (
                                            <div className="flex items-center flex-col gap-2">
                                                <div className="flex items-center gap-1.5 text-sm font-medium">
                                                    <span className="text-blue-500">Upload files</span>
                                                    {/* <svg
                                                        className="w-5 h-5 text-blue-500"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7m-2 10h-3m-6 0h-3m4-5V7a4 4 0 00-4-4H7a4 4 0 00-4 4v3m16 0a4 4 0 01-4-4h-3"
                                                        />
                                                    </svg> */}
                                                </div>
                                                <div className="text-xs text-gray-400 font-medium">
                                                    Drag and drop files here, or click to select.
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='w-full flex flex-row gap-14'>
                                        {uploadedFiles.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-medium mb-2">Uploaded Files:</h4>
                                                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                                    {uploadedFiles.map((file, index) => (
                                                        <li key={index} className="text-xs">
                                                            {file.name} - {(file.size / 1024).toFixed(2)} KB
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {uploadedFiles.length > 0 && (
                                            <div className="flex flex-wrap gap-2 flex-row">
                                                {uploadedFiles.map((file, index) => (
                                                    file.type.startsWith('image/') && (
                                                        <div key={index} className="w-16 h-16 overflow-hidden rounded-md">
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={file.name}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                 
                                </div>
                            )}
                        </Dropzone>
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
