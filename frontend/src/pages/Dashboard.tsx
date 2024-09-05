import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.token) {
      navigate("/login-collector");
    }
  });
  return <div>Dashboard</div>;
};

export default Dashboard;
