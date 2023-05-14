import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
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
    localStorage.setItem("promptDate", selectedDate);
  };

  // useEffect(() => {
  //   props.dateCallBack(selectedDate.toLocaleDateString().replace(/\//g, "-"));
  //   props.setShowPencil(true);
  //   localStorage.setItem("promptDate", selectedDate);
  // }, [selectedDate, setSelectedDate]);

  useEffect(() => {
    if (localStorage.getItem("promptDate")) {
      setSelectedDate(new Date(localStorage.getItem("promptDate")));
      props.setShowPencil(true);
    }
  }, [localStorage.getItem("promptDate")]);

  return (
    <div>
      <div className="calendar-container">
        <DatePicker
          className="calendar-input"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          maxDate={new Date()}
          isValidDate={disablePastDt}
          wrapperClassName="datePicker"
        />
        <button className="calendar-button" onClick={handleClick}>
          Confirm date
        </button>
      </div>
    </div>
  );
}

export default Calendar;
