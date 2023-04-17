import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "./Home.css";
import "../../index.css";
import toplayer from "../../images/toplayer.png";

export function Home() {
  return (
    <>
      <div class="container">
        <img src={toplayer} alt="landing page" class="top-landing" />
        {/* <div class="green-bg">test</div> */}
      </div>
    </>
  );
}
