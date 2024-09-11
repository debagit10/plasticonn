import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Side_nav_container from "../containers/Side_nav_container";
import logo from "../images/logo.png";
import ProfileTab from "../tabs/ProfileTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Profile = () => {
  const [cookies, setCookies] = useCookies();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!cookies.token) {
      navigate(`/login-${cookies.role}`);
    }
  });

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  return (
    <Side_nav_container>
      <div className="mx-10">
        <Typography
          variant="h6"
          sx={{
            textDecoration: "underline",
            color: "#0B490D",
            textDecorationColor: "#0B490D",
          }}
        >
          Profile
        </Typography>
        <div className="flex">
          <img src={logo} className="w-52 h-52" />
          <div className="mt-[15%]">
            <Typography variant="h4">John Doe</Typography>
            <Typography>johndoe@gmail.com</Typography>
          </div>
        </div>

        <div>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#0B490D",
                    color: "#0B490D",
                  },
                  "& .MuiTab-root": { color: "black" },
                  "& .Mui-selected": { color: "#0B490D" },
                }}
              >
                <Tab label="My Profile" />
                <Tab label="History" />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <ProfileTab />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </Side_nav_container>
  );
};

export default Profile;
