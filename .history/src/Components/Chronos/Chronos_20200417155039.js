import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Chronos() {
  const [startDate, setStartDate] = useState(new Date());
    return (
      <div className="chronos">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date)
            console.log(date)
          }}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
    );
}