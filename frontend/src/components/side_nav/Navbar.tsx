import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
  Avatar,
  Menu,
} from "@mui/material";
import logo from "../../images/logo.png";
import { FaDropbox } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import Slider from "./Slider";

const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const [anchorEl, setAnchorEl] = useState(null);
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
    <>
      <div className="flex justify-around fixed md:w-[85%] w-full z-50 bg-gradient-to-b from-[#D9F0DA] to-white">
        <div className="md:hidden">
          <Slider />
        </div>
        <div className="md:hidden flex ml-16">
          <img src={logo} alt="plasticonn logo" className="w-16 h-16" />
        </div>
        <div className="hidden md:block">
          <TextField
            onChange={handleInputChange}
            placeholder="Search anything"
            fullWidth
            sx={{
              padding: ".5rem",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "black",
                  borderWidth: "2px",
                  borderRadius: "31px",
                },
                "&:hover fieldset": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#0B490D",
                },
                padding: 0,
              },
              "& input": {
                padding: "1rem",
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
                    <Divider sx={{ height: 28, m: 2 }} orientation="vertical" />
                    <IoSearch
                      style={{
                        color: searchText ? "#0B490D" : "grey",
                        fontSize: "1.5rem",
                      }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Stack padding="0.75rem" spacing={7} direction="row">
          <div className="hidden md:block">
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
          </div>

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
              <div
                onClick={() => {
                  navigate(`/${cookies.userID}/profile`);
                  handleClose();
                  handleMenuClick("Profile");
                }}
                className="px-2 py-1 flex justify-center w-[7rem] cursor-pointer"
              >
                <Stack direction="row" spacing={1}>
                  <ImProfile />
                  <Typography>Profile</Typography>
                </Stack>
              </div>
            </Menu>
          </div>
        </Stack>
      </div>
    </>
  );
};

export default Navbar;
