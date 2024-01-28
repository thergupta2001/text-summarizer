import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Summary = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [text, setText] = useState('')
  // const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/openai/summary",
        { text }
      );
      setSummary(data.result);
    } catch (err) {
      // if (err.response.data.error) {
      //   setError(err.message);
      // } else if (err.message) {
      //   setError(err.message);
      // }
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col border border-gray-500 w-2/6">
        <form onSubmit={handleSubmit}>
          <p className="text-2xl font-bold mb-4">Ask a Question</p>
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
      {summary ? (
        <>
          <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col border border-gray-500 w-4/6 mt-5">
               {summary}
          </div>
        </>
      ) : (
        <>
          <div className="bg-white p-5 rounded-lg shadow-lg flex flex-col border border-gray-500 w-4/6 mt-5">
               ufvyjhbknlm
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;
