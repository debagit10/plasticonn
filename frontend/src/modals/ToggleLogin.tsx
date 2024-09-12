import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

export const ToggleLogin = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        sx={{
          borderColor: "#0B490D",
          color: "#0B490D",
          borderRadius: "31px",
          textTransform: "capitalize",
          "&:hover": {
            backgroundColor: "#0B490D",
            color: "white",
            borderColor: "#0B490D",
          },
        }}
        onClick={handleClick}
      >
        Select role
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/login-center");
          }}
        >
          Drop off center
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/login-collector");
          }}
        >
          Collector
        </MenuItem>
      </Menu>
    </div>
  );
};
