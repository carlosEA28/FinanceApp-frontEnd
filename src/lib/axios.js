import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "@/constants/localstorage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// é como se fosse um middlleware que passa pelas rotas e coloca o access token no authrization
api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

  if (!accessToken) {
    return request;
  }

  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});
