import { Paper, Stack, Typography } from "@mui/material";

import React from "react";
import supervisor from "../../images/team/supervisor.jpg";
import lead from "../../images/team/lead.png";
import coach from "../../images/team/coach.png";
import analyst from "../../images/team/analyst.png";
import social from "../../images/team/social.png";
import presenter from "../../images/team/presenter.png";
import field from "../../images/team/field.png";

const Team = () => {
  const teamMembers = [
    { name: "ODULANA OLUWATOYIN", title: "Coach", picture: coach },
    { name: "ONAFESO IMISIOLUWA", title: "Team Lead", picture: lead },
    { name: "AZEEZ MOYOSORE", title: "Presenter", picture: presenter },
    {
      name: "FATIMILEHIN OLUWATOBILOBA",
      title: "Social Manager",
      picture: social,
    },
    { name: "ONASANYA OLUWADEMILADE", title: "GIS Analyst", picture: analyst },
    { name: "SHOBOGUN SODIQ", title: "Field Assistant", picture: field },
  ];
  return (
    <>
      <div className="flex justify-center my-5">
        <Typography variant="h5" color="#047308" fontWeight={700}>
          Meet the creative Team
        </Typography>
      </div>

      <div className="text-center sm:my-5 md:mx-[20%] sm:p-5 p-3 m-3  rounded-lg shadow-lg border border-[#028C07]">
        <Typography fontWeight={700} variant="body2">
          To achieve a sustainable future, collaboration and shared commitment
          is key
        </Typography>
      </div>

      <div className="flex justify-center text-center">
        <Paper
          elevation={6}
          sx={{ margin: "1rem", paddingX: "4.2rem", paddingTop: "1rem" }}
        >
          <Stack sx={{ maxWidth: 345, margin: "1rem" }}>
            <div className="flex justify-center ">
              <img
                src={supervisor}
                className="w-36 h-36 rounded-lg shadow-lg"
              />
            </div>

            <Stack spacing={2} sx={{ marginTop: "1rem" }}>
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
                <div className="flex justify-center ">
                  <img src={item.picture} className="rounded-lg" />
                </div>

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
              </Stack>
            </Paper>
          ))}
        </div>
      </div>
    </>
  );
};

export default Team;
