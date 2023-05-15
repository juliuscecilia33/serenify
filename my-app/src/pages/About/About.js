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
            <h1 className="about-selection-about-us-project-website-serenify-info-webflow-io-contributors-haochen-dong-julius-cecilia-ruolin-chen-shin-hu-sponsor-young-leaders-program-contact-email-serenify-platform-outlook-com-linkedin-www-linkedin-com-company-ylp-us">
              <span className="about-selection-text-wrapper">
                About Us:
                <br />
              </span>
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
                <br />
              </a>
              <span className="about-selection-span">
                <br />
                Contributors:
                <br />
              </span>
              <span className="contributor">
                Haochen Dong
                <br />
              </span>
              <span className="contributor">
                Julius Cecilia
                <br />
              </span>
              <span className="contributor">
                Ruolin Chen
                <br />
              </span>
              <span className="contributor">Shin Hu</span>
              <span className="about-selection-span">
                <br />
                Sponsor:&nbsp;&nbsp;
                <br />
              </span>
              <span className="about-selection-text-wrapper-2">
                Young Leaders Program
                <br />
                <br />
              </span>
              <span className="about-selection-span">
                Contact Email:
                <br />
              </span>
              <span className="about-selection-text-wrapper-2">
                serenify.platform@outlook.com
                <br />
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
