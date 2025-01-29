import React,{useEffect} from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../apis/authApis';
import {useNavigate} from 'react-router-dom'
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
    <div>
     <button onClick={glogin}>Login with Google</button>
    </div>
  )
}

export default GoogleLogin