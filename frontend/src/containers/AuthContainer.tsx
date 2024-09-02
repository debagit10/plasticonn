import React, { ReactNode } from "react";
import { Typography, Stack } from "@mui/material";
import logo from "../images/logo.png";

interface ContainerProps {
  children: ReactNode;
}

const AuthContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <div className="rounded-tr-[31px] rounded-br-[31px] text-white bg-[#0B490D] md:w-[45%] md:block hidden relative ">
        <img
          src={logo}
          className="absolute top-20 left-4 mix-blend-luminosity w-[30%] h-[20%]"
        />

        <img
          src={logo}
          className="absolute top-4 right-4 mix-blend-luminosity w-[30%] h-[20%]"
        />

        <div className=" flex justify-center text-center pt-[70%]">
          <Stack>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              PLASTICONN
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 400 }}>
              collect - connect - convert
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                fontStyle: "italic",
                marginTop: "20px",
                lineHeight: "15.73px",
                marginX: "5px",
              }}
            >
              Plasticonn aims to reduce improper <br /> plastic disposal,
              thereby mitigating its <br /> environmental impact.
            </Typography>
          </Stack>
        </div>

        <img
          src={logo}
          className="absolute bottom-20 left-4 mix-blend-luminosity  w-[30%] h-[20%]"
        />

        <img
          src={logo}
          className="absolute bottom-4 right-4 mix-blend-luminosity w-[30%] h-[20%]"
        />
      </div>

      <div className="w-full">
        <div className="md:hidden">
          <img
            src={logo}
            className="absolute top-20 left-4 opacity-15 w-32 h-32"
          />

          <img
            src={logo}
            className="absolute top-4 right-4 opacity-15 w-32 h-32"
          />

          <img
            src={logo}
            className="absolute bottom-20 left-4 opacity-15 w-32 h-32"
          />

          <img
            src={logo}
            className="absolute bottom-4 right-4 opacity-15 w-32 h-32"
          />
        </div>
        <div className="flex justify-center mt-10">{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
