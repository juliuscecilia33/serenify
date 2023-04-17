import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "./Login.css";
import toplayer from "../../images/toplayer.png";
import { ChevronRightIcon } from "@chakra-ui/icons";

export function Login() {
  return (
    <>
      <div class="container">
        <img src={toplayer} alt="landing page" class="top-landing" />
        <h1>Log in</h1>
        <input class="username_input" placeholder="Username" />
        <input class="password_input" placeholder="Password" />
        <button>< ChevronRightIcon></button>
      </div>
    </>
  );
}
