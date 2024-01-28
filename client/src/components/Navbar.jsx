import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="w-4/5 mx-auto rounded-full   bg-blue-600 p-3 text-white flex justify-between mt-4 top-0 shadow-lg">
      <div className="flex items-center mx-4">
        <p className="font-semibold text-2xl">GPT - clone</p>
      </div>
      <div className="mx-4"> 
        {token ? (
          <Logout/>
        ) : (
          <>
            <Link to="/register" className="mr-4">
              <button className="bg-white text-blue-500 font-semibold p-2 rounded-lg transition duration-500 ease-in-out hover:bg-blue-800 hover:text-white">
                Sign Up
              </button>
            </Link>
            <Link to="/login" className="mr-2">
              <button className="bg-white text-blue-500 font-semibold p-2 rounded-lg transition duration-500 ease-in-out hover:bg-blue-800 hover:text-white">
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
