import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "./Header.scss";

export default function Header() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="header">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
    </div>
  );
}
