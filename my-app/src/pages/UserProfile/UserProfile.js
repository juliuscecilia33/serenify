import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import apiClient from "../../instance/config";
import "./UserProfile.css";
import DividerSmall from "../../images/DividerSmall.png";
import { NavbarVTwo } from "../../components";
import { AccountInfo } from "../../components/AccountInfo/AccountInfo";

export function UserProfile() {
  const [optionOneSelected, setOptionOneSelected] = useState(false);
  const [optionTwoSelected, setOptionTwoSelected] = useState(false);
  const [optionThreeSelected, setOptionThreeSelected] = useState(false);
  const [optionSelected, setOptionSelected] = useState("");

  const [userInfo, setUserInfo] = useState();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const getUserInfo = async () => {
    await apiClient
      .get(`/users/${localStorage.getItem("userid")}`)
      .then((response) => {
        console.log("user info in userProfile:", response);
        setUserInfo(response.data);
        //console.log(userInfo.useremail);
        setUserEmail(response.data.useremail);
        setUserPassword(response.data.userpassword);
      })
      .catch((err) => {
        console.err(err.message);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
            <button
              onClick={() => {
                setOptionOneSelected(true);
                setOptionTwoSelected(false);
                setOptionThreeSelected(false);
                setOptionSelected("posts");
              }}
              className={
                optionOneSelected
                  ? "profile-page-text-wrapper-4-bold"
                  : "profile-page-text-wrapper-4"
              }
            >
              {optionOneSelected && ">"} Your Posts
            </button>
            <button
              onClick={() => {
                setOptionOneSelected(false);
                setOptionTwoSelected(true);
                setOptionThreeSelected(false);
                setOptionSelected("likes");
              }}
              className={
                optionTwoSelected
                  ? "profile-page-text-wrapper-4-bold"
                  : "profile-page-text-wrapper-4"
              }
            >
              {optionTwoSelected && ">"} Your Likes
            </button>
            <button
              onClick={() => {
                setOptionOneSelected(false);
                setOptionTwoSelected(false);
                setOptionThreeSelected(true);
                setOptionSelected("comments");
              }}
              className={
                optionThreeSelected
                  ? "profile-page-text-wrapper-4-bold"
                  : "profile-page-text-wrapper-4"
              }
            >
              {optionThreeSelected && ">"} Your Comments
            </button>
            <button className="profile-page-text-wrapper-6">-&gt;</button>
          </div>
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />
          <AccountInfo
            userInformation={userInfo}
            userEmail={userEmail}
            userPassword={userPassword}
          />
        </div>
      </div>
    </>
  );
}
