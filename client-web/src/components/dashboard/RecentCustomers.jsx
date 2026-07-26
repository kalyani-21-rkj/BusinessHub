import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  Email,
  Phone,
} from "@mui/icons-material";

const RecentCustomers = ({ customers = [] }) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: "0 8px 25px rgba(0,0,0,.08)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          Recent Customers
        </Typography>

        <Stack spacing={2}>
          {customers.length === 0 ? (
            <Typography
              align="center"
              color="text.secondary"
              py={4}
            >
              No Customers Found
            </Typography>
          ) : (
            customers.map((customer) => (
              <Box
                key={customer._id}
                sx={{
                  border: "1px solid #E5E7EB",
                  borderRadius: 3,
                  p: 2,
                  transition: ".3s",
                  "&:hover": {
                    boxShadow:
                      "0 8px 20px rgba(37,99,235,.12)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                {/* Top Row */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Avatar
                      sx={{
                        width: 46,
                        height: 46,
                        fontWeight: 700,
                        background:
                          "linear-gradient(135deg,#2563EB,#1D4ED8)",
                      }}
                    >
                      {(customer.fullName || customer.name || "U")[0]}
                    </Avatar>

                    <Typography
                      fontWeight={700}
                      fontSize={17}
                    >
                      {customer.fullName || customer.name}
                    </Typography>
                  </Box>

                  <Chip
                    label={customer.status || "Active"}
                    size="small"
                    color={
                      customer.status === "New"
                        ? "warning"
                        : "success"
                    }
                  />
                </Box>

                {/* Email */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Email
                    sx={{
                      color: "#64748B",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {customer.email}
                  </Typography>
                </Box>

                {/* Phone */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Phone
                    sx={{
                      color: "#64748B",
                      fontSize: 18,
                      flexShrink: 0,
                    }}
                  />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {customer.phone || "N/A"}
                  </Typography>
                </Box>
              </Box>
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecentCustomers;