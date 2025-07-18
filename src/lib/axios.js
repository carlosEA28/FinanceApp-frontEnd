import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/localstorage";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

//usada para rotas publicas
export const publicApi = axios.create({
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const request = error.config;

    //verificar se eu tenho ym refresh Token
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return Promise.reject(error);
    }

    //verficar se o erro e 401
    if (
      error.response.status === 401 &&
      !request._retry &&
      !request.url.includes("/api/auth/refredh-token")
    ) {
      request._retry = true;
      try {
        // se eu tiver um refresh token, eu tenho que atualizar o meu access token e refazer a requisicao
        const response = await api.post("/api/users/refresh-token", {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken);
        request.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(request);
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);
