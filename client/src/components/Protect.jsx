import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protect = ({ children }) => {
  const navigate = useNavigate();
  const isToken = localStorage.getItem("token");
  useEffect(() => {
    if (!isToken) {
      navigate("/login");
    }
  }, [isToken, navigate]);

  return <>{children}</>;
};

export default Protect;
