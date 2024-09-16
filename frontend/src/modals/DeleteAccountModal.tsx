import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { VscSignOut } from "react-icons/vsc";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Env from "../Env";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const DeleteAccountModal = () => {
  const [cookies, setCookies, removeCookie] = useCookies();
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

  const deleteAccount = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.delete(
        `${apiUrl}/api/${cookies.role}/delete`,
        config
      );
      console.log(response.data);
      if (response.data.success) {
        setLoading(false);
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => removeCookie("token"),
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response.data.info) {
        toast.info(error.response.data.info, {
          position: "top-center",
          autoClose: 1000,
        });
      } else if (error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 1000,
        });
      }
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
        startIcon={<RiDeleteBin2Line />}
        onClick={handleClick}
      >
        Delete account
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog">{"Confirm delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              borderColor: "#0B490D",
              backgroundColor: "#0B490D",
              borderRadius: "31px",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#0B490D",
                borderColor: "#0B490D",
                color: "white",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
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
            disabled={loading}
            onClick={deleteAccount}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAccountModal;
