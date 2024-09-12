import { Typography } from "@mui/material";
import React from "react";
import About from "../components/landingPage/About";
import CollectionCenters from "../components/landingPage/dashboard/CollectionCenters";
import Collectors from "../components/landingPage/dashboard/Collectors";
import Coverage from "../components/landingPage/dashboard/Coverage";
import Plastics from "../components/landingPage/dashboard/Plastics";
import Recycling from "../components/landingPage/dashboard/Recycling";
import RecyclingRate from "../components/landingPage/dashboard/RecyclingRate";
import Footer from "../components/landingPage/Footer";
import Goals from "../components/landingPage/Goals";
import Navbar from "../components/landingPage/Navbar";
import Partners from "../components/landingPage/Partners";
import Team from "../components/landingPage/Team";
import Value from "../components/landingPage/Values";

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
      <div className="mb-40">
        <Navbar />
      </div>

      <div className="text-center sm:my-5 md:mx-[20%] sm:p-5 p-3 m-3  rounded-lg shadow-lg border border-[#028C07]">
        <Typography fontWeight={700} variant="body2">
          <span className="text-[#028C07]">The Plasticonn project</span> seeks
          to bridge the gap between plastic collection efforts and the
          accessibility of collection centers. By enhancing both visibility and
          accessibility, the initiative fosters a sustainable, community-driven
          approach to reducing improper plastic disposal. This project not only
          contributes to environmental protection but also offers significant
          environmental, economic, and social benefits, ensuring a positive
          return on investment.
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

      <div className="flex justify-center " id="about">
        <About />
      </div>

      <div className="flex justify-center mt-10">
        <Value />
      </div>

      <div id="goals">
        <div className="flex justify-center my-5">
          <Typography fontWeight={700} color="#047308" variant="h5">
            Targeted Goals
          </Typography>
        </div>
        <Goals />
      </div>

      <div className="mt-10" id="team">
        <Team />
      </div>

      <div className="bg-[#f0f7f0] pb-3 pt-1 mx-5 rounded-lg">
        <Partners />
      </div>

      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
