/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Button,
  Typography,
  Divider,
} from "@mui/material";

import {
  generatePayroll,
  updatePayroll,
} from "../../services/payrollService";

import { getEmployees } from "../../services/employeeService";
const PayrollModal = ({
  open,
  payroll,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
  employee:"",
  month:"",
  year:new Date().getFullYear(),
  basicSalary:"",
  hra:"",
  da:"",
  bonus:"",
  deduction:"",
  netSalary:"",
  paymentStatus:"Pending",
  paymentMethod:"Bank Transfer",
});

  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchEmployees();
}, []);

  useEffect(() => {
    if (payroll) {
      setFormData({
        employee:
          payroll.employee?._id || payroll.employee || "",
        department: payroll.department || "",
        basicSalary: payroll.basicSalary || "",
        bonus: payroll.bonus || "",
        deduction: payroll.deduction || "",
        netSalary: payroll.netSalary || "",
        paymentStatus:
          payroll.paymentStatus || "Pending",
        paymentMethod:
          payroll.paymentMethod || "Bank Transfer",
          month: payroll.month || "",
        year: payroll.year || new Date().getFullYear(),
        hra: payroll.hra || "",
        da: payroll.da || "",
          
      });
    } else {
      setFormData({
        employee: "",
        department: "",
        basicSalary: "",
        bonus: "",
        deduction: "",
        netSalary: "",
        paymentStatus: "Pending",
        paymentMethod: "Bank Transfer",
      });
    }
  }, [payroll]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    const basic = Number(updated.basicSalary) || 0;
    const hra = Number(updated.hra) || 0;
    const da = Number(updated.da) || 0;
    const bonus = Number(updated.bonus) || 0;
    const deduction = Number(updated.deduction) || 0;

    updated.netSalary =
      basic + hra + da + bonus - deduction;

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (payroll?._id) {
        await updatePayroll(
          payroll._id,
          formData
        );

        alert("Payroll Updated Successfully");
      } else {
        await generatePayroll(formData);

        alert("Payroll Generated Successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Save Payroll"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="md"
    fullWidth
    slotProps={{
      paper: {
        sx: {
          borderRadius: 4,
        },
      },
    }}
  >
    <DialogTitle
      sx={{
        fontSize: 28,
        fontWeight: 700,
        pb: 1,
        bgcolor: "#2563EB",
        color: "#fff",
      }}
    >
      {payroll ? "Edit Payroll" : "Generate Payroll"}

      <Typography
        variant="body2"
        sx={{
          mt: 0.5,
          color: "#E5E7EB",
        }}
      >
        Fill payroll details
      </Typography>
    </DialogTitle>

    <Divider />

    <DialogContent sx={{ mt: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>

          {/* Employee */}

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Employee"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
            >
              <MenuItem value="">
                Select Employee
              </MenuItem>

              {employees.map((emp) => (
                <MenuItem
                  key={emp._id}
                  value={emp._id}
                >
                  {emp.fullName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Month */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Month"
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Year */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Year"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
            />
          </Grid>

          {/* Department */}

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Inventory">Inventory</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
            </TextField>
          </Grid>

          {/* Basic Salary */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Basic Salary"
              name="basicSalary"
              type="number"
              value={formData.basicSalary}
              onChange={handleChange}
            />
          </Grid>

          {/* HRA */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="HRA"
              name="hra"
              type="number"
              value={formData.hra}
              onChange={handleChange}
            />
          </Grid>

          {/* DA */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="DA"
              name="da"
              type="number"
              value={formData.da}
              onChange={handleChange}
            />
          </Grid>

          {/* Bonus */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Bonus"
              name="bonus"
              type="number"
              value={formData.bonus}
              onChange={handleChange}
            />
          </Grid>

          {/* Deduction */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Deduction"
              name="deduction"
              type="number"
              value={formData.deduction}
              onChange={handleChange}
            />
          </Grid>

          {/* Net Salary */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Net Salary"
              name="netSalary"
              type="number"
              value={formData.netSalary}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          {/* Payment Status */}

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Payment Status"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
            >
              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Paid">
                Paid
              </MenuItem>
            </TextField>
          </Grid>

          {/* Payment Method */}

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <MenuItem value="Bank Transfer">
                Bank Transfer
              </MenuItem>

              <MenuItem value="UPI">
                UPI
              </MenuItem>

              <MenuItem value="Cash">
                Cash
              </MenuItem>

              <MenuItem value="Cheque">
                Cheque
              </MenuItem>
            </TextField>
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
          borderRadius: 2,
          textTransform: "none",
          px: 3,
          bgcolor: "#2563EB",
          "&:hover": {
            bgcolor: "#1D4ED8",
          },
        }}
      >
        {loading
          ? "Saving..."
          : payroll
          ? "Update Payroll"
          : "Generate Payroll"}
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default PayrollModal;