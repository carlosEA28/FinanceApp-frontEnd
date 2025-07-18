import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/localstorage";
import { userService } from "@/services/user";
import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isInitializing, setIsInitializing] = useState(true);

  const signupMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (variables) => {
      const response = await userService.signup(variables);

      return response;
    },
  });

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser);

        setTokens(createdUser.tokens);
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
      const response = await userService.login(variables);
      return response;
    },
  });

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (logedUser) => {
        setUser(logedUser);

        setTokens(logedUser.tokens);
        toast.success("Login feito com sucesso");
      },
      onError: () => {
        toast.error(
          "Erro ao criar conta. Por favor tente criar a conta mais tarde"
        );
      },
    });
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);

        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );

        if (!accessToken && !refreshToken) return;

        const response = await userService.me();

        setUser(response);
      } catch (error) {
        setUser(null);
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

        console.log(error);
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        login: login,
        signup: signup,
        isInitializing: isInitializing,
        signout: signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
