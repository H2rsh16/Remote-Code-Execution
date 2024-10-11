import React, { useEffect, useState } from "react";
import { debounce } from 'lodash';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import Register from "./pages/Register";
import { AuthProvider } from "./pages/AuthContex";
import ProtectedRoute from "./pages/ProtectedRoute"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () =>{
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(()=>{
        const handleResize = debounce(() => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
          }, 200);
      
        window.addEventListener('resize', handleResize);
      
        return () => window.removeEventListener('resize', handleResize);
    })

    return (
        <AuthProvider>
            <BrowserRouter basename="/Remote-Code-Execution">
                <ToastContainer/>
                <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                            />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}


export default App