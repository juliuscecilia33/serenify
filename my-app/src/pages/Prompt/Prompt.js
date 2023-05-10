import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import apiClient from "../../instance/config";
import { NavbarVTwo, SkeletonLayout } from "../../components/index";
import Calendar from "../../components/calendar/calendar";
import { CreatePostButton } from "../../components";
import "./Prompt.css";
import "../HomeVTwo/HomeVTwo.css";
import { UserPost } from "../../components/UserPost/UserPost";
import DividerBig from "../../images/DividerBig.png";
import Cat from "../../images/Cat.png";
import DividerSmall from "../../images/DividerSmall.png";
import * as ROUTES from "../../constants/routes";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router";
import { Link, Navigate } from "react-router-dom";
import moment from "moment";

export function Prompt() {
  //const baseURL = "http://localhost:3005/prompt";
  const [promptDescription, setPromptDescription] = useState("");
  const [defaultPromptDate, setDefaultPromptDate] = useState(
    new Date().toLocaleDateString().replace(/\//g, "-")
  );
  //const [localStorageDate, setLocalStorageDate] = useState("");
  const [promptid, setPromptid] = useState("");
  const [havePrompt, setHavePrompt] = useState(false);
  const [showPencil, setShowPencil] = useState(true);
  const [postSubmitted, setPostSubmitted] = useState(false);
  const [refreshPosts, setPostsRefresh] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogo = () => {
    <Navigate to="/" />;
  };

  let splitPromptDate = defaultPromptDate.split("-");
  let formatDate = new Date(
    splitPromptDate[2],
    splitPromptDate[0] - 1,
    splitPromptDate[1]
  );
  let displayDate = moment(formatDate).format("MMMM D, Y");
  let displayDay = moment(formatDate).format("dddd");

  const [postsForPrompt, setPostsForPrompt] = useState();

  const sortByDate = (postData) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(postData.posttime) - new Date(postData.posttime);
  };

  const logout = (e) => {
    e.preventDefault();

    localStorage.clear();
    console.log("User logged out");

    navigate(ROUTES.LOGIN);
  };

  const gettPostsForCertainPrompt = async () => {
    if (promptid) {
      axios
        .get(`http://localhost:3005/posts/all`)
        .then((response) => {
          console.log("posts all: ", response);
          console.log(
            "posts response for that prompt: ",
            response.data.filter((post) => post.promptid === promptid)
          );
          setPostsForPrompt(
            response.data
              .sort(function (a, b) {
                return new Date(b.posttime) - new Date(a.posttime);
              })
              .filter((post) => post.promptid === promptid)
          );
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    setPostsForPrompt(null);
  };

  useEffect(() => {
    gettPostsForCertainPrompt();
  }, [promptid, postSubmitted]);

  //Transfer the date from LocalStorage to date datatype
  useEffect(() => {
    if (localStorage.getItem("promptDate")) {
      setDefaultPromptDate(
        new Date(localStorage.getItem("promptDate"))
          .toLocaleDateString()
          .replace(/\//g, "-")
      );
    }
  }, [localStorage.getItem("promptDate")]);

  const selectedPromptDate = (date) => {
    setDefaultPromptDate(date);
  };

  useEffect(() => {
    setTimeout(() => {
      const getDefaultPromptContent = async () => {
        await apiClient
          .get(`/prompt/${defaultPromptDate}`)
          .then((response) => {
            console.log(
              "response prompt description: ",
              response.data.promptdescription
            );
            setPromptDescription(response.data.promptdescription);
            setPromptid(response.data.promptid);

            if (response.data.promptdescription) {
              setHavePrompt(true);
            } else {
              setHavePrompt(false);
              console.log("went into else condition");
            }
          })
          .catch((err) => {
            console.err(err.message);
          });
      };
      getDefaultPromptContent();
    }, 1000);
    //use promptDate to find the content
  }, [selectedPromptDate, havePrompt]);

  const createPostInfo = {
    promptid,
    showPencil,
    setShowPencil,
    postSubmitted,
    setPostSubmitted,
  };

  return (
    <>
      {/* {!pageLoading ? ( */}
      <div className="prompt-page-prompt-page">
        <NavbarVTwo />
        <div className="prompt-page-content">
          <div className="prompt-page-b">
            <p className="prompt-page-apr">{displayDate}</p>
            <p className="prompt-page-apr-two">{displayDay}</p>
            <br />

            <div className="calendar">
              <Calendar
                dateCallBack={selectedPromptDate}
                setShowPencil={setShowPencil}
              />
            </div>
          </div>
          <img className="divider-small" src={DividerBig} alt="Divider Big" />
          <div className="prompt-page-div">
            <h1 className="prompt-page-sleep-how-much-did-you-get-last-night-what-is-one-way-that-helps-you-get-to-sleep">
              <span className="prompt-page-text-wrapper">Prompt:</span>
              <span className="prompt-page-span">
                <br />
              </span>
              <span className="prompt-page-text-wrapper-2">
                {havePrompt ? (
                  promptDescription
                ) : (
                  <>
                    {/* <br /> */}
                    We do not have a prompt for this day...
                  </>
                )}
              </span>
            </h1>
          </div>
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />
          <div className="prompt-page-b-2">
            {havePrompt && (
              <>
                <p className="prompt-page-p">
                  You can put down <br />
                  your ideas <br />
                  with the pencil.
                </p>
                <span className="prompt-page-span">
                  <br />
                </span>
                <div>
                  <b>{<CreatePostButton {...createPostInfo} />}</b>
                </div>
                <img
                  className="divider-small negative-margin"
                  src={DividerBig}
                  alt="Divider Big"
                />
                <div className="prompt-page-div">
                  <p className="prompt-page-here-s-what-people-think-tap-on-them-to-see-the-details">
                    <span className="prompt-page-text-wrapper-3">
                      Here’s what <br />
                    </span>
                    <span className="prompt-page-text-wrapper-4">
                      People <br />
                      <u>Think.</u>
                      <br />
                    </span>
                    <br />
                    <span className="prompt-page-text-wrapper-3">
                      Tap on them to
                      <br />
                      see the details
                    </span>
                    <br />
                  </p>
                </div>
                <img
                  className="divider-small negative-margin"
                  src={DividerBig}
                  alt="Divider Big"
                />
              </>
            )}
          </div>

          {postsForPrompt &&
            postsForPrompt.map((post, id) => (
              <>
                {post.postid && (
                  <Link to={`/post/${post.postid}`} state={{ postData: post }}>
                    <UserPost
                      refreshPosts={refreshPosts}
                      setPostsRefresh={setPostsRefresh}
                      postData={post}
                      key={id}
                    />
                  </Link>
                )}

                <img
                  className="divider-small"
                  src={DividerSmall}
                  alt="DividerSmall"
                />
              </>
            ))}

          <div className="prompt-page-b-cat">
            <p className="prompt-page-p">
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
      {/* ) : (
        <SkeletonLayout />
      )} */}
    </>
  );
}
