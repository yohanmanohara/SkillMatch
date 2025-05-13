'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, File, Eye, UploadCloud, X, Trash2, Calendar } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

interface CVItem {
  url: string;
  name: string;
  uploadedAt: string;
}

const ResumeManager = () => {
  const [cvs, setCvs] = useState<CVItem[]>([]);
  const [selectedCv, setSelectedCv] = useState<string | null>(null);
  const [cvToDelete, setCvToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('poop') : null;

  useEffect(() => {
    const fetchCVs = async () => {
      if (!userId) return;
  
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/getsingleuser/?id=${userId}`
        );
  
        if (response.ok) {
          const data = await response.json();
          if (data.cvUrl && Array.isArray(data.cvUrl)) {
            const fetchedCVs = data.cvUrl.map((url: string, index: number) => ({
              url: url,
              name: `My CV ${index + 1}`,
              uploadedAt: new Date().toISOString() // You might want to get actual upload date from your API
            }));
            setCvs(fetchedCVs);
          }
        }
      } catch (error) {
        console.error('Failed to fetch CVs:', error);
        setError('Failed to load your CVs');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCVs();
  }, [userId]);

  const handleDeleteCV = async () => {
    if (!userId || !cvToDelete) return;

    try {
      setIsLoading(true);
      console.log("Deleting CV:", cvToDelete);
      const deleteResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/deleteresume`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileUrl: cvToDelete  }),
        },
        
      );

      const result = await deleteResponse.json();
      console.log("Server response:", result);

      if (!deleteResponse.ok) {
        throw new Error('Failed to delete CV file');
      }

      // Then update the user's CV list
      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/user/removecv/?id=${userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: cvToDelete }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error('Failed to update user CV list');
      }

      // Update local state
      setCvs(prevCvs => prevCvs.filter(cv => cv.url !== cvToDelete));
      setError(null);
    } catch (error) {
      console.error('Error deleting CV:', error);
      setError('Failed to delete CV. Please try again.');
    } finally {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      setCvToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <AddCVDialog cvs={cvs} onUploadSuccess={() => window.location.reload()} />
      </div>

      {isLoading && cvs.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : cvs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You haven&apos;t uploaded any CVs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:ml-44 md:mr-44">
          {cvs.map((item) => (
            <Card 
              key={item.url}
              className="p-4 hover:shadow-lg transition-all duration-200 ease-in-out rounded-xl border test backdrop-blur-sm h-24"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="p-2 rounded-lg">
                  <File className="h-9 w-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-8 w-3 text-gray-400" />
                    <p className="text-xs">{formatDate(item.uploadedAt)}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedCv(item.url)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Preview</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600"
                    onClick={() => {
                      setCvToDelete(item.url);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* CV Preview Dialog */}
      <AlertDialog open={!!selectedCv} onOpenChange={(open: any) => !open && setSelectedCv(null)}>
        <AlertDialogContent className="max-w-4xl">
          <AlertDialogHeader>
            <AlertDialogTitle>CV Preview</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="w-full h-[70vh]">
            {selectedCv && (
              <iframe
                src={selectedCv}
                width="100%"
                height="100%"
                style={{ border: 'none' }}
                title="CV Preview"
              />
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your CV. You won&apos;t be able to use it for future applications.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading} onClick={() => {
              setIsDeleteDialogOpen(false);
              setCvToDelete(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCV}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Delete CV'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

interface AddCVDialogProps {
  cvs: CVItem[];
  onUploadSuccess: () => void;
}

const AddCVDialog = ({ cvs, onUploadSuccess }: AddCVDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const userId = typeof window !== 'undefined' ? sessionStorage.getItem('poop') : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadCV = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    if (!userId) {
      alert("Error: User ID is missing.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload the CV file
      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/main_server/api/file/cvupload/?id=${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload CV");
      }

      const uploadData = await uploadResponse.json();

     
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

      if (!updateResponse.ok) {
        throw new Error("Failed to update user record");
      }

      alert(jobId 
        ? "CV updated and job application submitted successfully!" 
        : "CV uploaded successfully!");
      
      onUploadSuccess();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="w-40">
          Add new CV
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add here</AlertDialogTitle>
          <AlertDialogDescription>
            Drag and drop your CV/resume (PDF only) or click to browse files.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onClick={triggerFileInput}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <UploadCloud
                className={`h-10 w-10 ${
                  isDragging ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <p className="text-sm text-gray-500">
                {isDragging
                  ? "Drop your PDF here"
                  : "Drag and drop your PDF file here, or click to select"}
              </p>
              <p className="text-xs text-gray-400">PDF files only (max 5MB)</p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {file && (
            <div className="border rounded-lg p-4 flex items-center gap-3">
              <File className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => setFile(null)}
              >
                Remove
              </button>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isUploading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={uploadCV}
            disabled={!file || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : jobId ? (
              "Upload & Apply"
            ) : (
              "Upload CV"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResumeManager;