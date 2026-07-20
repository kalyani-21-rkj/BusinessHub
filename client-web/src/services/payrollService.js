import API from "./api";

export const getPayrolls = (
  page = 1,
  search = "",
  department = "",
  month = "",
  status = ""
) => {
  const params = new URLSearchParams();

  params.append("page", page);

  if (search) params.append("search", search);
  if (department) params.append("department", department);
  if (month) params.append("month", month);
  if (status) params.append("paymentStatus", status);

  return API.get(`/payroll?${params.toString()}`);
};
export const getPayrollStats = () => {
  return API.get("/payroll/stats");
};

export const generatePayroll = (data) => {
  return API.post("/payroll", data);
};

export const updatePayroll = (id, data) => {
  return API.put(`/payroll/${id}`, data);
};

export const deletePayroll = (id) => {
  return API.delete(`/payroll/${id}`);
};

export const getPayrollById = (id) => {
  return API.get(`/payroll/${id}`);
};

export const downloadPayslip = (id) =>
  API.get(`/payroll/${id}/payslip`, {
    responseType: "blob",
  });