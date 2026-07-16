import API from "./api";

export const getEmployees = (page = 1, search = "") => {
  return API.get(`/employees?page=${page}&search=${search}`);
};

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