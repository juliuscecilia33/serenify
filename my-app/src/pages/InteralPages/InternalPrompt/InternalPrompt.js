import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/index";
import apiClient from "../../instance/config";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(false);
    const [date, setDate] = useState(new Date());

    const userType = async () => {
        await apiClient
            .get(`/users/${localStorage.getItem('userid')}`)
            .then((response) => {
                console.log("response", response)
                const adminOrNot = response.data.isAdmin;
            })
            .catch((err) => {
                console.err(err.message);
            });

        setAdmin(adminOrNot);
    }

    useEffect(() => {
        userType();
    }, [admin]);

    return (
        <div>
            <div className="calendar-container">
                <DatePicker
                className="calendar-input"
                selected={selectedDate}
                onChange={(date) => setDate(date)}
                maxDate={new Date()}
                />
                <button className="calendar-button" onClick={handleClick}>
                Select
                </button>
            </div>
        </div>
    )
}
export default ProtectedRoute;