import { api } from "@/lib/axios";

export const transactionService = {
  create: async (input) => {
    const reponse = await api.post("api/transactions/me", input);

    return reponse.data;
  },
};
