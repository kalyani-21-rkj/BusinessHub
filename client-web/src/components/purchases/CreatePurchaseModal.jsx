/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import { FaPlus, FaTrash } from "react-icons/fa";

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
  Divider,
  IconButton,
  Paper,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { getProducts } from "../../services/productService";

const suppliers = [
  "Apple India",
  "Dell India",
  "Samsung",
  "HP India",
];

const warehouses = [
  "Mumbai",
  "Pune",
  "Delhi",
];

const CreatePurchaseModal = ({
  onClose,
  onSave,
  purchase,
}) => {
  const [form, setForm] = useState({
    supplier: purchase?.supplier || "",
    warehouse: purchase?.warehouse || "",
    expectedDate: purchase?.expectedDate
      ? purchase.expectedDate.slice(0, 10)
      : "",
    notes: purchase?.notes || "",
  });

  const [productList, setProductList] = useState([]);

  const [products, setProducts] = useState(
    purchase?.products?.length
      ? purchase.products.map((item) => ({
          product: item.product?._id || item.product,
          quantity: item.quantity,
          purchasePrice: item.purchasePrice,
          gst: item.gst || 18,
        }))
      : [
          {
            product: "",
            quantity: "",
            purchasePrice: "",
            gst: 18,
          },
        ]
  );

  const [errors, setErrors] = useState({});

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProductList(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductChange = (
    index,
    field,
    value
  ) => {
    const temp = [...products];

    temp[index][field] = value;

    setProducts(temp);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        product: "",
        quantity: "",
        purchasePrice: "",
        gst: 18,
      },
    ]);
  };

  const removeProduct = (index) => {
    if (products.length === 1) return;

    setProducts(
      products.filter((_, i) => i !== index)
    );
  };

  const validate = () => {
    let newErrors = {};

    if (!form.supplier)
      newErrors.supplier = "Supplier required";

    if (!form.warehouse)
      newErrors.warehouse = "Warehouse required";

    if (!form.expectedDate)
      newErrors.expectedDate =
        "Expected Date required";

    products.forEach((item, index) => {
      if (!item.product)
        newErrors[`product${index}`] = "Required";

      if (
        !item.quantity ||
        Number(item.quantity) <= 0
      )
        newErrors[`quantity${index}`] = "Invalid";

      if (
        !item.purchasePrice ||
        Number(item.purchasePrice) <= 0
      )
        newErrors[`purchasePrice${index}`] =
          "Invalid";
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave({
      supplier: form.supplier,
      warehouse: form.warehouse,
      expectedDate: form.expectedDate,
      notes: form.notes,
      status: purchase?.status || "Pending",
      products,
    });
  };
  return (
  <Dialog
    open
    onClose={onClose}
    maxWidth="lg"
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: 4,
        width: "900px",   // or 1000px
      maxWidth: "95vw",
      },
    }}
  >
    {/* Header */}

    <DialogTitle
      sx={{
        bgcolor: "#2563EB",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
      }}
    >
      <div>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          {purchase
            ? "Edit Purchase Order"
            : "Create Purchase Order"}
        </Typography>

        <Typography variant="body2">
          Fill purchase order details
        </Typography>
      </div>

      <IconButton
        onClick={onClose}
        sx={{ color: "#fff" }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>

    <Divider />

    <DialogContent sx={{ mt: 3 }}>
      {/* Supplier Details */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
        }}
      >
        <Typography
          fontWeight={700}
          mb={2}
        >
          Supplier Information
        </Typography>

        <Grid container spacing={3}>
          {/* Supplier */}

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Supplier"
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              error={!!errors.supplier}
              helperText={errors.supplier}
            >
              <MenuItem value="">
                Select Supplier
              </MenuItem>

              {suppliers.map((supplier) => (
                <MenuItem
                  key={supplier}
                  value={supplier}
                >
                  {supplier}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Warehouse */}

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              size="large"
              label="Warehouse"
              name="warehouse"
              value={form.warehouse}
              onChange={handleChange}
              error={!!errors.warehouse}
              helperText={errors.warehouse}
            >
              <MenuItem value="">
                Select Warehouse
              </MenuItem>

              {warehouses.map((warehouse) => (
                <MenuItem
                  key={warehouse}
                  value={warehouse}
                >
                  {warehouse}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Expected Date */}

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              type="date"
              name="expectedDate"
              value={form.expectedDate}
              onChange={handleChange}
              error={!!errors.expectedDate}
              helperText={errors.expectedDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Products Section Starts Here */}

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography fontWeight={700}>
            Products
          </Typography>

          <Button
            variant="contained"
            startIcon={<FaPlus />}
            onClick={addProduct}
            sx={{
              bgcolor: "#2563EB",
              textTransform: "none",
              borderRadius: 2,
              marginLeft:110,
              marginBottom:2,
            }}
          >
            Add Product
          </Button>
        </Grid>
                {products.map((item, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 2,
              mb: 4,
              
              borderRadius: 3,
              bgcolor: "#F8FAFC",
              border: "1px solid #E5E7EB",
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="centre"
              
            >
              {/* Product */}

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Product"
                  value={item.product}
                  error={!!errors[`product${index}`]}
                  helperText={
                    errors[`product${index}`]
                  }
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "product",
                      e.target.value
                    )
                  }
                >
                  <MenuItem value="">
                    Select Product
                  </MenuItem>

                  {productList.map((product) => (
                    <MenuItem
                      key={product._id}
                      value={product._id}
                    >
                      {product.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Quantity */}

              <Grid item xs={12} sm={4} md={2} >
                <TextField
                  fullWidth
                  label="Qty"
                  type="number"
                  value={item.quantity}
                  error={
                    !!errors[`quantity${index}`]
                  }
                  helperText={
                    errors[`quantity${index}`]
                  }
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "quantity",
                      e.target.value
                    )
                  }
                />
              </Grid>

              {/* Purchase Price */}

              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={item.purchasePrice}
                  error={
                    !!errors[
                      `purchasePrice${index}`
                    ]
                  }
                  helperText={
                    errors[
                      `purchasePrice${index}`
                    ]
                  }
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "purchasePrice",
                      e.target.value
                    )
                  }
                />
              </Grid>

              {/* GST */}

              <Grid item xs={12} sm={4} md={2}>
                <TextField
                  fullWidth
                  label="GST %"
                  type="number"
                  value={item.gst}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "gst",
                      e.target.value
                    )
                  }
                />
              </Grid>

              {/* Delete Button */}

              <Grid
                item
                xs={12}
                md={2}
                display="flex"
                justifyContent="center"
              >
                <Button
                  fullWidth
                  color="error"
                  variant="outlined"
                  startIcon={<FaTrash />}
                  onClick={() =>
                    removeProduct(index)
                  }
                  sx={{
                    height: 55,
                    borderRadius: 2,
                  }}
                >
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
                {/* Notes */}

        <TextField
          fullWidth
          size="small"
          multiline
          rows={4}
          label="Notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />
      </Paper>
    </DialogContent>

    <Divider />

    {/* Footer */}

    <DialogActions
      sx={{
        px: 3,
        py: 2,
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={onClose}
        sx={{
          borderRadius: 2,
          textTransform: "none",
          px: 3,
        }}
      >
        Cancel
      </Button>

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          bgcolor: "#2563EB",
          borderRadius: 2,
          px: 4,
          textTransform: "none",
          "&:hover": {
            bgcolor: "#1D4ED8",
          },
        }}
      >
        {purchase
          ? "Update Purchase"
          : "Create Purchase"}
      </Button>
    </DialogActions>
  </Dialog>
);

};

export default CreatePurchaseModal;