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
        {
            
        }
    )
}
export default ProtectedRoute;