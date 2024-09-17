import React, { useState } from "react";
import { useCookies } from "react-cookie";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Env from "../Env";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const RejectDropModal = ({ dropID }) => {
  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const rejectDrop = async () => {
    const status = "false";

    const data = { status, dropID };

    try {
      const response = await axios.patch(
        `${apiUrl}/api/drop/manage`,
        data,
        config
      );

      if (response.data.accepted === "false") {
        toast.success("Drop rejected successfully", {
          position: "top-center",
          autoClose: 1500,
          onClose: () => {
            handleClose();
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button
        fullWidth
        variant="outlined"
        sx={{
          borderColor: "red",
          color: "white",
          backgroundColor: "red",
          borderRadius: "31px",
          textTransform: "capitalize",

          "&:hover": {
            color: "red",
            borderColor: "red",
          },
        }}
        startIcon={<MdOutlineCancel />}
        onClick={handleClick}
      >
        Reject
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reject drop?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reject this drop?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
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
            onClick={handleClose}
          >
            Cancel
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
            disabled={loading}
            onClick={rejectDrop}
          >
            {loading ? "Rejecting..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RejectDropModal;
