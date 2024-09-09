import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import logo from "../../images/logo.png";
import Slider from "./Slider";
import { RiAccountCircleLine } from "react-icons/ri";

const Navbar = () => {
  const listItem = [
    { name: "Home", link: "#" },
    { name: "About", link: "#about" },
    { name: "Team", link: "#team" },
    { name: "Contact", link: "#contact" },
    { name: "Epicollect", link: "/epicollect" },
  ];

  return (
    <div className="flex justify-between md:justify-around bg-gradient-to-b from-[#D9F0DA] to-white fixed w-full top-0 z-50">
      <div className="flex cursor-pointer">
        <div>
          <a href="#">
            <img src={logo} alt="plasticonn logo" className="w-28 h-28 " />
          </a>
        </div>
        <div className="hidden lg:block">
          <a href="#">
            <Stack sx={{ marginTop: "15%" }}>
              <Typography fontWeight={700} color="#047308" variant="h4">
                PLASTICONN
              </Typography>
              <Typography
                sx={{ fontWeight: 400, color: "black", textAlign: "center" }}
                variant="caption"
              >
                collect-connect-convert
              </Typography>
            </Stack>
          </a>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="flex gap-5 md:gap-10 mt-[10%]">
          {listItem.map((item) => (
            <a
              className="relative group cursor-pointer text-[#047308]"
              href={item.link}
            >
              <Typography fontWeight={600} color="#047308">
                {item.name}
              </Typography>
              <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#047308] scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 "></span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-[2%] hidden sm:block mr-5">
        <Button
          variant="outlined"
          sx={{
            borderColor: "#047308",
            color: "white",
            backgroundColor: "#047308",
            borderRadius: "31px",
            textTransform: "capitalize",
            "&:hover": {
              color: "#047308",
              backgroundColor: "white",
              borderColor: "#047308",
              backgroundImage: "linear-gradient(to bottom, #D9F0DA, white)",
            },
          }}
          startIcon={<RiAccountCircleLine />}
        >
          My Account
        </Button>
      </div>

      <div className="sm:hidden mt-[5%]">
        <Slider />
      </div>
    </div>
  );
};

export default Navbar;
