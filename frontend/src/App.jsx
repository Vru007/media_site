import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {createBrowserRouter, RouterProvider, Route, Link} from "react-router-dom";
import './App.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: (<HomePage/>),
  },
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
