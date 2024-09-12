import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Paper, Stack, Typography } from "@mui/material";
import goodwall from "../../images/partners/goodwall.png";
import greenhub from "../../images/partners/greenhub.jfif";
import mappers from "../../images/partners/youthmappers.png";
import sdg from "../../images/partners/sdg.jpg";
import unicef from "../../images/partners/unicef.jfif";
import unilag from "../../images/partners/unilag.jfif";

const Partners = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const partners = [
    { name: "GoodWall", logo: goodwall },
    { name: "GreenHub", logo: greenhub },
    { name: "UNILAG", logo: unilag },
    { name: "Youth Mappers", logo: mappers },
    { name: "UNILAG Olympiad SDG", logo: sdg },
    { name: "UNICEF", logo: unicef },
  ];

  return (
    <div className=" my-5  ">
      <Slider {...settings}>
        {partners.map((partner, index) => (
          <div key={index} className="px-2">
            <Paper elevation={6} sx={{ margin: "1rem" }}>
              <Stack>
                <div className="flex justify-center">
                  <img src={partner.logo} className="w-54 h-36 p-2" />
                </div>
                <div className="flex justify-center">
                  <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={700}
                    color="#047308"
                  >
                    {partner.name}
                  </Typography>
                </div>
              </Stack>
            </Paper>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Partners;
