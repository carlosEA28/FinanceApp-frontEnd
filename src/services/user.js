import { api, publicApi } from "@/lib/axios";

export const userService = {
  signup: async (input) => {
    const response = await publicApi.post("/api/users", {
      first_name: input.first_name,
      last_name: input.last_name,
      email: input.email,
      password: input.password,
    });
    return response.data;
  },

  login: async (input) => {
    const response = await publicApi.post("/api/users/login", {
      email: input.email,
      password: input.password,
    });

    return response.data;
  },

  me: async () => {
    const respose = await api.get("/api/users/me");

    return respose.data;
  },
};
