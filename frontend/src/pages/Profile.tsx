import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Typography } from "@mui/material";
import Side_nav_container from "../containers/Side_nav_container";
import logo from "../images/logo.png";
import EditProfileModal from "../modals/EditProfileModal";

const Profile = () => {
  const [cookies, setCookies] = useCookies();
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    name: "Drop off Hub",
    phone: "08034010411",
    email: "johndoe@gmail.com",
    address: "11, Odelana street",
    password: "12345",
    collectorID: "1A2S3D",
    centerID: "1B2T3E",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.token) {
      navigate(`/login-${cookies.role}`);
    }
  });

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
              <img src={logo} className="w-36 h-36" />
            </div>

            <div className="flex justify-center">
              <Typography variant="h4">John Doe</Typography>
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
                    value={formData.fullName}
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
                    value={formData.phone}
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
                    value={formData.email}
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
                    value={formData.address}
                  />
                </Stack>
              </div>

              <div>
                <Stack direction="row" spacing={2}>
                  <Typography width="5rem">Password:</Typography>
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
                    value={formData.password}
                    type="password"
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
                        ? formData.collectorID
                        : formData.centerID
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
