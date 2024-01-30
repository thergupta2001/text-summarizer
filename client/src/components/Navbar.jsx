import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem('name')

      toast.success("User logged out successfully");
      
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="w-4/5 mx-auto rounded-full   bg-blue-600 p-3 text-white flex justify-between mt-4 top-0 shadow-lg">
      <div className="flex items-center mx-4">
        <p className="font-semibold text-2xl">GPT - clone</p>
      </div>

      <div className="mx-4">
        {token ? (
          <button
            className="bg-white text-blue-500 font-semibold p-2 rounded-full transition duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
            onClick={handleLogout}
          >
          
            Logout
          
          </button>
        ) : (
          <>
            <Link to="/register" className="mr-4">
              <button className="bg-white text-blue-500 font-semibold p-2 rounded-full transition duration-500 ease-in-out hover:bg-blue-800 hover:text-white">
              
                Sign Up
              
              </button>
            </Link>
            <Link to="/login" className="mr-1">
              <button className="bg-white text-blue-500 font-semibold p-2 rounded-full transition duration-500 ease-in-out hover:bg-blue-800 hover:text-white">
                
                Sign In
              
              </button>
            </Link>
          </>
        )}
      </div>

    </div>
  );
};

export default Navbar;
