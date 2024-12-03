import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlelogin = async (e)=> {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email")
      return
    }
    if (!password) {
      setError("Please enter correct the password")
      return
    }

    setError("");


    //Login API call

    try {
      const  response = await axiosInstance.post("/login",{
        email:email,
        password:password
      })

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
  }

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded-lg bg-white px-7 py-10">
          <form onSubmit={handlelogin}>
            <h4 className="text-2xl nb-7">Login</h4>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput value={password} onChange={(e)=>setPassword(e.target.value)} />
              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button type="submit" className="btn-primary">
              Login
            </button>
            <p className="text-lg  text-center mt-4">
              Not Registered Yet?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-primary underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
