import {
  Box,
  Typography,
  Button,
} from "@mui/material";

import {
  ArrowForward,
} from "@mui/icons-material";

const WelcomeBanner = () => {
  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg,#2563EB,#1E40AF,#1D4ED8)",
        borderRadius: 5,
        p: {
          xs: 3,
          md: 5,
        },
        color: "white",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Left */}

      <Box
        sx={{
          maxWidth: 600,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
        >
          👋 Hello !,
          {" "}
          {user?.fullName || "Admin"}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            opacity: 0.9,
            fontSize: 16,
          }}
        >
          {today}
        </Typography>

        <Typography
          variant="h3"
          fontWeight="semi-bold"
          mt={3}
        >
          Welcome to BusinessHub
        </Typography>

        <Typography
          sx={{
            mt: 2,
            fontSize: 15,
            opacity: 0.95,
            lineHeight: 1.8,
          }}
        >
          Manage Customers, Employees,
          Inventory and Billing from one
          intelligent dashboard.
        </Typography>

        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          sx={{
            mt: 4,
            bgcolor: "white",
            color: "#2563EB",
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontWeight: "bold",
            fontSize: 16,

            "&:hover": {
              bgcolor: "#f3f4f6",
            },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* Right */}

      <Box
        component="img"
        //src="https://media.istockphoto.com/id/1150892687/photo/crm-customer-relationship-management-system-concept-on-motion-design-3d-rendering.jpg?s=2048x2048&w=is&k=20&c=n30o1BY5lmbMMzflbQM7bVDgUI3Ho6idvRdY_p7k8kw="
        //alt="Dashboard"
        sx={{
          width: {
            xs: 220,
            md: 380,
          },
          mt: {
            xs: 4,
            md: 0,
          },
        }}
      />
    </Box>
  );
};

export default WelcomeBanner;