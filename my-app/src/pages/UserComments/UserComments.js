import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import "./UserComments.css";
import { NavbarVTwo } from "../../components";

export function UserComments() {
  return (
    <>
      <NavbarVTwo />
      <h1>User Comments</h1>
    </>
  );
}
