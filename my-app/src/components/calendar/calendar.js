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

  //console.log(value);
  //const inputRef = useRef(null);

  // const handleChange = (date) => {
  //   setSelectedDate(date);
  //   console.log(date);
  // };

  const handleClick = () => {
    props.dateCallBack(selectedDate.toLocaleDateString().replace(/\//g, "-"));
    console.log(
      "changed to:" + selectedDate.toLocaleDateString().replace(/\//g, "-")
    );
    props.setShowPencil(true);
  };

  return (
    <div>
      {/* <input
        type="date"
        value={selectedDate ? selectedDate.toLocaleDateString() : ""}
        onClick={() => setShowCalendar(true)}
      /> */}
{/* 
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        maxDate={new Date()}
        isValidDate={disablePastDt}
        style={{ width: 200 }}
      />

      <button variant="contained" onClick={handleClick}>
        Select
      </button> */}

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

      {/* //showCalendar ? (
//         <div className="calendar">
//           <DatePicker />
//         </div>
//       ) : (
//         ""
//       )} */}
    </div>
  );
}

export default Calendar;
