import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import "./UserLikes.css";
import { NavbarVTwo } from "../../components";

export function UserLikes() {
  return (
    <>
      <NavbarVTwo />
      <h1>User Likes</h1>
    </>
  );
}
