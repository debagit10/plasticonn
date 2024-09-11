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
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Side_nav_container from "../containers/Side_nav_container";

const History = () => {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();

  const historyList = [
    { centerID: "1A2B3C", time: "5:39AM", status: false },
    { centerID: "1A2B3C", time: "5:39AM", status: true },
    { centerID: "1A2B3C", time: "5:39AM", status: false },
    { centerID: "1A2B3C", time: "5:39AM", status: true },
    { centerID: "1A2B3C", time: "5:39AM", status: false },
    { centerID: "1A2B3C", time: "5:39AM", status: true },
    { centerID: "1A2B3C", time: "5:39AM", status: false },
    { centerID: "1A2B3C", time: "5:39AM", status: true },
    { centerID: "1A2B3C", time: "5:39AM", status: false },
    { centerID: "1A2B3C", time: "5:39AM", status: true },
  ];

  useEffect(() => {
    if (!cookies.token) {
      navigate(`/login-${cookies.role}`);
    }
  });
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
    </Side_nav_container>
  );
};

export default History;
