import React, { useState, useContext } from "react";
import "./Navbar.css";
import biglogo from "../../images/biglogo.png";
import logouticon from "../../images/logout.png";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

export function Navbar() {
  const { isAuthenticated, setAuth } = useContext(Authentication);
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("userid");
    console.log("User logged out");

    navigate(0);
  };

  return (
    <div class="navbar-container">
      <img class="logo-image" src={biglogo} alt="Big Logo" />
      {isAuthenticated ? (
        <button onClick={(e) => logout(e)}>
          <img class="logout-image" src={logouticon} alt="Logout" />
        </button>
      ) : (
        <Link to={ROUTES.LOGIN}>
          <button>
            <p>Login</p>
          </button>
        </Link>
      )}
    </div>
  );
}
