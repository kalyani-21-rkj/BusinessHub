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

const InventoryFilters = ({
  keyword,
  setKeyword,
  category,
  setCategory,
  onAddStock,
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
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
    boxShadow: "0 8px 24px rgba(37,99,235,.06)",
  }}
>
  {/* Left Side */}

  <div
    style={{
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
      alignItems: "center",
    }}
  >
    {/* Search */}

    <TextField
      placeholder="Search product..."
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

    {/* Category */}

    <TextField
      select
      size="small"
      label="Category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      sx={{ width: 180 }}
    >
      <MenuItem value="">All Categories</MenuItem>
      <MenuItem value="Laptop">Laptop</MenuItem>
      <MenuItem value="Mobile">Mobile</MenuItem>
      <MenuItem value="Tablet">Tablet</MenuItem>
      <MenuItem value="Accessories">Accessories</MenuItem>
    </TextField>
  </div>

  {/* Right Side */}

  <Button
    variant="contained"
    startIcon={<Add />}
    onClick={onAddStock}
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
    Add Stock
  </Button>
</Paper>
  );
};

export default InventoryFilters;