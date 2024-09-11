import { Stack, TextField, Typography } from "@mui/material";
import React from "react";

const ProfileTab = () => {
  return (
    <Stack spacing={2}>
      <div>
        <Stack direction="row" spacing={2}>
          <Typography width="5rem">Full name:</Typography>
          <TextField value="John Doe" />
        </Stack>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Typography width="5rem">Phone:</Typography>
          <TextField value="08034010411" />
        </Stack>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Typography width="5rem">Email:</Typography>
          <TextField value="johndoe@gmail.com" />
        </Stack>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Typography width="5rem">Address:</Typography>
          <TextField value="22, Ogundola Street" />
        </Stack>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Typography width="5rem">Password:</Typography>
          <TextField value="password" type="password" />
        </Stack>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Typography width="5rem">CollectorID:</Typography>
          <TextField value="1234" />
        </Stack>
      </div>
    </Stack>
  );
};

export default ProfileTab;
