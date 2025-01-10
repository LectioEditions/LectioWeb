"use client";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useUploadThing } from '@/src/utils/uploadthing';
import { Loader } from 'lucide-react';

function UploadSvg() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );
}

type DropProps = {
  setImageURL: Dispatch<SetStateAction<string>>;
};

export default function MyDropzone({  setImageURL }: DropProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; url: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { startUpload } = useUploadThing("thumbnail", {
    onClientUploadComplete: () => {
      setIsUploading(false);
      toast.success("Upload completed successfully!");
    },
    onUploadError: (error) => {
      setIsUploading(false);
      toast.error("An error occurred during upload");
      console.error(error);
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const imageFile = acceptedFiles.find(file => file.type.startsWith('image/'));
      
      if (!( imageFile)) {
        toast.error("Please upload one PDF and one image.");
        return;
      }

      setIsUploading(true);
      acceptedFiles.forEach(async (file) => {
        try {
          const result = await startUpload([file]);
          if (!result) throw new Error("No results");
          setUploadedFiles((prev) => [...prev, { name: file.name, url: result[0].url }]);
          if (result[0].type.startsWith('image/')) {
            setImageURL(result[0].url);
          } 
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      });
    },
    [startUpload, setImageURL]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop,
    disabled: isUploading || uploadedFiles.length === 2,
    maxFiles: 2,
  });

  // Reset the uploaded files if resetDropzone changes

  const handleReset = () => {
    setUploadedFiles([]);
  };


  return (
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center mb-10 border-2 border-dashed border-gray-400 rounded-lg p-6 cursor-pointer bg-white-1 min-h-64 transition ${
        isUploading || uploadedFiles.length === 2 ? "cursor-not-allowed opacity-[70%]" : ""
      }`}
    >
      <input {...getInputProps()} />
      {isUploading && <Loader />} 
      {!isUploading && uploadedFiles.length === 0 && <UploadSvg />}
      {!isUploading && uploadedFiles.length > 0 && (
        <div className="uploaded-files-list w-full">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="file-preview p-2 border mb-2 rounded border-black-1 text-black-1">
              <p className="text-sm">{file.name}</p>
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View File</a>
            </div>
          ))}
        </div>
      )}
      {!isUploading && uploadedFiles.length === 0 && (
        <button
          type="button"
          onClick={open}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Select Files
        </button>
      )}
      {uploadedFiles.length === 1 && (
        <div className='flex justify-center items-center flex-col w-full'>
        <button
         type="button"
         onClick={handleReset}
         className="mt-4 px-4 py-2 bg-red-500 text-black-1 dark:text-white-1 rounded-lg hover:bg-red-600 transition"
       >
         Reset Files
       </button>
        <p className="text-gray-600 mt-4">Files uploaded successfully.</p>
      </div>)}
    </div>
  );
}
