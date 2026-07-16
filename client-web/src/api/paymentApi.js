import API from "./axios";

export const getPayments = () =>
    API.get("/payments");

export const createPayment = (data) =>
    API.post("/payments", data);

export const updatePayment = (id, data) =>
    API.put(`/payments/${id}`, data);

export const deletePayment = (id) =>
    API.delete(`/payments/${id}`);