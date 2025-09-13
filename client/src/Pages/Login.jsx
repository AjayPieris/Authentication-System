import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

const { backendUrl, setIsLoggedin } = useContext(AppContent);  

const onSubmitHandler = async (e) => {
  e.preventDefault();
  axios.defaults.withCredentials = true;

  try {
    let data;

    if (state === "Sign Up") {
      const res = await axios.post(`${backendUrl}/api/auth/register`, {
        name,
        email,
        password,
      });
      data = res.data;
    } else {
      const res = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });
      data = res.data;
    }

    if (data.success) {
      setIsLoggedin(true);
      navigate("/");
    } else {
      toast.error(data.message || "Something went wrong");
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Server error");
  }
};

  const [state, setState] = useState("Sign Up"); // Login or Sign Up
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
        <img
          src={assets.logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        />
        <div className=" bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
          <h2 className="text-center text-3xl font-semibold text-white mb-3">
            {state === "Sign Up" ? "Create Account" : "Login Account!"}
          </h2>
          <p className="text-center text-sm mb-6">
            {state === "Sign Up"
              ? "Create your account"
              : "Login to your account!"}
          </p>

          <form onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (
              <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="Person" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="outline-none"
                />
              </div>
            )}

            <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="Email" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="outline-none"
              />
            </div>

            <div className="flex items-center mb-4 gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="Lock" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="outline-none"
              />
            </div>
            {state === "Login" && (
              <p onClick={() => navigate("/reset-password")}
               className="mb-4 text-indigo-500 cursor-pointer">
                Forgot Password?
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-tr from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2.5 rounded-full font-semibold transition-all mb-4 cursor-pointer"
            >
              {state}
            </button>
          </form>

          {state === "Sign Up" ? (
            <p className="text-gray-400 text-center text-xs mt-2">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-xs mt-2">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
