import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";

//import dayjs, { Dayjs } from "dayjs";

function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  //const [showCalendar, setShowCalendar] = useState(false);

  const disablePastDt = (current) => {
    return current.isBefore(new Date());
  };

  const handleClick = () => {
    props.dateCallBack(selectedDate.toLocaleDateString().replace(/\//g, "-"));
    props.setShowPencil(true);
  };

  return (
    <div>
      <div className="calendar-container">
        <DatePicker
          className="calendar-input"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          maxDate={new Date()}
          isValidDate={disablePastDt}
        />
        <button className="calendar-button" onClick={handleClick}>
          Select
        </button>
      </div>
    </div>
  );
}

export default Calendar;
