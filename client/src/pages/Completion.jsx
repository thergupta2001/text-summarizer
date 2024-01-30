import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Completion = () => {
  const navigate = useNavigate();
  const [completion, setCompletion] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/login')
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/openai/completion",
        { text }
      );
        // console.log(data)
      setCompletion(data.result);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRedirect = () => {
     navigate('/');
   };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col border border-gray-500 w-2/6">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-bold mb-0">Ask a Question</p>
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={handleRedirect}
            >
              Go Back
            </button>
          </div>
          <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-500 rounded-md"
            placeholder="Type your question here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="w-full p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-800 transition duration-500">
            Submit
          </button>
        </form>
      </div>
      {completion && (
        <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col border border-gray-500 w-4/6 mt-5">
          {completion}
        </div>
      )}
    </div>
  );
};

export default Completion;
