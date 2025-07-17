import { Form } from "@/components/ui/form";
import { loginSchema } from "@/schemas/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  function handleSubmit(data) {
    console.log("✅ Dados enviados:", data);
  }
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center gap-3">
      <Form></Form>
    </div>
  );
}
