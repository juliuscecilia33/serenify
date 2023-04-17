import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "../Login/Login.css";
import toplayer from "../../images/toplayer.png";

export function Register() {
  return (
    <>
      <div class="container">
        <img src={toplayer} alt="landing page" class="top-landing" />
        <h1>Sign up</h1>
        <input class="username_input" placeholder="Username" />
        <input class="password_input" placeholder="Password" />
        <input class="password_input_again" placeholder="Confirm Password" />
        <button>Enter</button>
      </div>
    </>
  );
}
