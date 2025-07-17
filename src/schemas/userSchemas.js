import z from "zod";

export const signupSchema = z.object({
  first_name: z.string().trim().min(1, {
    message: "O nome é obrigatório",
  }),
  last_name: z.string().trim().min(1, {
    message: "O sobrenome é obrigatório",
  }),
  email: z.email({
    message: "O email é inválido",
  }),
  password: z.string().trim().min(6, {
    message: "A senha deve ter no mínimo 6 caractéres",
  }),
  passwordConfirmation: z.string().trim().min(6, {
    message: "A confirmação de senha é obrigatória",
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: "Você precisa aceitar os termos",
  }),
});

export const loginSchema = z.object({
  email: z.email({ message: "o email é inválido" }),
  password: z.string({ message: "A senha é obrigatória" }).trim().min(6, {
    message: "A senha deve ter no mínimo 6 caractéres",
  }),
});
