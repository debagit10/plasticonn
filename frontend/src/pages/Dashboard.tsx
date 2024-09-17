import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineBarChart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Side_nav_container from "../containers/Side_nav_container";
import { FaRecycle } from "react-icons/fa";
import { FaBottleWater } from "react-icons/fa6";
import axios from "axios";
import Env from "../Env";
import DayAndTime from "../utils/DayAndTime";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const Dashboard = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [history, setHistory] = useState([]);

  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const dataList = [
    {
      collectorTitle: "Amount of Plastics Collected",
      centerTitle: "Amount of Plastics Recieved",
      value: "1234",
      icon: <FaBottleWater />,
    },
    {
      collectorTitle: "Average Collection Size",
      centerTitle: "Average Collection Size per Collector",
      value: "1234",
      icon: <AiOutlineBarChart />,
    },
    {
      collectorTitle: "Amount of Plastics Recycled",
      centerTitle: "Amount of Plastics Recycled",
      value: "1234",
      icon: <FaRecycle />,
    },
  ];

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
      navigate("/");
    }
    getHistory();
  }, []);

  return (
    <Side_nav_container>
      <div className="mx-10">
        <Typography
          variant="h6"
          sx={{
            textDecoration: "underline",
            color: "#0B490D",
            textDecorationColor: "#0B490D",
          }}
        >
          Dashboard
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {dataList.map((item) => (
            <div className="flex justify-center m-2 items-center p-4 text-center rounded-lg shadow-lg border border-[#028C07]">
              <div className="flex justify-center mx-10">
                <Stack>
                  <Stack spacing={2} alignItems="center">
                    <div className="text-[#028C07] text-3xl">{item.icon}</div>
                    <Typography variant="h6" fontWeight={700}>
                      {cookies.role === "collector"
                        ? item.collectorTitle
                        : item.centerTitle}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    fontWeight={700}
                    className="text-[#028C07]"
                  >
                    {item.value}
                  </Typography>
                </Stack>
              </div>
            </div>
          ))}
        </div>

        <div className="my-10">
          <Typography
            variant="h6"
            sx={{
              textDecoration: "underline",
              color: "#0B490D",
              textDecorationColor: "#0B490D",
            }}
          >
            Recent Drop offs
          </Typography>

          <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {cookies.role === "collector"
                      ? "Center ID"
                      : "Collector ID"}
                  </TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {history
                  .slice(0, 5)
                  .filter((item) => {
                    const now = new Date();
                    const itemDate = new Date(item.createdAt);
                    const diffInHours =
                      (now.getTime() - itemDate.getTime()) / (1000 * 60 * 60);
                    return diffInHours <= 24; // Keep only items within the last 24 hours
                  })
                  .sort(
                    (a: any, b: any) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  )
                  .map((row, index) => (
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
      </div>
    </Side_nav_container>
  );
};

export default Dashboard;
