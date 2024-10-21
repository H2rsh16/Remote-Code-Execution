import React, {useState} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


const Register = ()=>{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const notifySuccessToast = (res) => {
        toast.success(res.data.message, {
            position: 'top-center',
            duration: 3000,
            style: {
                background: '#333',
                color: '#fff',
            },
        });
    };
    
    const notifyErrorToast = (err) => {
        toast.error(err.response?.data?.message || "Error try Again!!", {
            position: 'top-center',
            duration: 3000,
            style: {
                background: '#e74c3c',
                color: '#fff',
            },
        });
    };

    const Register = async (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            toast.error("Password Not Matched", {
                position: 'top-center',
                duration: 3000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        }
        else{
            try {
                const response = await axios.post(
                    'https://rce-system-backend.onrender.com/register',
                    {
                        name: name,
                        email: email,
                        password: password
                    },
                    { withCredentials: true }
                );

                notifySuccessToast(response);
                setTimeout(() => {
                    redirectToLogin();
                }, 2500);
            } catch (error) {
                notifyErrorToast(error);
            }
        }
    };

    const redirectToLogin = () =>{
        navigate('/');
    }

    const handleName = (e) => {
        setName(e.currentTarget.value);
    };
    const handleEmail = (e) => {
        setEmail(e.currentTarget.value);
    };
    const handlePass = (e) => {
        setPassword(e.currentTarget.value);
    };
    const handleCPass = (e) => {
        setConfirmPassword(e.currentTarget.value);
    };

    return (
        <section className="bg-gray-100">
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Register !!!</h1>
                    <form action="" onSubmit={Register}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter Name</label>
                            <input type="text" onInput={handleName} id="name" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your name" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <input type="email" onInput={handleEmail} id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <input type="password" onInput={handlePass} id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                            <input type="password" id="cpassword" onInput={handleCPass} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <span onClick={redirectToLogin} className="text-xs cursor-pointer text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">I have Account</span>
                        </div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit</button>
                    </form>
            </div>
            </div>
        </section>
    )
}

export default Register