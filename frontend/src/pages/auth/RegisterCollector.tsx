import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Env from "../../Env";
import { useCookies } from "react-cookie";
import ToggleRegister from "../../modals/ToggleRegister";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

const { BASE_DEV_API_URL, BASE_PROD_API_URL, CLIENT_ENV } = Env;

const AuthContainer = React.lazy(
  () => import("../../containers/AuthContainer")
);

interface BodyData {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  password?: string;
  means_of_ID?: string;
  pic?: string;
}

const Register: React.FC<BodyData> = () => {
  let apiUrl: string;

  if (CLIENT_ENV == "prod") {
    apiUrl = BASE_PROD_API_URL;
  } else if (CLIENT_ENV == "dev") {
    apiUrl = BASE_DEV_API_URL;
  }

  const navigate = useNavigate();

  const [formData, setFormData] = useState<BodyData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    means_of_ID: "",
    pic: "",
  });

  const [loading, setLoading] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [seePassword, setSeePassword] = useState(false);

  const isFormDataComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const [fileUrl, setFileUrl] = useState("");
  const [picUrl, setPicUrl] = useState<string>("");

  const uploadPicture = async (event: any) => {
    const pic = event.target.files[0]; // Get the first file from the input
    const data = new FormData();
    data.append("image", pic);
    try {
      const response = await axios.post(`${apiUrl}/api/upload/pics`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPicUrl(response.data.imageUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async (event: any) => {
    const file = event.target.files[0]; // Get the first file from the input
    const data = new FormData();
    data.append("file", file);
    try {
      const response = await axios.post(`${apiUrl}/api/upload/file`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFileUrl(response.data.fileUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = async () => {
    const config = { headers: { "Content-type": "application/json" } };
    formData.pic = picUrl;
    formData.means_of_ID = fileUrl;

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
        `${apiUrl}/api/collector/register`,
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
    <AuthContainer>
      <div className="flex flex-col w-full mx-5">
        <ToastContainer />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
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
          Create Your Account
        </Typography>

        <div className="flex justify-center gap-4">
          <Typography variant="caption" sx={{ marginTop: ".5rem" }}>
            collectors only...
          </Typography>
          <div>
            <ToggleRegister />
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
              Full Name <span className="text-red-700">*</span>
            </Typography>
            <TextField
              onChange={handleInputChange}
              name="fullName"
              value={formData.fullName}
              placeholder="Enter your name"
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
            direction="row"
            sx={{
              marginX: {
                xs: "0", // No margin on small screens
                md: "20%", // Apply 20% margin from medium screens and above
              },
            }}
          >
            <Stack sx={{ width: "50%", marginLeft: "3%" }}>
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Email <span className="text-red-700">*</span>
              </Typography>
              <TextField
                onChange={handleInputChange}
                name="email"
                value={formData.email}
                type="email"
                placeholder="example@email.com"
                variant="outlined"
                sx={{
                  paddingY: "1rem", // Equivalent to p-4
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

            <Stack sx={{ width: "50%" }}>
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Phone number <span className="text-red-700">*</span>
              </Typography>
              <TextField
                onChange={handleInputChange}
                name="phone"
                value={formData.phone}
                type="tel"
                placeholder="Enter your phone number"
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
          </Stack>

          <Stack
            direction="row"
            sx={{
              marginX: {
                xs: "0", // No margin on small screens
                md: "20%", // Apply 20% margin from medium screens and above
              },
            }}
          >
            <Stack sx={{ width: "50%", marginLeft: "3%" }}>
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Address <span className="text-red-700">*</span>
              </Typography>
              <TextField
                onChange={handleInputChange}
                name="address"
                value={formData.address}
                placeholder="Enter your address"
                variant="outlined"
                sx={{
                  paddingY: "1rem", // Equivalent to p-4
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

            <Stack sx={{ width: "50%" }}>
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Password <span className="text-red-700">*</span>
              </Typography>
              <TextField
                onChange={handleInputChange}
                name="password"
                value={formData.password}
                type={seePassword ? "text" : "password"}
                placeholder="Enter password"
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
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        padding: "0.5rem",
                      }}
                    >
                      <IconButton>
                        {seePassword ? (
                          <IoEyeOffOutline
                            style={{
                              fontSize: "1.5rem",
                            }}
                            onClick={() => setSeePassword(false)}
                          />
                        ) : (
                          <IoEyeOutline
                            style={{
                              fontSize: "1.5rem",
                            }}
                            onClick={() => setSeePassword(true)}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>

          <Stack
            direction="row"
            sx={{
              marginX: {
                xs: "0", // No margin on small screens
                md: "20%", // Apply 20% margin from medium screens and above
              },
            }}
          >
            <Stack sx={{ width: "50%", marginLeft: "3%" }}>
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Means of ID <span className="text-red-700">*</span>
              </Typography>
              <TextField
                onChange={uploadFile}
                type="file"
                variant="outlined"
                sx={{
                  paddingY: "1rem", // Equivalent to p-4
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

            <Stack sx={{ width: "50%" }}>
              <Typography sx={{ marginLeft: "3%", fontWeight: 700 }}>
                Profile picture <span className="text-red-700">*</span>
              </Typography>
              <TextField
                onChange={uploadPicture}
                type="file"
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
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </div>

          <div className="flex justify-center mt-3">
            <Typography>
              Already have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/login-collector")}
              >
                Login
              </span>
            </Typography>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

export default Register;
