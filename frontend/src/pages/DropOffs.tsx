import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Table,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DropoffModal from "../modals/DropoffModal";
import Env from "../Env";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DayAndTime from "../utils/DayAndTime";
import Side_nav_container from "../containers/Side_nav_container";

const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

interface DropOffs {
  collectorID: string;
  createdAt: string;
  accepted: boolean;
  _id: string;
}

const DropOffs = () => {
  const navigate = useNavigate();
  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const [cookies, setCookies] = useCookies();
  const [dropoffs, setDropOffs] = useState([]);

  const getCenterDropOffs = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    };

    try {
      const response = await axios.get(`${apiUrl}/api/dropOffCenter/history`, {
        headers: config.headers,
      });
      console.log(response.data);
      setDropOffs(response.data.success);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cookies.token) {
      navigate(`/`);
    }
    getCenterDropOffs();
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
          Drops
        </Typography>

        <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>CollectorID</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>

            <TableBody>
              {dropoffs
                .filter((item: DropOffs) => {
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
                .map((item: DropOffs) => (
                  <TableRow
                    key={item._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                    className="cursor-pointer"
                  >
                    <TableCell
                      onClick={() => navigate(`/dropoff/${item._id}/view`)}
                    >
                      <Typography variant="caption">
                        {item?.collectorID}
                      </Typography>
                    </TableCell>

                    <TableCell
                      onClick={() => navigate(`/dropoff/${item._id}/view`)}
                    >
                      <DayAndTime date={item.createdAt} />
                    </TableCell>

                    <TableCell
                      onClick={() => navigate(`/dropoff/${item._id}/view`)}
                    >
                      <Typography variant="caption">
                        {item?.accepted === false ? "Not accepted" : "Accepted"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <DropoffModal />
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

export default DropOffs;
