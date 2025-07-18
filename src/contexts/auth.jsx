import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (variables) => {
      const response = await api.post("/api/users", {
        first_name: variables.first_name,
        last_name: variables.last_name,
        email: variables.email,
        password: variables.password,
      });

      return response.data;
    },
  });

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        console.log("Resposta da API:", createdUser);
        const accessToken = createdUser.tokens.accessToken;
        const refreshToken = createdUser.tokens.refreshToken;
        setUser(createdUser);

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        toast.success("Conta criada com sucesso");
      },
      onError: () => {
        toast.error(
          "Erro ao criar conta. Por favor tente criar a conta mais tarde"
        );
      },
    });
  };

  const loginMutation = useMutation({
    mutationKey: "login",
    mutationFn: async (variables) => {
      const response = await api.post("/api/users/login", {
        email: variables.email,
        password: variables.password,
      });

      return response.data;
    },
  });

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (logedUser) => {
        const accessToken = logedUser.tokens.accessToken;
        const refreshToken = logedUser.tokens.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setUser(logedUser);
        toast.success("Login feito com sucesso");
      },
      onError: () => {
        toast.error(
          "Erro ao criar conta. Por favor tente criar a conta mais tarde"
        );
      },
    });
  };

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken && !refreshToken) return;

        const respose = await api.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(respose.data);
      } catch (error) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        console.log(error);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, login: login, signup: signup }}>
      {children}
    </AuthContext.Provider>
  );
};
