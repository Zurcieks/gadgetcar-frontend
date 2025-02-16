// app/admin/components/Dropzone.tsx
"use client";

import React, { useCallback } from 'react';
import { useDropzone, Accept } from 'react-dropzone';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

const DropzoneComponent: React.FC<DropzoneProps> = ({ onFilesSelected }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const accept: Accept = {
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/png': ['.png'],
    'image/gif': ['.gif'],
    'image/webp': ['.webp'],
 
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-4 text-center cursor-pointer ${
        isDragActive ? 'border-blue-500' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Przeciągnij i upuść pliki tutaj...</p>
      ) : (
        <p>Przeciągnij i upuść zdjęcia tutaj, lub kliknij, aby wybrać pliki</p>
      )}
    </div>
  );
};

export default DropzoneComponent;