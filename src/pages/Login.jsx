import React, {useEffect, useState} from "react"
import axios from 'axios';
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from "./AuthContex";
import Home from "./Home";

const Login = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();


    const Login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://rce-system-backend.onrender.com/login', {
                email: username,
                password: password
            }, {
                withCredentials: true
            })
            
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            login();
            navigate('/home');
    
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    }

    const redirectToRegister = () => {
        navigate('/register')
    }
    

    return (
        <section className="bg-gray-100">
                {/* // <!-- component --> */}
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Login !!!</h1>
                    <form onSubmit={Login}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input type="email" id="email" onInput={(e)=> setUsername(e.currentTarget.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <input type="password" id="password" onInput={(e)=> setPassword(e.currentTarget.value)} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <a href="" onClick={redirectToRegister} className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Account</a>
                        </div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                    </form>
            </div>
            </div>
        </section>
    )
}

export default Login