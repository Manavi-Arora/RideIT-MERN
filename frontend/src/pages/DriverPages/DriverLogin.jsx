import { Link } from "react-router-dom";
import { Mail, Eye, EyeClosed, Loader, Lock } from "lucide-react"
import { useState } from "react";
import { useEffect } from "react";
import { useDriverStore } from "../../store/useDriverStore";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import toast from "react-hot-toast";

const DriverLogin = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { login, isLoggingIn, handleCredentialResponse } = useDriverStore();
    window.handleCredentialResponse = handleCredentialResponse;
    //  useEffect(() => {
    //      const script = document.createElement("script")
    //      script.src = "https://accounts.google.com/gsi/client"
    //      script.async = true
    //      script.defer = true
    //      document.body.appendChild(script)

    //      return () => {
    //          document.body.removeChild(script)

    //      }
    //  }, [])
    function handleInputErrors() {
        if (!formData.email || !formData.password) {
            toast.error("All fields are required!");
            return false;
        }
        props.setProgress(20);
        return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        props.setProgress(70);
        const isValid = handleInputErrors();
        if (isValid === true) login(formData);
        props.setProgress(100);
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (

        <div className="flex h-screen w-[calc(70vw)]">

            <div className="hidden lg:flex items-center justify-center flex-1 bg-e0e1e1 text-black">
                <div className="w-full h-[45vh] flex items-center justify-center">

                    <DotLottieReact
                        src="https://lottie.host/7faacd35-acf4-4b96-8de4-41ebc7152ede/M9c32Rcgei.lottie"
                        loop
                        autoplay
                         className="w-full h-full scale-110"
                    />

                </div>
            </div>

            <div className="w-full bg-e0e1e1 lg:w-1/2 flex items-center justify-center">

                <div className="max-w-md w-full p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-black text-center">Login<span className='text-gray-800' style={{ textShadow: '1px 2px 5px black, 2px 2px 5px #e0e1e1' }}> RideIT</span></h1>
                    <div id="g_id_onload"
                        data-client_id="288032961209-jubn9l1ejem7qvqk40ml19eukhsc3uco.apps.googleusercontent.com"
                        data-callback="handleCredentialResponse"
                        data-auto_prompt="false"></div>
                    <div className="g_id_signin mb-3 bg-transparent"
                        data-type="standard"
                        data-shape="pill"
                        data-theme="outline"
                        data-text="sign_in_with"
                        data-size="large"
                        data-logo_alignment="left">

                    </div>
                    <form action="#" method="POST" className="space-y-4" onSubmit={handleSubmit}>

                        <div>
                            <div className="flex gap-2">
                                <span><Mail color="black" size={"20px"} /></span>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            </div>

                            <input type="text" placeholder="you@example.com" autoComplete="username" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="relative">
                            <div className="flex gap-2">
                                <span><Lock color="black" size={"20px"} /></span>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            </div>

                            <input id="password" name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" type={showPassword ? 'text' : 'password'}
                                placeholder='••••••••'

                                autoComplete="current-password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                            <div
                                className="absolute right-2 top-11 transform -translate-y-1/2 z-10 cursor-pointer"
                                onClick={togglePasswordVisibility} // Trigger state update on click
                            >
                                {showPassword ? (
                                    <EyeClosed size={"20px"} className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10" />
                                ) : (
                                    <Eye size={"20px"} className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10" />
                                )}
                            </div>
                        </div>

                        <div>

                            <button type="submit" disabled={isLoggingIn} className="btn btn-block bg-black text-white p-2 rounded-md hover:bg-gray-800 text-center w-full">{isLoggingIn ? (
                                <div className="flex items-center justify-center">
                                    <Loader className="h-5 w-5 animate-spin" />
                                    Loading...
                                </div>
                            ) : "Log In"}</button>
                        </div>
                    </form>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <p>Don't have an account? <Link to="/signup/captain" className="text-black hover:underline">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DriverLogin;
