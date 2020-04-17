import React, {useState} from "react";
import DatePicker from "react-date-picker";


export default function Chronos() {
  const [startDate, setStartDate] = useState(new Date());
    return (
      <div className="date-picker">
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