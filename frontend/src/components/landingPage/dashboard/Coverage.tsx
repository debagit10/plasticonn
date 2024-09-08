import { Stack, Typography } from "@mui/material";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const Coverage = () => {
  return (
    <div className="flex justify-center mx-5">
      <Stack>
        <Stack spacing={2} alignItems="center">
          <div className="text-[#028C07] text-3xl">
            <FaLocationDot />
          </div>
          <Typography variant="h6" fontWeight={700}>
            Geographic Coverage
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

export default Coverage;
