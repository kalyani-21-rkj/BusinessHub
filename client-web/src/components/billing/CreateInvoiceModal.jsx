/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
  Box,
  Stack,
} from "@mui/material";

import {
  Close,
  Delete,
  Add,
} from "@mui/icons-material";

import { getProducts } from "../../services/productService";

const CreateInvoiceModal = ({
  onClose,
  onSave,
  invoice,
}) => {

  const [productList, setProductList] = useState([]);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    customerName: invoice?.customerName || "",
    customerPhone: invoice?.customerPhone || "",
    customerEmail: invoice?.customerEmail || "",
    discount: invoice?.discount || 0,
    gst: invoice?.gst || 0,
    paymentMethod:
      invoice?.paymentMethod || "Cash",
    status:
      invoice?.status || "Paid",
  });

  const [products, setProducts] = useState(
    invoice?.products?.length
      ? invoice.products.map((item) => ({
          product:
            item.product?._id ||
            item.product,
          quantity: item.quantity,
          sellingPrice:
            item.sellingPrice,
        }))
      : [
          {
            product: "",
            quantity: 1,
            sellingPrice: 0,
          },
        ]
  );

  useEffect(() => {

    let isMounted = true;

    const fetchProducts = async () => {

      try {

        const res =
          await getProducts();

        if (isMounted) {
          setProductList(
            res.data?.products || []
          );
        }

      } catch (err) {

        console.log(err);

      }

    };

    fetchProducts();

    return () => {
      isMounted = false;
    };

  }, []);

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleProductChange = (
    index,
    field,
    value
  ) => {

    const temp = [...products];

    temp[index] = {
      ...temp[index],
      [field]: value,
    };

    if (field === "product") {

      const selected =
        productList.find(
          (p) => p._id === value
        );

      if (selected) {
        temp[index].sellingPrice =
          selected.sellingPrice;
      }

    }

    setProducts(temp);

  };

  const addProduct = () => {

    setProducts([
      ...products,
      {
        product: "",
        quantity: 1,
        sellingPrice: 0,
      },
    ]);

  };

  const removeProduct = (
    index
  ) => {

    if (products.length === 1)
      return;

    setProducts(
      products.filter(
        (_, i) => i !== index
      )
    );

  };

  const subTotal =
    products.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantity || 0
        ) *
          Number(
            item.sellingPrice || 0
          ),
      0
    );

  const discount = Number(
    form.discount || 0
  );

  const gst = Number(
    form.gst || 0
  );

  const totalAmount =
    subTotal - discount + gst;

  const validate = () => {

    const temp = {};

    if (
      !form.customerName.trim()
    ) {

      temp.customerName =
        "Customer Name is required";

    }

    if (products.length === 0) {

      temp.products =
        "Select at least one product";

    }

    products.forEach(
      (item, index) => {

        if (!item.product) {

          temp[
            `product${index}`
          ] =
            "Select Product";

        }

        if (
          !item.quantity ||
          item.quantity <= 0
        ) {

          temp[
            `quantity${index}`
          ] =
            "Invalid Quantity";

        }

      }
    );

    setErrors(temp);

    return (
      Object.keys(temp)
        .length === 0
    );

  };

  const handleSubmit = () => {

    if (!validate()) return;

    onSave({

      customerName:
        form.customerName,

      customerPhone:
        form.customerPhone,

      customerEmail:
        form.customerEmail,

      products:
        products.map(
          (item) => ({
            product:
              item.product,
            quantity: Number(
              item.quantity
            ),
            sellingPrice:
              Number(
                item.sellingPrice
              ),
          })
        ),

      discount,

      gst,

      paymentMethod:
        form.paymentMethod,

      status:
        form.status,

      subTotal,

      totalAmount,

    });

  };
    return (
    <Dialog
      open
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
        },
      }}
    >
      {/* ================= HEADER ================= */}

      <DialogTitle
        sx={{
          bgcolor: "#2563EB",
          color: "#fff",
          px: 4,
          py: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>

          <Typography
            variant="h5"
            fontWeight={700}
            color="white"
          >
            {invoice
              ? "Update Invoice"
              : "Create Invoice"}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.85)",
              mt: 0.5,
            }}
          >
            Customer billing information
          </Typography>

        </Box>

        <IconButton
          onClick={onClose}
          sx={{ color: "#fff" }}
        >
          <Close />
        </IconButton>

      </DialogTitle>

      <Divider />

      {/* ================= BODY ================= */}

      <DialogContent sx={{ p: 4 }}>

        {/* Customer Details */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
          }}
        >

          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Customer Details
          </Typography>

          <Grid container spacing={3}>

            <Grid item xs={12} md={4}>

              <TextField
                fullWidth
                size="small"
                label="Customer Name"
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                error={!!errors.customerName}
                helperText={errors.customerName}
              />

            </Grid>

            <Grid item xs={12} md={4}>

              <TextField
                fullWidth
                size="small"
                label="Phone Number"
                name="customerPhone"
                value={form.customerPhone}
                onChange={handleChange}
              />

            </Grid>

            <Grid item xs={12} md={4}>

              <TextField
                fullWidth
                size="small"
                label="Email Address"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
              />

            </Grid>

          </Grid>

        </Paper>
                {/* ================= Products ================= */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,

            borderRadius: 3,
            border: "1px solid #E5E7EB",
          }}
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            justifyContent="space-between"
            
            alignItems={{
              xs: "flex-start",
              sm: "center",
              
            }}
            spacing={2}
            mb={3}
          >
            <Box mb={3}>
  <Typography variant="h6" fontWeight={700}>
    Products
  </Typography>

  <Typography variant="body2" color="text.secondary">
    Select products for this invoice
  </Typography>
</Box>

<Box
  display="flex"
  justifyContent="flex-end"
  mb={3}
>
  <Button
    variant="contained"
    startIcon={<Add />}
    onClick={addProduct}
    sx={{
      minWidth: 180,
      height: 45,
      borderRadius: 1,
      textTransform: "none",
      fontWeight: 600,
      bgcolor: "#2563EB",
      marginLeft:90,
      "&:hover": {
        bgcolor: "#1D4ED8",
      },
    }}
  >
    Add Product
  </Button>
</Box>
          </Stack>

          {products.map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                bgcolor: "#F8FAFC",
                border: "1px solid #E5E7EB",
                borderRadius: 2,
              }}
            >
              <Grid
                container
                spacing={2}
                alignItems="center"
              >
                {/* Product */}

                <Grid item xs={12} md={5}>
                  <TextField
                    select
                    fullWidth
                    size="small"
                    label="Product"
                    value={item.product}
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "product",
                        e.target.value
                      )
                    }
                    error={
                      !!errors[
                        `product${index}`
                      ]
                    }
                    helperText={
                      errors[
                        `product${index}`
                      ]
                    }
                  >
                    <MenuItem value="">
                      Select Product
                    </MenuItem>

                    {productList.map(
                      (product) => (
                        <MenuItem
                          key={
                            product._id
                          }
                          value={
                            product._id
                          }
                        >
                          {product.name}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>

                {/* Quantity */}

                <Grid item xs={12} sm={4} md={2}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    error={
                      !!errors[
                        `quantity${index}`
                      ]
                    }
                    helperText={
                      errors[
                        `quantity${index}`
                      ]
                    }
                  />
                </Grid>

                {/* Price */}

                <Grid item xs={12} sm={5} md={3}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Selling Price"
                    value={
                      item.sellingPrice
                    }
                    onChange={(e) =>
                      handleProductChange(
                        index,
                        "sellingPrice",
                        e.target.value
                      )
                    }
                  />
                </Grid>

                {/* Delete */}

                <Grid item xs={12} md={2}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() =>
                      removeProduct(index)
                    }
                    disabled={
                      products.length === 1
                    }
                    sx={{
                      textTransform:
                        "none",
                      borderRadius: 1,
                      height: 40,
                    }}
                  >
                    Remove
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Paper>

        {/* ================= Billing Details ================= */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Billing Details
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Discount (₹)"
                name="discount"
                value={form.discount}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="GST (₹)"
                name="gst"
                value={form.gst}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                size="small"
                label="Payment Method"
                name="paymentMethod"
                value={
                  form.paymentMethod
                }
                onChange={handleChange}
              >
                <MenuItem value="Cash">
                  Cash
                </MenuItem>

                <MenuItem value="UPI">
                  UPI
                </MenuItem>

                <MenuItem value="Card">
                  Card
                </MenuItem>

                <MenuItem value="Bank Transfer">
                  Bank Transfer
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                size="small"
                label="Payment Status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <MenuItem value="Paid">
                  Paid
                </MenuItem>

                <MenuItem value="Pending">
                  Pending
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Paper>
                {/* ================= Invoice Summary ================= */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #E5E7EB",
            bgcolor: "#F8FAFC",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            mb={3}
          >
            Invoice Summary
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
                ₹{subTotal.toLocaleString()}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Typography color="text.secondary">
                Discount
              </Typography>

              <Typography
                fontWeight={600}
                color="error.main"
              >
                - ₹{discount.toLocaleString()}
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Typography color="text.secondary">
                GST
              </Typography>

              <Typography
                fontWeight={600}
                color="success.main"
              >
                + ₹{gst.toLocaleString()}
              </Typography>
            </Box>

            <Divider />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Total Amount
              </Typography>

              <Typography
                variant="h5"
                fontWeight={700}
                color="primary"
              >
                ₹{totalAmount.toLocaleString()}
              </Typography>
            </Box>

          </Stack>
        </Paper>

      </DialogContent>

      {/* ================= Footer ================= */}

      <DialogActions
        sx={{
          px: 4,
          py: 3,
          borderTop: "1px solid #E5E7EB",
          justifyContent: "flex-end",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            minWidth: 130,
            height: 44,
            borderRadius: 1,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            minWidth: 170,
            height: 44,
            borderRadius: 1,
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#2563EB",
            "&:hover": {
              bgcolor: "#1D4ED8",
            },
          }}
        >
          {invoice
            ? "Update Invoice"
            : "Create Invoice"}
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default CreateInvoiceModal;