import { useEffect, useState } from "react";
import { DatePickerWithRange } from "./date-picker-with-range";
import { useNavigate, useSearchParams } from "react-router";
import { addMonths, format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/auth";

const formatDateToQueryParam = (date) => {
  return format(date, "yyyy-MM-dd");
};

const DateSelection = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const [searchParmas] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: searchParmas.get("from")
      ? new Date(searchParmas.get("from"))
      : new Date(),

    to: searchParmas.get("to")
      ? new Date(searchParmas.get("to"))
      : addMonths(new Date(), 1),
  });

  //se der erro na api, tirar o format e voltar com o isoString
  useEffect(() => {
    if (!date?.from || !date?.to) return;

    const queryParams = new URLSearchParams();
    queryParams.set("from", formatDateToQueryParam(date.from.toISOString()));
    queryParams.set("to", formatDateToQueryParam(date.to.toISOString()));

    navigate(`/?${queryParams.toString()}`);
    queryClient.invalidateQueries({
      queryKey: [
        "balance",
        user.id,
        formatDateToQueryParam(date.from.toISOString()),
        formatDateToQueryParam(date.to.toISOString()),
      ],
    });
  }, [navigate, date, queryClient, user.id]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
