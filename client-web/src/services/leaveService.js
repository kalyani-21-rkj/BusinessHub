import API from "./api";

export const getLeaves = (page = 1, search = "") =>
  API.get(`/leaves?page=${page}&search=${search}`);

export const getLeaveStats = () =>
  API.get("/leaves/stats");

export const applyLeave = (data) =>
  API.post("/leaves", data);

export const updateLeave = (id, data) =>
  API.put(`/leaves/${id}`, data);

export const deleteLeave = (id) =>
  API.delete(`/leaves/${id}`);

export const getLeaveById = (id) =>
  API.get(`/leaves/${id}`);

export const approveLeave = (id) =>
  API.patch(`/leaves/${id}/approve`);

export const rejectLeave = (id) =>
  API.patch(`/leaves/${id}/reject`);