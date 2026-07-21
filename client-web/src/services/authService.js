import axios from "axios";

const API = axios.create({
  baseURL: "https://businesshub-api-mgxa.onrender.com/api",
});

export const loginUser = (data) => {
  return API.post("/auth/login", data);
};