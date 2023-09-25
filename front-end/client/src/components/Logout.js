import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../services/helper";

const Logout = () => {
  const navigate = useNavigate();

  const fetchUserLogout = async () => {
    try {
      const response = await axios.get(`${base_url}/logout`);
      if (response.status) {
        // console.log(response.status);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error("failed to get response:", error);
    }
  };
  useEffect(() => {
    fetchUserLogout();
  });
  return <></>;
};

export default Logout;
