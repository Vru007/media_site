import React,{useState} from 'react'
import Header from '../components/header';
function HomePage({user}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
 console.log("finalUser in home; ",user)
  return (
    <div className="min-h-screen bg-gray-100">
    <Header onUploadClick={() => setIsModalOpen(true)} user={user} />
    <div className='text-3xl'>Home Page</div>
    </div>
  )
}

export default HomePage