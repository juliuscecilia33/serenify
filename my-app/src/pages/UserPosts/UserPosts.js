import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import "./UserPosts.css";
import { NavbarVTwo } from "../../components";

export function UserPosts() {
  return (
    <>
      <NavbarVTwo />
      <h1>User Posts</h1>
    </>
  );
}
