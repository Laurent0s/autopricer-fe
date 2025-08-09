import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // works locally & on Vercel
  headers: { "Content-Type": "application/json" },
});
