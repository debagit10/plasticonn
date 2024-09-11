import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Env from "../Env";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

interface Detail {
  accepted: boolean;
  centerID: string;
  collectorID: string;
  condition: string;
  createdAt: string;
  location: number[];
  status: false;
  type: string[];
  _id: string;
  amount: number;
}

const ViewDrop = () => {
  const { id } = useParams();
  const [cookies, setCookies] = useCookies();
  const [detail, setDetail] = useState<Detail>();

  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${cookies.token}`,
    },
  };

  const dropDetail = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/drop/view?dropID=${id}`, {
        headers: config.headers,
      });
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptDrop = async () => {
    const status = true;
    const dropID = detail?._id;

    const data = { status, dropID };

    try {
      const response = await axios.patch(
        `${apiUrl}/api/drop/manage`,
        data,
        config
      );

      if (response.data.accepted === true) {
        toast.success("Drop accepted successfully", {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectDrop = async () => {
    const status = false;
    const dropID = detail?._id;

    const data = { status, dropID };

    try {
      const response = await axios.patch(
        `${apiUrl}/api/drop/manage`,
        data,
        config
      );

      if (response.data.accepted === false) {
        toast.success("Drop rejected successfully", {
          position: "top-center",
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate(`/login-${cookies.role}`);
    }
    dropDetail();
  }, []);

  return (
    <div className="flex justify-center items-center m-10">
      <ToastContainer />
      <Paper
        sx={{ padding: "10px", maxWidth: 345, backgroundColor: "#D9F0DA" }}
      >
        <div className="m-5">
          <Typography variant="h4">Drop-off details</Typography>
        </div>
        <div className="flex flex-col m-5">
          <Typography variant="h6">
            Collector's ID: {detail?.collectorID}
          </Typography>
          <Typography variant="h6">Center's ID: {detail?.centerID}</Typography>
        </div>

        <div className="flex flex-col m-5">
          <Typography variant="subtitle1">
            Plastic type(s): {detail?.type}
          </Typography>
          <Typography variant="subtitle1">
            Amount of plastic: {detail?.amount}
          </Typography>
          <Typography variant="subtitle1">
            Condition of plastic: {detail?.condition}
          </Typography>
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
              onClick={rejectDrop}
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
              onClick={acceptDrop}
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
