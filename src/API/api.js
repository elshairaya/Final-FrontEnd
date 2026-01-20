import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});
api.interceptors.request.use((config => {
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser?.id) {
    config.headers["x-user-id"] = savedUser.id;
  }
    return config;
}));

export default api;
