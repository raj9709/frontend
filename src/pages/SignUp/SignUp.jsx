import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

function SignUp() {

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }
    if (!password) {
      setError("Please enter  the password")
      return
    }
  
    if (!name) {
      setError("Enter your name")
      return
    }
    setError("")
  
    // console.log({ name, email, password });
    //SignUp API call
    try {
      const  response = await axiosInstance.post("/create-account",{
        fullName:name,
        email:email,
        password:password
      })

      if (response.data && response.data.error) {
        setError(response.data.message)
        return
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Error Occurred")
      }
    }
  };


  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
          <form onSubmit={handleSignUp} className="mt-6">
            {/* Name Input */}
            <div className="mb-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Corrected state update
                className="w-full px-2 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Corrected state update
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Password Input */}
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="btn-primary">
                Sign Up
              </button>
            </div>
          </form>

          {/* Already Registered */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 underline hover:underline">
              Log In
            </a>
          </p>

          {/* Not Registered Yet */}
          {/* <p className="mt-4 text-center text-sm text-gray-600">
            Not registered yet?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Create an Account
            </Link>
          </p> */}
        </div>
      </div>
    </>
  );
}

export default SignUp;
