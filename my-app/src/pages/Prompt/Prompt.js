import React, { useState, useContext, useEffect } from "react";
import apiClient from "../../instance/config";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import Calendar from "../../components/calendar/calendar";
import { CreatePostButton } from "../../components";
import "./Prompt.css";

export function Prompt() {
  //const baseURL = "http://localhost:3005/prompt";
  const [promptDescription, setPromptDescription] = useState("");
  const [defaultPromptDate, setDefaultPromptDate] = useState(
    new Date().toLocaleDateString().replace(/\//g, "-")
  );
  const [promptid, setPrompid] = useState("");
  const [havePrompt, setHavePrompt] = useState(false);

  console.log("have prompt:", havePrompt);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDefaultPromptContent = async () => {
    const res = await apiClient
      .get(`/prompt/:${defaultPromptDate}`)
      .then((response) => {
        console.log("response: ", response.data.promptdescription);
        setPromptDescription(response.data.promptdescription);
        setPrompid(response.data.promptid);

        if (response.data.promptdescription) {
          setHavePrompt(true);
        }
      })
      .catch((err) => {
        console.err(err.message);
      });
  };

  const selectedPromptDate = (date) => {
    setDefaultPromptDate(date);
  };

  useEffect(() => {
    //use promptDate to find the content
    getDefaultPromptContent();
  }, [selectedPromptDate, havePrompt]);

  const createPostInfo = {
    promptid,
    //,
    //localStorage.getItem(userid);
  };

  return (
    <div>
      <div className="container">
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
          <Calendar dateCallBack={selectedPromptDate} />
        </div>

        <div>
          <b>{havePrompt ? <CreatePostButton {...createPostInfo} /> : null}</b>
        </div>
      </div>
    </div>
  );
}
