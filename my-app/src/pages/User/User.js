import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import Nav from "../Nav/Nav.js";

export function User() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <h1>User Profile</h1>
    </>
  );
}
