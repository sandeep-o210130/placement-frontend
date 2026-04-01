import axios from "axios";

const API = axios.create({
  baseURL: "https://placement-backend-e9po.onrender.com/api",
});

export default API;