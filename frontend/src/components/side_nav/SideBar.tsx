import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import { Button, Divider, Stack, Typography } from "@mui/material";

import { FaDropbox } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { LuHistory } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import SignOutModal from "../../modals/SignOutModal";

const SideBar = () => {
  const [cookies, setCookies] = useCookies();

  const navigate = useNavigate();

  const sideMenuList = [
    {
      name: "Dashboard",
      icon: <RxDashboard />,
      link: `/${cookies.userID}/dashboard`,
    },
    {
      name: "Profile",
      icon: <ImProfile />,
      link: `/${cookies.userID}/profile`,
    },
    {
      name: "History",
      icon: <LuHistory />,
      link: `/${cookies.userID}/history`,
    },
    {
      name: "Support",
      icon: <BiSupport />,
      link: "/support",
    },
  ];

  const [activeMenu, setActiveMenu] = useState("");

  useEffect(() => {
    const savedActiveMenu = sessionStorage.getItem("activeMenu");
    if (savedActiveMenu) {
      setActiveMenu(savedActiveMenu);
    }
  }, []);

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName);
    sessionStorage.setItem("activeMenu", menuName); // Save the active menu to localStorage
  };

  return (
    <div>
      <div className="flex justify-center">
        <img src={logo} alt="plasticonn logo" className="w-16 h-16" />
      </div>

      <Divider
        sx={{
          borderBottomColor: "white",
          marginX: ".5rem",
          marginTop: ".7rem",
        }}
      />

      <div className="mt-5  text-white">
        {cookies.role === "center" ? (
          <Stack
            direction="row"
            spacing={1}
            marginY="1.25rem"
            marginX="1.25rem"
            padding=".5rem"
            onClick={() => {
              handleMenuClick("drop offs");
              navigate(`/${cookies.userID}/dropoffs`);
            }}
            sx={{
              ":hover": {
                cursor: "pointer",
                backgroundColor: "#D9D9D92B",
                borderRadius: "8px",
              },
              backgroundColor:
                activeMenu === "drop offs" ? "#D9D9D92B" : "transparent",
              borderRadius: activeMenu === "drop offs" ? "8px" : "0",
            }}
          >
            <div className="pt-1">
              <FaDropbox />
            </div>
            <Typography>Drops</Typography>
          </Stack>
        ) : (
          <Stack
            direction="row"
            spacing={1}
            marginY="1.25rem"
            marginX="1.25rem"
            padding=".5rem"
            onClick={() => {
              handleMenuClick("drop off centers");
              navigate("/drop-off-centers");
            }}
            sx={{
              ":hover": {
                cursor: "pointer",
                backgroundColor: "#D9D9D92B",
                borderRadius: "8px",
              },
              backgroundColor:
                activeMenu === "drop off centers" ? "#D9D9D92B" : "transparent",
              borderRadius: activeMenu === "drop off centers" ? "8px" : "0",
            }}
          >
            <div className="pt-1">
              <FaDropbox />
            </div>
            <Typography>Centers</Typography>
          </Stack>
        )}

        {sideMenuList.map((menu) => (
          <Stack
            key={menu.name}
            direction="row"
            spacing={1}
            marginY="1.25rem"
            padding=".5rem"
            marginX="1.25rem"
            onClick={() => {
              handleMenuClick(menu.name);
              navigate(menu.link);
            }}
            sx={{
              ":hover": {
                cursor: "pointer",
                backgroundColor: "#D9D9D92B",
                borderRadius: "8px",
              },
              backgroundColor:
                activeMenu === menu.name ? "#D9D9D92B" : "transparent",
              borderRadius: activeMenu === menu.name ? "8px" : "0",
            }}
          >
            <div className="pt-1">{menu.icon}</div>
            <Typography>{menu.name}</Typography>
          </Stack>
        ))}
      </div>

      <div className="flex p-5">
        <SignOutModal />
      </div>
    </div>
  );
};

export default SideBar;
