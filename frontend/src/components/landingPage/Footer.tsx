import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import logo from "../../images/logo.png";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-[#1D1D1D] text-white m-5 py-5 rounded-lg">
      <div>
        <div className="flex flex-col sm:flex-row justify-center ">
          <div>
            <img src={logo} alt="plasticonn logo" className="w-16 h-16 " />
          </div>
          <div className="sm:mt-[3%]">
            <Typography fontWeight={700} color="#047308" variant="h5">
              PLASTICONN
            </Typography>
          </div>
        </div>
        <div className="m-3 text-center">
          <Typography>
            They are a team of enthusiastic individuals committed to fostering a
            cleaner, healthier environment free from plastic pollution.
          </Typography>
        </div>
      </div>

      <div className="mt-[5%] text-center">
        <Typography fontWeight={700} color="#047308" variant="h5">
          Contact
        </Typography>

        <Stack spacing={1} sx={{ marginTop: "1.5rem" }}>
          <div className="flex justify-center mt-5">
            <Stack direction="row" spacing={1}>
              <FaLocationDot />
              <Typography>University of lagos, Akoka, Nigeria</Typography>
            </Stack>
          </div>

          <div className="flex justify-center">
            <Stack direction="row" spacing={1}>
              <MdOutlineMailOutline />
              <Typography>plasticonn@gmail.com</Typography>
            </Stack>
          </div>

          <div className="flex justify-center">
            <Stack direction="row" spacing={1}>
              <FiPhone />
              <Stack>
                <Typography>+234 09012367895</Typography>
              </Stack>
            </Stack>
          </div>
        </Stack>
      </div>

      <div className="mt-[5%] text-center">
        <Typography fontWeight={700} color="#047308" variant="h5">
          Sign up
        </Typography>

        <Button
          variant="contained"
          sx={{
            paddingX: "20%",
            marginY: "3%",
            backgroundColor: "#0B490D",
            borderRadius: "31px",
            textTransform: "capitalize",
            "&:hover": {
              backgroundColor: "#0B490D",
            },
          }}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Footer;
