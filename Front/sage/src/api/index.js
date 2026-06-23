import axios from "axios";

// URL do backend. Prioridade:
// 1. NEXT_PUBLIC_API_URL (definida na Vercel) -> sempre vence.
// 2. Em build de producao, usa o backend no Render como fallback.
// 3. Em desenvolvimento, usa o backend local.
const PRODUCTION_API_URL = "https://finansee-backend-njyn.onrender.com/api/";
const DEVELOPMENT_API_URL = "http://localhost:8000/api/";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? PRODUCTION_API_URL
    : DEVELOPMENT_API_URL);

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
