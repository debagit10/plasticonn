import React from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";

const ViewDrop = () => {
  return (
    <div className="flex justify-center items-center m-10">
      <Paper
        sx={{ padding: "10px", maxWidth: 345, backgroundColor: "#D9F0DA" }}
      >
        <div className="m-5">
          <Typography variant="h4">Drop-off details</Typography>
        </div>
        <div className="flex flex-col m-5">
          <Typography variant="h6">Collector's ID:</Typography>
          <Typography variant="h6">Center's ID:</Typography>
        </div>

        <div className="flex flex-col m-5">
          <Typography variant="subtitle1">Plastic type(s):</Typography>
          <Typography variant="subtitle1">Amount of plastic:</Typography>
          <Typography variant="subtitle1">Condition of plastic:</Typography>
        </div>

        <div className="m-5 flex justify-center">
          <Stack direction="row" spacing={3}>
            <Button
              variant="outlined"
              sx={{
                borderColor: "red",
                color: "red",
                borderRadius: "31px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "red",
                  color: "white",
                  borderColor: "white",
                },
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0B490D",
                borderRadius: "31px",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#0B490D",
                },
              }}
            >
              Accept
            </Button>
          </Stack>
        </div>
      </Paper>
    </div>
  );
};

export default ViewDrop;
