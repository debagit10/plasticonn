import { Stack, Typography } from "@mui/material";
import React from "react";
import { FaRecycle } from "react-icons/fa";

const Recycling = () => {
  return (
    <div className="flex justify-center mx-5">
      <Stack>
        <Stack spacing={2} alignItems="center">
          <div className="text-[#028C07] text-3xl ">
            <FaRecycle />
          </div>
          <Typography variant="h6" fontWeight={700}>
            Number of Recycling
            <br /> Partners
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

export default Recycling;
