/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  Typography,
  Divider,
} from "@mui/material";

const AddStockModal = ({
  open,
  onClose,
  onSave,
  product,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    quantity: "",
  });

  useEffect(() => {
    if (!open) return;

    setFormData({
      quantity: "",
    });
  }, [open]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      quantity: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      alert("Please enter valid quantity");
      return;
    }

    try {
      setLoading(true);

      await onSave({
        quantity: Number(formData.quantity),
      });

      setFormData({
        quantity: "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="sm"
    fullWidth
    slotProps={{
      paper: {
        sx: {
          borderRadius: 4,
        },
      },
    }}
  >
    {/* Header */}

    <DialogTitle
      sx={{
        bgcolor: "#2563EB",
        color: "#fff",
        fontSize: 28,
        fontWeight: 700,
        pb: 1,
      }}
    >
      Add Stock

      <Typography
        sx={{
          mt: 0.5,
          color: "#DBEAFE",
          fontSize: 14,
        }}
      >
        Update product inventory
      </Typography>
    </DialogTitle>

    <Divider />

    <DialogContent sx={{ mt: 3 }}>

      <form onSubmit={handleSubmit}>

        <Grid container spacing={3}>

          {/* Product */}

          <Grid item xs={12}>

            <TextField
              fullWidth
              size="small"
              label="Product"
              value={product?.name || ""}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "#F8FAFC",
                },
              }}
            />

          </Grid>

          {/* Current Stock */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              size="small"
              label="Current Stock"
              value={product?.stock || 0}
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "#F8FAFC",
                },
              }}
            />

          </Grid>

          {/* Quantity */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              size="small"
              type="number"
              label="Add Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              inputProps={{
                min: 1,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "#fff",
                },
              }}
            />

          </Grid>

          {/* New Stock */}

          <Grid item xs={12}>

            <TextField
              fullWidth
              size="small"
              label="Stock After Update"
              value={
                Number(product?.stock || 0) +
                Number(formData.quantity || 0)
              }
              disabled
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  bgcolor: "#F8FAFC",
                },
              }}
            />

          </Grid>

        </Grid>

      </form>

    </DialogContent>

    <DialogActions
      sx={{
        px: 3,
        pb: 3,
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
        disabled={loading}
        sx={{
          bgcolor: "#2563EB",
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          "&:hover": {
            bgcolor: "#1D4ED8",
          },
        }}
      >
        {loading ? "Saving..." : "Update Stock"}
      </Button>

    </DialogActions>

  </Dialog>
);
};

export default AddStockModal;