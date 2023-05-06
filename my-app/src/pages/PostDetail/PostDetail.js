import React, { useState, useContext } from "react";
import * as ROUTES from "../../constants/routes";
import DividerBig from "../../images/DividerBig.png";
import Cat from "../../images/Cat.png";
import DividerSmall from "../../images/DividerSmall.png";
import { useParams } from "react-router-dom";
import "./PostDetail.css";
import Pencil from "../../images/PencilTwo.png";
import Comment from "../../images/Comment.png";
import CommentFilled from "../../images/CommentFilled.png";
import Report from "../../images/Report.png";
import Trash from "../../images/Trash.png";
import Heart from "../../images/Heart.png";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../../images/logo2.png";
import axios from "axios";

export function PostDetail() {
  let { postid } = useParams();

  console.log("post id from post detail: ", postid);

  const navigate = useNavigate();

  const [editingPost, setEditingPost] = useState(false);
  const [commentingOnPost, setCommentingOnPost] = useState(false);

  const location = useLocation();

  const postData = location.state?.postData;
  const [editedPostValue, setEditedPostValue] = useState(
    postData.postdescription ? postData.postdescription : ""
  );

  const [commentingOnPostValue, setCommentingOnPostValue] = useState("");

  console.log("edited post value: ", editedPostValue);

  const handleEditPostDescription = (e) => {
    e.preventDefault();

    const postBody = {
      postescription: editedPostValue,
    };

    axios
      .put(
        `http://localhost:3005/posts/${postData.postid}/editdescription`,
        postBody
      )
      .then((response) => {
        console.log("edit response: ", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    navigate(0);
  };

  const logout = (e) => {
    e.preventDefault();

    localStorage.clear();
    console.log("User logged out");

    navigate(ROUTES.LOGIN);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();

    console.log("make sure postid exists: ", postData.postid);

    axios
      .delete(`http://localhost:3005/posts/${postData.postid}`)
      .then((response) => {
        console.log("delete response: ", response);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // setPostsRefresh(!refreshPosts);
    navigate(ROUTES.PROMPT);

    console.log("Deleted Post");
  };

  const { isAuthenticated, setAuth } = useContext(Authentication);

  return (
    <div className="post-page-post-page">
      <div className="post-page-content">
        <Link to={ROUTES.HOMEVTWO}>
          <img className="post-page-logo" alt={"Logo"} src={Logo} />
        </Link>
        {isAuthenticated ? (
          <button onClick={(e) => logout(e)}>
            <div className="log-in">Sign Out</div>
          </button>
        ) : (
          <Link to={ROUTES.LOGIN}>
            <div className="log-in">Log in</div>
          </Link>
        )}
        <div className="post-page-tag">
          <button
            onClick={() => {
              navigate(ROUTES.PROMPT);
            }}
            className="post-page-div"
          >
            &lt;-
          </button>
        </div>
        <div className="post-page-b">
          {editingPost ? (
            <>
              <textarea
                value={editedPostValue}
                onChange={(e) => setEditedPostValue(e.target.value)}
                className="editing-input"
                placeholder="Edit your post here..."
              />
              <button
                onClick={(e) => handleEditPostDescription(e)}
                className="save-button"
              >
                Save
              </button>
              <button
                onClick={() => setEditingPost(false)}
                className="save-button"
              >
                Cancel
              </button>
            </>
          ) : (
            <h1 className="post-page-don-t-eat-before-bed-just-finished-a-sandwich">
              {postData.postdescription && postData.postdescription}
            </h1>
          )}

          {postData.attachment && (
            <img
              className="post-image"
              src={postData.attachment}
              alt="post_image"
            />
          )}
          {postData.userid &&
            postData.userid === localStorage.getItem("userid") && (
              <div className="post-page-component-two">
                <button onClick={(e) => handleDeletePost(e)}>
                  <img
                    className="trash-icon"
                    alt={"Material symbols report outline"}
                    src={Trash}
                  />
                </button>
                <button onClick={() => setEditingPost(!editingPost)}>
                  <img
                    className="trash-icon"
                    alt={"Material symbols report outline"}
                    src={Pencil}
                  />
                </button>
              </div>
            )}
        </div>
        <img
          className="divider-small negative-margin"
          src={DividerBig}
          alt="Divider Big"
        />
        <div className="post-page-b-2">
          <p className="post-page-p">
            Any thoughts you <br />
            Want to leave?
          </p>
          <div className="post-page-component">
            <img className="" alt={"Icon heart"} src={Heart} />

            <button onClick={() => setCommentingOnPost(!commentingOnPost)}>
              <img
                className=""
                alt={"Icon pencil"}
                src={commentingOnPost ? CommentFilled : Comment}
              />
            </button>
            <img
              className=""
              alt={"Material symbols report outline"}
              src={Report}
            />
          </div>
          {commentingOnPost && (
            <>
              <textarea
                value={commentingOnPostValue}
                onChange={(e) => setCommentingOnPostValue(e.target.value)}
                className="commenting-input"
                placeholder="Type your comment here..."
              />
              <div className="comment-box-component">
                <button className="save-button">Comment -&gt;</button>
              </div>
            </>
          )}
        </div>
        <img className="divider-small" src={DividerSmall} alt="DividerSmall" />
        <div className="post-page-p-wrapper">
          <p className="post-page-text-wrapper-2">
            I agree with what
            <br />
            you’ve posted. It’s so great!
          </p>
        </div>
        <img className="divider-small" src={DividerSmall} alt="DividerSmall" />
        <div className="post-page-p-wrapper">
          <p className="post-page-text-wrapper-2">
            I like the emoji. It makes me see your face getting sick from the
            full stomach hahaha...
          </p>
        </div>
        <img
          className="divider-small negative-margin"
          src={DividerBig}
          alt="Divider Big"
        />
        <div className="post-page-b-cat">
          <p className="post-page-p">
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
  );
}
