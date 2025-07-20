import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";

export const DatePickerWithRange = ({
  value,
  onChange,
  placeholder = "Selecione uma data",
}) => {
  const isRange = value?.from && value?.to;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!value?.from}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {isRange ? (
            `${format(value.from, "PPP")} - ${format(value.to, "PPP")}`
          ) : value?.from ? (
            format(value.from, "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};
