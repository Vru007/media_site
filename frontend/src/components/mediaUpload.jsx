import { useState } from "react";
import { uploadMedia } from "../apis/mediaApis";

const MediaUpload = ({ isOpen, onClose, onUpload, user }) => {
  const [file, setFile] = useState(null);
  const cuser = user; 
  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    try {
      const uploadedFile = await uploadMedia(file, cuser);
      onUpload();
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Upload Media</h2>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Upload
        </button>
        <button onClick={onClose} className="ml-2 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MediaUpload;
