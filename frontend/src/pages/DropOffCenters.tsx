import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
  CardActionArea,
} from "@mui/material";

import logo from "../images/logo.png";

import CalculateDistance from "../utils/CalculateDistance";
import { useCookies } from "react-cookie";
import DropModal from "../modals/DropModal";
import Side_nav_container from "../containers/Side_nav_container";
import { useNavigate } from "react-router-dom";

const DropOffCenters = () => {
  const [cookies, setCookies] = useCookies();

  const centerList = [
    { name: "Drop Hub", address: "11, Odelana Street", status: true },
    { name: "Drop Hub", address: "11, Odelana Street", status: false },
    { name: "Drop Hub", address: "11, Odelana Street", status: true },
    { name: "Drop Hub", address: "11, Odelana Street", status: false },
    { name: "Drop Hub", address: "11, Odelana Street", status: true },
    { name: "Drop Hub", address: "11, Odelana Street", status: false },
  ];

  const successCallback = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setCookies("latitude", `${latitude}`);
    setCookies("Longitude", `${longitude}`);
  };

  const errorCallback = (error: any) => {
    console.error(`Error: ${error.message}`);
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

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
          Drop Centers
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {centerList.map((center) => (
            <Card sx={{ maxWidth: 345, backgroundColor: "#D9F0DA" }}>
              <CardHeader
                title={<Typography variant="h5">{center.name}</Typography>}
                subheader={
                  <Typography variant="caption">{center.address}</Typography>
                }
              />
              <div className="mx-5 flex justify-center">
                <img src={logo} className="w-44 h-44" />
              </div>

              <CardContent>
                <div className="flex justify-center">
                  <Stack direction="row" spacing={3}>
                    <div>
                      <CalculateDistance
                        myLatitude={cookies.latitude}
                        myLongitude={cookies.Longitude}
                        centerLatitude={6.535}
                        centerLongitude={3.386}
                      />
                    </div>
                    <Chip
                      label={center.status ? "open" : "close"}
                      sx={{
                        backgroundColor: center.status ? "#a5d6a7" : "#ef9a9a",
                        color: center.status ? "#2e7d32" : "#c62828",
                      }}
                    />
                  </Stack>
                </div>
              </CardContent>

              <div className="flex justify-center m-5">
                <CardActionArea>
                  <DropModal />
                </CardActionArea>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Side_nav_container>
  );
};

export default DropOffCenters;
