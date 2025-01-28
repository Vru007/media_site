import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import GoogleLogin from './pages/googleLogin';
import HomePage from './pages/home';
import Protected from './components/auth/protected';
import './App.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: (<Protected><HomePage/></Protected>),
  },
  {
    path:"/login",
    element:(<GoogleLogin/>)
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}
export default App
