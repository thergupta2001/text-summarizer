import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useVerfied from "../hooks/useVerfied";

const HomePage = () => {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  const { loggedIn, loading } = useVerfied();

  useEffect(() => {
    if (!loading && !loggedIn) navigate("/login", { replace: true });
  }, [loading, loggedIn, navigate]);

  // useEffect(() => {
  //   const getVerified = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const resp = await axios.get(
  //         "http://localhost:8080/api/v1/auth/verify",
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       if (resp && resp.data && resp.data.success) {
  //         // good
  //       } else {
  //         // not good
  //         navigate("/login", { replace: true });
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //       navigate("/login", { replace: true });
  //     }
  //   };
  //   getVerified();
  // }, [navigate]);

  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl">Welcome, {name}</h1>

      <div className="flex flex-wrap justify-center items-center mt-10">
        <div
          className="bg-white p-8 mx-6 my-6 rounded-lg shadow-lg flex flex-col border border-gray-500 w-2/6 transition-transform hover:scale-105 hover:shadow-2xl transform duration-300 cursor-pointer"
          onClick={() => navigate("/summary")}
        >
          <h1 className="text-3xl font-bold mb-4">Text Summarizer</h1>
          <p className="text-gray-600 text-lg">Create a summary of text</p>
        </div>

        <div
          className="bg-white p-8 mx-6 my-6 rounded-lg shadow-lg flex flex-col border border-gray-500 w-2/6 transition-transform hover:scale-105 hover:shadow-2xl transform duration-300 cursor-pointer"
          onClick={() => navigate("/completion")}
        >
          <h1 className="text-3xl font-bold mb-4">Chat Completion</h1>
          <p className="text-gray-600 text-lg">Create a completion of text</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
