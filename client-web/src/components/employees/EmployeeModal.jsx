/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Typography,
  Divider,
} from "@mui/material";

import {
  Person,
  Email,
  Phone,
  Business,
  Work,
  CurrencyRupee,
  CalendarMonth,
} from "@mui/icons-material";

import {
  addEmployee,
  updateEmployee,
} from "../../services/employeeService";

const EmployeeModal = ({
  open,
  employee,
  onClose,
  onSuccess,
}) => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (employee) {

      setFormData({
        fullName: employee.fullName || "",
        email: employee.email || "",
        phone: employee.phone || "",
        department: employee.department || "",
        designation: employee.designation || "",
        salary: employee.salary || "",
        joiningDate: employee.joiningDate
          ? employee.joiningDate.substring(0, 10)
          : "",
        status: employee.status || "Active",
      });

    } else {

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
        status: "Active",
      });

    }

  }, [employee, open]);
    if (!open) return null;

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (employee) {

        await updateEmployee(
          employee._id,
          formData
        );

        alert("Employee Updated Successfully");

      } else {

        await addEmployee(formData);

        alert("Employee Added Successfully");

      }

      onSuccess();

      onClose();

    } catch (err) {

      console.log(err);

      console.log(err.response);

      console.log(err.response?.data);

      alert(
        err.response?.data?.message ||
        "Unable to Add Employee"
      );

    } finally {

      setLoading(false);

    }

  };
  return (

  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="md"
    fullWidth
    PaperProps={{
      sx: {
        borderRadius: 4,
        overflow: "hidden",
      },
    }}
  >

    {/* Header */}

    <DialogTitle
      sx={{
        bgcolor: "#2563EB",
        color: "#fff",
        py: 2.5,
        mb:2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
      >
        {employee ? "Edit Employee" : "Add Employee"}
      </Typography>

      <Typography
        variant="body2"
        sx={{ opacity: .9 }}
      >
        Fill all employee details
      </Typography>
    </DialogTitle>

    <DialogContent sx={{ pt: 4 }}>

      <Grid container spacing={3} mt={15}>

        {/* Full Name */}

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

        {/* Email */}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            type="email"
            label="Email"
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

        {/* Phone */}

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

        {/* Department */}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Business color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Designation */}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Work color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Salary */}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            required
            type="number"
            label="Salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupee color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Joining Date */}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="date"
            //label="Joining Date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonth color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Status */}

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Grid>

      </Grid>

      <Divider sx={{ mt: 4 }} />
            <DialogActions
        sx={{
          px: 4,
          py: 3,
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
        }}
      >

        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            px: 4,
            py: 1.2,
            fontWeight: 600,
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            bgcolor: "#2563EB",
            textTransform: "none",
            borderRadius: 2,
            px: 4,
            py: 1.2,
            fontWeight: 700,
            boxShadow: "0 8px 20px rgba(37,99,235,.20)",

            "&:hover": {
              bgcolor: "#1D4ED8",
            },
          }}
        >
          {loading
            ? "Saving..."
            : employee
            ? "Update Employee"
            : "Save Employee"}
        </Button>

      </DialogActions>
    </DialogContent>

    </Dialog>

  )};



export default EmployeeModal;