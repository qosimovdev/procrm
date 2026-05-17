"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ value, onChange, placeholder }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between glass-strong text-base text-text-primary text-left font-normal py-6 cursor-pointer ",
            !value && "text-text-primary",
          )}
        >
          {value ? (
            format(value, "PPP")
          ) : (
            <span>{placeholder || "Pick a date"}</span>
          )}

          <CalendarIcon className="w-4 h-4 opacity-70" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 glass-strong text-text-primary "
        align="start"
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
