import { Button, Menu, Stack, Divider } from "@mui/material";
import React from "react";

const DropoffModal = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <div>
        <Button
          id="option-button"
          aria-controls={open ? "option-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="outlined"
          disableElevation
          sx={{
            color: "#22C55E",
            borderColor: "#22C55E",
            "&:hover": { borderColor: "#22C55E" },
            textTransform: "capitalize",
          }}
        >
          Options
        </Button>
        <Menu
          id="option-menu"
          aria-labelledby="option-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Stack>
            <div className="flex justify-center">
              <Button
                variant="text"
                sx={{
                  cursor: "pointer",
                  color: "black",
                  textTransform: "capitalize",
                }}
                fullWidth
              >
                Mark as unread
              </Button>
            </div>
            <Divider />
            <div className="flex justify-center">
              <Button
                variant="text"
                sx={{
                  cursor: "pointer",
                  color: "black",
                  textTransform: "capitalize",
                }}
                fullWidth
              >
                View
              </Button>
            </div>
            <Divider />
            <div className="flex justify-center">
              <Button
                variant="text"
                sx={{
                  cursor: "pointer",
                  color: "red",
                  textTransform: "capitalize",
                }}
                fullWidth
              >
                Delete
              </Button>
            </div>
          </Stack>
        </Menu>
      </div>
    </div>
  );
};

export default DropoffModal;
