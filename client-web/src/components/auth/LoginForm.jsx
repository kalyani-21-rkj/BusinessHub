import { loginUser } from "../../services/authService";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("admin");
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "error",
    message: "",
  });

  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await loginUser({
        email,
        password,
        role,
      });
      console.log(response.data);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Login Successful",
      });

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          err.response?.data?.message ||
          "Login Failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: {
            xs: "100%",
            lg: "50%",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: {
            xs: 2,
            sm: 4,
            md: 6,
          },
          bgcolor: "#f8fafc",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 500,
            borderRadius: 4,
            p: {
              xs: 3,
              sm: 5,
            },
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            align="center"
            gutterBottom
          >
            Welcome Back 👋
          </Typography>

          <Typography
            align="center"
            color="text.secondary"
            mb={4}
          >
            Login to continue to BusinessHub
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
  <InputLabel>Login As</InputLabel>

  <Select
    value={role}
    label="Login As"
    onChange={(e) => setRole(e.target.value)}
  >
    <MenuItem value="admin">Admin</MenuItem>
    <MenuItem value="hr">HR</MenuItem>
    <MenuItem value="customer">Customer</MenuItem>
  </Select>
</FormControl>

          <Box
            component="form"
            onSubmit={handleLogin}
          >
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type={
                showPassword ? "text" : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),

                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
              mb={3}
              flexWrap="wrap"
              gap={1}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Remember Me"
              />

              <Typography
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Forgot Password?
              </Typography>
            </Box>

            <Button
  type="submit"
  fullWidth
  variant="contained"
  size="large"
  disabled={loading}
  sx={{
    py: 1.5,
    borderRadius: 3,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "none",
    background:
      "linear-gradient(90deg,#2563eb,#1d4ed8)",
  }}
>
  {loading ? (
    <CircularProgress
      color="inherit"
      size={24}
    />
  ) : (
    "Sign In"
  )}
</Button>

<Typography
  align="center"
  mt={3}
  color="text.secondary"
>
  Don't have an account?{" "}
  <Typography
    component={Link}
    to="/register"
    sx={{
      color: "#2563eb",
      fontWeight: 700,
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        textDecoration: "underline",
      },
    }}
  >
    Register Here
  </Typography>
</Typography>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={handleClose}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;