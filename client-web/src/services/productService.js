import api from "./api";

// Get All Products
export const getProducts = (
  page = 1,
  search = "",
  category = "",
  brand = "",
  sort = ""
) => {
  return api.get("/products", {
    params: {
      page,
      search,
      category,
      brand,
      sort,
    },
  });
};

// Get Product By ID
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

// Add Product
export const createProduct = (data) => {
  return api.post("/products", data);
};

// Update Product
export const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};

// Delete Product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

// Product Stats
export const getProductStats = () => {
  return api.get("/products/stats");
};