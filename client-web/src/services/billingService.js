import axios from "axios";

const API = "https://businesshub-api-mgxa.onrender.com/api/bills";


export const getBills = () => {
  return axios.get(API);
};

export const getBill = (id) => {
  return axios.get(`${API}/${id}`);
};

export const createBill = (data) => {
  return axios.post(API, data);
};

export const deleteBill = (id) => {
  return axios.delete(`${API}/${id}`);
};