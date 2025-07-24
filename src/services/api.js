import axios from "axios";

// Use VITE_API_URL from Vite env (e.g., https://cricketscorebackend.onrender.com/api)
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Add auth token to each request (if exists)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (credentials) => api.post("/users/login", credentials);
export const register = (data) => api.post("/users/register", data);

// Match
export const createMatch = (data) => api.post("/matches", data);
export const getMatches = () => api.get("/matches");
export const tossMatch = (id, team) =>
  api.post("/matches/toss", { matchId: id, tossWinner: team });

export const updateScore = (id, score) =>
  api.put("/matches/score", { matchId: id, ...score });

export const updateWinner = (id, winner) =>
  api.put("/matches/winner", { matchId: id, winner });

// Match Summary (if needed later)
// export const getMatchSummary = () => api.get("/match-summaries");
