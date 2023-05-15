import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import "./UserComments.css";
import { NavbarVTwo, SkeletonLayout } from "../../components";
import DividerSmall from "../../images/DividerSmall.png";
import Cat from "../../images/Cat.png";
import axios from "axios";
import { useNavigate } from "react-router";
import moment from "moment";
import { handleTimeSince } from "../../helpers/handleTimeSince";

export function UserComments() {
  const [userComments, setUserComments] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
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
    }, "1000");
  }, []);

  const formatDate = (defaultPromptDate) => {
    console.log(new Date(defaultPromptDate));
    let displayDate = moment(new Date(defaultPromptDate)).format("MMMM D, Y");

    return displayDate;
  };

  return (
    <>
      {userComments ? (
        <>
          <NavbarVTwo />
          <div className="your-post-your-post">
            <div className="your-post-content">
              <div className="post-page-tag">
                <button
                  onClick={() => {
                    navigate(`/${localStorage.getItem("userid")}/profile`);
                  }}
                  className="post-page-div"
                >
                  &lt;-
                </button>
              </div>
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
              {userComments && userComments.length > 0 ? (
                userComments.map((comment, id) => (
                  <>
                    <div className="post-container">
                      <div className="top-top-section">
                        <button
                          onClick={() => navigate(`/post/${comment.postid}`)}
                          className="comment-post-description"
                        >
                          <b>{comment.postdescription}</b> •{" "}
                          {formatDate(comment.posttime)}
                        </button>
                      </div>
                      <div key={id} className="your-post-div">
                        <p className="comment-post">{comment.commenttext}</p>
                      </div>
                      <p className="date_posted">
                        {handleTimeSince(new Date(comment.commenttime))} ago
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
                <p className="post-page-no-post">
                  Comment on a post! <br /> ※(^o^)/※
                </p>
              )}
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
      ) : (
        <SkeletonLayout />
      )}
    </>
  );
}
