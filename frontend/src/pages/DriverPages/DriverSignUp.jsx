import React from "react";
import { Link } from "react-router-dom";
import { Mail, UserRoundPen, Lock, LockKeyhole, EyeClosed, Eye, Loader, PhoneCall } from "lucide-react"
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useDriverStore } from "../../store/useDriverStore";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from "react-router-dom";

const DriverSignUp = (props) => {
    const navigate = useNavigate(); 
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPass: "",
        phoneNumber: ""
    });

    //    useEffect(() => {
    //      const script = document.createElement("script")
    //      script.src = "https://accounts.google.com/gsi/client"
    //      script.async = true
    //      script.defer = true
    //      document.body.appendChild(script)

    //      return () => {
    //        document.body.removeChild(script)

    //      }
    //    }, [])

    const { signup, isSigningUp } = useDriverStore();
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name is required");
        if (!formData.phoneNumber.trim()) return toast.error("Phone number is required");
        if (!formData.email.trim()) return toast.error("Email is required");
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) return toast.error("Invalid email format");
        if (!formData.password) return toast.error("Password is required");
        if (!formData.confirmPass) return toast.error("Confirm Password is required");
        if (formData.password.length < 8) return toast.error("Password must be at least 8 characters");
        if (formData.phoneNumber.length != 10 || !/^\d{10}$/.test(formData.phoneNumber)) return toast.error("Invalid Phone Number");
        if (formData.confirmPass != formData.password) return toast.error("Passwords do not match");
        props.setProgress(20);
        return true;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        props.setProgress(50);
    
        const isValid = validateForm();
        props.setProgress(70);
    
        if (isValid) {
            try {
                const response = await signup(formData); 
                props.setProgress(100);
                console.log(response);
                if (response) {
                    navigate("/driver/complete-profile"); 
                }
            } catch (error) {
                console.error("Signup failed:", error);
            }
        }
    };
    

    return (


        <div className="flex h-screen  w-[calc(70vw)]">

            <div className="hidden lg:flex items-center justify-center flex-1 bg-e0e1e1 text-black">
                <div className="w-full h-[58vh] flex items-center justify-center"> 
                    <DotLottieReact
                        src="https://lottie.host/5c2d308c-f7ec-4b93-b4b8-976f5786096c/1mVfK1OXgJ.lottie"
                        loop
                        autoplay
                        className="h-full w-full scale-110" 
                    />
                </div>

            </div>

            <div className="w-full bg-e0e1e1 lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign Up<span className='text-gray-800' style={{ textShadow: '1px 2px 5px black, 2px 2px 5px #e0e1e1' }}> RideIT</span></h1>
                    <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">Join to Our Community with all time access and free </h1>
                    <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                        <div className="w-full mb-2 lg:mb-0">
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
                        </div>

                    </div>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <p>or with email</p>
                    </div>
                    <form action="#" method="POST" className="space-y-4" onSubmit={handleSubmit}>

                        <div>
                            <div className="flex gap-2">
                                <span><UserRoundPen color="black" size={"20px"} /></span>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            </div>

                            <input type="text" placeholder="John Doe" id="username" name="username" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} autoComplete="username" />
                        </div>
                        <div>
                            <div className="flex gap-2">
                                <span><Mail color="black" size={"20px"} /></span>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            </div>

                            <input type="text" placeholder="you@example.com" id="email" name="email" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>

                        <div>
                            <div className="flex gap-2">
                                <span><PhoneCall color="black" size={"20px"} /></span>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            </div>

                            <input type="text" placeholder="1234567890" id="phone" name="phone" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                        </div>

                        <div className="relative">
                            <div className="flex gap-2">
                                <span><Lock color="black" size={"20px"} /></span>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            </div>

                            <input name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" type={showPassword ? 'text' : 'password'}
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
                            <div className="flex gap-2">
                                <span><LockKeyhole color="black" size={"20px"} /></span>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            </div>

                            <input name="password" className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300" type={showPassword ? 'text' : 'password'}

                                placeholder='re-type password'
                                autoComplete="confirmPass"

                                value={formData.confirmPass}
                                onChange={(e) => setFormData({ ...formData, confirmPass: e.target.value })} />
                        </div>
                        <div>
                            <button type="submit" disabled={isSigningUp} className="btn btn-block bg-black text-white p-2 rounded-md hover:bg-gray-800 text-center w-full">{isSigningUp ? (
                                <div className="flex items-center justify-center">
                                    <Loader className="h-5 w-5 animate-spin" />
                                    Loading...
                                </div>
                            ) : "Sign Up"}</button>
                        </div>
                    </form>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <p>Already have an account? <Link to="/login/captain" className="text-black hover:underline">Login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

};
export default DriverSignUp;
