import React,{useEffect} from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../apis/authApis';
import {useNavigate} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"; 
function GoogleLogin() {

  const navigate=useNavigate();
useEffect(() => {
    
    const user = localStorage.getItem('user');
    let token=null;
    if(user){
      const parsedUser=JSON.parse(user);
      token=parsedUser.token;
    }
    if (token) {
      navigate('/'); 
    }
  }, [navigate]);
    const gres=async(authResult)=>{
        try{
           
            const code=authResult.code;
            if(code){
              const result=await googleAuth(authResult.code);
              const {email,name,image}=result.data.user;
              const token=result.data.token;
              const obj={email,name,token,image};
              console.log("obj :",obj);
              localStorage.setItem('user',JSON.stringify(obj));
              navigate('/');
            }
            else{
              console.log(authResult);
              throw new Error(authResult);
            }
        }
        catch(err){
           console.error('Error while requesting google code : ',err)
        }
    }
    const glogin=useGoogleLogin({
        onSuccess:gres,
        onError:gres,
        flow:'auth-code'

    })
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Sign in to Your Account</h2>
        <p className="text-gray-500 mb-6">Continue with Google</p>
        <button
          onClick={glogin}
          className="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg px-6 py-3 shadow-md hover:bg-gray-100 transition-all w-full"
        >
          <FcGoogle className="text-2xl" /> Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default GoogleLogin