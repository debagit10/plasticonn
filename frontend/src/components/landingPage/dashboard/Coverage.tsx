import { Stack, Typography } from "@mui/material";
import React from "react";

const Coverage = () => {
  return (
    <div className="flex justify-center mx-5">
      <Stack
        className="hover:shadow-lg hover:bg-[#F0FFF4] transition-all duration-300 ease-in-out"
        sx={{
          padding: "16px",
          borderRadius: "8px",
          //backgroundColor: "#F5F5F5",
          backgroundImage: "linear-gradient(to bottom, #D9F0DA, white)",
          "&:hover": {
            transform: "scale(1.05)",
            cursor: "pointer",
          },
        }}
      >
        <Stack spacing={2} alignItems="center">
          <div className="text-[#028C07] text-3xl">Icon</div>
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
