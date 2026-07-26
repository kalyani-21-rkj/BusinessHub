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
  markAttendance,
  updateAttendance,
} from "../../services/attendanceService";

import { getEmployees } from "../../services/employeeService";



const AttendanceModal = ({
  open,
  onClose,
  attendance,
  onSuccess,
}) => {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present",
    remarks: "",
  });

  useEffect(() => {
    if (!open) return;

    const loadEmployees = async () => {
      try {
        const res = await getEmployees();
        setEmployees(res.data.employees || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadEmployees();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (attendance) {
      setFormData({
        employee:
          attendance.employee?._id || attendance.employee || "",
        date: attendance.date
          ? attendance.date.substring(0, 10)
          : "",
        checkIn: attendance.checkIn || "",
        checkOut: attendance.checkOut || "",
        status: attendance.status || "Present",
        remarks: attendance.remarks || "",
      });
    } else {
      setFormData({
        employee: "",
        date: new Date().toISOString().split("T")[0],
        checkIn: "",
        checkOut: "",
        status: "Present",
        remarks: "",
      });
    }
  }, [attendance, open]);

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

      if (attendance) {
        await updateAttendance(
          attendance._id,
          formData
        );

        alert("Attendance Updated Successfully");
      } else {
        await markAttendance(formData);

        alert("Attendance Marked Successfully");
      }

      onSuccess();

      onClose();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Save Attendance"
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
      {attendance ? "Edit Attendance" : "Mark Attendance"}

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 0.5 }}
      >
        Fill attendance details
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

          {/* Date */}

          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              label="Attendance Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Check In */}

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              size="small"
              label="Check In"
              type="time"
              name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            slotProps={{
            inputLabel: {
            shrink: true,
          },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
        bgcolor: "#fff",
    },
  }}
/>
          </Grid>

          {/* Check Out */}

          <Grid item xs={12} md={6}>
            <TextField
                fullWidth
                size="small"
                label="Check Out"
                type="time"
                name="checkOut"
               value={formData.checkOut}
              onChange={handleChange}
              slotProps={{
            inputLabel: {
              shrink: true,
            },
       }}
      sx={{
          "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          bgcolor: "#fff",
        },
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
              <MenuItem value="Present">
                Present
              </MenuItem>

              <MenuItem value="Absent">
                Absent
              </MenuItem>

              <MenuItem value="Half Day">
                Half Day
              </MenuItem>

              <MenuItem value="Leave">
                Leave
              </MenuItem>
            </TextField>
          </Grid>

          {/* Empty space */}

          <Grid item xs={12} md={6}></Grid>

          {/* Remarks */}

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
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
          : attendance
          ? "Update Attendance"
          : "Save Attendance"}
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default AttendanceModal;

