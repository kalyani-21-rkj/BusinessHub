/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  Box,
} from "@mui/material";

import {
  Close,
  Person,
  Email,
  Phone,
  Business,
  LocationOn,
  Badge,
} from "@mui/icons-material";

import {
  addCustomer,
  updateCustomer,
} from "../../services/customerService";

const CustomerModal = ({
  open,
  onClose,
  onSuccess,
  customer,
}) => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    status: "Lead",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (customer) {

      setFormData({
        fullName: customer.fullName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        company: customer.company || "",
        address: customer.address || "",
        status: customer.status || "Lead",
      });

    } else {

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        status: "Lead",
      });

    }

  }, [customer]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  if (!open) return null;
    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (customer) {

        await updateCustomer(customer._id, formData);

        alert("Customer Updated Successfully");

      } else {

        await addCustomer(formData);

        alert("Customer Added Successfully");

      }

      onSuccess();

      onClose();

    } catch (err) {

      console.error(err);

      alert("Operation Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 5,
          overflow: "hidden",
        },
      }}
    >

      {/* Header */}

      <DialogTitle
        sx={{
          bgcolor: "#2563EB",
          color: "#fff",
          px: 4,
          py: 3,
        }}
      >

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <Box>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {customer
                ? "Edit Customer"
                : "Add Customer"}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                opacity: .85,
                mt: .5,
              }}
            >
              Enter customer information
            </Typography>

          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color: "#fff",
            }}
          >
            <Close />
          </IconButton>

        </Box>

      </DialogTitle>

      <form onSubmit={handleSubmit}>

        <DialogContent
          sx={{
            p: 4,
            mt: 2,
          }}
        >

          <Grid
            container
            spacing={3}
          >

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                required
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                required
                type="email"
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                required
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                fullWidth
                label="Company Name"
                name="company"
                value={formData.company}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
                <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{
                        alignSelf: "flex-start",
                        mt: 1,
                      }}
                    >
                      <LocationOn color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Customer Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Badge color="primary" />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="Lead">Lead</MenuItem>
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            </Grid>

          </Grid>
        </Grid>

        </DialogContent>

        <Divider />

        <DialogActions
          sx={{
            px: 4,
            py: 3,
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{
              borderRadius: 3,
              px: 4,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              background: "#2563EB",
              borderRadius: 3,
              px: 5,
              py: 1.3,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "0 10px 25px rgba(37,99,235,.25)",
              "&:hover": {
                background: "#1D4ED8",
              },
            }}
          >
            {loading
              ? "Saving..."
              : customer
              ? "Update Customer"
              : "Save Customer"}
          </Button>

        </DialogActions>

      </form>

    </Dialog>
  );
};

export default CustomerModal;

           