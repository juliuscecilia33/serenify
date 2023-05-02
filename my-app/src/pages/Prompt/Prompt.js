import React, { useState, useEffect } from "react";
import apiClient from "../../instance/config";
import { Navbar } from "../../components/index";
import Calendar from "../../components/calendar/calendar";
import { CreatePostButton } from "../../components";
import "./Prompt.css";
import { UserPost } from "../../components/UserPost/UserPost";
import axios from "axios";
import { User } from "../User/User";

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

  console.log("prompt id: ", promptid);

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
  }, [promptid]);

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
          } else {
            setHavePrompt(false);
            setShowPencil(false);
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
  };

  return (
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
        postsForPrompt.map((post, id) => <UserPost postData={post} key={id} />)}
    </div>
  );
}
