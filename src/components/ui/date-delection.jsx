import { useState } from "react";
import { DatePickerWithRange } from "./date-picker-with-range";
import { addMonths } from "date-fns";

const DateSelection = () => {
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  });

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
