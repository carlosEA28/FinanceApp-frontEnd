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
import { useAuthContext } from "@/contexts/auth";
import { loginSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function LoginPage() {
  const { user, login } = useAuthContext();

  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  function handleSubmit(data) {
    login(data);
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
