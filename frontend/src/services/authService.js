import api from "./api.js";

export const getMe = () => api.get("/api/me").then((res) => res.data.user);

export const signup = ({ username, email, password }) =>
  api.post("/api/signup", { username, email, password }).then((res) => res.data);

export const login = ({ username, password }) =>
  api.post("/api/login", { username, password }).then((res) => res.data);

export const logout = () => api.post("/api/logout").then((res) => res.data);
