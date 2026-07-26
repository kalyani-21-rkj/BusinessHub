import axios from "axios";

const API = axios.create({
  baseURL: "https://businesshub-api-mgxa.onrender.com/api",
  //baseURL: "http://localhost:4000/api",
});

// Login
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// Register
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

export default API;