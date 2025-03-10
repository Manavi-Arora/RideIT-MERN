import React from 'react';
import './index.css'
import { useEffect,useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
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

export default function App() {
  const {authUser,checkAuth} = useAuthStore();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
        <Route path="/driver/complete-profile" element={<CompleteProfile />} />
        <Route path="/login/captain" element={<DriverLogin setProgress = {setProgress} />} />
        <Route path="/activity" element={authUser ? <Activity /> : <Navigate to = '/home'/> } />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

{/* <Route path="/home" element={authUser ? <Home setProgress = {setProgress}  /> : <Navigate to = "/login"/> }/>
          <Route path="/" element={!authUser?<Front />:<Navigate to = '/home'/>} />
          <Route path="/login" element={authUser ? <Navigate to = '/home'/> : <LogIn setProgress = {setProgress} />} />
          <Route path="/signup" element={authUser ? <Navigate to='/home'/>:<SignUp setProgress = {setProgress} />} />
          <Route path="/settings" element={authUser ? <Settings setProgress={setProgress} /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <Profile setProgress = {setProgress} /> : <Navigate to="/login" /> } />
          <Route path="/group-profile" element={authUser ? <GroupProfile setProgress = {setProgress} /> : <Navigate to="/login" /> } />
          <Route path="/status" element={authUser ? <Status setProgress = {setProgress} /> : <Navigate to="/login" /> } /> */}
