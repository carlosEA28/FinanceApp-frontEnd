import { Card, CardContent } from "./card";

const BalanceItem = ({ icon, lable, amount }) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-2">
        {/* ICONE E LABLE */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8  flex items-center justify-center rounded-lg bg-muted">
            {icon}
          </div>
          <p className="text-sm text-muted-foreground">{lable}</p>
        </div>

        <h3 className="text-2xl font-semibold">
          {new Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(amount)}
        </h3>
      </CardContent>
    </Card>
  );
};

export default BalanceItem;
