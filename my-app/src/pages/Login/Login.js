import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "../../index.css";
import toplayer from "../../images/toplayer.png";

export function Login() {
  return (
    <>
      <div class="container">
        <img src={toplayer} alt="landing page" class="top-landing" />
        {/* <div class="green-bg">test</div> */}
        <h1>Login</h1>
        <i class="bi bi-arrow-right-circle"></i>
      </div>
    </>
  );
}
