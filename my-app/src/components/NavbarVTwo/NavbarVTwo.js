import React, { useState, useContext } from "react";
import "./Navbar.css";
import Logo from "../../images/logo2.png";
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
    <>
      <img className="logo" alt={"Logo"} src={Logo} />
      {isAuthenticated ? (
        <button onClick={(e) => logout(e)}>
          <div className="log-in">Sign Out</div>
        </button>
      ) : (
        <Link to={ROUTES.LOGIN}>
          <div className="log-in">Log in</div>
        </Link>
      )}
    </>
  );
}
