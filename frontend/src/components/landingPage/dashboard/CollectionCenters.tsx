import { Stack, Typography } from "@mui/material";
import React from "react";
import { FaWarehouse } from "react-icons/fa";

const CollectionCenters = () => {
  return (
    <div className="flex justify-center">
      <Stack>
        <Stack spacing={2} alignItems="center">
          <div className="text-[#028C07] text-3xl">
            <FaWarehouse />
          </div>
          <Typography variant="h6" fontWeight={700}>
            Number of Plastic <br /> Collection Centers
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

export default CollectionCenters;
