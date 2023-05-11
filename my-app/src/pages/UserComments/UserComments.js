import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import "./UserComments.css";
import { NavbarVTwo } from "../../components";
import DividerSmall from "../../images/DividerSmall.png";
import Cat from "../../images/Cat.png";

export function UserComments() {
  return (
    <>
      <NavbarVTwo />
      <div className="your-post-your-post">
        <div className="your-post-content">
          <div className="your-post-b">
            <h1 className="your-post-your-posts-are-listed-below">
              <span className="your-post-text-wrapper">
                Your
                <br />
                Comments
                <br />
              </span>
              <span className="your-post-span">Are listed below:</span>
            </h1>
          </div>
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />
          <div className="your-post-div">
            <p className="your-post-don-t-eat-before-bed-just-finished-a-sandwich">
              Don’t eat before&nbsp;&nbsp;&nbsp;&nbsp;
              <br />
              bed. Just finished a&nbsp;&nbsp; <br />
              sandwich.
            </p>
          </div>
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />
          <div className="your-post-div">
            <p className="your-post-p">
              The light bulb in my living room just exploded. It cut my hand...
            </p>
          </div>
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />
          <div className="your-post-b-cat">
            <p className="your-post-p">
              Pet this cat <br />
              And you will go
              <br />
              Back to top.
            </p>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              <img className="cat-image" src={Cat} alt="Cat" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
