import API from "./api";

export const getAttendance = (page = 1, search = "") =>
  API.get(`/attendance?page=${page}&search=${search}`);

export const getAttendanceStats = () =>
  API.get("/attendance/stats");

export const markAttendance = (data) =>
  API.post("/attendance", data);

export const updateAttendance = (id, data) =>
  API.put(`/attendance/${id}`, data);

export const deleteAttendance = (id) =>
  API.delete(`/attendance/${id}`);

export const getAttendanceById = (id) =>
  API.get(`/attendance/${id}`);

export const getMonthlyAttendance = (month, year) =>
  API.get(`/attendance/monthly?month=${month}&year=${year}`);