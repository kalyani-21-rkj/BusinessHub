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

const ProductFilters = ({
  keyword,
  setKeyword,
  category,
  setCategory,
  brand,
  setBrand,
  sort,
  setSort,
  onAddProduct,
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
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Categories</MenuItem>
        <MenuItem value="Laptop">Laptop</MenuItem>
        <MenuItem value="Mobile">Mobile</MenuItem>
        <MenuItem value="Tablet">Tablet</MenuItem>
        <MenuItem value="Accessories">Accessories</MenuItem>
      </TextField>

      {/* Brand */}

      <TextField
        select
        size="small"
        label="Brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        sx={{ minWidth: 170 }}
      >
        <MenuItem value="">All Brands</MenuItem>
        <MenuItem value="Apple">Apple</MenuItem>
        <MenuItem value="Samsung">Samsung</MenuItem>
        <MenuItem value="Dell">Dell</MenuItem>
        <MenuItem value="HP">HP</MenuItem>
        <MenuItem value="Lenovo">Lenovo</MenuItem>
        <MenuItem value="Asus">Asus</MenuItem>
        <MenuItem value="Acer">Acer</MenuItem>
      </TextField>

      {/* Sort */}

      <TextField
        select
        size="small"
        label="Sort By"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="newest">Newest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem>
        <MenuItem value="priceLow">Price Low → High</MenuItem>
        <MenuItem value="priceHigh">Price High → Low</MenuItem>
        <MenuItem value="stockLow">Stock Low → High</MenuItem>
        <MenuItem value="stockHigh">Stock High → Low</MenuItem>
      </TextField>

      {/* Add Product */}

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onAddProduct}
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
        Add Product
      </Button>
    </Paper>
  );
};

export default ProductFilters;