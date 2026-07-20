import api from "./api";
export const getPurchases = (
  page = 1,
  search = "",
  supplier = "",
  warehouse = "",
  status = ""
) => {
  return api.get("/purchases", {
    params: {
      page,
      search,
      supplier,
      warehouse,
      status,
    },
  });
};

export const getPurchaseById = (id) => {
  return api.get(`/purchases/${id}`);
};
export const addPurchase = (data) => {
  return api.post("/purchases", data);
};
export const updatePurchase = (id, data) => {
  return api.put(`/purchases/${id}`, data);
};
export const deletePurchase = (id) => {
  return api.delete(`/purchases/${id}`);
};
export const getPurchaseStats = () => {
  return api.get("/purchases/stats");
};