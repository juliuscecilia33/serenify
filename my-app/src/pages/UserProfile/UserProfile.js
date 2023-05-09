import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import "./UserProfile.css";
import DividerSmall from "../../images/DividerSmall.png";
import { NavbarVTwo } from "../../components";

export function UserProfile() {
  return (
    <>
      <NavbarVTwo />
      <div className="profile-page-profile-page">
        <div className="profile-page-content">
          <div className="profile-page-b">
            <p className="profile-page-greetings-what-would-you-want-me-to-tell-you-about">
              <span className="profile-page-text-wrapper">
                Greetings~
                <br />
              </span>
              <span className="profile-page-span">
                <br />
              </span>
              <span className="profile-page-text-wrapper-2">
                (￣▽￣)ノ
                <br />
              </span>
              <span className="profile-page-span">
                <br />
              </span>
              <span className="profile-page-text-wrapper-3">
                What would you want me to tell you about?
              </span>
            </p>
          </div>
          <div className="profile-page-div">----------------</div>
          <div className="profile-page-b-2">
            <div className="profile-page-your-posts">&gt; Your Posts</div>
            <div className="profile-page-text-wrapper-4">Your Likes</div>
            <div className="profile-page-text-wrapper-4">Your Comments</div>
            <div className="profile-page-text-wrapper-4">Your Reports</div>
            <div className="profile-page-text-wrapper-5">Go Back</div>
            <div className="profile-page-text-wrapper-6">-&gt;</div>
          </div>
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />
          <div className="profile-page-b-3">
            <h1 className="profile-page-account-info-email-helloworld-uw-edu-password">
              <span className="profile-page-text-wrapper-7">
                Account
                <br />
                Info:
                <br />
              </span>
              <span className="profile-page-text-wrapper-8">
                <br />
                Email: <br />
              </span>
              <span className="profile-page-text-wrapper-9">
                helloworld@uw.edu
                <br />
                <br />
              </span>
              <span className="profile-page-text-wrapper-8">
                Password:
                <br />
              </span>
              <span className="profile-page-text-wrapper-9">
                **************
                <br />
              </span>
            </h1>
            <p className="profile-page-wake-me-up-if-you-want-to-change-it-zzzz">
              <span className="profile-page-text-wrapper-10">
                Wake me up if you want to change it.
                <br />
              </span>
              <span className="profile-page-text-wrapper-3">(￣ρ￣)..zzZZ</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
