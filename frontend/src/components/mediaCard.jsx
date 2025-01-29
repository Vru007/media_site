import { useState } from "react";
import ReactPlayer from "react-player";
import { deleteMedia } from "../apis/mediaApis";

const MediaCard = ({ media, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 

  const handleDelete = async () => {
    setIsDeleting(true); 
    try {
      await deleteMedia(media._id);
      onDelete(media._id);
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false); 
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  return (
    <div className={`border rounded-lg p-4 shadow-md relative transition-opacity ${isDeleting ? "opacity-50" : "opacity-100"}`}>
      {media.fileType.startsWith("image") ? (
        <img
          src={media.fileUrl}
          alt="Uploaded"
          className="w-full h-40 object-cover rounded-lg cursor-pointer"
          onClick={() => setIsExpanded(true)}
        />
      ) : (
        <div className="w-full h-40 rounded-lg overflow-hidden">
          <ReactPlayer
            url={media.fileUrl}
            controls
            width="100%"
            height="100%"
            style={{ borderRadius: "0.5rem" }}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  onContextMenu: (e) => e.preventDefault(),
                },
              },
            }}
          />
        </div>
      )}

      <button
        onClick={handleDelete}
        disabled={isDeleting} 
        className={`absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors z-10 flex items-center justify-center ${
          isDeleting ? "cursor-not-allowed bg-red-300" : ""
        }`}
      >
        {isDeleting ? (
          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
        ) : (
          "Delete"
        )}
      </button>

      {isExpanded && media.fileType.startsWith("image") && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-transparent rounded-lg">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute -top-10 right-0 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              ✖
            </button>
            <img
              src={media.fileUrl}
              alt="Full view"
              className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCard;
