import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInputs from "@/components/ui/passwordInputs";
import { AuthContext } from "@/contexts/auth";
import { api } from "@/lib/axios";
import { loginSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

export default function LoginPage() {
  const [user, setUser] = useState();
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

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const init = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken && !refreshToken) return;

      try {
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

  function handleSubmit(data) {
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
  }

  if (user) {
    return <h1>Ola {user.first_name}</h1>;
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-3">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Card className="w-[500px]">
            <CardHeader className="text-center">
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>Insira seu dados abaixo.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* email */}
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* senha */}
              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInputs {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button className="w-full" type="submit">
                Fazer Login
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to={"/signup"}>Criar Conta</Link>
        </Button>
      </div>
    </div>
  );
}
