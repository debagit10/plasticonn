import { Chip } from "@mui/material";
import React, { useState, useEffect } from "react";

const OperatingHours = ({ operatingHours }) => {
  const [open, setOpen] = useState(false);

  const parseOperatingHours = (hours: string) => {
    // Example inputs: "9AM-5PM" or "9:30AM-5:30PM"
    const [startTime, endTime] = hours.split("-"); // Split into ["9AM", "5PM"] or ["9:30AM", "5:30PM"]

    // Helper function to convert "9AM" or "5:30PM" to 24-hour format
    const convertTo24Hour = (time: string) => {
      const timePeriod = time.slice(-2); // Extract AM/PM
      let [hourPart, minutePart] = time.slice(0, -2).split(":"); // Extract hour and minute

      let hour = parseInt(hourPart, 10); // Convert hour to integer
      let minute = minutePart ? parseInt(minutePart, 10) : 0; // Convert minute to integer, default to 0 if no minute provided

      // Convert based on AM/PM
      if (timePeriod === "PM" && hour !== 12) {
        hour += 12; // Convert PM hour to 24-hour format
      } else if (timePeriod === "AM" && hour === 12) {
        hour = 0; // Handle midnight (12AM is 0 hours)
      }

      return { hour, minute };
    };

    const { hour: openingHour, minute: openingMinute } =
      convertTo24Hour(startTime); // Convert start time
    const { hour: closingHour, minute: closingMinute } =
      convertTo24Hour(endTime); // Convert end time

    // Create Date objects for the opening and closing times
    const openingTime = new Date();
    openingTime.setHours(openingHour, openingMinute, 0); // Set opening time

    const closingTime = new Date();
    closingTime.setHours(closingHour, closingMinute, 0); // Set closing time

    return { openingTime, closingTime };
  };

  useEffect(() => {
    const { openingTime, closingTime } = parseOperatingHours(operatingHours);
    const now = new Date();

    if (now >= openingTime && now <= closingTime) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [operatingHours]);

  return (
    <div>
      <Chip
        label={open ? "open" : "closed"}
        sx={{
          backgroundColor: open ? "#a5d6a7" : "#ef9a9a",
          color: open ? "#2e7d32" : "#c62828",
        }}
      />
    </div>
  );
};

export default OperatingHours;
