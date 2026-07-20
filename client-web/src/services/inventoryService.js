import api from "./api";

export const getInventory = (
  page = 1,
  search = "",
  category = ""
) => {
  return api.get("/products", {
    params: {
      page,
      search,
      category,
    },
  });
};

export const getInventoryStats = () => {
  return api.get("/products/stats");
};

export const addStock = (id, data) => {
    return api.patch(`/products/${id}/stock`, data);
};