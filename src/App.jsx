import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import Register from "./pages/Register";
import { AuthProvider } from "./pages/AuthContex";
import ProtectedRoute from "./pages/ProtectedRoute"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () =>{
    let condition = "";

    return (
        <AuthProvider>
            <BrowserRouter>
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