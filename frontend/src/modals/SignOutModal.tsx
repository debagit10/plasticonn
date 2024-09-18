import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { VscSignOut } from "react-icons/vsc";

const SignOutModal = () => {
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

  const handleSignOut = () => {
    setLoading(true);
    setTimeout(() => {
      removeCookie("token");
      removeCookie("role");
      window.location.reload();
    }, 3000);
  };
  return (
    <div>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          borderColor: "#047308",
          color: "white",
          backgroundColor: "#047308",
          borderRadius: "31px",
          textTransform: "capitalize",

          "&:hover": {
            color: "white",
            borderColor: "#047308",
          },
        }}
        startIcon={<VscSignOut />}
        onClick={handleClick}
      >
        Sign out
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm sign out"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to sign out?
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
            onClick={handleSignOut}
          >
            {loading ? "Signing out..." : "Sign out"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SignOutModal;
