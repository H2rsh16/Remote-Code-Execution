import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home"
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute"
import { Toaster } from "react-hot-toast";



const App = () =>{

    return (
            <BrowserRouter basename="/Remote-Code-Execution">
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
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </BrowserRouter>
    )
}


export default App