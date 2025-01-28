import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Protected({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("protected: trigger:")
    const user = localStorage.getItem('user');
    let token=null;
    if(user){
      console.log("inside user block: ");
      const parsedUser=JSON.parse(user);
      token=parsedUser.token;
    }
    if (!token) {
      navigate('/login'); 
    } 
  }, [navigate]);

  
  return children;
}

export default Protected;
