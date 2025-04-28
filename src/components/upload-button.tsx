// src/components/upload-button.tsx
import React from "react";

interface UploadButtonProps {
  onUpload: (file: File) => void; // Callback to handle file upload
}

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file); // Pass the file to the onUpload function
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => document.querySelector('input[type="file"]')?.click()}>
        Upload Icon
      </button>
    </div>
  );
};

export default UploadButton;
