import React,{useState, useEffect} from 'react'
import Header from '../components/header';
import MediaUpload from '../components/mediaUpload';
import MediaList from '../components/mediaList';
import { fetchAllMedia,fetchMediaByUser} from '../apis/mediaApis';
function HomePage({user}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
 console.log("finalUser in home; ",user)
 const [mediaList, setMediaList] = useState([]);
 const [userMedia,setUserMedia]=useState([]);
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

const fetchUserMedia= async()=>{
  try{
     const data=await fetchMediaByUser(user);
     console.log("fetchUserdata: ",data);
     setUserMedia(data);     
  } 
  catch(err){
    console.error("Fetch error: ",err);
  }
}

const handleUploadSuccess = async () => {
  setIsModalOpen(false);
  await fetchMedia();
  await fetchUserMedia();
};

const handleDelete = async(mediaId) => {
  setMediaList(mediaList.filter((item) => item._id !== mediaId));
  await fetchUserMedia();
};
  
useEffect(() => {
    fetchMedia();
    fetchUserMedia();
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
    <Header onUploadClick={() => setIsModalOpen(true)} user={user} />
    <MediaUpload 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        user={user}
      />
      
      <MediaList mediaList={mediaList} usermedia={userMedia} handleDelete={handleDelete} user={user} onUpload={handleUploadSuccess}/>
    </div>
  )
}

export default HomePage