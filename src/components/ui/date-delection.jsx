import { useEffect, useState } from "react";
import { DatePickerWithRange } from "./date-picker-with-range";
import { useNavigate, useSearchParams } from "react-router";
import { addMonths, format, isValid } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/auth";

const formatDateToQueryParam = (date) => {
  return format(date, "yyyy-MM-dd");
};

const getInitialDateState = (searchParmas) => {
  const from = searchParmas.get("from");
  const to = searchParmas.get("to");

  if (!from || !to) {
    return {
      from: new Date(),
      to: addMonths(new Date(), 1),
    };
  }

  const datesAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to));

  if (datesAreInvalid) {
    return {
      from: new Date(from),
      to: new Date(to),
    };
  }
};

const DateSelection = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const [searchParmas] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(getInitialDateState(searchParmas));

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
