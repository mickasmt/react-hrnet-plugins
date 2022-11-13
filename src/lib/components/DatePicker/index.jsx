import React from "react";
import { useState } from "react";

function DatePicker({ id, name, minDate, maxDate, defaultValue }) {
  const [date, setDate] = useState(defaultValue || "");

  return (
    <input
      id={id}
      name={name}
      type="date"
      value={date}
      min={minDate}
      max={maxDate}
      onChange={(e) => setDate(e.target.value)}
      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
    />
  );
}

export default DatePicker;
