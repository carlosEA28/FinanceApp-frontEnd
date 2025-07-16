import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import PasswordInputs from "@/components/ui/passwordInputs";
import React from "react";
import { Link } from "react-router";

export default function SignupPage() {
  //   const []  =

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader className="text-center">
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu email" />
          <PasswordInputs placeholder="Digite a sua senha" />
          <PasswordInputs placeholder="Digite a sua senha novamente" />
          <div className="flex items-top gap-3">
            <Checkbox id="terms" defaultChecked />
            <div className="grid gap-2 opacity-75 text-xs">
              <label htmlFor="terms-2" className="text-muted-foreground ">
                Ao clicar em “Criar conta”, você aceita
                <a href="" className="text-white underline ml-1">
                  nosso termo de uso e política de privacidade
                </a>
              </label>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">Criar Conta</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta ?</p>
        <Button variant="link" asChild>
          <Link to={"/login"}>Faça login</Link>
        </Button>
      </div>
    </div>
  );
}
