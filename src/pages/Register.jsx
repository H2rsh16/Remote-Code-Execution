import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  const Register = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords do not match!", {
        position: "top-center",
        duration: 3000,
        style: {
          background: "#e74c3c",
          color: "#fff",
        },
        icon: "🔐",
      });
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "https://rce-system-backend.onrender.com/register",
          {
            name: name,
            email: email,
            password: password,
          },
          { withCredentials: true },
        );

        notifySuccessToast(response);
        setTimeout(() => {
          redirectToLogin();
        }, 2500);
      } catch (error) {
        notifyErrorToast(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const redirectToLogin = () => {
    navigate("/");
  };

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
    <section className="bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="min-h-screen flex items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header Section */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join us and start your journey today
            </p>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border-l-4 border-purple-500 p-4 rounded-lg shadow-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-purple-600 dark:text-purple-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Quick & Easy Registration
                </h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  Fill in your details below to create your account. It only
                  takes a minute!
                </p>
              </div>
            </div>
          </div>

          {/* Registration Form Card */}
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl px-8 py-8">
            <form onSubmit={Register} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  Full Name
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onInput={handleName}
                    className="shadow-sm rounded-lg w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
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
                    value={email}
                    onInput={handleEmail}
                    className="shadow-sm rounded-lg w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
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
                    onInput={handlePass}
                    className="shadow-sm rounded-lg w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Create a strong password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2"
                >
                  Confirm Password
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    id="cpassword"
                    value={confirmpassword}
                    onInput={handleCPass}
                    className={`shadow-sm rounded-lg w-full pl-10 pr-3 py-3 border ${
                      confirmpassword && password !== confirmpassword
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600 focus:ring-purple-500"
                    } dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                {/* Password Match Indicator */}
                {confirmpassword && (
                  <div className="mt-2 flex items-center">
                    {password === confirmpassword ? (
                      <>
                        <svg
                          className="h-4 w-4 text-green-500 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs text-green-500">
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-4 w-4 text-red-500 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs text-red-500">
                          Passwords do not match
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Already have account link */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                  </span>
                  <button
                    type="button"
                    onClick={redirectToLogin}
                    className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    Sign in
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-purple-300 group-hover:text-purple-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                    </span>
                    Create your account
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              By registering, you agree to our{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-500 dark:text-purple-400"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-500 dark:text-purple-400"
              >
                Privacy Policy
              </a>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your data is protected with 256-bit encryption
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
