import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Side_nav_container from "../containers/Side_nav_container";

const Support = () => {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.token) {
      navigate(`/login-${cookies.role}`);
    }
  });
  return <Side_nav_container>Support</Side_nav_container>;
};

export default Support;
