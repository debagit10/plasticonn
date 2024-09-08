import { Typography } from "@mui/material";
import React from "react";

const Goals = () => {
  return (
    <div className="bg-[#f0f7f0] grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>Hi</div>
      <div className="m-10">
        <div className="lg:w-[80%] mt-5  ">
          <Typography variant="body2" fontWeight={400}>
            <span className="text-[#047308] font-bold"> With PLASTICONN</span>,
            we can achieve an integrated system where recycling is made easy
            through connections, and the environment is protected, join us to
            make this scalable, and a reality.
          </Typography>

          <div className="border-[#047308] border p-5 -rotate-2 rounded-lg">
            <Typography variant="body2">
              We waste less, live more. make recycling a habit, make
              sustainability a Lifestyle
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
