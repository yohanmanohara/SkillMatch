'use client';
import React, { useRef, useState } from 'react';
import AlertDialogDemo from '@/components/common/rusumadd';
import { Button } from '@/components/ui/button';
import Dropzone, { DropzoneState } from 'shadcn-dropzone';
import { useRouter } from 'next/navigation';

const Resume = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null); // Store only one file
    const [resumload, setResumload] = useState(false);
    const [error, setError] = useState(false); // State to track if there is an error
    const router = useRouter();

    const handleCancel = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the selected file
        }
        setUploadedFile(null); // Clear the uploaded file state
        setError(false); // Reset error state
    };

    const handleSubmit = () => {
        if (!uploadedFile) {
            setError(true);
            return;
        }

        console.log('Submitting file:', uploadedFile);
        setUploadedFile(null);
        setResumload(true);
        setError(false); // Reset error state
    };

    const removeFile = () => {
        setUploadedFile(null);
        setError(false); // Reset error state when file is removed
    };

    return (
        <>
            <div>
                {resumload ? (
                    <div className='w-full flex justify-end'>
                        <AlertDialogDemo />
                    </div>
                ) : (
                    <div className="flex justify-center h-screen items-center flex-col gap-4">
                        <div className='text-2xl'>Upload Your CV Here</div>
                        <Dropzone
                            onDrop={(acceptedFiles: File[]) => {
                                const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
                                if (pdfFiles.length > 0) {
                                    setUploadedFile(pdfFiles[0]); 
                                    setError(false); 
                                } else {
                                    setError(true);
                                }
                            }}
                        >
                            {(dropzone: DropzoneState) => (
                                <div className='relative flex flex-col items-center gap-11 w-full '>
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
