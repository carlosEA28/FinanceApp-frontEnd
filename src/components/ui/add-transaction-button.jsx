import { PiggyBank, PlusIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "./button";
import { NumericFormat } from "react-number-format";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionFormSchema } from "@/schemas/transactionSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { DatePicker } from "./date-picker";
import { DialogClose } from "@radix-ui/react-dialog";
import { transactionService } from "@/services/transaction";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/auth";

const AddTransactionButton = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["createTransaction"],
    mutationFn: (input) => transactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries(["balance", user.id]);
    },
  });

  const form = useForm({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      name: "",
      valor: 0,
      date: new Date(),
    },

    shouldUnregister: true, //limpa o form
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);
      toast.success("Transação criada com sucesso ");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Nova Transação <PlusIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Transação</DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Digite o nome da transação"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <NumericFormat
                        placeholder="Digite o valor da transação"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$"
                        allowNegative={false}
                        customInput={Input}
                        value={field.value ?? ""}
                        onValueChange={(values) =>
                          field.onChange(values.floatValue ?? 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <DatePicker {...field} placeholder="Selecione uma data" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          type="button"
                          variant={
                            field.value === "EARNING" ? "secondary" : "outline"
                          }
                          onClick={() => field.onChange("EARNING")}
                        >
                          <TrendingUp className="text-primary-green" /> Ganho
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === "EXPENSE" ? "secondary" : "outline"
                          }
                          onClick={() => field.onChange("EXPENSE")}
                        >
                          <TrendingDown className="text-primary-red" /> Gasto
                        </Button>

                        <Button
                          type="button"
                          variant={
                            field.value === "INVESTMENT"
                              ? "secondary"
                              : "outline"
                          }
                          onClick={() => field.onChange("INVESTMENT")}
                        >
                          <PiggyBank className="text-primary-blue" />
                          Investimento
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="reset" variant="secondary" className="w-full">
                    Cancelar
                  </Button>
                </DialogClose>

                <Button type="submit" className="w-full" disabled={isPending}>
                  Adicionar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransactionButton;
