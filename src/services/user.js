import { publicApi } from "@/lib/axios";

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
};
