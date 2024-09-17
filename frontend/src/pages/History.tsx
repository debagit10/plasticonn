import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Typography,
} from "@mui/material";
import { radiansToLength } from "@turf/turf";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Side_nav_container from "../containers/Side_nav_container";
import axios from "axios";
import Env from "../Env";
import DayAndTime from "../utils/DayAndTime";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const History = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const [history, setHistory] = useState([]);

  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const getHistory = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      };

      const response = await axios.get(
        `${apiUrl}/api/${cookies.role}/history`,
        config
      );
      console.log(response.data);
      setHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate(`/`);
    }
    getHistory();
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
          History
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {cookies.role === "collector" ? "Center ID" : "Collector ID"}
                </TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  className="cursor-pointer"
                >
                  <TableCell
                    onClick={() => navigate(`/dropoff/${row._id}/view`)}
                  >
                    {cookies.role === "collector"
                      ? row.centerID
                      : row.collectorID}
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/dropoff/${row._id}/view`)}
                  >
                    <DayAndTime date={row.createdAt} />
                  </TableCell>
                  <TableCell
                    onClick={() => navigate(`/dropoff/${row._id}/view`)}
                  >
                    <Chip
                      label={
                        row.accepted === "pending.."
                          ? "Pending"
                          : row.accepted === "true"
                          ? "Accepted"
                          : "Rejected"
                      }
                      sx={{
                        backgroundColor:
                          row.accepted === "pending.."
                            ? "#bdbdbd" // Grey for pending
                            : row.accepted === "true"
                            ? "#a5d6a7" // Green for accepted
                            : "#ef9a9a", // Red for rejected
                        color:
                          row.accepted === "pending.."
                            ? "#616161" // Darker grey for text when pending
                            : row.accepted === "true"
                            ? "#2e7d32" // Dark green for accepted
                            : "#c62828", // Dark red for rejected
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Side_nav_container>
  );
};

export default History;
