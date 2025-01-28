import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
function GoogleLogin() {

    const gres=async(authResult)=>{
        try{
           
            console.log(authResult);
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