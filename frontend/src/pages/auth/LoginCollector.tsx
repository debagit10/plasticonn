import React, { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Env from "../../Env";
import { useCookies } from "react-cookie";
import { ToggleLogin } from "../../modals/ToggleLogin";

const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const AuthContainer = React.lazy(
  () => import("../../containers/AuthContainer")
);

interface BodyData {
  email?: string;
  password?: string;
}

const LoginCollector: React.FC<BodyData> = () => {
  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState<BodyData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useCookies();

  const isFormDataComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const submit = async () => {
    const config = { headers: { "Content-type": "application/json" } };

    try {
      setLoading(true);
      const form = isFormDataComplete();

      if (!form) {
        setLoading(false);
        toast.warning("Please fill all fields", {
          position: "top-center",
        });
        return;
      }
      const response = await axios.post(
        `${apiUrl}/api/collector/login`,
        formData,
        config
      );

      if (response.data.success) {
        const userID = response.data.userID;
        toast.success(response.data.success, {
          position: "top-center",
          autoClose: 1000,
          onClose: () => {
            navigate(`/${userID}/dashboard`);
          },
        });
        setLoading(false);
        setCookies("token", response.data.token.encryptedToken);
        setCookies("role", "collector");
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response.data.info) {
        toast.info(error.response.data.info, {
          position: "top-center",
          autoClose: 1000,
        });
      } else if (error.response.data.error) {
        toast.error(error.response.data.error, {
          position: "top-center",
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <div>
      <AuthContainer>
        <div className="flex flex-col w-full mx-5">
          <ToastContainer />
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

          <div className="flex justify-center gap-4">
            <Typography variant="caption" sx={{ marginTop: ".5rem" }}>
              collectors only...
            </Typography>
            <div>
              <ToggleLogin />
            </div>
          </div>

          <div className="flex flex-col justify-center mt-3">
            <Stack
              sx={{
                marginX: {
                  xs: "0", // No margin on small screens
                  md: "20%", // Apply 20% margin from medium screens and above
                },
              }}
            >
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Email <span className="text-red-700">*</span>
              </Typography>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                placeholder="Enter your email"
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

            <Stack
              sx={{
                marginX: {
                  xs: "0", // No margin on small screens
                  md: "20%", // Apply 20% margin from medium screens and above
                },
              }}
            >
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Password <span className="text-red-700">*</span>
              </Typography>
              <TextField
                name="password"
                value={formData.password}
                onChange={handleInputChange}
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
                  marginX: {
                    xs: "0", // No margin on small screens
                    md: "20%", // Apply 20% margin from medium screens and above
                  },
                  padding: "1rem",
                  backgroundColor: "#0B490D",
                  borderRadius: "31px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#0B490D",
                  },
                }}
                disabled={loading}
                onClick={submit}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>

            <div className="flex justify-center mt-3">
              <Typography>
                Don't have an account?{" "}
                <span
                  className="underline cursor-pointer"
                  onClick={() => navigate("/register-collector")}
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

export default LoginCollector;
