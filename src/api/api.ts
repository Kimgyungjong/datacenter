import axios from "axios";
const token = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : "";
const commonHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers": "Authorization",
  withCredentials: true,
  "Content-Type": "application/json",
};
const api = axios.create({
  baseURL: "http://172.168.10.68:8080",
  headers: commonHeaders,
});
api.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default api;
