import AddTransactionButton from "@/components/ui/add-transaction-button";
import Balance from "@/components/ui/balance";
import DateSelection from "@/components/ui/date-delection";
import Header from "@/components/ui/header";
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
      {/* TOPO */}
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between ">
          <h2 className="font-bold text-2xl">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <AddTransactionButton />
          </div>
        </div>

        <div className="grid grid-cols-[2fr,1fr]">
          <Balance />
        </div>
      </div>
    </>
  );
}
