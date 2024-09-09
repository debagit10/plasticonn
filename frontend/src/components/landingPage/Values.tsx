import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import audience from "../../images/audience.png";
import value from "../../images/value.png";
import data from "../../images/data.png";
import different from "../../images/different.png";

const Values = () => {
  const valueList = [
    {
      title: "Who will our data be useful to?",
      icon: data,
      points: [
        "Environmental organizationa/NGOs",
        "Plastic collectors & collection centres",
        "The community and Government/ Administration Bodies",
      ],
    },
    {
      title: "What is our value?",
      icon: value,
      points: [
        "Community engagement",
        "Partnership",
        "Economic Value",
        "Economic Development",
      ],
    },
    {
      title: "What makes us Different??",
      icon: different,
      points: [
        "Geotechnology",
        "Enhanced Visibilty and accessibilty to a wider reach",
        "Creativity and unique experience",
      ],
    },
    {
      title: "Who is our Audience?",
      icon: audience,
      points: [
        "Communities (Households/Institutions",
        "Hobbyists And Enthusiasts",
        "Students and Researchers",
      ],
    },
  ];
  return (
    <div>
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <Divider
            sx={{
              borderBottomWidth: "1px",
              width: "15%",
              borderColor: "#0EBB14",
            }}
          />
        </div>
        <Typography fontWeight={700} color="#047308" variant="h5">
          Our Value Proposition
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {valueList.map((item) => (
          <div className="mx-10 my-5">
            <Stack direction="row" spacing={2}>
              <div>
                <img src={item.icon} className="bg-[#047308] rounded-lg p-1" />
              </div>
              <Stack spacing={2}>
                <Typography
                  color="#015504"
                  fontWeight={600}
                  variant="subtitle1"
                >
                  {item.title}
                </Typography>
                {item.points.map((point) => (
                  <div>
                    <Stack direction="row">
                      <div className="w-4 h-2.5 mt-1 rounded-sm bg-[#015504]" />
                      <Typography
                        fontWeight={400}
                        variant="body2"
                        sx={{ marginLeft: ".5rem" }}
                      >
                        {point}
                      </Typography>
                    </Stack>
                  </div>
                ))}
              </Stack>
            </Stack>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Values;
