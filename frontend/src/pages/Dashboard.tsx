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
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineBarChart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Side_nav_container from "../containers/Side_nav_container";
import { FaRecycle } from "react-icons/fa";
import { FaBottleWater } from "react-icons/fa6";

const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies();

  const historyList = [
    { centerID: "1A2B3C", time: "5:39AM", status: false },
    { centerID: "1A2B3C", time: "5:39AM", status: true },
    { centerID: "1A2B3C", time: "5:39AM", status: false },
    { centerID: "1A2B3C", time: "5:39AM", status: true },
  ];

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate(`/login-${cookies.role}`);
    }
  });

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
                {historyList.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="cursor-pointer"
                  >
                    <TableCell>{row.centerID}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status ? "accepted" : "rejected"}
                        sx={{
                          backgroundColor: row.status ? "#a5d6a7" : "#ef9a9a",
                          color: row.status ? "#2e7d32" : "#c62828",
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
