import { useEffect, useState } from "react";
import { fetchAllMedia, uploadMedia } from "../apis/mediaApis";
import MediaCard from "./mediaCard";
const MediaList = ({ mediaList, handleDelete, user, onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setIsUploading(true);
     await uploadMedia(file, user);
      onUpload()
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;

    // Check if file is image or video
    if (!file.type.startsWith('image') && !file.type.startsWith('video')) {
      alert('Please upload only image or video files');
      return;
    }

    await handleUpload(file);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is image or video
    if (!file.type.startsWith('image') && !file.type.startsWith('video')) {
      alert('Please upload only image or video files');
      return;
    }

    await handleUpload(file);
  };

  return (
    <div className="p-4">
      {/* Upload Card */}
      <div
        className={`mb-8 bg-white border-2 border-dashed rounded-lg p-8 text-center transition-all relative
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500 hover:bg-gray-50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <svg 
              className="animate-spin h-10 w-10 text-blue-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <p className="mt-4 text-blue-500 font-medium">Uploading...</p>
          </div>
        ) : (
          <>
            <svg 
              className="mx-auto w-12 h-12 text-gray-400" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="mt-4 text-xl font-medium text-gray-900">
              Drag and drop your media files here
            </p>
            <p className="mt-2 text-gray-500">
              or click to browse from your computer
            </p>
            <label className="mt-4 inline-block">
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,video/*"
              />
              <span className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer text-sm transition-colors">
                Select Files
              </span>
            </label>
          </>
        )}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaList.map((media) => (
          <MediaCard key={media._id} media={media} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default MediaList;