import { Typography } from "@mui/material";
import React from "react";
import About from "../components/landingPage/About";
import CollectionCenters from "../components/landingPage/dashboard/CollectionCenters";
import Collectors from "../components/landingPage/dashboard/Collectors";
import Coverage from "../components/landingPage/dashboard/Coverage";
import Plastics from "../components/landingPage/dashboard/Plastics";
import Recycling from "../components/landingPage/dashboard/Recycling";
import RecyclingRate from "../components/landingPage/dashboard/RecyclingRate";
import Goals from "../components/landingPage/Goals";
import Navbar from "../components/landingPage/Navbar";

const LandingPage = () => {
  const dashBoardMetrics = [
    <Collectors />,
    <Plastics />,
    <Recycling />,
    <Coverage />,
    <RecyclingRate />,
    <CollectionCenters />,
  ];

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="text-center sm:my-5 md:mx-[20%] sm:p-5 p-3 m-3  rounded-lg shadow-lg border border-[#028C07]">
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

      <div className="flex justify-center m-10 text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dashBoardMetrics.map((item) => (
            <div className="flex justify-center m-2 items-center p-4 bg-gradient-to-b from-[#D9F0DA] to-white hover:shadow-lg hover:bg-[#F0FFF4] hover:scale-105 hover:cursor-pointer transition-transform duration-300 ease-in-out rounded-lg">
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center ">
        <About />
      </div>

      <div>
        <div className="flex justify-center my-5">
          <Typography fontWeight={700} color="#047308" variant="h5">
            Our Goals/Aims
          </Typography>
        </div>
        <Goals />
      </div>
    </div>
  );
};

export default LandingPage;
