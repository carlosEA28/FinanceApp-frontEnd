import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth";
import React from "react";
import { Navigate } from "react-router";

export default function HomePage() {
  const { isInitializing, user, signout } = useAuthContext();
  if (isInitializing) return null;

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <h1>Olá, {user.first_name}</h1>
      <Button onClick={signout}>Sair</Button>
    </>
  );
}
