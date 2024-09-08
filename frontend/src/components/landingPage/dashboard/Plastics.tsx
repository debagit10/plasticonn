import { Stack, Typography } from "@mui/material";
import React from "react";
import { FaBottleWater } from "react-icons/fa6";

const Plastics = () => {
  return (
    <div className="flex justify-center mx-5">
      <Stack>
        <Stack spacing={2} alignItems="center">
          <div className="text-[#028C07] text-3xl">
            <FaBottleWater />
          </div>
          <Typography variant="h6" fontWeight={700}>
            Total Amount of <br /> Plastics Collected
          </Typography>
        </Stack>
        <Typography
          variant="caption"
          fontWeight={700}
          className="text-[#028C07]"
        >
          1234
        </Typography>
      </Stack>
    </div>
  );
};

export default Plastics;
