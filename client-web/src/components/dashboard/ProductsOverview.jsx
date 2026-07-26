import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Stack,
  LinearProgress,
} from "@mui/material";

import {
  LaptopMac,
  PhoneAndroid,
  Headphones,
  DesktopWindows,
  DevicesOther,
} from "@mui/icons-material";

const ProductsOverview = ({ products = [] }) => {
  const getIcon = (name = "") => {
    const product = name.toLowerCase();

    if (product.includes("laptop"))
      return <LaptopMac />;

    if (product.includes("phone"))
      return <PhoneAndroid />;

    if (product.includes("monitor"))
      return <DesktopWindows />;

    if (product.includes("head"))
      return <Headphones />;

    return <DevicesOther />;
  };

  const getColor = (stock) => {
    if (stock > 20) return "#10B981";
    if (stock > 5) return "#F59E0B";
    return "#EF4444";
  };

  const getStatus = (stock) => {
    if (stock > 20) return "In Stock";
    if (stock > 5) return "Low Stock";
    return "Out of Stock";
  };

  const getProgress = (stock) => {
    if (stock >= 50) return 100;
    if (stock >= 20) return 70;
    if (stock >= 5) return 35;
    return 5;
  };

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
          Products Overview
        </Typography>

        <Stack spacing={2}>
          {products.length === 0 ? (
            <Typography
              align="center"
              color="text.secondary"
              py={4}
            >
              No Products Found
            </Typography>
          ) : (
            products.map((product) => {
              const stock =
                product.stock ??
                product.quantity ??
                0;

              const status = getStatus(stock);

              return (
                <Box
                  key={product._id}
                  sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    p: 2,
                    transition: ".3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.12)",
                    },
                  }}
                >
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
                          bgcolor: getColor(stock),
                          width: 46,
                          height: 46,
                        }}
                      >
                        {getIcon(product.productName)}
                      </Avatar>

                      <Box>
                        <Typography
                          fontWeight={700}
                          fontSize={17}
                        >
                           {product.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Stock Available : {product.stock}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      label={status}
                      size="small"
                      color={
                        status === "In Stock"
                          ? "success"
                          : status === "Low Stock"
                          ? "warning"
                          : "error"
                      }
                    />
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={getProgress(stock)}
                    sx={{
                      mt: 2,
                      height: 8,
                      borderRadius: 5,
                    }}
                    color={
                      status === "In Stock"
                        ? "success"
                        : status === "Low Stock"
                        ? "warning"
                        : "error"
                    }
                  />
                </Box>
              );
            })
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductsOverview;