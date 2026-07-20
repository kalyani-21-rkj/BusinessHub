import API from "./api";

// Employee Page
export const getEmployees = (page = 1, keyword = "") =>
  API.get(`/employees?page=${page}&search=${keyword}`);

// Employee Dropdown
export const getAllEmployees = () =>
  API.get("/employees?limit=1000");

export const addEmployee = (data) => {
  return API.post("/employees", data);
};

export const updateEmployee = (id, data) => {
  return API.put(`/employees/${id}`, data);
};

export const deleteEmployee = (id) => {
  return API.delete(`/employees/${id}`);
};

export const getEmployee = (id) => {
  return API.get(`/employees/${id}`);
};

export const getEmployeeStats = () => {
  return API.get("/employees/stats");
};