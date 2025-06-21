import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast";
import { AuthContext } from '../context/AuthContext'

const App = () => {

  const {authUser} = useContext(AuthContext)

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <LogInPage /> : <Navigate to="/"/>} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App;
