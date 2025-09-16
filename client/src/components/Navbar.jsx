import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const Logout = async () => {
  try {
    axios.defaults.withCredentials = true; // ensure cookies are sent
    const { data } = await axios.post(`${backendUrl}/api/auth/logout`);

    if (data.success) {
      setIsLoggedin(false);
      setUserData(null);
      navigate("/login");
      toast.success("Logged out successfully");
    } else {
      toast.error(data.message || "Logout failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while logging out");
  }
};

  return (
    <div className="w-full flex items-center justify-between p-4 sm:p-6 sm:px-24 absolute top-0 bg-white shadow-md z-20">
      {/* Logo */}
      <img src={assets.logo} alt="Logo" className="w-28 sm:w-32 cursor-pointer" onClick={() => navigate("/")} />
      
      {/* User Avatar or Login Button */}
      {userData ? (
        <div className="relative group">
          {/* Avatar */}
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-black text-white font-semibold text-lg cursor-pointer transition-transform hover:scale-105">
            {userData.name[0].toUpperCase()}
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
            <ul className="flex flex-col text-gray-800 text-sm">
             {!userData.isAccountVerified && <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-t-lg">Verify Email</li>}
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-b-lg" onClick={Logout}>Logout</li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all shadow-sm hover:shadow-md"
        >
          Login
          <img src={assets.arrow_icon} alt="Arrow" className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Navbar;
