import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Button, Chip, Paper, Stack, Typography } from "@mui/material";
import Env from "../Env";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Side_nav_container from "../containers/Side_nav_container";
import RejectDropModal from "../modals/RejectDropModal";
import AcceptDropModal from "../modals/AcceptDropModal";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

interface Detail {
  accepted: string;
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

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate(`/`);
    }
    dropDetail();
  }, []);

  return (
    <Side_nav_container>
      <div className="mx-10 my-5">
        <ToastContainer />
        <Paper
          sx={{ padding: "10px", maxWidth: 345, backgroundColor: "#D9F0DA" }}
        >
          <div className="m-5">
            <Typography variant="h4">Drop-off details</Typography>
            <Chip
              label={
                detail?.accepted === "pending.."
                  ? "Pending"
                  : detail?.accepted === "true"
                  ? "Accepted"
                  : "Rejected"
              }
              sx={{
                backgroundColor:
                  detail?.accepted === "pending.."
                    ? "#bdbdbd" // Grey for pending
                    : detail?.accepted === "true"
                    ? "#a5d6a7" // Green for accepted
                    : "#ef9a9a", // Red for rejected
                color:
                  detail?.accepted === "pending.."
                    ? "#616161" // Darker grey for text when pending
                    : detail?.accepted === "true"
                    ? "#2e7d32" // Dark green for accepted
                    : "#c62828", // Dark red for rejected
              }}
            />
          </div>
          <div className="flex flex-col m-5">
            <Typography variant="h6">
              Collector's ID: {detail?.collectorID}
            </Typography>
            <Typography variant="h6">
              Center's ID: {detail?.centerID}
            </Typography>
          </div>

          <div className="flex flex-col m-5">
            <Typography variant="subtitle1">
              Plastic type(s):{" "}
              {detail?.type.map((item) => (
                <ul>
                  <li>
                    <Typography variant="caption">- {item}</Typography>
                  </li>
                </ul>
              ))}
            </Typography>
            <Typography variant="subtitle1">
              Amount of plastic: {detail?.amount}
            </Typography>
            <Typography variant="subtitle1">
              Condition of plastic: {detail?.condition}
            </Typography>
          </div>

          {cookies.role === "dropOffCenter" && (
            <div className="m-5 flex justify-center">
              <Stack direction="row" spacing={3}>
                <RejectDropModal dropID={detail?._id} />
                <AcceptDropModal dropID={detail?._id} />
              </Stack>
            </div>
          )}
        </Paper>
      </div>
    </Side_nav_container>
  );
};

export default ViewDrop;
