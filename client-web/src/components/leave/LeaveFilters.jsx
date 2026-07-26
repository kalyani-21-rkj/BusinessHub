import {
  Paper,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";

import {
  Search,
  Add,
} from "@mui/icons-material";

const LeaveFilters = ({
  keyword,
  setKeyword,
  department,
  setDepartment,
  leaveType,
  setLeaveType,
  status,
  setStatus,
  onApplyLeave,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 1,
        mt: 1,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        boxShadow: "0 8px 24px rgba(37,99,235,.06)",
      }}
    >
      {/* Search */}

      <TextField
        placeholder="Search employee..."
        size="small"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        sx={{
          width: {
            xs: "100%",
            sm: 280,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Department */}

      <TextField
        select
        size="small"
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Departments</MenuItem>
        <MenuItem value="HR">HR</MenuItem>
        <MenuItem value="Sales">Sales</MenuItem>
        <MenuItem value="Finance">Finance</MenuItem>
        <MenuItem value="Inventory">Inventory</MenuItem>
        <MenuItem value="IT">IT</MenuItem>
      </TextField>

      {/* Leave Type */}

      <TextField
        select
        size="small"
        label="Leave Type"
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Leave Types</MenuItem>
        <MenuItem value="Casual Leave">Casual Leave</MenuItem>
        <MenuItem value="Sick Leave">Sick Leave</MenuItem>
        <MenuItem value="Paid Leave">Paid Leave</MenuItem>
        <MenuItem value="Maternity Leave">Maternity Leave</MenuItem>
      </TextField>

      {/* Status */}

      <TextField
        select
        size="small"
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Rejected">Rejected</MenuItem>
      </TextField>

      {/* Button */}

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onApplyLeave}
        sx={{
          bgcolor: "#2563EB",
          borderRadius: 3,
          px: 3,
          py: 1.2,
          textTransform: "none",
          fontWeight: 600,
          "&:hover": {
            bgcolor: "#1D4ED8",
          },
        }}
      >
        Apply Leave
      </Button>
    </Paper>
  );
};

export default LeaveFilters;