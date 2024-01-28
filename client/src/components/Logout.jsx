import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/api/v1/auth/logout");
      localStorage.removeItem("token");
      toast.success("User logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="bg-white text-blue-500 font-semibold p-2 rounded-full transition duration-500 ease-in-out hover:bg-blue-800 hover:text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
