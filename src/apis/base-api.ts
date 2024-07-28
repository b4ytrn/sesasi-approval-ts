import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 2000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bearer");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.clear();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
