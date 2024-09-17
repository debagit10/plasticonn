import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Typography } from "@mui/material";
import Side_nav_container from "../containers/Side_nav_container";
import EditProfileModal from "../modals/EditProfileModal";
import DeleteAccountModal from "../modals/DeleteAccountModal";
import Env from "../Env";
import axios from "axios";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const Profile = () => {
  const [cookies, setCookies] = useCookies();
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

  const navigate = useNavigate();

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
      console.log(response.data);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate(`/`);
    }
    getUserData();
  }, []);

  return (
    <Side_nav_container>
      <div className="mx-10 my-5">
        <Typography
          variant="h6"
          sx={{
            textDecoration: "underline",
            color: "#0B490D",
            textDecorationColor: "#0B490D",
          }}
        >
          Profile
        </Typography>

        <div className="flex flex-col md:flex-row justify-center md:gap-[8rem] gap-[3rem] mt-10">
          <div>
            <div className="flex justify-center">
              <img src={userData.pic} className="w-36 h-36" />
            </div>

            <div className="flex justify-center">
              <Typography variant="h4">
                {cookies.role === "collector"
                  ? userData.fullName
                  : userData.name}
              </Typography>
            </div>
            <div className="flex justify-center">
              <Typography variant="caption">
                {cookies.role === "collector"
                  ? "Collector/Volunteer"
                  : "Collection Center"}
              </Typography>
            </div>
            <div className="flex justify-center md:mt-5 mt-2">
              <EditProfileModal />
            </div>
            <div className="flex justify-center md:mt-5 mt-2">
              <DeleteAccountModal />
            </div>
          </div>

          <div className="flex justify-center">
            <Stack spacing={2}>
              <div>
                <Stack direction="row" spacing={2}>
                  <Typography width="5rem">
                    {" "}
                    {cookies.role === "collector" ? "Full Name:" : "Name:"}
                  </Typography>
                  <TextField
                    sx={{
                      "& label.Mui-focused": {
                        color: "green",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "green",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "green",
                        },
                      },
                    }}
                    value={
                      cookies.role === "collector"
                        ? userData.fullName
                        : userData.name
                    }
                  />
                </Stack>
              </div>

              <div>
                <Stack direction="row" spacing={2}>
                  <Typography width="5rem">Phone:</Typography>
                  <TextField
                    sx={{
                      "& label.Mui-focused": {
                        color: "green",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "green",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "green",
                        },
                      },
                    }}
                    value={userData.phone}
                  />
                </Stack>
              </div>

              <div>
                <Stack direction="row" spacing={2}>
                  <Typography width="5rem">Email:</Typography>
                  <TextField
                    sx={{
                      "& label.Mui-focused": {
                        color: "green", // Change label color when focused
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "green", // Change border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "green", // Change border color when focused
                        },
                      },
                    }}
                    value={userData.email}
                  />
                </Stack>
              </div>

              <div>
                <Stack direction="row" spacing={2}>
                  <Typography width="5rem">Address:</Typography>
                  <TextField
                    sx={{
                      "& label.Mui-focused": {
                        color: "green", // Change label color when focused
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "green", // Change border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "green", // Change border color when focused
                        },
                      },
                    }}
                    value={userData.address}
                  />
                </Stack>
              </div>

              <div>
                <Stack direction="row" spacing={2}>
                  <Typography width="5rem">
                    {cookies.role === "collector"
                      ? "Collector's ID:"
                      : "Center's ID"}
                  </Typography>
                  <TextField
                    sx={{
                      "& label.Mui-focused": {
                        color: "green", // Change label color when focused
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "green", // Change border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "green", // Change border color when focused
                        },
                      },
                    }}
                    value={
                      cookies.role === "collector"
                        ? userData.collectorID
                        : userData.centerID
                    }
                  />
                </Stack>
              </div>
            </Stack>
          </div>
        </div>
      </div>
    </Side_nav_container>
  );
};

export default Profile;
