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

import React, { useState } from "react";

interface FormData {
  type: string[];
  condition: string;
  amount: number;
  collectorID: string;
  centerID: string;
}

const DropModal = () => {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    type: [],
    condition: "",
    amount: 0,
    collectorID: "",
    centerID: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = event.target;

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

  const submit = () => {
    console.log(formData);
  };

  return (
    <div>
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
                    name="amount"
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
                  <TextField
                    label="CollectorID"
                    variant="outlined"
                    name="collectorID"
                    value={formData.collectorID}
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
                        value="checkbox1"
                        checked={formData.type.includes("checkbox1")}
                        onChange={handleCheckboxChange}
                        sx={{
                          color: "#3F7641",
                          "&.Mui-checked": {
                            color: "#3F7641",
                          },
                        }}
                      />
                    }
                    label="Checkbox 1"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="type"
                        value="checkbox2"
                        checked={formData.type.includes("checkbox2")}
                        onChange={handleCheckboxChange}
                        sx={{
                          color: "#3F7641",
                          "&.Mui-checked": {
                            color: "#3F7641",
                          },
                        }}
                      />
                    }
                    label="Checkbox 2"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="type"
                        value="checkbox3"
                        checked={formData.type.includes("checkbox3")}
                        onChange={handleCheckboxChange}
                        sx={{
                          color: "#3F7641",
                          "&.Mui-checked": {
                            color: "#3F7641",
                          },
                        }}
                      />
                    }
                    label="Checkbox 3"
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
            onClick={submit}
          >
            Drop
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DropModal;
