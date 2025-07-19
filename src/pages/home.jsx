import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth";
import React from "react";
import { Navigate } from "react-router";

export default function HomePage() {
  const { isInitializing, user } = useAuthContext();
  if (isInitializing) return null;

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Header />
    </>
  );
}
