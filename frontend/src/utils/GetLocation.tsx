import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const GetLocation = () => {
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
  return <div></div>;
};

export default GetLocation;
