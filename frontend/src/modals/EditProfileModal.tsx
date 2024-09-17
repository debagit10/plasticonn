import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Env from "../Env";
import axios from "axios";
const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const EditProfileModal = () => {
  const [open, setOpen] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    fullName: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    pic: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const isFormDataComplete = () => {
    return Object.values(userData).every((value) => value.trim() !== "");
  };

  const editProfile = async () => {
    try {
      setLoading(true);

      const response = await axios.patch(
        `${apiUrl}/api/${cookies.role}/update`,
        userData,
        config
      );

      if (response.data.success) {
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1500,
          onClose: () => {
            handleClose();
          },
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/api/${cookies.role}/userData`,
        config
      );

      setUserData((prevState) => ({
        ...prevState,
        fullName: response.data.fullName || "",
        name: response.data.name || "",
        phone: response.data.phone || "",
        email: response.data.email || "",
        address: response.data.address || "",
        collectorID: response.data.collectorID || "",
        centerID: response.data.centerID || "",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <ToastContainer />
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
        onClick={handleClickOpen}
        startIcon={<CiEdit />}
      >
        Edit profile
      </Button>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="drop-form"
      >
        <DialogTitle>{"Edit profile"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="drop-form">
            <div className="flex flex-col">
              <FormControl fullWidth margin="normal">
                <Stack spacing={2}>
                  <div>
                    <Stack direction="row" spacing={2}>
                      <Typography width="5rem">Full name:</Typography>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            color: "green", // Change label color when focused
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "green", // Change border color
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "green", // Change border color when focused
                            },
                          },
                        }}
                        value={
                          cookies.role === "collector"
                            ? userData.fullName
                            : userData.name
                        }
                        name={
                          cookies.role === "collector" ? "fullName" : "name"
                        }
                        onChange={handleChange}
                      />
                    </Stack>
                  </div>
                  <div>
                    <Stack direction="row" spacing={2}>
                      <Typography width="5rem">Phone:</Typography>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            color: "green", // Change label color when focused
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "green", // Change border color
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "green", // Change border color when focused
                            },
                          },
                        }}
                        value={userData.phone}
                        name="phone"
                        onChange={handleChange}
                      />
                    </Stack>
                  </div>
                  <div>
                    <Stack direction="row" spacing={2}>
                      <Typography width="5rem">Email:</Typography>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            color: "green", // Change label color when focused
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "green", // Change border color
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "green", // Change border color when focused
                            },
                          },
                        }}
                        value={userData.email}
                        name="email"
                        onChange={handleChange}
                      />
                    </Stack>
                  </div>
                  <div>
                    <Stack direction="row" spacing={2}>
                      <Typography width="5rem">Address:</Typography>
                      <TextField
                        sx={{
                          "& label.Mui-focused": {
                            color: "green", // Change label color when focused
                          },
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "green", // Change border color
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "green", // Change border color when focused
                            },
                          },
                        }}
                        value={userData.address}
                        name="address"
                        onChange={handleChange}
                      />
                    </Stack>
                  </div>
                </Stack>
              </FormControl>
            </div>
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
            onClick={editProfile}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfileModal;
