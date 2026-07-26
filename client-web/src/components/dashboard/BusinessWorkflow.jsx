import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

import {
  Person,
  Inventory2,
  ShoppingCart,
  ReceiptLong,
  Payments,
  ArrowForward,
} from "@mui/icons-material";

const workflow = [
  {
    title: "Customer",
    icon: <Person />,
    color: "#2563EB",
  },
  {
    title: "Product",
    icon: <Inventory2 />,
    color: "#10B981",
  },
  {
    title: "Purchase",
    icon: <ShoppingCart />,
    color: "#F59E0B",
  },
  {
    title: "Billing",
    icon: <ReceiptLong />,
    color: "#7C3AED",
  },
  {
    title: "Payment",
    icon: <Payments />,
    color: "#EF4444",
  },
];

const BusinessWorkflow = () => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={4}
        >
          Business Workflow
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            overflowX: "auto",
            gap: 2,
            pb: 1,
          }}
        >
          {workflow.map((item, index) => (
            <Box
              key={item.title}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Step */}

              <Box
                sx={{
                  textAlign: "center",
                  minWidth: 100,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: item.color,
                    width: 60,
                    height: 60,
                    margin: "0 auto",
                    transition: "0.3s",

                    "&:hover": {
                      transform: "scale(1.08)",
                    },
                  }}
                >
                  {item.icon}
                </Avatar>

                <Typography
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {item.title}
                </Typography>
              </Box>

              {/* Arrow */}

              {index !== workflow.length - 1 && (
                <ArrowForward
                  sx={{
                    fontSize: 30,
                    color: "#94A3B8",
                    mx: 2,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BusinessWorkflow;