import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";

export function User() {
  return (
    <>
      <Navbar />

      <h1>User Profile</h1>
    </>
  );
}
