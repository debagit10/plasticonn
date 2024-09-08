import { Stack, Typography } from "@mui/material";
import React from "react";
import { AiOutlineBarChart } from "react-icons/ai";

const RecyclingRate = () => {
  return (
    <div className="flex justify-center mx-5">
      <Stack>
        <Stack spacing={2} alignItems="center">
          <div className="text-[#028C07] text-3xl">
            <AiOutlineBarChart />
          </div>
          <Typography variant="h6" fontWeight={700}>
            Recycling Rate
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

export default RecyclingRate;
