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

const PayrollFilters = ({
  search,
  setSearch,
  department,
  setDepartment,
  month,
  setMonth,
  status,
  setStatus,
  onCreatePayroll,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 4,
        mt: 3,
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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
        <MenuItem value="IT">IT</MenuItem>
      </TextField>

      {/* Month */}

      <TextField
        select
        size="small"
        label="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Months</MenuItem>
        <MenuItem value="January">January</MenuItem>
        <MenuItem value="February">February</MenuItem>
        <MenuItem value="March">March</MenuItem>
        <MenuItem value="April">April</MenuItem>
        <MenuItem value="May">May</MenuItem>
        <MenuItem value="June">June</MenuItem>
        <MenuItem value="July">July</MenuItem>
        <MenuItem value="August">August</MenuItem>
        <MenuItem value="September">September</MenuItem>
        <MenuItem value="October">October</MenuItem>
        <MenuItem value="November">November</MenuItem>
        <MenuItem value="December">December</MenuItem>
      </TextField>

      {/* Status */}

      <TextField
        select
        size="small"
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All Status</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </TextField>

      {/* Add Payroll */}

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onCreatePayroll}
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
        Add Payroll
      </Button>
    </Paper>
  );
};

export default PayrollFilters;