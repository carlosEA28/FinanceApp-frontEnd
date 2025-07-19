import { useEffect, useState } from "react";
import { DatePickerWithRange } from "./date-picker-with-range";
import { useNavigate, useSearchParams } from "react-router";
import { addMonths, format } from "date-fns";

const formatDateToQueryParam = (date) => {
  return format(date, "yyyy-MM-dd");
};

const DateSelection = () => {
  const [searchParmas] = useSearchParams();
  const navigate = useNavigate();
  const [date, setDate] = useState({
    from: searchParmas.get("from")
      ? new Date(searchParmas.get("from") + "T00:00:00")
      : new Date(),

    to: searchParmas.get("to")
      ? new Date(searchParmas.get("to") + "T00:00:00")
      : addMonths(new Date(), 1),
  });

  //se der erro na api, tirar o format e voltar com o isoString
  useEffect(() => {
    if (!date?.from || !date?.to) return;

    const queryParams = new URLSearchParams();
    queryParams.set("from", formatDateToQueryParam(date.from));
    queryParams.set("to", formatDateToQueryParam(date.to));

    navigate(`/?${queryParams.toString()}`);
  }, [navigate, date]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
