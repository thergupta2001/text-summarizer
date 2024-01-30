import React from "react";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const name = localStorage.getItem("name");
  const navigate = useNavigate()

  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl">Welcome, {name}</h1>

      <div className="flex flex-wrap justify-center items-center mt-10">
        <div className="bg-white p-8 mx-6 my-6 rounded-lg shadow-lg flex flex-col border border-gray-500 w-2/6 transition-transform hover:scale-105 hover:shadow-2xl transform duration-300 cursor-pointer" onClick={() => navigate('/summary')}>
          <h1 className="text-3xl font-bold mb-4">Text Summarizer</h1>
          <p className="text-gray-600 text-lg">Create a summary of text</p>
        </div>

        <div className="bg-white p-8 mx-6 my-6 rounded-lg shadow-lg flex flex-col border border-gray-500 w-2/6 transition-transform hover:scale-105 hover:shadow-2xl transform duration-300 cursor-pointer" onClick={() => navigate('/completion')}>
          <h1 className="text-3xl font-bold mb-4">Chat Completion</h1>
          <p className="text-gray-600 text-lg">Create a completion of text</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
