import React, { useState } from "react";
import "./Navbar.css";
import biglogo from "../../images/biglogo.png";

export function Navbar() {
  return (
    <div class="navbar-container">
      <img class="logo-image" src={biglogo} alt="Big Logo" />
    </div>
  );
}
