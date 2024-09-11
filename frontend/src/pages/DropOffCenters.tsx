import React, { useEffect } from "react";
improt {useNavigate}
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  Chip,
  CardActionArea,
} from "@mui/material";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CalculateDistance from "../utils/CalculateDistance";
import { useCookies } from "react-cookie";
import DropModal from "../modals/DropModal";
import Side_nav_container from "../containers/Side_nav_container";
import { useNavigate } from "react-router-dom";

const DropOffCenters = () => {
  
  const [cookies, setCookies] = useCookies();

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
      <div className="m-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="">
            <Card sx={{ maxWidth: 345, backgroundColor: "#D9F0DA" }}>
              <CardHeader
                title={<Typography variant="h5">Drop off center</Typography>}
                subheader={
                  <Typography variant="caption">11, Odelana Street</Typography>
                }
              />
              <div className="mx-5">
                <MapContainer
                  center={[6.535, 3.386]}
                  zoom={13}
                  style={{ height: "150px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[6.535, 3.386]}>
                    <Popup>11, Odelana Street.</Popup>
                  </Marker>
                </MapContainer>
              </div>

              <CardContent>
                <div className="flex justify-center">
                  <Stack direction="row" spacing={4}>
                    <div>
                      <CalculateDistance
                        myLatitude={cookies.latitude}
                        myLongitude={cookies.Longitude}
                        centerLatitude={6.535}
                        centerLongitude={3.386}
                      />
                    </div>
                    <Chip label="Open" />
                  </Stack>
                </div>
              </CardContent>

              <div className="flex justify-center m-5">
                <CardActionArea>
                  <DropModal />
                </CardActionArea>
              </div>
            </Card>
          </div>
          <div className="">
            <Card sx={{ maxWidth: 345, backgroundColor: "#D9F0DA" }}>
              <CardHeader
                title={<Typography variant="h5">Drop off center</Typography>}
                subheader={
                  <Typography variant="caption">11, Odelana Street</Typography>
                }
              />
              <div className="mx-5">
                <MapContainer
                  center={[6.535, 3.386]}
                  zoom={13}
                  style={{ height: "150px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[6.535, 3.386]}>
                    <Popup>11, Odelana Street.</Popup>
                  </Marker>
                </MapContainer>
              </div>

              <CardContent>
                <div className="flex justify-center">
                  <Stack direction="row" spacing={4}>
                    <div>
                      <CalculateDistance
                        myLatitude={cookies.latitude}
                        myLongitude={cookies.Longitude}
                        centerLatitude={6.535}
                        centerLongitude={3.386}
                      />
                    </div>
                    <Chip label="Open" />
                  </Stack>
                </div>
              </CardContent>

              <div className="flex justify-center m-5">
                <CardActionArea>
                  <DropModal />
                </CardActionArea>
              </div>
            </Card>
          </div>
          <div className="">
            <Card sx={{ maxWidth: 345, backgroundColor: "#D9F0DA" }}>
              <CardHeader
                title={<Typography variant="h5">Drop off center</Typography>}
                subheader={
                  <Typography variant="caption">11, Odelana Street</Typography>
                }
              />
              <div className="mx-5">
                <MapContainer
                  center={[6.535, 3.386]}
                  zoom={13}
                  style={{ height: "150px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[6.535, 3.386]}>
                    <Popup>11, Odelana Street.</Popup>
                  </Marker>
                </MapContainer>
              </div>

              <CardContent>
                <div className="flex justify-center">
                  <Stack direction="row" spacing={4}>
                    <div>
                      <CalculateDistance
                        myLatitude={cookies.latitude}
                        myLongitude={cookies.Longitude}
                        centerLatitude={6.535}
                        centerLongitude={3.386}
                      />
                    </div>
                    <Chip label="Open" />
                  </Stack>
                </div>
              </CardContent>

              <div className="flex justify-center m-5">
                <CardActionArea>
                  <DropModal />
                </CardActionArea>
              </div>
            </Card>
          </div>
          <div className="">
            <Card sx={{ maxWidth: 345, backgroundColor: "#D9F0DA" }}>
              <CardHeader
                title={<Typography variant="h5">Drop off center</Typography>}
                subheader={
                  <Typography variant="caption">11, Odelana Street</Typography>
                }
              />
              <div className="mx-5">
                <MapContainer
                  center={[6.535, 3.386]}
                  zoom={13}
                  style={{ height: "150px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[6.535, 3.386]}>
                    <Popup>11, Odelana Street.</Popup>
                  </Marker>
                </MapContainer>
              </div>

              <CardContent>
                <div className="flex justify-center">
                  <Stack direction="row" spacing={4}>
                    <div>
                      <CalculateDistance
                        myLatitude={cookies.latitude}
                        myLongitude={cookies.Longitude}
                        centerLatitude={6.535}
                        centerLongitude={3.386}
                      />
                    </div>
                    <Chip label="Open" />
                  </Stack>
                </div>
              </CardContent>

              <div className="flex justify-center m-5">
                <CardActionArea>
                  <DropModal />
                </CardActionArea>
              </div>
            </Card>
          </div>
          <div className="">
            <Card sx={{ maxWidth: 345, backgroundColor: "#D9F0DA" }}>
              <CardHeader
                title={<Typography variant="h5">Drop off center</Typography>}
                subheader={
                  <Typography variant="caption">11, Odelana Street</Typography>
                }
              />
              <div className="mx-5">
                <MapContainer
                  center={[6.535, 3.386]}
                  zoom={13}
                  style={{ height: "150px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[6.535, 3.386]}>
                    <Popup>11, Odelana Street.</Popup>
                  </Marker>
                </MapContainer>
              </div>

              <CardContent>
                <div className="flex justify-center">
                  <Stack direction="row" spacing={4}>
                    <div>
                      <CalculateDistance
                        myLatitude={cookies.latitude}
                        myLongitude={cookies.Longitude}
                        centerLatitude={6.535}
                        centerLongitude={3.386}
                      />
                    </div>
                    <Chip label="Open" />
                  </Stack>
                </div>
              </CardContent>

              <div className="flex justify-center m-5">
                <CardActionArea>
                  <DropModal />
                </CardActionArea>
              </div>
            </Card>
          </div>
          <div className="">
            <Card sx={{ maxWidth: 345, backgroundColor: "#D9F0DA" }}>
              <CardHeader
                title={<Typography variant="h5">Drop off center</Typography>}
                subheader={
                  <Typography variant="caption">11, Odelana Street</Typography>
                }
              />
              <div className="mx-5">
                <MapContainer
                  center={[6.535, 3.386]}
                  zoom={13}
                  style={{ height: "150px", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[6.535, 3.386]}>
                    <Popup>11, Odelana Street.</Popup>
                  </Marker>
                </MapContainer>
              </div>

              <CardContent>
                <div className="flex justify-center">
                  <Stack direction="row" spacing={4}>
                    <div>
                      <CalculateDistance
                        myLatitude={cookies.latitude}
                        myLongitude={cookies.Longitude}
                        centerLatitude={6.535}
                        centerLongitude={3.386}
                      />
                    </div>
                    <Chip label="Open" />
                  </Stack>
                </div>
              </CardContent>

              <div className="flex justify-center m-5">
                <CardActionArea>
                  <DropModal />
                </CardActionArea>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Side_nav_container>
  );
};

export default DropOffCenters;
