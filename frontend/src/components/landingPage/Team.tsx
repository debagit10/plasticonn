import { Card, CardContent, Paper, Stack, Typography } from "@mui/material";

import React from "react";
import logo from "../../images/logo.png";

const Team = () => {
  const teamMembers = [
    { name: "ODULANA OLUWATOYIN", title: "Coach", picture: "" },
    { name: "ONAFESO IMISIOLUWA", title: "Team Lead", picture: "" },
    { name: "AZEEZ MOYOSORE", title: "Presenter", picture: "" },
    { name: "FATIMILEHIN OLUWATOBILOBA", title: "Social Manager", picture: "" },
    { name: "ONASANYA OLUWADEMILADE", title: "GIS Analyst", picture: "" },
    { name: "SHOBOGUN SODIQ", title: "Field Assistant", picture: "" },
  ];
  return (
    <>
      <div className="flex justify-center my-5">
        <Typography variant="h5" color="#047308" fontWeight={700}>
          Meet the creative Team
        </Typography>
      </div>

      <div className="flex justify-center text-center">
        <Paper elevation={6} sx={{ margin: "1rem", paddingX: "4.2rem" }}>
          <Stack sx={{ maxWidth: 345, margin: "1rem" }}>
            <div className="flex justify-center">
              <img src={logo} className="w-36 h-36" />
            </div>

            <Stack spacing={2}>
              <Typography variant="body2" fontWeight={400} fontStyle="italic">
                Lead Supervisor
              </Typography>
              <Typography gutterBottom variant="h6" fontWeight={700}>
                DR. PETER ELIAS
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </div>

      <div className="flex justify-center text-center">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {teamMembers.map((item) => (
            <Paper elevation={6} sx={{ margin: "1rem" }}>
              <Stack sx={{ maxWidth: 345, margin: "1rem" }}>
                <div className="flex justify-center">
                  <img src={logo} className="w-36 h-36" />
                </div>
                <div>
                  <Stack spacing={2}>
                    <Typography
                      variant="body2"
                      fontWeight={400}
                      fontStyle="italic"
                    >
                      {item.title}
                    </Typography>
                    <Typography gutterBottom variant="h6" fontWeight={700}>
                      {item.name}
                    </Typography>
                  </Stack>
                </div>
              </Stack>
            </Paper>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
