import React from 'react';
import './index.css'
import { useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useDriverStore } from './store/useDriverStore';
import { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

import Home from './pages/home/Home';
import LogIn from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import Front from './pages/front/Front';
import Activity from './pages/Activity/activity';


import DriverLogin from './pages/DriverPages/DriverLogin';
import DriverSignUp from './pages/DriverPages/DriverSignUp';
import CompleteProfile from './pages/DriverPages/CompleteProfile';
import Dashboard from './pages/DriverPages/Dashboard';
import DriverProfile from './pages/DriverPages/DriverProfile';
import DriverRideHistory from './pages/DriverPages/DriverRideHistory';
export default function App() {
  const {authUser,checkAuth} = useAuthStore();
  const {authDriver,checkAuthDriver,isCheckingAuth} = useDriverStore();
  const [progress, setProgress] = useState(0);
 
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  useEffect(() => {
    checkAuthDriver()
  }, [checkAuthDriver])

   if(isCheckingAuth && !authDriver) 
     return (
     <div className=" flex items-center justify-center h-screen">
         <span className="loading loading-dots loading-md"> </span>
   </div>
   );
  return (
  
    <Router> 
      <LoadingBar
          color="#6c63ff"
          height={2}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
      <div className='flex items-center justify-center overflow-y-auto'>
        {/* <Navbar /> */}
        <Routes>
        <Route path="/user/login" element={authUser ? <Navigate to = '/home'/> : <LogIn setProgress = {setProgress} />} />
        <Route path="/user/signup" element={authUser ? <Navigate to='/home'/>:<SignUp setProgress = {setProgress} />} />
        <Route path="/home" element={authUser ? <Home setProgress = {setProgress}  /> : <Navigate to = "/user/login"/> } />
        <Route path="/" element={<Front />} />
        <Route path="/signup/captain" element={<DriverSignUp setProgress = {setProgress} />} />
        <Route path="/driver/complete-profile" element={(authDriver && authDriver.profileCompleted) ? <Navigate to = '/dashboard'/> : <CompleteProfile setProgress = {setProgress} />} />
        <Route path="/login/captain" element={authDriver ? <Navigate to = '/dashboard'/> : <DriverLogin setProgress = {setProgress} />} />
        <Route path="/activity" element={authUser ? <Activity /> : <Navigate to = '/home'/> } />   
        <Route path="/dashboard" element={authDriver ? <Dashboard /> : <Navigate to="/signup/captain" />} />
        <Route path="/driver-profile" element={authDriver ? <DriverProfile /> : <Navigate to="/signup/captain" />} />
        <Route path="/driver-rides" element={authDriver ? <DriverRideHistory /> : <Navigate to="/signup/captain" />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

