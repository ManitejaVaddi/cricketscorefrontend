import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // change this in production

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const login = (credentials) => api.post("/user/login", credentials);
export const register = (data) => api.post("/user/register", data);
export const createMatch = (data) => api.post("/match", data);
export const getMatches = () => api.get("/match");
export const tossMatch = (id, team) => api.post("/match/toss", { matchId: id, tossWinner: team });
export const updateScore = (id, score) => api.put("/match/score", { matchId: id, ...score });
export const updateWinner = (id, winner) => api.put("/match/winner", { matchId: id, winner });
