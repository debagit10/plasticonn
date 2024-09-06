import * as turf from "@turf/turf";
import React from "react";

interface DataProps {
  myLatitude: number;
  myLongitude: number;
  centerLatitude: number;
  centerLongitude: number;
}

const CalculateDistance: React.FC<DataProps> = ({
  myLatitude,
  myLongitude,
  centerLatitude,
  centerLongitude,
}) => {
  const from = turf.point([myLongitude, myLatitude]); // [longitude, latitude]
  const to = turf.point([centerLongitude, centerLatitude]); // [longitude, latitude]

  // Calculate the distance between the two points
  const options = { units: "miles" };
  const distance = turf.distance(from, to);
  const roundedDistance = Math.round(distance);

  return <div>{roundedDistance} km</div>;
};

export default CalculateDistance;
