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
              <span className="about-selection-text-wrapper">About Us:</span>
              <span className="about-selection-span">
                <br />
                Project Website:
                <br />
              </span>
              <a
                href="https://serenify-info.webflow.io/"
                className="about-selection-text-wrapper-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                serenify-info.webflow.io
              </a>
              <span className="about-selection-span">
                <br />
                Contributors:
                <br />
              </span>
              <span className="contributor">
                Haochen Dong, Julius Cecilia, Ruolin Chen, Shin Hu
              </span>
              <span className="about-selection-span">
                <br />
                Sponsor:
                <br />
              </span>
              <span className="about-selection-text-wrapper-2">
                Young Leaders Program
                <br />
              </span>
              <span className="about-selection-span">
                Contact Email:
                <br />
              </span>
              <span className="about-selection-text-wrapper-2">
                serenify.platform@outlook.com
                <br />
              </span>
              <span className="about-selection-span">
                LinkedIn:
                <br />
              </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/ylp-us/"
                className="about-selection-text-wrapper-2"
              >
                www.linkedin.com/company/ylp-us
              </a>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
