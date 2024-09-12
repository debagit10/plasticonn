import { Typography } from "@mui/material";
import React from "react";
import image from "../../images/volunteer.jpg";

const About = () => {
  return (
    <div className="bg-[#f0f7f0] grid grid-cols-1 md:grid-cols-2 rounded-lg">
      <div className="flex justify-center items-center">
        <img
          src={image}
          alt="A volunteer in action"
          className="w-[70%] h-[85%] rounded-xl"
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="m-10">
          <Typography fontWeight={700} color="#047308" variant="h5">
            About Plasticonn
          </Typography>
          <div className="lg:w-[80%] mt-5">
            <Typography variant="body2" fontWeight={400}>
              Our mission is to facilitate connections and bridge the gap
              between plastic collectors and plastic collection centers by
              leveraging Geolocation technology and Citizen Science.By
              streamlining the plastic recycling process, we aim to enhance
              plastic waste management and promote a collaborative approach to
              Environmental Sustainability.
            </Typography>
            <Typography
              fontWeight={700}
              variant="subtitle2"
              sx={{ marginTop: "1.25rem" }}
            >
              <span className="text-[#047308]">What do people </span>have to say
              about us?
            </Typography>
            <div className="border-[#047308] border p-5 -rotate-2 rounded-lg mt-5">
              <Typography variant="body2">
                <ul>
                  <li> - I will like to use your data</li>
                  <li> - How can I be part of the system?</li>
                  <li>
                    {" "}
                    - Can i get connected to plastic recycling in ogun state?
                  </li>
                </ul>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
