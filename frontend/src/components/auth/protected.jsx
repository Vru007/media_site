import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Protected({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/login'); 
    } else {
     
      axios
        .get('backend_route', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (!response.data.valid) {
            localStorage.removeItem('authToken'); 
            navigate('/login'); 
          }
        })
        .catch(() => {
          localStorage.removeItem('authToken'); 
          navigate('/login');
        });
    }
  }, [navigate]);

  
  return children;
}

export default Protected;
