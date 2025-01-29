import React,{useState, useEffect} from 'react'
import Header from '../components/header';
import MediaUpload from '../components/mediaUpload';
import MediaList from '../components/mediaList';
import { fetchAllMedia } from '../apis/mediaApis';
function HomePage({user}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
 console.log("finalUser in home; ",user)

 const [mediaList, setMediaList] = useState([]);

const handleCloseModal = () => {
  setIsModalOpen(false);
};

const fetchMedia = async () => {
  try {
    const data = await fetchAllMedia();
    setMediaList(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const handleUploadSuccess = async () => {
  setIsModalOpen(false);
  await fetchMedia();
};
const handleDelete = (mediaId) => {
  setMediaList(mediaList.filter((item) => item._id !== mediaId));
};
  
useEffect(() => {
    fetchMedia();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
    <Header onUploadClick={() => setIsModalOpen(true)} user={user} />
    <MediaUpload 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onUpload={handleUploadSuccess}
        user={user}
      />
      <MediaList mediaList={mediaList} handleDelete={handleDelete}/>
    </div>
  )
}

export default HomePage