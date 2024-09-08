import React, { useState } from "react";
import { Button, Drawer, Icon, Typography } from "@mui/material";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";

const Slider = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const sideList = [
    { name: "Home", link: "/" },
    { name: "About", link: "#about" },
    { name: "Team", link: "#team" },
    { name: "Contact", link: "#contact" },
    { name: "Epicollect", link: "/epicollect" },
  ];
  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          borderColor: "#047308",
          color: "white",
          backgroundColor: "#047308",
          borderRadius: "31px",
          textTransform: "capitalize",
          marginRight: "30px",
          "&:hover": {
            color: "#047308",
            backgroundColor: "white",
            borderColor: "#047308",
          },
        }}
        onClick={toggleDrawer(true)}
        endIcon={<RiMenuUnfold3Line />}
      >
        Menu
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          "& .MuiPaper-root": {
            backgroundImage: "linear-gradient(to bottom, #D9F0DA, white)",
          },
        }}
      >
        <div
          className="flex justify-start mx-5 my-3"
          onClick={toggleDrawer(false)}
        >
          <Icon sx={{ color: "#047308" }}>
            <RiMenuUnfold4Line />
          </Icon>
        </div>

        <div className="flex px-3 justify-start">
          <ul className="">
            {sideList.map((item) => (
              <li className="relative group cursor-pointer text-[#047308] my-5">
                <Typography fontWeight={600} color="#047308">
                  {item.name}
                </Typography>
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#047308] scale-x-0 origin-left transition-transform duration-300 ease-in-out group-hover:scale-x-100 "></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex p-5 justify-center">
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
      </Drawer>
    </div>
  );
};

export default Slider;
