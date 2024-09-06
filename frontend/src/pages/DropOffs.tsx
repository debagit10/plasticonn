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
import React from "react";
import DropoffModal from "../modals/DropoffModal";

const DropOffs = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>CollectorID</TableCell>
              <TableCell>Time</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
              className="cursor-pointer"
            >
              <TableCell>
                <Typography variant="caption">1234</Typography>
              </TableCell>
              <TableCell>
                {/* <DayAndTime date={item.createdAt} /> */} Time
              </TableCell>
              <TableCell>
                <DropoffModal />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DropOffs;
