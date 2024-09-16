import React, { useState } from "react";
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

const EditProfileModal = () => {
  const [open, setOpen] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    name: "Drop off Hub",
    phone: "08034010411",
    email: "johndoe@gmail.com",
    address: "11, Odelana street",
    pic: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevdata) => ({
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

  return (
    <div>
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
                        value={formData.fullName}
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
                        value={formData.phone}
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
                        value={formData.email}
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
                        value={formData.address}
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
            //onClick={submit}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfileModal;
