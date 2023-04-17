import React, { useState } from "react";
import "./Navbar.css";
import biglogo from "../../images/biglogo.png";
import logout from "../../images/logout.png";

export function Navbar() {
  return (
    <div class="navbar-container">
      <img class="logo-image" src={biglogo} alt="Big Logo" />
      <button>
        <img class="logout-image" src={logout} alt="Logout" />
      </button>
    </div>
  );
}
