import React, { useState, useContext, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import "./UserPosts.css";
import { NavbarVTwo, SkeletonLayout } from "../../components";
import DividerSmall from "../../images/DividerSmall.png";
import Cat from "../../images/Cat.png";
import axios from "axios";
import Pencil from "../../images/PencilTwo.png";
import { BsFillTrash3Fill } from "react-icons/bs";
import { handleTimeSince } from "../../helpers/handleTimeSince";
import { Link } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router";

export function UserPosts() {
  const [userPosts, setUserPosts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(
          `${process.env.REACT_APP_BACKENDURL}posts/${localStorage.getItem(
            "userid"
          )}/posts`
        )
        .then((response) => {
          console.log("posts all: ", response);
          setUserPosts(
            response.data.sort(function (a, b) {
              return new Date(b.posttime) - new Date(a.posttime);
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

  console.log(userPosts);

  return (
    <>
      {userPosts ? (
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
                    Posts
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
              {userPosts ? (
                userPosts.map((post, id) => (
                  <>
                    <Link
                      to={`/post/${post.postid}`}
                      state={{ postData: post }}
                    >
                      <div className="post-container">
                        <div className="top-top-section">
                          <p>
                            <b>{post.promptdescription}</b> •{" "}
                            {formatDate(post.promptdate)}
                          </p>
                        </div>
                        <div className="middle-section">
                          <p className="post_text">{post.postdescription}</p>
                          {post.attachment ? (
                            post.isvideo ? (
                              <iframe
                                className="post-image-attachment-user-hello"
                                src={post.attachment}
                                alt="post_image"
                                title="attachment"
                                scrolling="no"
                              />
                            ) : (
                              <img
                                className="post-image-attachment-user-hello"
                                src={post.attachment}
                                alt="post_image"
                              />
                            )
                          ) : null}
                        </div>
                        {post.ascii_mood && (
                          // <div className="mood-backing">
                          <h3 className="mood-backing">{post.ascii_mood}</h3>
                          // </div>
                        )}
                        <br />
                        <p className="date_posted">
                          {handleTimeSince(new Date(post.posttime))} ago
                        </p>
                        <div className="button-container">
                          {post.userid === localStorage.getItem("userid") && (
                            <>
                              <button className="trash-icon">
                                <BsFillTrash3Fill />
                              </button>
                              <img
                                alt="Edit-icon"
                                className="pencil-icon"
                                src={Pencil}
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <img
                        className="divider-small"
                        src={DividerSmall}
                        alt="DividerSmall"
                      />
                    </Link>
                  </>
                ))
              ) : (
                <p className="post-page-no-post">
                  Post Something! <br /> ※(^o^)/※
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
