import React, { useState, useRef } from "react";
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import CloseButton from 'react-bootstrap/CloseButton';

function Calendar(props) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    //const inputRef = useRef(null);
    
    const handleChange = (date) => {
        setSelectedDate(date);
        props.dateCallBack(selectedDate);
    };

    return(
        <div>
            <input
                type="date"
                value={selectedDate ? selectedDate.toDateString() : ""}
                onClick={() => setShowCalendar(true)}
            />
            <button className="btn btn-primary">Select</button>

            {showCalendar ? (
                <div className='calendar'>
                    <CloseButton onClick = {() => setShowCalendar(false)}/>
                    <div className="form-group">
                        <DatePicker
                            selected={ selectedDate }
                            onChange={ handleChange }
                            name="Select Date"
                            dateFormat="MM/dd/yyyy"
                            maxDate = {new Date()}
                        />
                    </div>
                </div>
            ) : ''}
        </div>
    )
}

export default Calendar;