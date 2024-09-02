import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthContainer = React.lazy(
  () => import("../../containers/AuthContainer")
);

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AuthContainer>
        <div className="flex flex-col w-full mx-5">
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontSize: {
                xs: "1rem", // 16px
                sm: "1.125rem", // 18px
                md: "1.25rem", // 20px
                lg: "1.5rem", // 24px
                xl: "1.875rem", // 30px
              },
            }}
          >
            Login to Your Account
          </Typography>

          <div className="flex justify-center">
            <Typography variant="caption">drop-off centers only...</Typography>
          </div>

          <div className="flex flex-col justify-center mt-3">
            <Stack sx={{ marginX: "20%" }}>
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Center's ID or Email <span className="text-red-700">*</span>
              </Typography>
              <TextField
                type="email"
                placeholder="Enter your center's ID or email"
                variant="outlined"
                sx={{
                  padding: "1rem", // Equivalent to p-4
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black", // Equivalent to border-black
                      borderWidth: "2px",
                      borderRadius: "31px", // Equivalent to border-2
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0B490D", // Equivalent to focus:border-[#0B490D]
                    },
                    padding: 0, // Reset default padding
                  },
                  "& input": {
                    padding: "1rem", // Adding padding inside the input
                  },
                }}
              />
            </Stack>

            <Stack sx={{ marginX: "20%" }}>
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Password <span className="text-red-700">*</span>
              </Typography>
              <TextField
                type="password"
                placeholder="Enter your password"
                variant="outlined"
                sx={{
                  padding: "1rem", // Equivalent to p-4
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "black", // Equivalent to border-black
                      borderWidth: "2px",
                      borderRadius: "31px", // Equivalent to border-2
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0B490D", // Equivalent to focus:border-[#0B490D]
                    },
                    padding: 0, // Reset default padding
                  },
                  "& input": {
                    padding: "1rem", // Adding padding inside the input
                  },
                }}
              />
            </Stack>

            <div className="flex justify-center mt-10">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginX: "20%",
                  padding: "1rem",
                  backgroundColor: "#0B490D",
                  borderRadius: "31px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#0B490D",
                  },
                }}
              >
                Login
              </Button>
            </div>

            <div className="flex justify-center mt-3">
              <Typography>
                Don't have an account?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => navigate("/register-center")}
                >
                  Sign up
                </span>
              </Typography>
            </div>
          </div>
        </div>
      </AuthContainer>
    </div>
  );
};

export default Login;
