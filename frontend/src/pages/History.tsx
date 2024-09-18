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
  Skeleton,
  Stack,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { radiansToLength } from "@turf/turf";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Side_nav_container from "../containers/Side_nav_container";
import axios from "axios";
import Env from "../Env";
import DayAndTime from "../utils/DayAndTime";
import { FaCircleInfo } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const History = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  };

  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const getHistory = async () => {
    try {
      setLoading(true);
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

      if (response) {
        setHistory(response.data);
        setLoading(false);
      }
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
        <TextField
          onChange={handleInputChange}
          placeholder="Search for drop center"
          sx={{
            marginX: {
              xs: "0", // No margin on small screens
              md: "20%", // Apply 20% margin from medium screens and above
            },
            padding: ".5rem",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "black",
                borderWidth: "2px",
                borderRadius: "31px",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0B490D",
              },
              padding: 0,
            },
            "& input": {
              padding: "1rem",
              paddingLeft: "2rem",
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment
                className={searchText ? "cursor-pointer" : "cursor-not-allowed"}
                position="end"
                sx={{
                  padding: "0.5rem",
                }}
              >
                <IconButton disabled={!searchText}>
                  <Divider sx={{ height: 28, m: 2 }} orientation="vertical" />
                  <IoSearch
                    style={{
                      color: searchText ? "#0B490D" : "grey",
                      fontSize: "1.5rem",
                    }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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

        {loading && (
          <div>
            <Stack spacing={0.5}>
              <Skeleton variant="rectangular" height={60} />
              <Skeleton variant="rectangular" height={60} />
              <Skeleton variant="rectangular" height={60} />
              <Skeleton variant="rectangular" height={60} />
              <Skeleton variant="rectangular" height={60} />
            </Stack>
          </div>
        )}

        {history.length > 0 ? (
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
                  .filter((item) => {
                    return searchText.toLowerCase() === ""
                      ? item
                      : item.centerID.toLowerCase().includes(searchText);
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
        ) : (
          loading === false &&
          history.length > 0 && (
            <div className="flex justify-center text-center m-10">
              <Paper sx={{ padding: "2rem" }} elevation={4}>
                <Stack spacing={2}>
                  <div className="flex justify-center">
                    {<FaCircleInfo className="w-10 h-10 text-[#028C07]" />}
                  </div>
                  <Typography fontWeight={700} variant="subtitle2">
                    You have no drop-off history yet...history of your drop-offs
                    will appear here. <br />{" "}
                    {cookies.role === "collector"
                      ? "Navigate to 'centers' page to get started."
                      : "Await drop offs from collectors/volunteers."}
                  </Typography>
                </Stack>
              </Paper>
            </div>
          )
        )}
      </div>
    </Side_nav_container>
  );
};

export default History;
