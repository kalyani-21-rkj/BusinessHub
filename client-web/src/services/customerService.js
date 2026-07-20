import API from "./api";

export const getCustomers = (page = 1, keyword = "") => {
  return API.get(`/customers?page=${page}&search=${keyword}`);
};

export const getCustomer = (id) => {
  return API.get(`/customers/${id}`);
};

export const addCustomer = (data) => {
  return API.post("/customers", data);
};

export const updateCustomer = (id, data) => {
  return API.put(`/customers/${id}`, data);
};

export const deleteCustomer = (id) => {
  return API.delete(`/customers/${id}`);
};

export const getCustomerStats = () => {
  return API.get("/customers/stats");
};