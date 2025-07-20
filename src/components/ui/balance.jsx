import { userService } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import BalanceItem from "./balanceItem";
import { useAuthContext } from "@/contexts/auth";

const Balance = () => {
  const [searchParmas] = useSearchParams();
  const { user } = useAuthContext();

  const { data } = useQuery({
    queryKey: ["balance", user.id],
    queryFn: () => {
      const from = searchParmas.get("from");
      const to = searchParmas.get("to");

      return userService.getBalance(from, to);
    },
  });

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem lable="Saldo" amount={data?.balance} icon={<Wallet />} />

      <BalanceItem
        lable="Ganhos"
        amount={data?.earnings}
        icon={<TrendingUp className="text-primary-green" />}
      />

      <BalanceItem
        lable="Gastos"
        amount={data?.expenses}
        icon={<TrendingDown className="text-primary-red" />}
      />

      <BalanceItem
        lable="Investimentos"
        amount={data?.investments}
        icon={<PiggyBank className="text-primary-blue" />}
      />
    </div>
  );
};

export default Balance;
