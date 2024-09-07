import { Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/landingPage/Navbar";

const LandingPage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="text-center hidden sm:block my-5 mx-[20%] p-5  rounded-lg shadow-lg border border-[#028C07]">
        <Typography fontWeight={700} variant="body2">
          <span className="text-[#028C07]">The plasticonn project</span> aims to
          bridge the gap between plastic collection initiatives and the
          accessibility of plastic collection centers, enhancing visibility and
          accessibility. It represents a sustainable, community-driven approach
          to reducing improper plastic disposal, contributing to environmental
          protection and offering environmental, economic, and social benefits,
          ensuring a positive return on investment.
        </Typography>
      </div>
    </div>
  );
};

export default LandingPage;
