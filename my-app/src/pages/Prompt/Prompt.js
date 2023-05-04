import React, { useState, useEffect } from "react";
import axios from "axios";
import apiClient from "../../instance/config";
import { Navbar } from "../../components/index";
import Calendar from "../../components/calendar/calendar";
import { CreatePostButton } from "../../components";
import "./Prompt.css";
import { UserPost } from "../../components/UserPost/UserPost";
import { User } from "../User/User";
import DividerBig from "../../images/DividerBig.png";
import Cat from "../../images/Cat.png";
import DividerSmall from "../../images/DividerSmall.png";
import PencilShort from "../../images/PencilShort.png";

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

  console.log("prompt id: ", promptid);

  console.log("show pencil outside: ", showPencil);

  const [postsForPrompt, setPostsForPrompt] = useState();

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
          <img className="prompt-page-logo" alt={"Logo"} src={"logo-2.png"} />
          <div className="prompt-page-you">You</div>
          <div className="prompt-page-b">
            <p className="prompt-page-apr">
              &lt;&nbsp;&nbsp;&nbsp;&nbsp;Apr 30,
              2023&nbsp;&nbsp;&nbsp;&nbsp;&gt;
            </p>
          </div>
          {/* <DividerBig
            style={{
              marginLeft: "-24.00px",
              marginRight: "-24.00px",
              minWidth: "390px",
              width: "unset",
            }}
          /> */}
          <img src={DividerBig} alt="Divider Big" />
          <div className="prompt-page-div">
            <h1 className="prompt-page-sleep-how-much-did-you-get-last-night-what-is-one-way-that-helps-you-get-to-sleep">
              <span className="prompt-page-text-wrapper">
                Sleep <br />
                (๑ᵕ⌓ᵕ̤ )<br />
              </span>
              <span className="prompt-page-span">
                <br />
              </span>
              <span className="prompt-page-text-wrapper-2">
                How much did you&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <br />
                get last night? <br />
                What is one way&nbsp;&nbsp;
                <br />
                that helps you get&nbsp;&nbsp;&nbsp;&nbsp;
                <br />
                to sleep?
              </span>
            </h1>
          </div>
          {/* <DividerSmall
            style={{
              marginLeft: "-24.00px",
              marginRight: "-24.00px",
              minWidth: "390px",
              width: "unset",
            }}
          /> */}
          <img src={DividerSmall} alt="DividerSmall" />
          <div className="prompt-page-b-2">
            <p className="prompt-page-p">
              You can put down <br />
              your ideas <br />
              with the pencil.
            </p>
            {/* <PencilShort
              property1="pencil short"
              style={{
                backgroundImage: "unset",
                backgroundSize: "unset",
                height: "68.5px",
                minWidth: "145.19px",
                position: "relative",
                width: "unset",
              }}
            /> */}
          </div>
          {/* <DividerBig
            style={{
              marginLeft: "-24.00px",
              marginRight: "-24.00px",
              minWidth: "390px",
              width: "unset",
            }}
          /> */}
          <img src={DividerBig} alt="Divider Big" />
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
              <span className="prompt-page-text-wrapper-3">
                Tap on them to
                <br />
                See the details~
              </span>
            </p>
          </div>
          {/* <DividerSmall
            style={{
              marginLeft: "-24.00px",
              marginRight: "-24.00px",
              minWidth: "390px",
              width: "unset",
            }}
          /> */}
          <img src={DividerSmall} alt="DividerSmall" />

          <div className="prompt-page-b-2">
            <p className="prompt-page-don-t-eat-before-bed-just-finished-a-sandwich">
              Don’t eat before&nbsp;&nbsp;&nbsp;&nbsp;
              <br />
              bed. Just finished a&nbsp;&nbsp; <br />
              sandwich.
            </p>
            <img className="prompt-page-face" alt={"Face"} src={"face-1.svg"} />
          </div>
          {/* <DividerSmall
            style={{
              marginLeft: "-24.00px",
              marginRight: "-24.00px",
              minWidth: "390px",
              width: "unset",
            }}
          /> */}
          <img src={DividerSmall} alt="DividerSmall" />

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
          </div>
          {/* <DividerSmall
            style={{
              marginLeft: "-24.00px",
              marginRight: "-24.00px",
              minWidth: "390px",
              width: "unset",
            }}
          /> */}
          <img src={DividerSmall} alt="DividerSmall" />

          <div className="prompt-page-div">
            <p className="prompt-page-p">
              Take a look at&nbsp;&nbsp; <br />
              this video!
            </p>
            <div className="prompt-page-group">
              <img className="prompt-page-img" alt={"Img"} src={".svg"} />
            </div>
          </div>
          <img src={DividerBig} alt="Divider Big" />
          {/* <DividerBig
            style={{
              marginLeft: "-24.00px",
              marginRight: "-24.00px",
              minWidth: "390px",
              width: "unset",
            }}
          /> */}
          <div className="prompt-page-b-cat">
            <p className="prompt-page-p">
              Pet this cat <br />
              And you will go
              <br />
              Back to top.
            </p>
            {/* <Cat
              property1="Default"
              style={{
                backgroundImage: "unset",
                backgroundSize: "unset",
                cursor: "pointer",
                height: "200.5px",
                minWidth: "197.98px",
                position: "relative",
                transition: "all 0.2s ease",
                width: "unset",
              }}
            /> */}
            <img src={Cat} alt="Cat" />
          </div>
        </div>
      </div>
    </>
  );
}
