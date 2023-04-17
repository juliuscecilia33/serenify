import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";

export function Prompt() {
  return (
    <>
      <div class="container">
        <Navbar />
        <h3>Post #1</h3>
        <h3>Post #2</h3>
        <h3>Post #3</h3>
      </div>
    </>
  );
}
