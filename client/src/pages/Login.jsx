import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    console.log("token", token);

    async function getResp() {
      const resp = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {},
        { headers: headers }
      );
      console.log(resp);
      if(resp.data.success){
        alert(resp.data.message);
        navigate('/',{
          replace:true
        });
      }
    }

    getResp();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const data = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        },
      );
      console.log(data);
      localStorage.setItem("token", data.data.token);

      toast.success("User logged in successfully");
      navigate("/", {
        replace: true,
      });
      // }
    } catch (err) {
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
          <p className="text-2xl font-bold mb-4">Sign In</p>
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
            Sign In
          </button>
          <p className="mt-3">
            Do not have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Click Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
