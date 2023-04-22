import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import apiClient from "../../apiClient/http-common";
import * as ROUTES from "../../constants/routes";
import { Navbar } from "../../components/index";
import Calendar from "../../components/calendar";
import axios from "axios";
import { BsFilterRight, BsChevronUp, BsChevronDown } from "react-icons/bs";


export function Prompt() {
  //const baseURL = "http://localhost:3005/prompt";
  //const [promptInfo, setPromptInfo] = useState("");
  const [defaultPromptContent, setDefaultPromptContent] = useState("");
  const [deafultPromptDate, setDefaultPromptDate] = userState(null);
  const [errMessage, setErrMessage] = useState("");
  setDefaultPromptDate(new Date().toLocaleDateString()); //defualt is today

  useEffect(() => {
    //use promptDate to find the content
    async function getDefaultPromptContent() {
      try{
        const res = await apiClient.get(`baseURL/:${deafultPromptDate}`);
        setDefaultPromptContent(res.promptDescription);
      } catch (err) {
        setErrMessage("We have not published the prompt for today, please wait~");
        console.err(err.message)
      }
    }
    getDefaultPromptContent();
  }, [promptDate]);


  //user selectable
  const [selectedPromptContent, setSelectedPromptContent] = useState("");
  const [selectedPromptDate, setSelectedPromptDate] = useState(null);

  useEffect(() => {
    //use promptDate to find the content
    async function getSelectedPromptContent() {
      try{
        const res = await apiClient.get(`baseURL/:${selectedPromptDate}`);
        setSelectedPromptContent(res.promptDescription);
      } catch (err) {
        setErrMessage("The date of prompt is invalid, or the prompt does not exist T_T");
        console.err(err.message)
      }
    }
    getSelectedPromptContent();
  }, [selectedPromptDate]);


  return (
    <>
      <div class="container">
        <Navbar />
        <h1>Posts</h1>
        <button><BsFilterRight /></button>
        <div class="post">
          <h2>Don't eat before bed</h2>
          <h3>2h ago</h3>
          <button class="expand"><BsChevronUp /></button>
        </div>

        <div class="post-expand">
          <button class="report">Report</button>
          <h3>Report</h3>
          <div class="like-c">
            <button class="like">Like</button>
            <button class="comment">Like</button>
          </div>

          <Calendar dateCallBack={selectedPromptDate} />

        </div>
      </div>
    </>
  );
}



{/* <label>
  Select Date:
  <input type="text" ref={clientDateInput} className="form-control ml-2" placeholder="Title" />
</label>
  <div className="input-group-append">
    <button className="btn btn-sm btn-primary" onClick={getDataByTitle}>Find By Title</button>
  </div> */}


  

