import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function Header({ onUploadClick, user }) {

    console.log("user inside header: ",user);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  
  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };


  const handleLogout = () => {
    googleLogout(); 
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  return (
    <GoogleOAuthProvider clientId='422930788462-6s4ifshvofl0m8ihok4deg738oa9upgn.apps.googleusercontent.com'>
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Media Dashboard</h1>
      
     
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={onUploadClick}
      >
        Upload
      </button>

     
      {user ? (
        <div className="flex items-center space-x-4">
          <img 
            src={user?.image} 
            alt="User Profile"
            className="w-8 h-8 rounded-full"
            onClick={handleProfileClick}
          />
          <span className="font-semibold text-gray-700">{user?.name}</span>
          
          {/* Profile Modal Ka Logic */}
          {isProfileModalOpen && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-md max-w-xs w-full">
                <h3 className="font-bold text-lg mb-4">Profile</h3>
                <img 
                  src={user?.image} 
                  alt="User Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <p className="text-center mb-4">{user?.name}</p>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full"
                >
                  Logout
                </button>
                <button 
                  onClick={handleCloseProfileModal} 
                  className="text-blue-500 mt-2 w-full text-center"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <GoogleLogin 
          onSuccess={handleProfileClick} 
          onFailure={handleProfileClick}
        />
      )}
    </header>
    </GoogleOAuthProvider>
  );
}
