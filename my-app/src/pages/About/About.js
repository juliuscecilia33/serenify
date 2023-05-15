import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import { NavbarVTwo, SkeletonLayout } from "../../components";
import DividerSmall from "../../images/DividerSmall.png";

export function About() {
  return (
    <div>
      <div className="about-serenify">About Serenify</div>

      <div className="about-ylp">About YLP</div>

      <div className="about-us">About Us</div>
    </div>
  );
}
