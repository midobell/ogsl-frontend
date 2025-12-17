import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// Intercepteur
axiosClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("access");

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default axiosClient;
