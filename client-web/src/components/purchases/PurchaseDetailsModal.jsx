import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Divider,
  Chip,
  Box,
  Stack,
} from "@mui/material";

import {
  FaPrint,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const PurchaseDetailsModal = ({
  purchase,
  onClose,
}) => {
  if (!purchase) return null;

  const subtotal =
    purchase.products?.reduce(
      (sum, item) =>
        sum +
        item.purchasePrice * item.quantity,
      0
    ) || 0;

  const gstAmount =
    purchase.products?.reduce(
      (sum, item) =>
        sum +
        (item.purchasePrice *
          item.quantity *
          (item.gst || 0)) /
          100,
      0
    ) || 0;

  return (
    <Dialog
      open={Boolean(purchase)}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: {
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#2563EB",
          color: "#fff",
          pb: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Purchase Order
          #{purchase._id?.slice(-6)}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: .9,
            mt: .5,
          }}
        >
          View complete purchase order
          information
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ mt: 3 }}>

        <Grid container spacing={3}>

          {/* Supplier Card */}

          <Grid item xs={12} md={6}>

            <Paper
              elevation={0}
              sx={{
                p:3,
                borderRadius:3,
                border:"1px solid #E2E8F0",
                height:"100%",
              }}
            >

              <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
              >
                Supplier Information
              </Typography>

              <Stack spacing={2}>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Supplier
                  </Typography>

                  <Typography fontWeight={600}>
                    {purchase.supplier}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Warehouse
                  </Typography>

                  <Typography>
                    {purchase.warehouse}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Expected Date
                  </Typography>

                  <Typography>
                    {purchase.expectedDate
                      ? new Date(
                          purchase.expectedDate
                        ).toLocaleDateString()
                      : "-"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    Status
                  </Typography>

                  <br />

                  <Chip
                    label={purchase.status}
                    color={
                      purchase.status ===
                      "Received"
                        ? "success"
                        : purchase.status ===
                          "Ordered"
                        ? "primary"
                        : "warning"
                    }
                    size="small"
                  />
                </Box>

              </Stack>

            </Paper>

          </Grid>
                    {/* Amount Summary */}

          <Grid item xs={12} md={6}>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid #E2E8F0",
                height: "100%",
              }}
            >

              <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
              >
                Amount Summary
              </Typography>

              <Stack spacing={2}>

                <Box
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary">
                    Subtotal
                  </Typography>

                  <Typography fontWeight={600}>
                    ₹
                    {subtotal.toLocaleString("en-IN")}
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary">
                    GST
                  </Typography>

                  <Typography fontWeight={600}>
                    ₹
                    {gstAmount.toLocaleString("en-IN")}
                  </Typography>
                </Box>

                <Divider />

                <Box
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Total
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#2563EB"
                  >
                    ₹
                    {Number(
                      purchase.totalAmount || 0
                    ).toLocaleString("en-IN")}
                  </Typography>
                </Box>

              </Stack>

            </Paper>

          </Grid>
      </Grid>
        

        {/* Products */}

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            borderRadius: 3,
            border: "1px solid #E2E8F0",
            overflow: "hidden",
          }}
        >

          <Box p={3} pb={1}>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Products
            </Typography>

          </Box>

          <TableContainer>

            <Table
              size="small"
              sx={{
                minWidth: 700,
              }}
            >

              <TableHead>

                <TableRow>

                  <TableCell>
                    <strong>Product</strong>
                  </TableCell>

                  <TableCell align="center">
                    <strong>Qty</strong>
                  </TableCell>

                  <TableCell align="right">
                    <strong>Price</strong>
                  </TableCell>

                  <TableCell align="right">
                    <strong>GST</strong>
                  </TableCell>

                  <TableCell align="right">
                    <strong>Total</strong>
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {purchase.products?.length ? (

                  purchase.products.map(
                    (item, index) => (

                      <TableRow key={index} hover>

                        <TableCell>
                          {item.product?.name}
                        </TableCell>

                        <TableCell align="center">
                          {item.quantity}
                        </TableCell>

                        <TableCell align="right">
                          ₹
                          {Number(
                            item.purchasePrice
                          ).toLocaleString("en-IN")}
                        </TableCell>

                        <TableCell align="right">
                          {item.gst || 0}%
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            fontWeight: 700,
                          }}
                        >
                          ₹
                          {(
                            item.purchasePrice *
                            item.quantity
                          ).toLocaleString("en-IN")}
                        </TableCell>

                      </TableRow>

                    )
                  )

                ) : (

                  <TableRow>

                    <TableCell
                      colSpan={5}
                      align="center"
                    >
                      No Products Found
                    </TableCell>

                  </TableRow>

                )}

              </TableBody>

            </Table>

          </TableContainer>

        </Paper>
                {/* Notes */}

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            borderRadius: 3,
            border: "1px solid #E2E8F0",
            p: 3,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Notes
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              whiteSpace: "pre-wrap",
            }}
          >
            {purchase.notes || "No Notes Available"}
          </Typography>
        </Paper>

        {/* Purchase Timeline */}

        <Box mt={4}>

          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Purchase Timeline
          </Typography>

          <Grid container spacing={2}>

            <Grid item xs={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #DCFCE7",
                  bgcolor: "#F0FDF4",
                  textAlign: "center",
                }}
              >
                <FaCheckCircle
                  size={24}
                  color="#16A34A"
                />

                <Typography
                  mt={1}
                  fontWeight={600}
                >
                  Created
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #DCFCE7",
                  bgcolor: "#F0FDF4",
                  textAlign: "center",
                }}
              >
                <FaCheckCircle
                  size={24}
                  color="#16A34A"
                />

                <Typography
                  mt={1}
                  fontWeight={600}
                >
                  Approved
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #DBEAFE",
                  bgcolor: "#EFF6FF",
                  textAlign: "center",
                }}
              >
                <FaTruck
                  size={24}
                  color="#2563EB"
                />

                <Typography
                  mt={1}
                  fontWeight={600}
                >
                  Supplier Shipped
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  border:
                    purchase.status === "Received"
                      ? "1px solid #DCFCE7"
                      : "1px solid #FEF3C7",
                  bgcolor:
                    purchase.status === "Received"
                      ? "#F0FDF4"
                      : "#FEFCE8",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {purchase.status}
                </Typography>
              </Paper>
            </Grid>

          </Grid>
      
        </Box>
   </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2.5,
          gap: 2,
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "flex-end",
          },
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            minWidth: 120,
          }}
        >
          Close
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<FaTruck />}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            minWidth: 170,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          Receive Stock
        </Button>

        <Button
          variant="contained"
          startIcon={<FaPrint />}
          sx={{
            bgcolor: "#2563EB",
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            minWidth: 140,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#1D4ED8",
              boxShadow: "none",
            },
          }}
        >
          Print PO
        </Button>
      </DialogActions>

    </Dialog>
  //</Grid>
  );
};

export default PurchaseDetailsModal;
    