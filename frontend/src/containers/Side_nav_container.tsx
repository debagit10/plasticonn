import React, { ReactNode, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCookies } from "react-cookie";

import logo from "../images/logo.png";

import { FaDropbox } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { LuHistory } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import { IoSearch } from "react-icons/io5";

interface ContainerProps {
  children: ReactNode;
}

const Side_nav_container: React.FC<ContainerProps> = ({ children }) => {
  const [cookies, setCookies] = useCookies();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSideBar = () => {
    setOpen(!open);
  };

  const sideMenuList = [
    { name: "Dashboard", icon: <RxDashboard /> },
    { name: "Profile", icon: <ImProfile /> },
    { name: "History", icon: <LuHistory /> },
    { name: "Support", icon: <BiSupport /> },
    { name: "Sign out", icon: <VscSignOut /> },
  ];
  return (
    <div className="flex">
      <div className="bg-[#0B490D] h-[100vh] fixed w-[15%] rounded-tr-lg rounded-br-lg hidden md:block">
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

        <div className="mt-5 md:ml-8 text-white">
          {cookies.role === "center" ? (
            <Stack
              direction="row"
              spacing={1}
              marginY="1.25rem"
              padding=".5rem"
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <div className="pt-1">
                <FaDropbox />
              </div>
              <Typography>Drop offs</Typography>
            </Stack>
          ) : (
            <Stack
              direction="row"
              spacing={1}
              marginY="1.25rem"
              padding=".5rem"
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <div className="pt-1">
                <FaDropbox />
              </div>
              <Typography>Drop off centers</Typography>
            </Stack>
          )}

          {sideMenuList.map((menu) => (
            <Stack
              direction="row"
              spacing={1}
              marginY="1.25rem"
              padding=".5rem"
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            >
              <div className="pt-1">{menu.icon}</div>
              <Typography>{menu.name}</Typography>
            </Stack>
          ))}
        </div>
      </div>

      <div className="h-[100vh] md:ml-[15%] ">
        <div className="flex justify-around fixed md:w-[85%] w-full">
          <div className="w-[50%]">
            <TextField
              onChange={handleInputChange}
              placeholder="Search anything"
              fullWidth
              sx={{
                padding: ".5rem", // Equivalent to p-4
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "black", // Equivalent to border-black
                    borderWidth: "2px",
                    borderRadius: "31px", // Equivalent to border-2
                  },
                  "&:hover fieldset": {
                    borderColor: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0B490D", // Equivalent to focus:border-[#0B490D]
                  },
                  padding: 0, // Reset default padding
                },
                "& input": {
                  padding: "1rem", // Adding padding inside the input
                  paddingLeft: "2rem",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    className={
                      searchText ? "cursor-pointer" : "cursor-not-allowed"
                    }
                    position="end"
                    sx={{
                      padding: "0.5rem",
                    }}
                  >
                    <IconButton disabled={!searchText}>
                      <Divider
                        sx={{ height: 28, m: 2 }}
                        orientation="vertical"
                      />
                      <IoSearch
                        style={{
                          color: searchText ? "#0B490D" : "grey", // Icon color when active or disabled
                          fontSize: "1.5rem", // Custom icon size
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <Stack padding="0.75rem" spacing={3} direction="row">
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
                },
              }}
              startIcon={<FaDropbox />}
            >
              Drop off
            </Button>

            <div>
              <IconButton onClick={handleClick}>
                <Avatar alt="User Avatar" src={logo} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Stack>
        </div>

        <div className="mt-16">{children}</div>
      </div>
    </div>
  );
};

export default Side_nav_container;
