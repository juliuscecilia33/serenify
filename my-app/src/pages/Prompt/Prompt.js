import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import apiClient from "../../instance/config";
import { Navbar } from "../../components/index";
import Calendar from "../../components/calendar/calendar";
import { CreatePostButton } from "../../components";
import "./Prompt.css";
import { UserPost } from "../../components/UserPost/UserPost";
import DividerBig from "../../images/DividerBig.png";
import Cat from "../../images/Cat.png";
import DividerSmall from "../../images/DividerSmall.png";
import PencilShort from "../../images/PencilShort.png";
import * as ROUTES from "../../constants/routes";
import { Authentication } from "../../context/Authentication";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Logo from "../../images/logo2.png";

export function Prompt() {
  //const baseURL = "http://localhost:3005/prompt";
  const [promptDescription, setPromptDescription] = useState("");
  const [defaultPromptDate, setDefaultPromptDate] = useState(
    new Date().toLocaleDateString().replace(/\//g, "-")
  );
  const [localStorageDate, setLocalStorageDate] = useState("");
  const [promptid, setPromptid] = useState("");
  const [havePrompt, setHavePrompt] = useState(false);
  const [showPencil, setShowPencil] = useState(true);
  const [postSubmitted, setPostSubmitted] = useState(false);
  const [refreshPosts, setPostsRefresh] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated, setAuth } = useContext(Authentication);

  console.log("prompt id: ", promptid);

  console.log("show pencil outside: ", showPencil);

  const [postsForPrompt, setPostsForPrompt] = useState();

  const logout = (e) => {
    e.preventDefault();

    localStorage.removeItem("userid");
    console.log("User logged out");

    navigate(ROUTES.LOGIN);
  };

  const gettPostsForCertainPrompt = async () => {
    if (promptid) {
      axios
        .get("http://localhost:3005/posts/all")
        .then((response) => {
          console.log("posts all: ", response);
          console.log(
            "posts response for that prompt: ",
            response.data.filter((post) => post.promptid === promptid)
          );
          setPostsForPrompt(
            response.data.filter((post) => post.promptid === promptid)
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
      // console.log(
      //   "prompt date from local storage: ",
      //   localStorage.getItem("promptDate")
      // );
      //setLocalStorageDate(new Date(localStorage.getItem("promptDate")));
      // console.log("type for new Date(): ", typeof new Date());
      // console.log("type for local storage date: ", typeof localStorageDate);
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
    const getDefaultPromptContent = async () => {
      const res = await apiClient
        .get(`/prompt/:${defaultPromptDate}`)
        .then((response) => {
          console.log("response: ", response.data.promptdescription);
          setPromptDescription(response.data.promptdescription);
          setPromptid(response.data.promptid);

          if (response.data.promptdescription) {
            setHavePrompt(true);
            // setShowPencil(true);
          } else {
            setHavePrompt(false);
            // setShowPencil(false);
          }
        })
        .catch((err) => {
          console.err(err.message);
        });
    };
    //use promptDate to find the content
    getDefaultPromptContent();
  }, [selectedPromptDate, havePrompt]);

  const createPostInfo = {
    promptid, //localStorage.getItem(userid);
    showPencil,
    setShowPencil,
    postSubmitted,
    setPostSubmitted,
  };

  return (
    <>
      <div>
        <Navbar />
        <h1>Posts</h1>

        <h2>
          {havePrompt ? (
            promptDescription
          ) : (
            <div>
              <p>"We do not have prompt for this day...</p>
              <p>sorry T_T"</p>
            </div>
          )}
        </h2>

        <div className="calendar">
          <Calendar
            dateCallBack={selectedPromptDate}
            setShowPencil={setShowPencil}
          />
        </div>

        <div>
          <b>{havePrompt && <CreatePostButton {...createPostInfo} />}</b>
        </div>

        {postsForPrompt &&
          postsForPrompt.map((post, id) => (
            <UserPost
              refreshPosts={refreshPosts}
              setPostsRefresh={setPostsRefresh}
              postData={post}
              key={id}
            />
          ))}
      </div>
      <div className="prompt-page-prompt-page">
        <div className="prompt-page-content">
          <img className="prompt-page-logo" alt={"Logo"} src={Logo} />
          {isAuthenticated ? (
            <button onClick={(e) => logout(e)}>
              <div className="log-in">Sign Out</div>
            </button>
          ) : (
            <Link to={ROUTES.LOGIN}>
              <div className="log-in">Log in</div>
            </Link>
          )}
          <div className="prompt-page-b">
            <p className="prompt-page-apr">
              &lt;&nbsp;&nbsp;&nbsp;&nbsp;Apr 30,
              2023&nbsp;&nbsp;&nbsp;&nbsp;&gt;
            </p>
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
              <span className="prompt-page-text-wrapper">
                Prompt <br />
                {/* (๑ᵕ⌓ᵕ̤ )<br /> */}
              </span>
              {/* <span className="prompt-page-span">
                <br />
              </span> */}
              <span className="prompt-page-text-wrapper-2">
                {havePrompt ? (
                  promptDescription
                ) : (
                  <div>"We do not have a prompt for this day...</div>
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
            <p className="prompt-page-p">
              You can put down <br />
              your ideas <br />
              with the pencil.
            </p>
            <span className="prompt-page-span">
              <br />
            </span>
            <div>
              <b>{havePrompt && <CreatePostButton {...createPostInfo} />}</b>
            </div>
          </div>
          <img className="divider-small" src={DividerBig} alt="Divider Big" />
          <div className="prompt-page-div">
            <p className="prompt-page-here-s-what-people-think-tap-on-them-to-see-the-details">
              <span className="prompt-page-text-wrapper-3">
                Here’s what <br />
              </span>
              <span className="prompt-page-text-wrapper-4">
                People <br />
                Think.
                <br />
              </span>
              <br />
              <span className="prompt-page-text-wrapper-3">
                Tap on them to
                <br />
                See the details~
              </span>
              <br />
            </p>
          </div>

          {postsForPrompt &&
            postsForPrompt.map((post, id) => (
              <>
                <UserPost
                  refreshPosts={refreshPosts}
                  setPostsRefresh={setPostsRefresh}
                  postData={post}
                  key={id}
                />
                <img
                  className="divider-small"
                  src={DividerSmall}
                  alt="DividerSmall"
                />
              </>
            ))}

          {/* <div className="prompt-page-b-2">
            <p className="prompt-page-don-t-eat-before-bed-just-finished-a-sandwich">
              Don’t eat before&nbsp;&nbsp;&nbsp;&nbsp;
              <br />
              bed. Just finished a&nbsp;&nbsp; <br />
              sandwich.
            </p>
            <img className="prompt-page-face" alt={"Face"} src={"face-1.svg"} />
          </div>
          <img
            className="divider-small"
            src={DividerSmall}
            alt="DividerSmall"
          />

          <div className="prompt-page-b-2">
            <p className="prompt-page-i-usually-listen-to-podcasts-recommend-this-it-is-one-of-the-best-recording-ever-it-tells-you-how-your-muscle-operate-under-extreme-temperature-where-the-tissues-make-a-wormhole-to-the-other-side-of-the-universe-and-listen-to-spotify-while-it-s-ready-for-a-role-play-game">
              I usually listen to podcasts.&nbsp;&nbsp;
              <br />
              Recommend this.. It is one of the best recording ever. It tells
              you how your muscle operate under extreme temperature where the
              tissues make a wormhole to the other side of the universe and
              listen to Spotify while it’s ready for a role play game.
            </p>
            {/* <Music
              property1="Default"
              style={{
                backgroundImage: "unset",
                backgroundSize: "unset",
                height: "50.55px",
                minWidth: "263.54px",
                position: "relative",
                width: "unset",
              }}
            /> */}
          {/* </div> */}

          {/* <div className="prompt-page-div">
            <p className="prompt-page-p">
              Take a look at&nbsp;&nbsp; <br />
              this video!
            </p>
            <div className="prompt-page-group">
              <img className="prompt-page-img" alt={"Img"} src={".svg"} />
            </div>
          </div> */}
          {/* <img className="divider-small" src={DividerBig} alt="Divider Big" /> */}

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
    </>
  );
}
