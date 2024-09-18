import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
  CardActionArea,
  Skeleton,
} from "@mui/material";

import logo from "../images/logo.png";

import CalculateDistance from "../utils/CalculateDistance";
import { useCookies } from "react-cookie";
import DropModal from "../modals/DropModal";
import Side_nav_container from "../containers/Side_nav_container";
import { useNavigate } from "react-router-dom";
import Env from "../Env";
import axios from "axios";
import OperatingHours from "../utils/OperatingHours";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const DropOffCenters = () => {
  const [cookies, setCookies] = useCookies();
  const [dropOffCenter, setDropOffCenter] = useState([]);
  const [loading, setLoading] = useState(false);

  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const navigate = useNavigate();

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

  const getCenters = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      };

      const response = await axios.get(
        `${apiUrl}/api/dropOffCenter/get`,
        config
      );

      if (response) {
        setLoading(false);
        setDropOffCenter(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate(`/`);
    }
    getCenters();
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
          Drop Centers
        </Typography>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton variant="rectangular" height={350} width="21.5rem" />
            <Skeleton variant="rectangular" height={350} width="21.5rem" />
            <Skeleton variant="rectangular" height={350} width="21.5rem" />
            <Skeleton variant="rectangular" height={350} width="21.5rem" />
            <Skeleton variant="rectangular" height={350} width="21.5rem" />
            <Skeleton variant="rectangular" height={350} width="21.5rem" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dropOffCenter.map((center) => (
            <Card sx={{ maxWidth: 345, backgroundColor: "#D9F0DA" }}>
              <CardHeader
                title={<Typography variant="h5">{center.name}</Typography>}
                subheader={
                  <Typography variant="caption">{center.address}</Typography>
                }
              />
              <div className="mx-5 flex justify-center">
                <img src={center.pic} className="w-44 h-44" />
              </div>

              <CardContent>
                <div className="flex justify-center">
                  <Stack direction="row" spacing={3}>
                    <CalculateDistance
                      myLatitude={cookies.latitude}
                      myLongitude={cookies.Longitude}
                      centerLatitude={center.coordinates[1]}
                      centerLongitude={center.coordinates[0]}
                    />
                    <OperatingHours operatingHours={center.operatingHours} />
                  </Stack>
                </div>
              </CardContent>

              <div className="flex justify-center m-5">
                <CardActionArea>
                  <DropModal
                    hours={center.operatingHours}
                    centerID={center.centerID}
                  />
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
