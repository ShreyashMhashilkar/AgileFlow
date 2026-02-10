import axios from "axios";

export const api = axios.create({
 baseURL: "https://agileflow-backend.onrender.com/api/",
});

api.interceptors.request.use(config => {
 const token = localStorage.getItem("token");
 if (token) config.headers.Authorization = `Bearer ${token}`;
 return config;
});

api.interceptors.response.use(
 res => res,
 err => {
  if (err.response?.status === 401) {
   localStorage.clear();
   window.location = "/login";
  }
  return Promise.reject(err);
 }
);
