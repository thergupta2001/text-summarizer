import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("authToken");
    if (loggedIn) {
      if (window.location.pathname === "/register") {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          username,
          email,
          password,
        }
      );

      toast.success("User registered successfully");
      navigate("/login");
    } catch (err) {
      if (err.response.data.error) {
        setError(err.message);
      } else if (err.message) {
        setError(err.message);
      }
      toast.error(err.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col border border-gray-500 w-2/6">
        <form onSubmit={handleSubmit}>
          <p className="text-2xl font-bold mb-4">Sign Up</p>
          <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-500 rounded-md"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-500 rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 mb-4 border border-gray-500 rounded-md"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-800 transition duration-500">
            Sign Up
          </button>
          <p className="mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Click Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
