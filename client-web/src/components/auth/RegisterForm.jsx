import { registerUser } from "../../services/authService";
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
  CircularProgress,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Passwords do not match",
      });
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setSnackbar({
        open: true,
        severity: "success",
        message: "Registration Successful",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setSnackbar({
        open: true,
        severity: "error",
        message:
          err.response?.data?.message ||
          "Registration Failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Box
  sx={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "#f8fafc",
    p: {
      xs: 2,
      sm: 4,
    },
  }}
>
  <Paper
    elevation={8}
    sx={{
      width: "100%",
      maxWidth: 520,
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
      Create Account 🚀
    </Typography>

    <Typography
      align="center"
      color="text.secondary"
      mb={4}
    >
      Register to start using BusinessHub
    </Typography>

    <Box
      component="form"
      onSubmit={handleRegister}
    >

      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
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
          showPassword
            ? "text"
            : "password"
        }
        name="password"
        value={form.password}
        onChange={handleChange}
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

      <TextField
        fullWidth
        margin="normal"
        label="Confirm Password"
        type={
          showConfirmPassword
            ? "text"
            : "password"
        }
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
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
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControl
        fullWidth
        sx={{ mt: 2 }}
      >
        <InputLabel>
          Register As
        </InputLabel>

        <Select
          value={form.role}
          name="role"
          label="Register As"
          onChange={handleChange}
        >
          <MenuItem value="admin">
            Admin
          </MenuItem>

          <MenuItem value="hr">
            HR
          </MenuItem>

          <MenuItem value="customer">
            Customer
          </MenuItem>
        </Select>
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading}
        sx={{
          mt: 4,
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
            size={24}
            color="inherit"
          />
        ) : (
          "Create Account"
        )}
      </Button>

      <Typography
        align="center"
        mt={3}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#2563eb",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Sign In
        </Link>
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

export default RegisterForm;
            