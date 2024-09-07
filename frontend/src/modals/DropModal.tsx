import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
  Stack,
} from "@mui/material";
import axios from "axios";
import Env from "../Env";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

interface FormData {
  type: string[];
  condition: string;
  amount: number;
  collectorID: string;
  centerID: string;
  location: number[];
}

const DropModal = () => {
  const [cookies, setCookies] = useCookies();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    type: [],
    condition: "",
    amount: 0,
    collectorID: "",
    centerID: "",
    location: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    setFormData((prevState) => {
      const updatedTypes = checked
        ? [...prevState.type, value] // Add value to array if checked
        : prevState.type.filter((type) => type !== value); // Remove value if unchecked

      return {
        ...prevState,
        type: updatedTypes, // Update the type array
      };
    });
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      condition: value, // Update condition with the selected radio value
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

  const submit = async () => {
    formData.location.push(cookies.Longitude);
    formData.location.push(cookies.latitude);

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/drop/add`,
        formData,
        config
      );
      console.log(response.data.success);
      if (response.data.success) {
        toast.success(response.data.success, {
          autoClose: 1500,
          position: "top-center",
          onClose: () => {
            handleClose();
          },
        });
        setLoading(false);
        setFormData({
          type: [],
          condition: "",
          amount: 0,
          collectorID: "",
          centerID: "",
          location: [],
        });
      }
    } catch (error: any) {
      if (error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 1000,
        });
        setFormData({
          type: [],
          condition: "",
          amount: 0,
          collectorID: "",
          centerID: "",
          location: [],
        });
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button
        fullWidth
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
      >
        Drop off
      </Button>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="drop-form"
      >
        <DialogTitle>{"Drop off to Drop off center"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="drop-form">
            <div className="flex flex-col">
              <FormControl fullWidth margin="normal">
                <Stack spacing={2}>
                  <TextField
                    type="number"
                    label="Amount"
                    variant="outlined"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
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
                  />
                  <TextField
                    label="CenterID"
                    variant="outlined"
                    name="centerID"
                    value={formData.centerID}
                    onChange={handleChange}
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
                  />
                </Stack>
              </FormControl>

              <FormControl component="fieldset" margin="normal">
                <Typography>
                  Types of plastics <span>*</span>
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="type"
                        value="PPT"
                        checked={formData.type.includes("PPT")}
                        onChange={handleCheckboxChange}
                        sx={{
                          color: "#3F7641",
                          "&.Mui-checked": {
                            color: "#3F7641",
                          },
                        }}
                      />
                    }
                    label="PPT"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="type"
                        value="PET"
                        checked={formData.type.includes("PET")}
                        onChange={handleCheckboxChange}
                        sx={{
                          color: "#3F7641",
                          "&.Mui-checked": {
                            color: "#3F7641",
                          },
                        }}
                      />
                    }
                    label="PET"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="type"
                        value="PVC"
                        checked={formData.type.includes("PVC")}
                        onChange={handleCheckboxChange}
                        sx={{
                          color: "#3F7641",
                          "&.Mui-checked": {
                            color: "#3F7641",
                          },
                        }}
                      />
                    }
                    label="PVC"
                  />
                </FormGroup>
              </FormControl>

              <FormControl component="fieldset" margin="normal">
                <Typography>
                  Condition of plastics <span>*</span>
                </Typography>
                <RadioGroup
                  name="condition"
                  value={formData.condition}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="clean"
                    control={
                      <Radio
                        sx={{
                          color: "#3F7641",
                          "&.Mui-checked": {
                            color: "#3F7641",
                          },
                        }}
                      />
                    }
                    label="Clean"
                  />
                  <FormControlLabel
                    value="dirty"
                    control={
                      <Radio
                        sx={{
                          color: "#3F7641",
                          "&.Mui-checked": {
                            color: "#3F7641",
                          },
                        }}
                      />
                    }
                    label="Dirty"
                  />
                </RadioGroup>
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
            onClick={submit}
          >
            {loading ? "Dropping off..." : "Drop off"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DropModal;
