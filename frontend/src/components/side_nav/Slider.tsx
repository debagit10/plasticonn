import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Divider,
  Drawer,
  Icon,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { FaDropbox } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import { LuHistory } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import SignOutModal from "../../modals/SignOutModal";
import axios from "axios";
import Env from "../../Env";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const Slider = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies();
  const [activeMenu, setActiveMenu] = useState("");
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    collectorID: "",
    centerID: "",
    pic: "",
  });

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const sideList = [
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

  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const getUserData = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    };
    try {
      const response = await axios.get(
        `${apiUrl}/api/${cookies.role}/userData`,
        config
      );

      setUserData((prevState) => ({
        ...prevState,
        fullName: response.data.fullName || "",
        name: response.data.name || "",
        phone: response.data.phone || "",
        email: response.data.email || "",
        address: response.data.address || "",
        collectorID: response.data.collectorID || "",
        centerID: response.data.centerID || "",
        pic: response.data.pic || "",
      }));
      setCookies("userID", response.data._id);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Button
        variant="outlined"
        sx={{
          marginLeft: ".5rem",
          marginTop: "1.25rem",
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
        onClick={toggleDrawer(true)}
        endIcon={<RiMenuUnfold3Line />}
      >
        Menu
      </Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="left"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#0B490D",
          },
        }}
      >
        <div
          className="flex justify-start mx-5 my-3"
          onClick={toggleDrawer(false)}
        >
          <Icon sx={{ color: "white" }}>
            <RiMenuUnfold4Line />
          </Icon>
        </div>

        <div>
          <div className="flex ">
            <img src={logo} alt="plasticonn logo" className="w-16 h-16 " />
            <div className="text-white">
              {/* <Typography variant="h6">
                {cookies.role === "collector"
                  ? "Collector's ID"
                  : "Center's ID"}
                :{" "}
                <span style={{ textDecoration: "underline" }}>
                  {cookies.role === "collector"
                    ? userData.collectorID
                    : userData.centerID}
                </span>
              </Typography> */}
              {/* <TextField
                onChange={handleInputChange}
                placeholder="Search anything"
                sx={{
                  padding: ".5rem",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      color: "white",
                      borderColor: "white",
                      borderWidth: "1px",
                      borderRadius: "31px",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                    padding: 0,
                  },
                  "& input": {
                    padding: "1rem",
                    color: "white",
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
                        <Divider sx={{ height: 28 }} orientation="vertical" />
                        <IoSearch
                          style={{
                            color: searchText ? "white" : "grey",
                            fontSize: "1.5rem",
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /> */}
            </div>
          </div>

          <Divider
            sx={{
              borderBottomColor: "white",
              marginX: ".5rem",
              marginTop: ".7rem",
            }}
          />

          <div className="mt-5 ml-4 text-white">
            {cookies.role === "dropOffCenter" ? (
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
                    activeMenu === "drop off centers"
                      ? "#D9D9D92B"
                      : "transparent",
                  borderRadius: activeMenu === "drop centers" ? "8px" : "0",
                }}
              >
                <div className="pt-1">
                  <FaDropbox />
                </div>
                <Typography>Centers</Typography>
              </Stack>
            )}

            {sideList.map((menu, index) => (
              <Stack
                key={index}
                direction="row"
                spacing={1}
                marginY="1.25rem"
                marginX="1.25rem"
                padding=".5rem"
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
        </div>

        <div className="flex p-5 justify-center">
          <SignOutModal />
        </div>
      </Drawer>
    </div>
  );
};

export default Slider;
