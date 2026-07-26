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

const PurchaseFilters = ({
  keyword,
  setKeyword,
  supplier,
  setSupplier,
  warehouse,
  setWarehouse,
  status,
  setStatus,
  onCreatePurchase,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 2,
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
        placeholder="Search Purchase Order..."
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

      {/* Supplier */}

      <TextField
        select
        size="small"
        label="Supplier"
        value={supplier}
        onChange={(e) => setSupplier(e.target.value)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All Suppliers</MenuItem>
        <MenuItem value="Apple India">Apple India</MenuItem>
        <MenuItem value="Dell India">Dell India</MenuItem>
        <MenuItem value="Samsung">Samsung</MenuItem>
      </TextField>

      {/* Warehouse */}

      <TextField
        select
        size="small"
        label="Warehouse"
        value={warehouse}
        onChange={(e) => setWarehouse(e.target.value)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Warehouses</MenuItem>
        <MenuItem value="Mumbai">Mumbai</MenuItem>
        <MenuItem value="Pune">Pune</MenuItem>
        <MenuItem value="Delhi">Delhi</MenuItem>
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
        <MenuItem value="Ordered">Ordered</MenuItem>
        <MenuItem value="Received">Received</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
      </TextField>

      {/* Create Purchase */}

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onCreatePurchase}
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
        Create Purchase
      </Button>
    </Paper>
  );
};

export default PurchaseFilters;