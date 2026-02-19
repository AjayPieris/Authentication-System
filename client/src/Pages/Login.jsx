import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { backendUrl, setIsLoggedin, getuserData } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      let response;

      if (state === "Sign Up") {
        response = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
      }

      const data = response.data;

      if (data.success) {
        setIsLoggedin(true);
        await getuserData();
        toast.success(
          data.message ||
            (state === "Sign Up"
              ? "Account created successfully!"
              : "Login successful!"),
        );
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (state === "Sign Up"
          ? "Failed to create account. Please try again."
          : "Username or Password is incorrect");
      toast.error(errorMessage);
    }
  };

  const [state, setState] = useState("Sign Up"); // Login or Sign Up
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="outline-none flex-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {state === "Login" && (
              <p
                onClick={() => navigate("/reset-password")}
                className="mb-4 text-indigo-500 cursor-pointer"
              >
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
