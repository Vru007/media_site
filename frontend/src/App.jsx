import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import GoogleLogin from './pages/googleLogin';
import HomePage from './pages/home';
import Protected from './components/protected';
import './App.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuthWrapper=()=>{
  return(
  <GoogleOAuthProvider clientId='422930788462-6s4ifshvofl0m8ihok4deg738oa9upgn.apps.googleusercontent.com'>
   <GoogleLogin></GoogleLogin>
  </GoogleOAuthProvider>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><HomePage/></Protected>),
  },
  {
    path:"/login",
    element:(<GoogleAuthWrapper/>)
  }
])
function App() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router}/>
    </div>
  )
}
export default App
