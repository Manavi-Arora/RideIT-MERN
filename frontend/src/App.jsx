import React from 'react';
import './index.css'
import { useEffect,useState } from "react";
//import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import LogIn from './pages/login/Login';
import SignUp from './pages/signup/Signup';
// import Settings from './pages/settings/Settings';
// import Profile from './pages/profile/Profile';
import { useAuthStore } from './store/useAuthStore';
import { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
//import Front from './pages/front/Front';


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
      <div className='flex items-center justify-center overflow-auto'>
        {/* <Navbar /> */}
        <Routes>
          
        <Route path="/login" element={authUser ? <Navigate to = '/home'/> : <LogIn setProgress = {setProgress} />} />
        <Route path="/signup" element={authUser ? <Navigate to='/home'/>:<SignUp setProgress = {setProgress} />} />
        <Route path="/home" element={authUser ? <Home setProgress = {setProgress}  /> : <Navigate to = "/login"/> } />
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
