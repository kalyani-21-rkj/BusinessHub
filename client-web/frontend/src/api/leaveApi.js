import API from "./axios";

export const getLeaves = () =>
    API.get("/leaves");

export const createLeave = (data) =>
    API.post("/leaves", data);

export const updateLeave = (id, data) =>
    API.put(`/leaves/${id}`, data);

export const deleteLeave = (id) =>
    API.delete(`/leaves/${id}`);