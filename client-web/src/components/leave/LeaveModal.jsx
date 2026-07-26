/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

import {
  applyLeave,
  updateLeave,
} from "../../services/leaveService";

import { getAllEmployees } from "../../services/employeeService";

const LeaveModal = ({
  open,
  leave,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee: "",
    department: "",
    type: "Casual",
    from: "",
    to: "",
    status: "Pending",
    reason: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await getAllEmployees();

        setEmployees(res.data.employees || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (leave) {
      setFormData({
        employee:
          leave.employee?._id ||
          leave.employee ||
          "",

        department:
          leave.employee?.department ||
          leave.department ||
          "",

        type:
          leave.leaveType ||
          leave.type ||
          "Casual",

        from:
          leave.fromDate
            ? leave.fromDate.slice(0, 10)
            : leave.from || "",

        to:
          leave.toDate
            ? leave.toDate.slice(0, 10)
            : leave.to || "",

        status:
          leave.status || "Pending",

        reason:
          leave.reason || "",
      });
    } else {
      setFormData({
        employee: "",
        department: "",
        type: "Casual",
        from: "",
        to: "",
        status: "Pending",
        reason: "",
      });
    }
  }, [leave]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "employee") {
      const emp = employees.find(
        (item) => item._id === value
      );

      setFormData({
        ...formData,
        employee: value,
        department: emp?.department || "",
      });

      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const totalDays =
        Math.ceil(
          (new Date(formData.to) -
            new Date(formData.from)) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      const payload = {
        employee: formData.employee,
        leaveType: formData.type,
        fromDate: formData.from,
        toDate: formData.to,
        totalDays,
        reason: formData.reason,
        status: formData.status,
      };

      if (leave?._id) {
        await updateLeave(
          leave._id,
          payload
        );

        alert("Leave Updated Successfully");
      } else {
        await applyLeave(payload);

        alert("Leave Applied Successfully");
      }

      onSuccess();

      onClose();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Save Leave"
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
    {/* Header */}

    <DialogTitle
      sx={{
        background:
          "linear-gradient(135deg,#2563EB,#1D4ED8)",
        color: "#fff",
        py: 3,
      }}
    >
      <Typography
        fontSize={28}
        fontWeight={700}
      >
        {leave
          ? "Update Leave"
          : "Apply Leave"}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          opacity: 0.9,
          mt: 0.5,
        }}
      >
        Fill leave details
      </Typography>
    </DialogTitle>

    <Divider />

    <form onSubmit={handleSubmit}>

      <DialogContent sx={{ p: 4 }}>

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

          {/* Department */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              label="Department"
              value={formData.department}
              InputProps={{
                readOnly: true,
              }}
            />

          </Grid>

          {/* Leave Type */}

          <Grid item xs={12} md={6}>

            <TextField
              select
              fullWidth
              label="Leave Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >

              <MenuItem value="Casual">
                Casual
              </MenuItem>

              <MenuItem value="Sick">
                Sick
              </MenuItem>

              <MenuItem value="Paid">
                Paid
              </MenuItem>

              <MenuItem value="Emergency">
                Emergency
              </MenuItem>

              <MenuItem value="Maternity">
                Maternity
              </MenuItem>

              <MenuItem value="Paternity">
                Paternity
              </MenuItem>

            </TextField>

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

              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="Approved">
                Approved
              </MenuItem>

              <MenuItem value="Rejected">
                Rejected
              </MenuItem>

            </TextField>

          </Grid>

          {/* From Date */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              size="small"
              label="From Date"
              type="date"
              name="from"
             value={formData.from}
             onChange={handleChange}
               slotProps={{
              inputLabel: {
              shrink: true,
            },
          }}
        />
          </Grid>

          {/* To Date */}

          <Grid item xs={12} md={6}>

            <TextField
              fullWidth
              size="small"
              label="To Date"
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
            slotProps={{
              inputLabel: {
              shrink: true,
          },
        }}
      />

          </Grid>

          {/* Reason */}

          <Grid item xs={12}>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter leave reason..."
            />

          </Grid>

        </Grid>

      </DialogContent>
            <DialogActions
        sx={{
          px: 3,
          pb: 3,
          gap: 2,
          justifyContent: "flex-end",
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
          type="submit"
          variant="contained"
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
            : leave
            ? "Update Leave"
            : "Apply Leave"}
        </Button>
      </DialogActions>

    </form>

  </Dialog>
);

};

export default LeaveModal;