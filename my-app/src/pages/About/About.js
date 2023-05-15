import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import { NavbarVTwo, SkeletonLayout } from "../../components";
import DividerSmall from "../../images/DividerSmall.png";
import "./About.css";

export function About() {
  return (
    <>
      <NavbarVTwo />
      <div>
        <div className="about-selection-content">
          <div className="about-selection-b-3">
            <h1 className="about-selection-about-us">
              <h1 className="h1-title">About Us</h1>
              <h2 className="h2-title">Project Website:</h2>
              <p>
                <a href="https://serenify-info.webflow.io/">
                  serenify-info.webflow.io
                </a>
              </p>

              <h2 className="h2-title">Contributors:</h2>
              <p>Haochen Dong, Julius Cecilia, Ruolin Chen, Shin Hu</p>

              <h2 className="h2-title">Sponsor:</h2>
              <p>Young Leaders Program</p>

              <h2 className="h2-title">Contact Email:</h2>
              <p>
                <a href="mailto:serenify.platform@outlook.com">
                  serenify.platform@outlook.com
                </a>
              </p>

              <h2 className="h2-title">LinkedIn:</h2>
              <p>
                <a href="https://www.linkedin.com/company/ylp-us/">
                  linkedin.com/company/ylp-us/
                </a>
              </p>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
