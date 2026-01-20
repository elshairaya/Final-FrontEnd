import axios from "axios";

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL,
});
api.interceptors.request.use((config => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser?.id) {
    config.headers["x-user-id"] = savedUser.id;
  }
    return config;
}));

export default api;
