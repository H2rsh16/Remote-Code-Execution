import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const notifySuccessToast = (res) => {
    toast.success(res.data.message, {
      position: "top-center",
      duration: 3000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  const notifyErrorToast = (err) => {
    toast.error(err.response?.data?.message || "Error try Again!!", {
      position: "top-center",
      duration: 3000,
      style: {
        background: "#e74c3c",
        color: "#fff",
      },
    });
  };

  const Login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rce-system-backend.onrender.com/login",
        {
          email: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      );

      notifySuccessToast(response);
      login();
      navigate("/home");
    } catch (error) {
      notifyErrorToast(error);
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.currentTarget.value);
  };

  const fillSampleCredentials = () => {
    setUsername("harsh@gmail.com");
    setPassword("123456");
    toast.success("Sample credentials filled!", {
      position: "top-center",
      duration: 2000,
      style: {
        background: "#10b981",
        color: "#fff",
      },
    });
  };

  return (
    <section className="bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="min-h-screen flex items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Sign in to continue to your account
            </p>
          </div>

          {/* Sample Credentials Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-l-4 border-indigo-500 p-4 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Sample Credentials
                </h3>
                <div className="mt-2 text-xs text-gray-700 dark:text-gray-300 space-y-1">
                  <p>
                    <span className="font-medium">Email:</span> harsh@gmail.com
                  </p>
                  <p>
                    <span className="font-medium">Password:</span> 123456
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fillSampleCredentials}
                  className="mt-3 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Auto-fill credentials
                </button>
              </div>
            </div>
          </div>

          {/* Login Form Card */}
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl px-8 py-8">
            <form onSubmit={Login} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={username}
                    onInput={handleUsernameChange}
                    className="shadow-sm rounded-lg w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onInput={handlePasswordChange}
                    className="shadow-sm rounded-lg w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={redirectToRegister}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-300 group-hover:text-indigo-200"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in to your account
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;