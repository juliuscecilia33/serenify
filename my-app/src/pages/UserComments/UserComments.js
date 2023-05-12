import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import "./UserComments.css";
import { NavbarVTwo } from "../../components";
import DividerSmall from "../../images/DividerSmall.png";
import Cat from "../../images/Cat.png";
import axios from "axios";
import { useNavigate } from "react-router";

export function UserComments() {
  const [userComments, setUserComments] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKENDURL}comments/${localStorage.getItem(
          "userid"
        )}`
      )
      .then((response) => {
        console.log("comments all: ", response);
        setUserComments(
          response.data.sort(function (a, b) {
            return new Date(b.commenttime) - new Date(a.commenttime);
          })
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

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
          {userComments ? (
            userComments.map((comment, id) => (
              <>
                <div key={id} className="your-post-div">
                  <p className="your-post-don-t-eat-before-bed-just-finished-a-sandwich">
                    {comment.commenttext}
                  </p>
                </div>
                <img
                  className="divider-small"
                  src={DividerSmall}
                  alt="DividerSmall"
                />
              </>
            ))
          ) : (
            <h1>No comments to show</h1>
          )}

          {/* <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          /> */}
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
