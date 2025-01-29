import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Protected({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("protected: trigger:")
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      console.log("inside user block: ");
      const parsedUser=JSON.parse(storedUser);
      if (parsedUser.token) {
        setUser(parsedUser); 
        return;
      }
    }
    
     navigate('/login'); 
     
  }, [navigate]);

   if(!user)return null;
  return React.cloneElement(children, {user});;
}

export default Protected;
