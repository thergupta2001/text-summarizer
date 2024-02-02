import axios from "axios";
import { useEffect, useState } from "react";

export default function useVerfied(){
  const [loggedIn , setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getVerified = async () => {
      try {
        const token = localStorage.getItem("token");
        const resp = await axios.get(
          "http://localhost:8080/api/v1/auth/verify",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (resp && resp.data && resp.data.success) {
          setLoggedIn(true);
        }
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    getVerified();
  }, [setLoggedIn]);

  return {loggedIn,loading}
}