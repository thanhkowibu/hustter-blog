import axios from "axios";

// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
});
